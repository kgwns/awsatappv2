//
//  ReachibilityManager.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import Foundation
import Reachability


final class ReachibilityManager {
    
    static let reachability = try! Reachability()
    
    static func startMonitoring() {
      NotificationCenter.default.addObserver(self, selector: #selector(self.reachabilityChanged),name: Notification.Name.reachabilityChanged,object: reachability)
        do{
            try reachability.startNotifier()
        }catch{
            print("could not start reachability notifier")
        }
    }
    
    @objc static func reachabilityChanged(note: Notification) {
        
        let reachability = note.object as! Reachability
        
      if reachability.connection != .unavailable {
        if reachability.connection == .wifi {
                print("Reachable via WiFi")
                shouldCheckBeforeNetworkRequest = false
            } else {
                print("Reachable via Cellular")
                shouldCheckBeforeNetworkRequest = true
            }
        } else {
            shouldCheckBeforeNetworkRequest = false
            print("Network not reachable")
        }
    }
    
    static var shouldCheckBeforeNetworkRequest: Bool = false
}
