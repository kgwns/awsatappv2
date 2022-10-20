//
//  StoryItemMapper.swift
//  Asharqalawsat WatchKit Extension
//
//  Created by Gowri Shankaran on 19/10/22.
//

import Foundation

final class StoryItemsMapper {
  
  private struct Root: Decodable {
    let items: [RemoteStoryItem]
    
    enum CodingKeys: String, CodingKey {
      case items = "rows"
    }
  }
  
  private static var OK_200: Int { return 200 }
  
  static func map(_ data: Data, from response: HTTPURLResponse) throws -> [RemoteStoryItem] {
    guard response.statusCode == OK_200, let root = try? JSONDecoder().decode(Root.self, from: data) else {
      throw RemoteStoryLoader.Error.invalidData
    }
    
    return root.items
  }
  
  static func map(_ response: [String: Any]) throws -> [RemoteStoryItem] {
    
    guard let data = try? JSONSerialization.data(withJSONObject: response, options: .prettyPrinted),
          let root = try? JSONDecoder().decode(Root.self, from: data) else {
      throw RemoteStoryLoader.Error.invalidData
    }
    
    return root.items
  }

}
