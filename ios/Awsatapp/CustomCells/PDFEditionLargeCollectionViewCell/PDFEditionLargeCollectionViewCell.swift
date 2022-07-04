//
//  PDFEditionLargeCollectionViewCell.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import UIKit
import SwiftyUserDefaults


class PDFEditionLargeCollectionViewCell: UICollectionViewCell {
    
    @IBOutlet weak var editionFrontPageImageView: UIImageView!
    @IBOutlet weak var actionButton: UIButton!
    @IBOutlet weak var editionDateLabel: UILabel!
    @IBOutlet weak var downloadProgressView: UIProgressView!
    
    var actionButtonTargetAction: TargetAction?
    
    override func prepareForReuse() {
        super.prepareForReuse()
        self.downloadProgressView.isHidden = true
        self.editionFrontPageImageView.alpha = 1.0
        self.actionButton.setTitle(nil, for: .normal)
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
        applyArabicStyleIfNeeded()
        customizeUI()
    }
    
    private func customizeUI() {
        actionButton.addRoundedCorners()
    }
    
    private func applyArabicStyleIfNeeded() {
          actionButton.titleLabel?.font = UIFont.boldAwsatFont(size: 16*2*0.7)
    }
    
    public func setDownlaodButtonStatus() {
        self.actionButton.setTitle(Strings.download, for: .normal)
        self.actionButton.isEnabled = true
    }
    
    public func setReadButtonStatus() {
        self.actionButton.setTitle(Strings.readEdition, for: .normal)
        self.actionButton.isEnabled = true
    }
    
    public func setDownloadingStatus(hideProgerssView: Bool) {
        self.downloadProgressView.isHidden = hideProgerssView
        self.editionFrontPageImageView.alpha = 0.6
        self.actionButton.setTitle(Strings.downloading, for: .normal)
        self.actionButton.isEnabled = false
    }
    
    public func setDownloadComplete() {
        self.downloadProgressView.isHidden = true
        self.editionFrontPageImageView.alpha = 1.0
        setReadButtonStatus()
    }
}
