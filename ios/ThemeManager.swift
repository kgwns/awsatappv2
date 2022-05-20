//
//  ThemeManager.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 20/05/22.
//

import UIKit

@objc(ThemeManager)
class ThemeManager: NSObject {

  @objc func setTheme(_ theme: String) -> Void {
    if(!theme.isEmpty) {
      DispatchQueue.main.sync {
        guard let appDelegate = UIApplication.shared.delegate as? AppDelegate else { return }
        appDelegate.window.overrideUserInterfaceStyle = theme == "light" ? .light : .dark
      }
    }
 }
}
