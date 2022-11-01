//
//  ArticleCachePolicy.swift
//  Asharqalawsat WatchKit Extension
//
//  Created by Gowri Shankaran on 18/10/22.
//

import Foundation

final class StoryCachePolicy {
  private static let calendar = Calendar.init(identifier: .gregorian)
  private static var maxCacheAgeInHours: Int {
    return 12
  }
  
  private init() { }
  
  static func validate(timestamp: Date, against date: Date) -> Bool {
    guard let maxCacheAge = calendar.date(byAdding: .hour, value: maxCacheAgeInHours, to: timestamp) else {
      return false
    }
    return date < maxCacheAge
  }
}
