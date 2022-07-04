//
//  PDFEditionHeaderCollectionViewCell.swift
//  Awsatapp
//
//  Created by Gowri Shankaran on 19/05/22.
//

import UIKit

final class PDFEditionHeaderCollectionViewCell: UICollectionReusableView {
  
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var archiveButton: UIButton!
    private var archiveButtonAction: (() -> Void)?
    static let reuseIdentifier: String = "PDFEditionHeaderCell"
  
    override func awakeFromNib() {
        super.awakeFromNib()
        setUp()
    }
      
    private func setUp() {
        archiveButton.addRoundedCorners()
        archiveButton.semanticContentAttribute = .forceRightToLeft
        archiveButton.titleLabel?.font = UIFont.boldAwsatFont(size: 13)
        archiveButton.setTitle(Strings.newsArchiveMenu, for: .normal)
      titleLabel.text = Strings.paperNewsPaper
    }
  
    func setArchiveButtonAction(_ action: @escaping () -> (Void)) {
        archiveButtonAction = action
    }
  
    @IBAction private func onArchiveButtonClick(_ sender: UIButton) {
        archiveButtonAction?()
    }
}
