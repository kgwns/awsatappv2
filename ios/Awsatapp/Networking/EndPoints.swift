//
//  EndPoints.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import Foundation
import SwiftyJSON
import CoreLocation

enum EndPoints {
    case systemToken
    case pushNotificationsToken(JSON)
    case newsArchive(String)
    case pdfArchive
}

extension EndPoints {
    var endPoint: Endpoint<JSON> {
        switch self {
        case .systemToken:
            return Endpoint(url: URLFactory.getURL(path: "custom/session/token")!)
            {JSON($0)}
        case .pushNotificationsToken(let postJSON):
            return try! Endpoint(url: URLFactory.getURL(path: "mapi/aaa/device_token.json")!, method: .post(payload: postJSON.dictionaryObject))
            {JSON($0)}
        case .newsArchive(let timestamp):
            let params = ["timestamp" : timestamp]
            return Endpoint(url: URLFactory.getURL(path: "mapi/archive.json", parameters: params)!)
            {JSON($0)}
        case .pdfArchive:
            return Endpoint(url: URL(string:"http://api.aawsat.com/api/pdf")!)
            {JSON($0)}
        }
    }
}
