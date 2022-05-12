//
//  TargetAction.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import Foundation

final class TargetAction: NSObject {
    let callback: () -> ()
    init(callback: @escaping () -> ()) {
        self.callback = callback
    }
    
    @objc func action(sender: Any) {
        self.callback()
    }
}
