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
  let fieldImage: String
  let fieldNewImage: String
  let position: String
  
  enum CodingKeys: String, CodingKey {
    case id = "nid"
    case fieldImage = "field_image"
    case fieldNewImage = "field_new_photo"
    case title
    case position = "entityqueue_relationship_position"
  }
}
