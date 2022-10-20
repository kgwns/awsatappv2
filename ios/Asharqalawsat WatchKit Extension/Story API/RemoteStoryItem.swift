//
//  RemoteStoryItem.swift
//  Asharqalawsat WatchKit Extension
//
//  Created by Gowri Shankaran on 19/10/22.
//

import Foundation

struct RemoteStoryItem: Decodable {
  let id: String
  let title: String
  let photo: String
  
  enum CodingKeys: String, CodingKey {
    case id = "nid"
    case photo = "field_new_photo"
    case title
  }
}
