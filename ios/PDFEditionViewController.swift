//
//  PDFEditionViewController.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 16/05/22.
//

import UIKit
import WebKit
import SwiftyUserDefaults
import DateToolsSwift

class PDFEditionViewController: UIViewController {

    // MARK: - Outlets
    
    @IBOutlet weak var containerView: UIView!
    
    // MARK: - Properties
    
    private lazy var wKWebView: WKWebView = {
        return WKWebView(frame: .zero)
    }()
    
    var pdfFilePath: URL?
    var pdfEdition: PDFEdition?
    
    // MARK: - View Life Cycle
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupViewController()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
    }
    
    // MARK: - Private
    
    private func setupViewController() {
        let currentLocale = Locale(identifier: "ar_AE")
        let timestamp = self.pdfEdition?.issueDate
        if let timestamp = timestamp, let timeInterval = TimeInterval(timestamp) {
            if let issueNumber = self.pdfEdition?.issueNumber {
                self.title = Date(timeIntervalSince1970: timeInterval).format(with: .full, locale: currentLocale) + " " + Strings.edition + " " + issueNumber
            } else {
                self.title =  Date(timeIntervalSince1970: timeInterval).format(with: .full, locale: currentLocale)
            }
        } else {
            if let issueNumber = self.pdfEdition?.issueNumber {
                self.title = Strings.edition + " " + issueNumber
            } else {
                self.title = nil
            }
        }
        
        guard let pdfFilePath = self.pdfFilePath else { return }
        wKWebView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(wKWebView)
        wKWebView.loadFileURL(pdfFilePath, allowingReadAccessTo: pdfFilePath)
        wKWebView.constrainEdges(toMarginOf: view)
    }
}
