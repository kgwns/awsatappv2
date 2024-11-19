//
//  PDFEdition+ViewModel.swift
//  Asharqalawsat
//
//  Created by Mustafa Baalbaki on 8/1/17.
//  Copyright © 2017 Mustafa Baalbaki. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyUserDefaults

extension PDFEdition {
    
    func configurePDFEditionTableViewCell(_ cell: PDFEditionTableViewCell) {
        
        cell.editionDateLabel.setFullDateLabel(self.issueDate)
        
        if self.issueDate == nil {
            cell.editionDateLabel.text = nil
        }
        
        if let issueNumber = self.issueNumber {
            cell.issueNumberLabel.text = Strings.edition + " " + issueNumber
        } else {
            cell.issueNumberLabel.text = nil
        }
        
        
        DispatchQueue.main.async {
            switch PDFFileManager.editionStatusForIssueNumber(self.issueNumber) {
            case .downloaded:
                cell.setReadButtonStatus()
            case .downloading:
                cell.setDownloadingStatus(hideProgerssView: true)
            case .notDownloaded:
                cell.setDownlaodButtonStatus()
            }
        }
        
        cell.actionButtonTargetAction = TargetAction(callback: { 
            
            guard let editionURL = self.resource else { return }
            guard let editionNumber = self.issueNumber else { return }
            
            if PDFFileManager.isPDFFileExisitForIssueNumber(self.issueNumber) {
                center.post(descriptor: PDFEdition.readPDFEditionNotification, value: PDFEditionNotificationInfoPayload(pdfEditon: self, localPDFFilePath: PDFFileManager.getLocalPDFFileURLForIssueNumber(self.issueNumber)!))
            } else {
              let destination: DownloadRequest.Destination = { _, _ in
                    let baseURL = try! FileManager.default.url(for: .cachesDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
                    let editionsURL = baseURL.appendingPathComponent("Editions")
                    let fileURL = editionsURL.appendingPathComponent("\(editionNumber).pdf")
                    return (fileURL, [.removePreviousFile, .createIntermediateDirectories])
                }
                
                cell.setDownloadingStatus(hideProgerssView: false)
                                
              let downloadTask = AF.download(editionURL, to: destination).downloadProgress(closure: { (prog) in
                }).response { response in
                  if response.error == nil, let _ = response.fileURL?.path {
                        center.post(descriptor: PDFFileManager.downloadCompleteNotification, value: PDFEditionNotificationInfoPayload(pdfEditon: self, localPDFFilePath: PDFFileManager.getLocalPDFFileURLForIssueNumber(self.issueNumber)!))
                        cell.setDownloadComplete()
                    }
                    PDFFileManager.currentEditionsInDownloadProgress[editionNumber] = nil
              }
              PDFFileManager.currentEditionsInDownloadProgress[editionNumber] = downloadTask
            }
        })
        
        cell.actionButton.addTarget(cell.actionButtonTargetAction, action: #selector(TargetAction.action(sender:)), for: .touchUpInside)
    }
    
    func configurePDFEditionLargeCollectionViewCell( _ cell: PDFEditionLargeCollectionViewCell) {
        cell.editionFrontPageImageView.aaa_setImage(self.thumbnailLarge)
        cell.editionDateLabel.setFullDateLabel(self.issueDate)
        
//        if self.issueDate == nil {
//            cell.editionDateLabel.text = nil
//        }
        
//        if let issueNumber = self.issueNumber {
//            cell.issueNumberLabel.text = Strings.edition + " " + issueNumber
//        } else {
//            cell.issueNumberLabel.text = nil
//        }
        
        
        DispatchQueue.main.async {
            switch PDFFileManager.editionStatusForIssueNumber(self.issueNumber) {
            case .downloaded:
                cell.setReadButtonStatus()
            case .downloading:
                cell.setDownloadingStatus(hideProgerssView: false)
                let downloadTask: Alamofire.DownloadRequest? = PDFFileManager.currentEditionsInDownloadProgress[self.issueNumber!]
                downloadTask?.downloadProgress(closure: { (prog) in
                      cell.downloadProgressView.progress = Float(prog.fractionCompleted)
                })
            case .notDownloaded:
                cell.setDownlaodButtonStatus()
            }
        }
        
        cell.actionButtonTargetAction = TargetAction(callback: { 
            
            guard let editionURL = self.resource else { return }
            guard let editionNumber = self.issueNumber else { return }
            
            if PDFFileManager.isPDFFileExisitForIssueNumber(self.issueNumber) {
                center.post(descriptor: PDFEdition.readPDFEditionNotification, value: PDFEditionNotificationInfoPayload(pdfEditon: self, localPDFFilePath: PDFFileManager.getLocalPDFFileURLForIssueNumber(self.issueNumber)!))
            } else {
              let destination: DownloadRequest.Destination = { _, _ in
                    let baseURL = try! FileManager.default.url(for: .cachesDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
                    let editionsURL = baseURL.appendingPathComponent("Editions")
                    let fileURL = editionsURL.appendingPathComponent("\(editionNumber).pdf")
                    return (fileURL, [.removePreviousFile, .createIntermediateDirectories])
                }
                
                cell.setDownloadingStatus(hideProgerssView: false)
                
                let downloadTask = AF.download(editionURL, to: destination).downloadProgress(closure: { (prog) in
                    cell.downloadProgressView.progress = Float(prog.fractionCompleted)
                }).response { response in
                  if response.error == nil, let _ = response.fileURL?.path {
                        center.post(descriptor: PDFFileManager.downloadCompleteNotification, value: PDFEditionNotificationInfoPayload(pdfEditon: self, localPDFFilePath: PDFFileManager.getLocalPDFFileURLForIssueNumber(self.issueNumber)!))
                        cell.setDownloadComplete()
                    }
                    PDFFileManager.currentEditionsInDownloadProgress[editionNumber] = nil
                }
                PDFFileManager.currentEditionsInDownloadProgress[editionNumber] = downloadTask
            }
        })
        
        cell.actionButton.addTarget(cell.actionButtonTargetAction, action: #selector(TargetAction.action(sender:)), for: .touchUpInside)
    }
    
    func configurePDFEditionCollectionViewCell(_ cell: PDFEditionCollectionViewCell) {
        cell.editionFrontPageImageView.aaa_setImage(self.thumbnail)
        
        cell.editionDateLabel.setFullDateLabel(self.issueDate)
        
        if self.issueDate == nil {
            cell.editionDateLabel.text = nil
        }
        
        if let issueNumber = self.issueNumber {
            cell.issueNumberLabel.text = Strings.edition + " " + issueNumber
        } else {
            cell.issueNumberLabel.text = nil
        }
        
        
        DispatchQueue.main.async {
            switch PDFFileManager.editionStatusForIssueNumber(self.issueNumber) {
            case .downloaded:
                cell.setReadButtonStatus()
            case .downloading:
                cell.setDownloadingStatus(hideProgerssView: false)
                let downloadTask: Alamofire.DownloadRequest? = PDFFileManager.currentEditionsInDownloadProgress[self.issueNumber!]
                downloadTask?.downloadProgress(closure: { (prog) in
                      cell.downloadProgressView.progress = Float(prog.fractionCompleted)
                })
            case .notDownloaded:
                cell.setDownlaodButtonStatus()
            }
        }
        
        cell.actionButtonTargetAction = TargetAction(callback: { 
            
            guard let editionURL = self.resource else { return }
            guard let editionNumber = self.issueNumber else { return }
            
            if PDFFileManager.isPDFFileExisitForIssueNumber(self.issueNumber) {
                center.post(descriptor: PDFEdition.readPDFEditionNotification, value: PDFEditionNotificationInfoPayload(pdfEditon: self, localPDFFilePath: PDFFileManager.getLocalPDFFileURLForIssueNumber(self.issueNumber)!))
            } else {
              let destination: DownloadRequest.Destination = { _, _ in
                    let baseURL = try! FileManager.default.url(for: .cachesDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
                    let editionsURL = baseURL.appendingPathComponent("Editions")
                    let fileURL = editionsURL.appendingPathComponent("\(editionNumber).pdf")
                    return (fileURL, [.removePreviousFile, .createIntermediateDirectories])
                }
                
                cell.setDownloadingStatus(hideProgerssView: false)
                
                let downloadTask = AF.download(editionURL, to: destination).downloadProgress(closure: { (prog) in
                    cell.downloadProgressView.progress = Float(prog.fractionCompleted)
                }).response { response in
                  if response.error == nil, let _ = response.fileURL?.path {
                        center.post(descriptor: PDFFileManager.downloadCompleteNotification, value: PDFEditionNotificationInfoPayload(pdfEditon: self, localPDFFilePath: PDFFileManager.getLocalPDFFileURLForIssueNumber(self.issueNumber)!))
                        cell.setDownloadComplete()
                    }
                    PDFFileManager.currentEditionsInDownloadProgress[editionNumber] = nil
                }
                PDFFileManager.currentEditionsInDownloadProgress[editionNumber] = downloadTask
            }
        })
        
        cell.actionButton.addTarget(cell.actionButtonTargetAction, action: #selector(TargetAction.action(sender:)), for: .touchUpInside)
    }
}
