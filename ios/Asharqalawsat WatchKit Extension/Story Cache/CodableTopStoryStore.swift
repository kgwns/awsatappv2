//
//  CodableArticleStore.swift
//  Asharqalawsat WatchKit Extension
//
//  Created by Gowri Shankaran on 18/10/22.
//

import Foundation

final class CodableTopStoryStore {
  
  private let storeURL: URL
  private let queue = DispatchQueue(label: "\(CodableTopStoryStore.self) Queue", qos: .userInitiated, attributes: .concurrent)
  
  public init(storeURL: URL) {
    self.storeURL = storeURL
  }
  
}

extension CodableTopStoryStore: TopStoryStore {
  
  private struct Cache: Codable {
    let articles: [CodableArticleDetail]
    let timestamp: Date
    
    var localFeed: [LocalStoryItem] {
      return articles.map { $0.local }
    }
  }
  
  private struct CodableArticleDetail: Codable {
    let id: String
    let title: String
    let photo: String
    let position: String
    
    init(_ article: LocalStoryItem) {
      id = article.id
      title = article.title
      photo = article.photo
      position = article.position
    }
    
    var local: LocalStoryItem {
      return LocalStoryItem(id: id, title: title, photo: photo, position: position)
    }
  }

  func deleteCachedStory(_ completion: @escaping DeletionCompletion) {
    let storeURL = self.storeURL
    
    queue.async(flags: .barrier) {
      guard FileManager.default.fileExists(atPath: storeURL.path) else {
        return completion(.success(()))
      }
      
      do {
        try FileManager.default.removeItem(at: storeURL)
        completion(.success(()))
      } catch {
        completion(.failure(error))
      }
    }
  }
  
  func insert(_ stories: [LocalStoryItem], timestamp: Date, completion: @escaping InsertionCompletion) {
    let storeURL = self.storeURL
    
    queue.async(flags: .barrier) {
      do {
        let encoder = JSONEncoder()
        let cache = Cache(articles: stories.map(CodableArticleDetail.init), timestamp: timestamp)
        let encoded = try encoder.encode(cache)
        try encoded.write(to: storeURL)
        completion(.success(()))
      } catch {
        completion(.failure(error))
      }
    }
  }
  
  func retrieve(completion: @escaping RetrievalCompletions) {
    let storeURL = self.storeURL
    queue.async {
      guard let data = try? Data(contentsOf: storeURL) else {
        completion(.success(.none))
        return
      }
      do {
        let decoder = JSONDecoder()
        let cache = try decoder.decode(Cache.self, from: data)
        completion(.success((stories: cache.localFeed, timestamp: cache.timestamp)))
      } catch {
        completion(.failure(error))
      }
    }
  }
  
}
