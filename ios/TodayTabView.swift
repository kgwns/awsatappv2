//
//  PDFTabView.swift
//  Awsatapp
//
//  Created by Gowri Shankaran on 17/05/22.
//

import UIKit
import SwiftyJSON

class TodayTabView: UIView, LoadingView {
  
    var showPDFEdition: (PDFEdition, URL) -> () = { _,_  in }

    private var readPDFEditionNotificationToken: Token?
    private var downloadCompleteNotificationToken: Token?
    private var showMobileDataAlertNotification: Token?
    private var reuseIdentifiers: Set<String> = []
    private var sectionInset: UIEdgeInsets {
        if UIDevice.current.userInterfaceIdiom == .pad {
            return UIEdgeInsets.init(top: 20, left: 20, bottom: 20, right: 20)
        }
        return UIEdgeInsets.init(top: 10, left: 0, bottom: 10, right: 0)
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
        removeObservers()
    }
      
    // MARK: - Private
  
    private func setUp() {
        setUpCollectionView()
        addObservers()
        load(EndPoints.pdfArchive.endPoint)
    }
  
    private func setUpCollectionView() {
        let flowLayout = UICollectionViewFlowLayout()
        flowLayout.minimumLineSpacing = MINIMUM_LINE_SPACING
        flowLayout.minimumInteritemSpacing = MINIMUM_INTERIM_SPACING
        flowLayout.scrollDirection = .vertical
        flowLayout.sectionInset = sectionInset

        collectionView = UICollectionView(frame: frame, collectionViewLayout: flowLayout)
        collectionView.dataSource = self
        collectionView.delegate = self
        collectionView.showsHorizontalScrollIndicator = false
        collectionView.showsVerticalScrollIndicator = true
        addSubview(collectionView)
    }

    private func addObservers() {
        readPDFEditionNotificationToken = NotificationCenter.default.addObserver(descriptor: PDFEdition.readPDFEditionNotification) { (pdfEditionNotificationInfoPayload) in
            self.showPDFEdition(pdfEditionNotificationInfoPayload.pdfEditon, pdfEditionNotificationInfoPayload.localPDFFilePath)
        }
        
        downloadCompleteNotificationToken = NotificationCenter.default.addObserver(descriptor: PDFFileManager.downloadCompleteNotification) { (pdfEditionNotificationInfoPayload) in
            self.collectionView?.reloadData()
            self.showPDFEdition(pdfEditionNotificationInfoPayload.pdfEditon, pdfEditionNotificationInfoPayload.localPDFFilePath)
        }
        
        showMobileDataAlertNotification =  NotificationCenter.default.addObserver(descriptor: UIApplication.userMobileDataAlertNotification) { _ in
            self.showMobileDataAlert()
        }
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
          datasource = DataSourceFactory.dataSourceForLargePDFCollage(pdfEditions)
        }
    }

    func didLoad(fromCache: Bool) {
        if fromCache == false {
        }
    }
}

// MARK: UICollectionViewDataSource
extension TodayTabView: UICollectionViewDataSource {
    func numberOfSections(in collectionView: UICollectionView) -> Int {
        return 1
    }

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
}

// MARK: UICollectionViewDelegate
extension TodayTabView: UICollectionViewDelegate, UICollectionViewDelegateFlowLayout {
  
    var aspectRatio: CGFloat {
      get {
        UIDevice.current.userInterfaceIdiom == .pad ? CGFloat(768.0/916.0) : CGFloat(414.0/590.0)
      }
    }

    var itemWidth: CGFloat {
        get {
            let screenWidth = UIScreen.main.bounds.width
            return screenWidth - collectionView!.contentInset.left - collectionView!.contentInset.right - sectionInset.left - sectionInset.right
        }
    }

    var itemHeight: CGFloat {
        get {
            return itemWidth / aspectRatio
        }
    }

    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
//      let item = datasource[indexPath.row]
//      didSelect(item)
    }
  
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
      return CGSize(width: itemWidth, height: itemHeight)
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        return sectionInset
    }
}
