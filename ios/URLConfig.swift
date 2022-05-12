//
//  URLConfig.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import Foundation

struct URLsConfig {
    
    static let shared = URLsConfig()
    
    fileprivate let urls: NSDictionary
    
    // MARK: - Init
    
    fileprivate init() {
        let path = Bundle.main.path(forResource: "URLs", ofType: "plist")
        self.urls = NSDictionary(contentsOfFile: path!)!
    }
    
    // MARK: - Private methods
    
    private func URLFromConfiguration(key: String) -> URL? {
        return URL(string: objectFromConfiguration(key: key)!)
    }
    
    private func objectFromConfiguration(key: String) -> String? {
        let object = urls[key] as? String
        return object
    }
    
    // MARK: - Public read only properties
    
    var baseURL: URL! {
        return URLFromConfiguration(key: "BaseURL")!
    }
}

