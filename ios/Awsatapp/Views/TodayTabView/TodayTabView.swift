//
//  PDFTabView.swift
//  Awsatapp
//
//  Created by Gowri Shankaran on 17/05/22.
//

import UIKit
import SwiftyJSON
import GoogleMobileAds

class TodayTabView: UIView, LoadingView {
  
    @objc var onItemClick: RCTBubblingEventBlock?
    @objc var onDownloadComplete: RCTBubblingEventBlock?
    @objc var onArchiveButtonClick: RCTBubblingEventBlock?
    @objc var isActive: Bool = false {
        didSet {
            if isActive {
                collectionView.reloadData()
            }
        }
    }
  
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
  private var bannerView: GAMBannerView!
  private var bannerView2: GAMBannerView!

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
      removeObservers()
    }
      
    // MARK: - Private
  
    private func setUp() {
      let viewWidth = frame.inset(by: safeAreaInsets).width
      let adaptiveSize = GADCurrentOrientationAnchoredAdaptiveBannerAdSizeWithWidth(viewWidth)
      bannerView = GAMBannerView(adSize: adaptiveSize)
      bannerView2 = GAMBannerView(adSize: adaptiveSize)


        setUpBannerView()
        setUpBannerView2()
        setUpCollectionView()
        setUpLoadingIndicator()
        addObservers()
        load(EndPoints.pdfArchive.endPoint)
    }
  
    @objc private func handleDeviceOrientationChange() {
      self.setNeedsLayout()
      self.layoutIfNeeded()
    }
  
    override func layoutSubviews() {
        super.layoutSubviews()
        collectionView.collectionViewLayout.invalidateLayout()
        collectionView.layoutIfNeeded()
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
        flowLayout.estimatedItemSize = .zero

        collectionView = UICollectionView(frame: .zero, collectionViewLayout: flowLayout)
        collectionView.dataSource = self
        collectionView.delegate = self
        collectionView.showsHorizontalScrollIndicator = false
        collectionView.showsVerticalScrollIndicator = true
        collectionView.backgroundColor = UIColor(named: "backgroundColor")
        addSubview(collectionView)
      
        collectionView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
          collectionView.topAnchor.constraint(equalTo: bannerView.bottomAnchor),
            collectionView.bottomAnchor.constraint(equalTo: bannerView2.topAnchor),
            collectionView.leftAnchor.constraint(equalTo: self.leftAnchor),
            collectionView.rightAnchor.constraint(equalTo: self.rightAnchor)
        ])
    }
  
    private func setUpBannerView() {
      bannerView.translatesAutoresizingMaskIntoConstraints = false
      addSubview(bannerView)
      addConstraints(
        [NSLayoutConstraint(item: bannerView!,
                            attribute: .top,
                            relatedBy: .equal,
                            toItem: safeAreaLayoutGuide,
                            attribute: .top,
                            multiplier: 1,
                            constant: 0),
         NSLayoutConstraint(item: bannerView!,
                            attribute: .centerX,
                            relatedBy: .equal,
                            toItem: self,
                            attribute: .centerX,
                            multiplier: 1,
                            constant: 0)
        ])
      
      bannerView.adUnitID = "/5910/AsharqAlawsat_APP/ADR/Newspaper"

      bannerView.load(GAMRequest())
    
   }
  
  private func setUpBannerView2() {
     bannerView2.translatesAutoresizingMaskIntoConstraints = false
     addSubview(bannerView2)
     addConstraints(
       [NSLayoutConstraint(item: bannerView2!,
                           attribute: .bottom,
                           relatedBy: .equal,
                           toItem: safeAreaLayoutGuide,
                           attribute: .bottom,
                           multiplier: 1,
                           constant: 0),
        NSLayoutConstraint(item: bannerView2!,
                           attribute: .centerX,
                           relatedBy: .equal,
                           toItem: self,
                           attribute: .centerX,
                           multiplier: 1,
                           constant: 0)])
     
     bannerView2.adUnitID = "/5910/AsharqAlawsat_APP/ADR/Newspaper"

     bannerView2.load(GAMRequest())
   
  }

    private func addObservers() {
        readPDFEditionNotificationToken = NotificationCenter.default.addObserver(descriptor: PDFEdition.readPDFEditionNotification) { [weak self] (pdfEditionNotificationInfoPayload) in
            guard let self = self else { return }
            self.showPDFEdition(pdfEditionNotificationInfoPayload.pdfEditon, pdfEditionNotificationInfoPayload.localPDFFilePath)
        }
        downloadCompleteNotificationToken = NotificationCenter.default.addObserver(descriptor: PDFFileManager.downloadCompleteNotification) { [weak self] (pdfEditionNotificationInfoPayload) in
            
            guard let self = self else { return }

            self.collectionView?.reloadData()
            
            guard self.datasource.first != nil && self.isActive else {
                return
            }
            switch self.datasource.first {
                case .largePDFEdition(let pdfEdition):
                    if pdfEdition.issueNumber == pdfEditionNotificationInfoPayload.pdfEditon.issueNumber {
                      self.onDownloadComplete?(["DownloadedPdf": ["issueNumber": pdfEdition.issueNumber!, "issueDate": pdfEdition.issueDate!]])
                      self.showPDFEdition(pdfEditionNotificationInfoPayload.pdfEditon, pdfEditionNotificationInfoPayload.localPDFFilePath)
                    }
                default:
                    break
            }
        }

        showMobileDataAlertNotification =  NotificationCenter.default.addObserver(descriptor: UIApplication.userMobileDataAlertNotification) { _ in
            self.showMobileDataAlert()
        }
      
      NotificationCenter.default.addObserver(self, selector: #selector(handleDeviceOrientationChange), name: UIDevice.orientationDidChangeNotification, object: nil)
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
        NotificationCenter.default.removeObserver(self, name: UIDevice.orientationDidChangeNotification, object: nil)
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
            let width = collectionView.bounds.width
            return width - collectionView!.contentInset.left - collectionView!.contentInset.right - sectionInset.left - sectionInset.right
        }
    }
    private var itemHeight: CGFloat {
        get {
          return collectionView.bounds.height * 0.825
        }
    }
  
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
      return CGSize(width: itemWidth, height: itemHeight)
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        return sectionInset
    }

}
