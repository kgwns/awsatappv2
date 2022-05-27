//
//  PDFTabView.swift
//  Awsatapp
//
//  Created by Gowri Shankaran on 17/05/22.
//

import UIKit
import SwiftyJSON

class TodayTabView: UIView, LoadingView {
  
    @objc var onItemClick: RCTBubblingEventBlock?
    @objc var onArchiveButtonClick: RCTBubblingEventBlock?
  
    private var activityIndicator = UIActivityIndicatorView()
    private var readPDFEditionNotificationToken: Token?
    private var downloadCompleteNotificationToken: Token?
    private var showMobileDataAlertNotification: Token?
    private var reuseIdentifiers: Set<String> = []
    private var sectionInset: UIEdgeInsets {
        if UIDevice.current.userInterfaceIdiom == .pad {
            return UIEdgeInsets.init(top: 5, left: 40, bottom: 20, right: 40)
        }
        return UIEdgeInsets.init(top: 0, left: 40, bottom: 10, right: 40)
    }

    private let MINIMUM_LINE_SPACING: CGFloat = 20
    private let MINIMUM_INTERIM_SPACING: CGFloat = 10

    // MARK: - Outlets
    private var collectionView: UICollectionView!

    // MARK: - Datasource
    var datasource: [CollectionViewCellType] = [] {
        didSet {
            layoutSubviews()
            collectionView.reloadData()
            collectionView.layoutIfNeeded()
        }
    }

    override init(frame: CGRect) {
      super.init(frame: UIScreen.main.bounds)
        setUp()
    }
      
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setUp()
    }
  
    deinit {
        //TODO: Need to remove observers
    }
      
    // MARK: - Private
  
    private func setUp() {
        setUpCollectionView()
        setUpLoadingIndicator()
        addObservers()
        load(EndPoints.pdfArchive.endPoint)
    }
  
    private func setUpLoadingIndicator() {
      activityIndicator.frame = CGRect(x: 0, y: 0, width: 100, height: 100)
      activityIndicator.startAnimating()
      activityIndicator.color = UIColor(named: "lightGreen")
      activityIndicator.transform = CGAffineTransform(scaleX: 1.8, y: 1.8)
      activityIndicator.center = CGPoint(x: self.bounds.midX, y: self.bounds.midY - 100)
      addSubview(activityIndicator)
      bringSubviewToFront(activityIndicator)
    }
  
    private func setUpCollectionView() {
        let flowLayout = UICollectionViewFlowLayout()
        flowLayout.minimumLineSpacing = MINIMUM_LINE_SPACING
        flowLayout.minimumInteritemSpacing = MINIMUM_INTERIM_SPACING
        flowLayout.scrollDirection = .vertical
        flowLayout.sectionInset = sectionInset
        flowLayout.headerReferenceSize = CGSize(width: self.frame.width, height: 40)

        collectionView = UICollectionView(frame: .zero, collectionViewLayout: flowLayout)
        collectionView.dataSource = self
        collectionView.delegate = self
        collectionView.showsHorizontalScrollIndicator = false
        collectionView.showsVerticalScrollIndicator = true
        collectionView.backgroundColor = UIColor(named: "backgroundColor")
        addSubview(collectionView)
      
        collectionView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            collectionView.topAnchor.constraint(equalTo: self.topAnchor),
            collectionView.bottomAnchor.constraint(equalTo: self.bottomAnchor),
            collectionView.leftAnchor.constraint(equalTo: self.leftAnchor),
            collectionView.rightAnchor.constraint(equalTo: self.rightAnchor)
        ])
    }

    private func addObservers() {
        readPDFEditionNotificationToken = NotificationCenter.default.addObserver(descriptor: PDFEdition.readPDFEditionNotification) { [weak self] (pdfEditionNotificationInfoPayload) in
            guard let self = self else { return }
            self.showPDFEdition(pdfEditionNotificationInfoPayload.pdfEditon, pdfEditionNotificationInfoPayload.localPDFFilePath)
        }
        
        downloadCompleteNotificationToken = NotificationCenter.default.addObserver(descriptor: PDFFileManager.downloadCompleteNotification) { (pdfEditionNotificationInfoPayload) in
            self.collectionView?.reloadData()
//            self.showPDFEdition(pdfEditionNotificationInfoPayload.pdfEditon, pdfEditionNotificationInfoPayload.localPDFFilePath)
        }
        
        showMobileDataAlertNotification =  NotificationCenter.default.addObserver(descriptor: UIApplication.userMobileDataAlertNotification) { _ in
            self.showMobileDataAlert()
        }
    }
  
    private func showPDFEdition(_ pdfEdition: PDFEdition, _ localFilePath: URL) {
        var consolidatedDictionary = pdfEdition.dictionaryRepresentation()
        consolidatedDictionary["localPDFFilePath"] = localFilePath.absoluteString
        var title: String = ""
        if let timestamp = pdfEdition.issueDate, let timeInterval = TimeInterval(timestamp) {
            if let issueNumber = pdfEdition.issueNumber {
                title = Date(timeIntervalSince1970: timeInterval).format(with: .full, locale: Locale(identifier:  "ar-AE")) + " " + Strings.edition + " " +  issueNumber
            } else {
                title =  Date(timeIntervalSince1970: timeInterval).format(with: .full, locale: Locale(identifier:  "ar-AE"))
            }
          }
        else {
            if let issueNumber = pdfEdition.issueNumber {
                title = Strings.edition + " " +  issueNumber
            } else {
                title = ""
            }
        }
        consolidatedDictionary["title"] = title
        onItemClick?(["SelectedPDF": consolidatedDictionary])
    }

    private func showMobileDataAlert() {
        let okayAlertAction = UIAlertAction(title: Strings.OK, style: .default, handler: nil)
        let alert = UIAlertController(title: nil, message: Strings.mobileDataOffAlert, preferredStyle: .alert)
        alert.addAction(okayAlertAction)
        self.window?.rootViewController?.present(alert, animated: true)
    }

    private func removeObservers() {
        readPDFEditionNotificationToken = nil
        downloadCompleteNotificationToken = nil
        showMobileDataAlertNotification = nil
    }
    
    // MARK: - Loading View Controller
    func configure(value: JSON) {
        let pdfArchiveData = PDFArchiveData(json: value)
        if let pdfEditions = pdfArchiveData.data, pdfEditions.count > 0 {
          datasource = DataSourceFactory.dataSourceForLargePDFCollage([pdfEditions.last!])
        }
        activityIndicator.stopAnimating()
    }

    func didLoad(fromCache: Bool) {
        if fromCache == false {
        }
    }
}

