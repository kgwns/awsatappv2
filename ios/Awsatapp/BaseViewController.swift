//
//  BaseViewController.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import UIKit

class BaseViewController: UIViewController {
    
    // MARK - Overrides
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupBackButton()
    }
    
    override var preferredStatusBarStyle: UIStatusBarStyle {
        return .lightContent
    }
}
