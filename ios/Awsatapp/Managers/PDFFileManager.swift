//
//  PDFManager.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import Foundation
import SwiftyUserDefaults
import Alamofire

enum EditionStatus {
    case notDownloaded
    case downloading
    case downloaded
}

class PDFFileManager {
    
    static var currentEditionsInDownloadProgress: [String: Alamofire.DownloadRequest] = [:]
  
    static func editionStatusForIssueNumber(_ issueNumber: String?) -> EditionStatus {
        guard let issueNumber = issueNumber else { return .notDownloaded }
        
        if currentEditionsInDownloadProgress[issueNumber] != nil {
            return .downloading
        }
        else if self.isPDFFileExisitForIssueNumber(issueNumber) {
            return .downloaded
        } else {
            return .notDownloaded
        }
    }
    
    static func isPDFFileExisitForIssueNumber(_ issueNumber: String?) -> Bool {
        if let issueNumber = issueNumber {
            let baseURL = try! FileManager.default.url(for: .cachesDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
            let editionsURL = baseURL.appendingPathComponent("Editions")
            let fileURL = editionsURL.appendingPathComponent("\(issueNumber).pdf")
            if FileManager.default.fileExists(atPath: fileURL.path) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
    
    
    static func getLocalPDFFileURLForIssueNumber(_ issueNumber: String?) -> URL? {
        if let issueNumber = issueNumber {
            let baseURL = try! FileManager.default.url(for: .cachesDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
            let editionsURL = baseURL.appendingPathComponent("Editions")
            let fileURL = editionsURL.appendingPathComponent("\(issueNumber).pdf")
            if FileManager.default.fileExists(atPath: fileURL.path) {
                return fileURL
            } else {
                return nil
            }
        } else {
            return nil
        }
    }
}
