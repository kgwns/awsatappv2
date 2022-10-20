//
//  StoryLoader.swift
//  Asharqalawsat WatchKit Extension
//
//  Created by Gowri Shankaran on 19/10/22.
//

import Foundation

public protocol StoryLoader {
  typealias Result = Swift.Result<[Story], Error>
  
  func load(completion: @escaping (Result) -> Void)
}
