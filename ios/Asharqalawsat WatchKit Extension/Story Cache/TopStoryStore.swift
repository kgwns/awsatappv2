//
//  ArticleStore.swift
//  Asharqalawsat WatchKit Extension
//
//  Created by Gowri Shankaran on 18/10/22.
//

import Foundation

public typealias Cache = (stories: [LocalStoryItem], timestamp: Date)

public protocol TopStoryStore {
  typealias DeletionResult = Result<Void, Error>
  typealias DeletionCompletion = (DeletionResult) -> Void
  
  typealias InsertionResult = Result<Void, Error>
  typealias InsertionCompletion = (InsertionResult) -> Void
  
  typealias RetrievalResult = Result<Cache?, Error>
  typealias RetrievalCompletions = (RetrievalResult) -> Void
  
  /// The completion handler can be invoked in any thread.
  /// Clients are responsible to dispatch to appropriate threads, if needed.
  func deleteCachedStory(_ completion: @escaping DeletionCompletion)
  
  /// The completion handler can be invoked in any thread.
  /// Clients are responsible to dispatch to appropriate threads, if needed.
  func insert(_ stories : [LocalStoryItem], timestamp: Date, completion: @escaping InsertionCompletion)
  
  /// The completion handler can be invoked in any thread.
  /// Clients are responsible to dispatch to appropriate threads, if needed.
  func retrieve(completion: @escaping RetrievalCompletions)

}
