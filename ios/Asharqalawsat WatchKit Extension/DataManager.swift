//
//  AWDataManager.swift
//  Asharqalawsat WatchKit Extension
//
//  Created by Gowri Shankaran on 18/10/22.
//

import Foundation
import WatchConnectivity

final class DataManager: NSObject {
  
  private let wc_session: WCSession = WCSession.default
  var onStoriesReceived: (([Story]) -> Void)?
  private let localLoader: LocalStoriesLoader
  private let remoteLoader: RemoteStoryLoader
  
  override init() {
    let cacheDirectory = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask).first!
    let storeURL = cacheDirectory.appendingPathExtension("TopStories.store")
    localLoader = LocalStoriesLoader(store: CodableTopStoryStore(storeURL: storeURL), currentData: { Date() })

    remoteLoader = RemoteStoryLoader(url: URL(string: "https://awsatapp.srpcdigital.com/api/v2/home/topview/coverage")!, client: URLSessionHTTPClient())

    super.init()
    
    setUpDelegate()
  }
  
  private func setUpDelegate() {
    wc_session.delegate = self
    wc_session.activate()
  }
  
  func initialiseStories() {
    loadFromLocalStore()
  }
  
  func validateCacheAndUpdateIfRequired() {
    localLoader.validateCache {[weak self] isValidCache in
      if !isValidCache {
        self?.fetchLatestTopStories()
      }
    }
  }
  
  private func fetchLatestTopStories() {
      remoteLoader.load { [weak self] result in
        guard let self = self else { return }
        switch result {
          case let .success(newStories):
            self.localLoader.save(stories: newStories) { [weak self] saveResult in
              guard let strongSelf = self else { return }
              switch saveResult {
                case .success:
                  strongSelf.onStoriesReceived?(newStories)
                default:
                  break
              }
            }
          default:
            break
        }
      }
  }

  private func loadFromLocalStore() {
    localLoader.load { [weak self] result in
      
      guard let self = self else { return }
      
      switch result {
        case let .success(localStories):
          if localStories.isEmpty {
            self.fetchLatestTopStories()
          } else {
            self.onStoriesReceived?(localStories)
          }
        case .failure:
          self.fetchLatestTopStories()
      }
    }
  }
}

extension DataManager: WCSessionDelegate {
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
    
  }
  
  func session(_ session: WCSession, didReceiveApplicationContext applicationContext: [String : Any]) {
    updateLocalStore(stories: applicationContext)
  }
  
  private func updateLocalStore(stories: [String: Any]) {
    guard let topStories = try? StoryItemsMapper.map(stories) else { return }
    
    let latestStories = topStories.toModels()
    localLoader.save(stories: latestStories) { [weak self] result in
      guard let self = self else { return }
      switch result {
        case .success:
          self.onStoriesReceived?(latestStories)
        default:
          print("Something went wrong. Need to check")
      }
    }
  }
  
  private func refreshUI() {
    
  }
  
  private func getStories() {
    
  }
}
