//
//  LoadingViewController.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import UIKit
//import SVProgressHUD
import SwiftyJSON

protocol LoadingView {
    associatedtype EndPointResultType
    func configure(value: EndPointResultType)
    func didLoad(fromCache: Bool)
}

extension LoadingView where Self: UIView {
    func load(_ endpoint: Endpoint<EndPointResultType>, showActivityIndicator: Bool = true) {
        if showActivityIndicator == true {
//            SVProgressHUD.show()
            UIApplication.shared.isNetworkActivityIndicatorVisible = true
        }
        
        API.request(endpoint) { result,isFromCache  in
            if showActivityIndicator == true {
//                SVProgressHUD.dismiss()
            }
            
            if isFromCache == false && showActivityIndicator == true {
                UIApplication.shared.isNetworkActivityIndicatorVisible = false
            }
            
            guard let value = result.value else { return }
            
          //TODO: Need_to_uncomment
//            let jsonErrorData = ErrorJSONData(json: value as! JSON)
//            if let error = jsonErrorData.error, let code = jsonErrorData.code {
//                if error == true && code == 403 {
//                    AuthenticationManager.logout()
//                }
//            }
            self.configure(value: value)
            self.didLoad(fromCache: isFromCache)
        }
    }
    
    func didLoad(fromCache: Bool) {
        // Default implementation to use didLoad as an optional protocol in Swift
    }
}

extension LoadingView where Self: UIViewController {
    func load(_ endpoint: Endpoint<EndPointResultType>, showActivityIndicator: Bool = true) {
        if showActivityIndicator == true {
//            SVProgressHUD.show()
            UIApplication.shared.isNetworkActivityIndicatorVisible = true
        }
        
        API.request(endpoint) { result,isFromCache  in
            if showActivityIndicator == true {
//                SVProgressHUD.dismiss()
            }
            
            if isFromCache == false && showActivityIndicator == true {
                UIApplication.shared.isNetworkActivityIndicatorVisible = false
            }
            
            guard let value = result.value else { return }
            
          //TODO: Need_to_uncomment
//            let jsonErrorData = ErrorJSONData(json: value as! JSON)
//            if let error = jsonErrorData.error, let code = jsonErrorData.code {
//                if error == true && code == 403 {
//                    AuthenticationManager.logout()
//                }
//            }
            self.configure(value: value)
            self.didLoad(fromCache: isFromCache)
        }
    }
    
    func didLoad(fromCache: Bool) {
        // Default implementation to use didLoad as an optional protocol in Swift
    }
}
