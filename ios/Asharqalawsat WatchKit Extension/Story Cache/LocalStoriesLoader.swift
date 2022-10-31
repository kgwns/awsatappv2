//
//  LocalTopStoriesLoader.swift
//  Asharqalawsat WatchKit Extension
//
//  Created by Gowri Shankaran on 18/10/22.
//

import Foundation

final class LocalStoriesLoader {
  private let store: TopStoryStore
  private let currentDate: () -> Date
  
  public init(store: TopStoryStore, currentData: @escaping () -> Date) {
    self.currentDate = currentData
    self.store = store
  }
}

extension LocalStoriesLoader {
  public typealias SaveResult = Result<Void, Error>
  
  public func save(stories: [Story], completion: @escaping (SaveResult) -> Void) {
    store.deleteCachedStory { result in
      switch result {
        case .success:
          self.cache(stories, with: completion)
        case let .failure(error):
          completion(.failure(error))
      }
    }
  }
  
  private func cache(_ stories: [Story], with completion: @escaping (SaveResult) -> Void) {
    store.insert(stories.toLocal(), timestamp: currentDate()) { [weak self] error in
      guard self != nil else { return }
      
      completion(error)
    }
  }
}

extension LocalStoriesLoader: StoryLoader {
  public typealias LoadResult = StoryLoader.Result
  
  public func load(completion: @escaping (LoadResult) -> Void) {
    store.retrieve { [weak self] result in
      guard let self = self else { return }
      
      switch result {
        case let .failure(error):
          completion(.failure(error))
        case let .success(.some(cache)) where StoryCachePolicy.validate(timestamp: cache.timestamp, against: self.currentDate()):
          completion(.success(cache.stories.toModels()))
        case .success:
          completion(.success([]))
      }
    }
  }
}

extension LocalStoriesLoader {
  public typealias ValidationResult = (Bool) -> Void
  
  public func validateCache(completion: @escaping ValidationResult) {
    store.retrieve { [weak self] result in
      guard let self = self else { return }
      
      switch result {
        case .failure:
            completion(false)
        case let .success(.some(cache)) where !StoryCachePolicy.validate(timestamp: cache.timestamp, against: self.currentDate()):
            completion(false)
        case .success:
          completion(true)
          break
      }
    }
  }
}

private extension Array where Element == Story {
  func toLocal() -> [LocalStoryItem] {
    return map { LocalStoryItem(id: $0.id, title: $0.title, photo: $0.photo, position: $0.position) }
  }
}

private extension Array where Element == LocalStoryItem {
  func toModels() -> [Story] {
    return map { Story(id: $0.id, title: $0.title, photo: $0.photo, position: $0.position) }
  }
}
