//
//  AppDelegate+WatchDelegate.swift
//  Awsatapp
//
//  Created by Gowri Shankaran on 12/10/22.
//

import Foundation
import WatchConnectivity

extension AppDelegate: WCSessionDelegate {
  
  @objc
  func setUpWatchConnectivity() {
    if WCSession.isSupported() {
      watchSession = WCSession.default
      watchSession.delegate = self
      watchSession.activate()
    }
  }
  
  @objc
  func syncTopStories(_ topStories: [String: Any]) {
    sendToAppleWatch(topStories)
  }
  
  private func sendToAppleWatch(_ topStories: [String: Any]) {
    if (watchSession != nil && watchSession.isPaired)  {
      if watchSession.isWatchAppInstalled {
        do {
          try watchSession.updateApplicationContext(topStories)
        } catch {
          print("Error in updating ApplicationContext")
        }
      }
    }
  }
}

//MARK: - WCSessionDelegate
extension AppDelegate {
  public func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
  }
  
  public func sessionDidBecomeInactive(_ session: WCSession) {
    
  }
  
  public func sessionDidDeactivate(_ session: WCSession) {
    
  }
}
