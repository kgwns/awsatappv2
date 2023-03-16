//
//  RemoteStoryLoader.swift
//  Asharqalawsat WatchKit Extension
//
//  Created by Gowri Shankaran on 19/10/22.
//

import Foundation

public final class RemoteStoryLoader: StoryLoader {
  let url: URL
  let client: HTTPClient
  
  public enum Error: Swift.Error {
    case connectivity
    case invalidData
  }
  
  public typealias Result = StoryLoader.Result
  
  public init(url: URL, client: HTTPClient) {
    self.url = url
    self.client = client
  }
  
  public func load(completion: @escaping (Result) -> Void) {
    
    client.get(from: url) { [weak self] result in
      guard self != nil else { return }
      
      switch result {
        case let .success((data, response)):
          completion(RemoteStoryLoader.map(data, from: response))
        case .failure:
          completion(.failure(Error.connectivity))
      }
    }
  }
  
  private static func map(_ data: Data, from response: HTTPURLResponse) -> Result {
    do {
      let items = try StoryItemsMapper.map(data, from: response)
      return .success(items.toModels())
    } catch {
      return .failure(error)
    }
  }
}

extension Array where Element == RemoteStoryItem {
  func toModels() -> [Story] {
    return map { Story(id: $0.id, title: $0.title, photo: $0.fieldImage.isEmpty ? $0.fieldNewImage : $0.fieldImage, position: $0.position) }
  }
}