// MARK: UICollectionViewDataSource
extension TodayTabView: UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return datasource.count
    }

    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let descriptor = datasource[indexPath.row].collectionViewCellDescriptor
        if !reuseIdentifiers.contains(descriptor.reuseIdentifier) {
            let nib = UINib(nibName: descriptor.reuseIdentifier, bundle: nil)
            collectionView.register(nib, forCellWithReuseIdentifier: descriptor.reuseIdentifier)
            reuseIdentifiers.insert(descriptor.reuseIdentifier)
        }
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: descriptor.reuseIdentifier, for: indexPath)
        descriptor.configure(cell)
        return cell
    }
  
    func collectionView(_ collectionView: UICollectionView, viewForSupplementaryElementOfKind kind: String, at indexPath: IndexPath) -> UICollectionReusableView {
        if (kind == UICollectionView.elementKindSectionHeader) {
            if !reuseIdentifiers.contains(PDFEditionHeaderCollectionViewCell.reuseIdentifier) {
                let nib = UINib(nibName: "PDFEditionHeaderCollectionViewCell", bundle: nil)
                collectionView.register(nib, forSupplementaryViewOfKind: UICollectionView.elementKindSectionHeader, withReuseIdentifier: PDFEditionHeaderCollectionViewCell.reuseIdentifier)
                reuseIdentifiers.insert(PDFEditionHeaderCollectionViewCell.reuseIdentifier)
            }
            let header = collectionView.dequeueReusableSupplementaryView(ofKind: kind, withReuseIdentifier: "PDFEditionHeaderCell", for: indexPath as IndexPath) as! PDFEditionHeaderCollectionViewCell
            header.setArchiveButtonAction { [weak self] in
                guard let self = self else { return }
                self.onArchiveButtonClick?(nil)
            }
            return header
        }
        return UICollectionReusableView()
    }
}

// MARK: UICollectionViewDelegate
extension TodayTabView: UICollectionViewDelegate, UICollectionViewDelegateFlowLayout {
  
    private var aspectRatio: CGFloat {
      get {
        return 800.0 / 1231
      }
    }
    private var itemWidth: CGFloat {
        get {
            let screenWidth = UIScreen.main.bounds.width
            return screenWidth - collectionView!.contentInset.left - collectionView!.contentInset.right - sectionInset.left - sectionInset.right
        }
    }
    private var itemHeight: CGFloat {
        get {
          return UIScreen.main.bounds.height * 0.725
        }
    }
  
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
      return CGSize(width: itemWidth, height: itemHeight)
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        return sectionInset
    }
}
