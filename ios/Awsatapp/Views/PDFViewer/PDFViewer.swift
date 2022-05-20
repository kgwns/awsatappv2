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

class PDFViewer: UIView {
      
    // MARK: - Properties
    
    private lazy var wKWebView: WKWebView = {
        return WKWebView(frame: .zero)
    }()
    
    @objc var selectedPDF: [String: String]? {
        didSet {
            setUp()
        }
    }
    
    // MARK: - View Life Cycle
    override init(frame: CGRect) {
        super.init(frame: UIScreen.main.bounds)
    }
      
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    deinit {
        print("<- PDFEditionViewer DeInit ->")
    }
  
    
    // MARK: - Private
    
    private func setUp() {
        guard let pdfFilePath = selectedPDF?["localPDFFilePath"], let pathUrl = URL(string: pdfFilePath) else { return }
        wKWebView.translatesAutoresizingMaskIntoConstraints = false
        addSubview(wKWebView)
        wKWebView.loadFileURL(pathUrl, allowingReadAccessTo: pathUrl)
        wKWebView.constrainEdges(toMarginOf: self)
    }
}
