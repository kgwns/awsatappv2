//
//  PDFTabViewController.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import UIKit
import SwiftyJSON

class DownloadViewController: BaseViewController, LoadingViewController {
    
    var showPDFEdition: (PDFEdition, URL) -> () = { _,_  in }
    var readPDFEditionNotificationToken: Token?
    var downloadCompleteNotificationToke: Token?
    var showMobileDataAlertNotification: Token?
    
    // MARK: - Outlets

    @IBOutlet weak var containerView: UIView!
    
    // MARK: - Datasource
    
    var datasource: [CollectionViewCellType] = [] {
        didSet {
            collectionViewController?.items = datasource
            collectionViewController?.collectionView?.reloadData()
            collectionViewController?.collectionView?.layoutIfNeeded()
        }
    }
    
    var collectionViewController: GenericCollectionViewController<CollectionViewCellType>?

    // MARK: - View Life Cycle
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupViewController()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        load(EndPoints.pdfArchive.endPoint)
        addObservers()
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        removeObservers()
        super.viewWillDisappear(animated)
    }
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        collectionViewController?.collectionView?.collectionViewLayout.invalidateLayout()
    }
    
    // MARK: - Loading View Controller
    
    func configure(value: JSON) {
        let pdfArchiveData = PDFArchiveData(json: value)
        if let pdfEdtions = pdfArchiveData.data, pdfEdtions.count > 0 {
            datasource = DataSourceFactory.dataSourceForLargePDFCollage([pdfEdtions[pdfEdtions.count - 1]])
        }
    }
    
    func didLoad(fromCache: Bool) {
        if fromCache == false {
        }
    }
    
    // MARK: - Private
    
    private func addObservers() {
        readPDFEditionNotificationToken = center.addObserver(descriptor: PDFEdition.readPDFEditionNotification) { (pdfEditionNotificationInfoPayload) in
            self.showPDFEdition(pdfEditionNotificationInfoPayload.pdfEditon, pdfEditionNotificationInfoPayload.localPDFFilePath)
        }
        
        downloadCompleteNotificationToke = center.addObserver(descriptor: PDFFileManager.downlaodCompleteNotification) { (pdfEditionNotificationInfoPayload) in
            self.collectionViewController?.collectionView?.reloadData()
            self.showPDFEdition(pdfEditionNotificationInfoPayload.pdfEditon, pdfEditionNotificationInfoPayload.localPDFFilePath)
        }
        
        showMobileDataAlertNotification =  center.addObserver(descriptor: UIApplication.userMobileDataAlertNotification) { _ in
            self.showMobileDataAlert()
        }

    }
    
    private func showMobileDataAlert() {
        let okayAlertAction = UIAlertAction(title: Strings.OK, style: .default, handler: nil)
        let alert = UIAlertController(title: nil, message: Strings.mobileDataOffAlert, preferredStyle: .alert)
        alert.addAction(okayAlertAction)
        present(alert, animated: true)
    }
    
    private func removeObservers() {
        readPDFEditionNotificationToken = nil
        downloadCompleteNotificationToke = nil
        showMobileDataAlertNotification = nil
    }
    
    private func setupViewController() {
        self.navigationItem.backBarButtonItem = UIBarButtonItem(title:"", style:.plain, target:nil, action:nil)
        self.title = Strings.downloadViewControllerTitle
        self.navigationItem.backBarButtonItem = UIBarButtonItem(title: "", style: UIBarButtonItem.Style.plain, target: nil, action: nil)
        
        let didSelectCollectionViewCellType: (CollectionViewCellType) -> () = { item in
            NotificationCenter.default.post(descriptor: CollectionViewCellType.didSelectCollectionViewCellType, value: DidSelectCollectionViewCellTypePayload(collectionViewCellType: item))
        }
        
        let flowLayout = UICollectionViewFlowLayout()
        flowLayout.minimumLineSpacing = 22
        flowLayout.minimumInteritemSpacing = 10
        flowLayout.scrollDirection = .vertical
        var aspectRatio = CGFloat(414.0/590.0)
        if UIDevice.current.userInterfaceIdiom == .pad {
            flowLayout.sectionInset = UIEdgeInsets.init(top: 8, left: 20, bottom: 8, right: 20)
            aspectRatio = CGFloat(768.0/916.0)
        } else {
            flowLayout.sectionInset = UIEdgeInsets.init(top: 8, left: 0, bottom: 8, right: 0)
        }
        let collectionViewLayoutFactory = CollectionViewLayoutFactory(flowLayout: flowLayout,
                                                                      phonePortraitItemsCount: 1,
                                                                      phoneLandscapeItemsCount: 1,
                                                                      padPortraitItemsCount: 1,
                                                                      padLandscapeItemsCount: 1,
                                                                      itemAspectRatio: aspectRatio)
        
        collectionViewController = GenericCollectionViewController(items: datasource, cellDescriptor: {$0.collectionViewCellDescriptor}, collectionViewLayoutFactory: collectionViewLayoutFactory)
        collectionViewController?.backgroundColor =  .clear
        self.collectionViewController?.didSelect = didSelectCollectionViewCellType
        collectionViewController?.collectionView?.isScrollEnabled = true
        collectionViewController?.collectionView?.showsVerticalScrollIndicator = false
        add(contentViewController: collectionViewController!, toContainerView: containerView)
    }
}

