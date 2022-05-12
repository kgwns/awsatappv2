//
//  Extensions.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import UIKit
import SwiftyUserDefaults

extension UIViewController {
  //Need_to_uncomment
//    func add(contentViewController: UIViewController, toContainerView: UIView) {
//        addChild(contentViewController)
//        toContainerView.addSubview(contentViewController.view)
//        contentViewController.view.translatesAutoresizingMaskIntoConstraints = false
//        contentViewController.view.constrainEdges(toMarginOf: toContainerView)
//        contentViewController.didMove(toParent: self)
//    }
    
    func remove(contentViewController: UIViewController) {
        contentViewController.willMove(toParent: nil)
        contentViewController.view.removeFromSuperview()
        contentViewController.removeFromParent()
    }
    
    func setupBackButton() {
        let customBackButton = UIBarButtonItem(title: "", style: .plain, target: nil, action: nil)
        navigationItem.backBarButtonItem = customBackButton
    }
}

