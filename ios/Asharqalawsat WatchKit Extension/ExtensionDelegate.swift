//
//  ExtensionDelegate.swift
//  Asharqalawsat WatchKit Extension
//
//  Created by Gowri Shankaran on 07/10/22.
//

import WatchKit

class ExtensionDelegate: NSObject, WKExtensionDelegate {
    private var dataManager: DataManager?
    func applicationDidFinishLaunching() {
        // Perform any final initialization of your application.
        initialiseDataManager()
    }
  
    func applicationDidBecomeActive() {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
      dataManager?.validateCacheAndUpdateIfRequired()
    }

    func applicationWillResignActive() {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, etc.
    }

    func handle(_ backgroundTasks: Set<WKRefreshBackgroundTask>) {
        // Sent when the system needs to launch the application in the background to process tasks. Tasks arrive in a set, so loop through and process each one.
        for task in backgroundTasks {
            // Use a switch statement to check the task type
            switch task {
            case let backgroundTask as WKApplicationRefreshBackgroundTask:
                // Be sure to complete the background task once you’re done.
                backgroundTask.setTaskCompletedWithSnapshot(false)
            case let snapshotTask as WKSnapshotRefreshBackgroundTask:
                // Snapshot tasks have a unique completion call, make sure to set your expiration date
                snapshotTask.setTaskCompleted(restoredDefaultState: true, estimatedSnapshotExpiration: Date.distantFuture, userInfo: nil)
            case let connectivityTask as WKWatchConnectivityRefreshBackgroundTask:
                // Be sure to complete the connectivity task once you’re done.
                connectivityTask.setTaskCompletedWithSnapshot(false)
            case let urlSessionTask as WKURLSessionRefreshBackgroundTask:
                // Be sure to complete the URL session task once you’re done.
                urlSessionTask.setTaskCompletedWithSnapshot(false)
            case let relevantShortcutTask as WKRelevantShortcutRefreshBackgroundTask:
                // Be sure to complete the relevant-shortcut task once you're done.
                relevantShortcutTask.setTaskCompletedWithSnapshot(false)
            case let intentDidRunTask as WKIntentDidRunRefreshBackgroundTask:
                // Be sure to complete the intent-did-run task once you're done.
                intentDidRunTask.setTaskCompletedWithSnapshot(false)
            default:
                // make sure to complete unhandled task types
                task.setTaskCompletedWithSnapshot(false)
            }
        }
    }
}

extension ExtensionDelegate {
  private func initialiseDataManager() {
    dataManager = DataManager()
    dataManager?.onStoriesReceived = { [weak self] newStories in
      guard !newStories.isEmpty else {
        return
      }
      
      let controllerNames: [String] = Array(repeating: "StoriesInterfaceController", count: newStories.count)
      let sortedStories = newStories.sorted { $0.position < $1.position }
      self?.refreshRootPageControllers(with: controllerNames, contexts: sortedStories)
    }
    dataManager?.initialiseStories()
  }

  private func refreshRootPageControllers(with names: [String], contexts: [Any]) {
    DispatchQueue.main.async {
      WKInterfaceController.reloadRootPageControllers(withNames: names, contexts: contexts, orientation: .horizontal, pageIndex: 0)
    }
  }
}
