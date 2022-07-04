//
//  PDFEditionCell.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import UIKit
import SwiftyUserDefaults

class PDFEditionTableViewCell: UITableViewCell {
    @IBOutlet weak var actionButton: UIButton!
    @IBOutlet weak var editionDateLabel: UILabel!
    @IBOutlet weak var issueNumberLabel: UILabel!
    
    var actionButtonTargetAction: TargetAction?
    
    
    override func prepareForReuse() {
        super.prepareForReuse()
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
        editionDateLabel.font = UIFont.boldAwsatFont(size: 15)
        issueNumberLabel.font = UIFont.boldAwsatFont(size: 15)
        actionButton.titleLabel?.font = UIFont.boldAwsatFont(size: 16)
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
        self.actionButton.setTitle(Strings.downloading, for: .normal)
        self.actionButton.isEnabled = false
    }
    
    public func setDownloadComplete() {
        setReadButtonStatus()
    }
}
