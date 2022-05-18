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
                
                let useMobileDataSetting = Defaults[.useMobileDataSetting] ?? true
                let shouldCheckBeforeNetworkRequest = ReachibilityManager.shouldCheckBeforeNetworkRequest
                if useMobileDataSetting == false && shouldCheckBeforeNetworkRequest == true {
                    center.post(descriptor: UIApplication.userMobileDataAlertNotification, value: SuccessNotificationPayload(sucess: "Success"))
                    return
                }
                
                let destination: DownloadRequest.DownloadFileDestination = { _, _ in
                    let baseURL = try! FileManager.default.url(for: .cachesDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
                    let editionsURL = baseURL.appendingPathComponent("Editions")
                    let fileURL = editionsURL.appendingPathComponent("\(editionNumber).pdf")
                    return (fileURL, [.removePreviousFile, .createIntermediateDirectories])
                }
                
                cell.setDownloadingStatus(hideProgerssView: false)
                
                if PDFFileManager.currentEditionsInDownloadProgress == nil {
                    PDFFileManager.currentEditionsInDownloadProgress = [editionNumber]
                } else {
                    PDFFileManager.currentEditionsInDownloadProgress!.append(editionNumber)
                }
                
                
                Alamofire.download(editionURL, to: destination).downloadProgress(closure: { (prog) in
                }).response { response in
                    if response.error == nil, let _ = response.destinationURL?.path {
                        center.post(descriptor: PDFFileManager.downloadCompleteNotification, value: PDFEditionNotificationInfoPayload(pdfEditon: self, localPDFFilePath: PDFFileManager.getLocalPDFFileURLForIssueNumber(self.issueNumber)!))
                        PDFFileManager.currentEditionsInDownloadProgress = PDFFileManager.currentEditionsInDownloadProgress?.filter() { $0 != editionNumber}
                        cell.setDownloadComplete()
                    }
                }
            }
        })
        
        cell.actionButton.addTarget(cell.actionButtonTargetAction, action: #selector(TargetAction.action(sender:)), for: .touchUpInside)
    }
    
    func configurePDFEditionLargeCollectionViewCell( _ cell: PDFEditionLargeCollectionViewCell) {
        cell.editionFrontPageImageView.aaa_setImage(self.thumbnailLarge)
        
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
                
                let useMobileDataSetting = Defaults[.useMobileDataSetting] ?? true
                let shouldCheckBeforeNetworkRequest = ReachibilityManager.shouldCheckBeforeNetworkRequest
                if useMobileDataSetting == false && shouldCheckBeforeNetworkRequest == true {
                    center.post(descriptor: UIApplication.userMobileDataAlertNotification, value: SuccessNotificationPayload(sucess: "Success"))
                    return
                }
                
                let destination: DownloadRequest.DownloadFileDestination = { _, _ in
                    let baseURL = try! FileManager.default.url(for: .cachesDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
                    let editionsURL = baseURL.appendingPathComponent("Editions")
                    let fileURL = editionsURL.appendingPathComponent("\(editionNumber).pdf")
                    return (fileURL, [.removePreviousFile, .createIntermediateDirectories])
                }
                
                cell.setDownloadingStatus(hideProgerssView: false)
                
                if PDFFileManager.currentEditionsInDownloadProgress == nil {
                    PDFFileManager.currentEditionsInDownloadProgress = [editionNumber]
                } else {
                    PDFFileManager.currentEditionsInDownloadProgress!.append(editionNumber)
                }
                
                
                Alamofire.download(editionURL, to: destination).downloadProgress(closure: { (prog) in
                    cell.downloadProgressView.progress = Float(prog.fractionCompleted)
                }).response { response in
                    if response.error == nil, let _ = response.destinationURL?.path {
                        center.post(descriptor: PDFFileManager.downloadCompleteNotification, value: PDFEditionNotificationInfoPayload(pdfEditon: self, localPDFFilePath: PDFFileManager.getLocalPDFFileURLForIssueNumber(self.issueNumber)!))
                        PDFFileManager.currentEditionsInDownloadProgress = PDFFileManager.currentEditionsInDownloadProgress?.filter() { $0 != editionNumber}
                        cell.setDownloadComplete()
                    }
                }
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
                
                let useMobileDataSetting = Defaults[.useMobileDataSetting] ?? true
                let shouldCheckBeforeNetworkRequest = ReachibilityManager.shouldCheckBeforeNetworkRequest
                if useMobileDataSetting == false && shouldCheckBeforeNetworkRequest == true {
                    center.post(descriptor: UIApplication.userMobileDataAlertNotification, value: SuccessNotificationPayload(sucess: "Success"))
                    return
                }
                
                let destination: DownloadRequest.DownloadFileDestination = { _, _ in
                    let baseURL = try! FileManager.default.url(for: .cachesDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
                    let editionsURL = baseURL.appendingPathComponent("Editions")
                    let fileURL = editionsURL.appendingPathComponent("\(editionNumber).pdf")
                    return (fileURL, [.removePreviousFile, .createIntermediateDirectories])
                }
                
                cell.setDownloadingStatus(hideProgerssView: false)
                
                if PDFFileManager.currentEditionsInDownloadProgress == nil {
                    PDFFileManager.currentEditionsInDownloadProgress = [editionNumber]
                } else {
                    PDFFileManager.currentEditionsInDownloadProgress!.append(editionNumber)
                }
                
            
                Alamofire.download(editionURL, to: destination).downloadProgress(closure: { (prog) in
                    cell.downloadProgressView.progress = Float(prog.fractionCompleted)
                }).response { response in
                    if response.error == nil, let _ = response.destinationURL?.path {
                        center.post(descriptor: PDFFileManager.downloadCompleteNotification, value: PDFEditionNotificationInfoPayload(pdfEditon: self, localPDFFilePath: PDFFileManager.getLocalPDFFileURLForIssueNumber(self.issueNumber)!))
                        PDFFileManager.currentEditionsInDownloadProgress = PDFFileManager.currentEditionsInDownloadProgress?.filter() { $0 != editionNumber}
                        cell.setDownloadComplete()
                    }
                }
            }
        })
        
        cell.actionButton.addTarget(cell.actionButtonTargetAction, action: #selector(TargetAction.action(sender:)), for: .touchUpInside)
    }
}


