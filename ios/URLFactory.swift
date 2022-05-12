//
//  URLFactory.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import Foundation
import SwiftyUserDefaults

let baseURL = URLsConfig.shared.baseURL

struct URLFactory {
    static func getURL(path: String, parameters: [String: String] = [:]) -> URL? {
        return baseURL?.appendingPathComponent(path).appendingQueryParameters(parameters)
    }
}

extension URL {
    func appendingQueryParameters(_ parameters: [String: Any]) -> URL? {
        var urlComponents = URLComponents(url: self, resolvingAgainstBaseURL: true)
        urlComponents?.queryItems = []
        for (key, value) in parameters {
            urlComponents?.queryItems?.append(URLQueryItem(name:key, value: value as? String))
        }
        urlComponents?.queryItems?.append(URLQueryItem(name:"lang", value: "ar-AE"))
        return urlComponents?.url
    }
}


