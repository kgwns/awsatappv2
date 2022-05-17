//
//  PDFArchivesViewController.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 16/05/22.
//

import UIKit
import SwiftyJSON

enum PDFArchiveViewControllerTypes {
    case grid
    case list
}

class PDFArchiveViewController: BaseViewController, LoadingViewController {
    
    var showPDFEdition: (PDFEdition, URL) -> () = { _,_  in }
    var readPDFEditionNotificationToken: Token?
    var downloadCompleteNotificationToke: Token?
    var showMobileDataAlertNotification: Token?
    
    var isFromCache = false
    
    var pdfArchiveViewControllerType: PDFArchiveViewControllerTypes = .grid {
        didSet {
            switch pdfArchiveViewControllerType {
            case .grid:
                self.viewController = collectionViewController!
                if collectionViewDataSource.count > 0 {
                    self.collectionViewController?.collectionView?.setContentOffset(.zero, animated: false)

                }
            case .list:
                self.viewController = tableViewController
                
                if tableViewDataSource.count > 0 {
                    self.tableViewController.tableView.scrollToRow(at: IndexPath(row: 0, section:0), at: .top, animated: false)
                }
            }
            
            self.updateToggleBarButtonItemUI()
        }
    }
    
    @IBOutlet weak var containerView: UIView!
    var toggleBarButtonItem: UIBarButtonItem?

    
    var viewController: UIViewController? {
        willSet(newViewController) {
            if let unwrappedViewController = viewController {
                remove(contentViewController: unwrappedViewController)
            }
            if let unwrappedNewViewController = newViewController {
                add(contentViewController: unwrappedNewViewController, toContainerView: myView)
            }
        }
        didSet {
            self.collectionViewController?.collectionView?.reloadData()
            self.tableViewController.tableView.reloadData()
        }
    }
    
    // MARK: - Datasource
    
    var collectionViewDataSource: [CollectionViewCellType] = [] {
        didSet {
            collectionViewController?.items = collectionViewDataSource
            collectionViewController?.collectionView?.reloadData()
            collectionViewController?.collectionView?.layoutIfNeeded()
        }
    }
    
    var tableViewDataSource: [TableViewCellType] = [] {
        didSet {
            tableViewController.items = tableViewDataSource
            tableViewController.tableView.reloadData()
        }
    }
    
    private lazy var tableViewRefreshControl: UIRefreshControl = {
        var refreshControl = UIRefreshControl()
        refreshControl.backgroundColor = UIColor.clear
        refreshControl.tintColor = UIColor.msuGreen
        refreshControl.addTarget(self, action: #selector(handleRefresh(_:)), for: UIControl.Event.valueChanged)
        return refreshControl
    }()
    
    private lazy var collectionViewRefreshControl: UIRefreshControl = {
        var refreshControl = UIRefreshControl()
        refreshControl.backgroundColor = UIColor.clear
        refreshControl.tintColor = UIColor.msuGreen
        refreshControl.addTarget(self, action: #selector(handleRefresh(_:)), for: UIControl.Event.valueChanged)
        return refreshControl
    }()
    
    
    var collectionViewController: GenericCollectionViewController<CollectionViewCellType>?
    private lazy var tableViewController: GenericTableViewController = { () -> GenericTableViewController<TableViewCellType> in
        return GenericTableViewController(items: [], cellDescriptor: { $0.tableViewCellDescriptor })
    }()
    
    
    let myView = UIView()
    // MARK: - View Life Cycle

    override func viewDidLoad() {
        super.viewDidLoad()
        setupViewController()
        load(EndPoints.pdfArchive.endPoint)
      
      myView.frame = self.view.frame
      self.view.addSubview(myView)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
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
            if isFromCache == false {
                collectionViewDataSource = DataSourceFactory.dataSourceForPDFCollage(pdfEdtions)
                tableViewDataSource = DataSourceFactory.dataSourceForPDFList(pdfEdtions)
            } else {
                let lastCurrentItem = collectionViewDataSource.first!
                let lastNewItem = pdfEdtions.last!
                switch lastCurrentItem {
                    case .pdfEdition(let pdfEdition):
                        if pdfEdition.issueNumber! != lastNewItem.issueNumber! {
                            collectionViewDataSource = DataSourceFactory.dataSourceForPDFCollage(pdfEdtions)
                            tableViewDataSource = DataSourceFactory.dataSourceForPDFList(pdfEdtions)
                        }
                    default:
                        break
                }
            }
        }
    }
    
    func didLoad(fromCache: Bool) {
        isFromCache = fromCache
        if fromCache == false {
            tableViewRefreshControl.endRefreshing()
            collectionViewRefreshControl.endRefreshing()
        }
    }

    // MARK: - Private
    
    private func addObservers() {
        
        showMobileDataAlertNotification =  center.addObserver(descriptor: UIApplication.userMobileDataAlertNotification) { _ in
            self.showMobileDataAlert()
        }
        
        readPDFEditionNotificationToken = center.addObserver(descriptor: PDFEdition.readPDFEditionNotification) { (pdfEditionNotificationInfoPayload) in
          self.showPDFEditionViewController(pdfEdition: pdfEditionNotificationInfoPayload.pdfEditon, localPDFFilePath: pdfEditionNotificationInfoPayload.localPDFFilePath)
        }
        
        downloadCompleteNotificationToke = center.addObserver(descriptor: PDFFileManager.downlaodCompleteNotification) { _ in
            self.collectionViewController?.collectionView?.reloadData()
            self.tableViewController.tableView.reloadData()
        }
    }
  
  //TODO: Need to handle this
  //  func showPDFEditionViewController(pdfEdition: PDFEdition, localPDFFilePath: URL, navigationController: UINavigationController) {
    func showPDFEditionViewController(pdfEdition: PDFEdition, localPDFFilePath: URL) {
      let storyboard = UIStoryboard(name: "PDFStoryboard", bundle: nil)

      let pdfEditionViewController = storyboard.instantiateViewController(withIdentifier: "PDFEditionViewController") as! PDFEditionViewController
        
        pdfEditionViewController.pdfEdition = pdfEdition
        pdfEditionViewController.pdfFilePath = localPDFFilePath
  //      pdfEditionViewController.hidesBottomBarWhenPushed = true //TODO: Need to remove this
        self.present(pdfEditionViewController, animated: true, completion: nil)
  //      navigationController.pushViewController(pdfEditionViewController, animated: true)
    }
    
    private func removeObservers() {
        readPDFEditionNotificationToken = nil
        downloadCompleteNotificationToke = nil
        showMobileDataAlertNotification = nil
    }
    
    @objc func handleRefresh(_ refreshControl: UIRefreshControl) {
        load(EndPoints.pdfArchive.endPoint)
    }
    
    private func setupViewController() {
        self.title = Strings.pdfArchiveMenu
        self.navigationItem.backBarButtonItem = UIBarButtonItem(title: "", style: UIBarButtonItem.Style.plain, target: nil, action: nil)
        setupGridCollectionViewController()
        setupTableViewController()
        self.pdfArchiveViewControllerType = .grid
        setupToggleBarButtonItem()
    }
    
    private func updateToggleBarButtonItemUI() {
        switch pdfArchiveViewControllerType {
        case .grid:
            toggleBarButtonItem?.image = #imageLiteral(resourceName: "pdf_archive_toggle_list_icon")
        case .list:
            toggleBarButtonItem?.image = #imageLiteral(resourceName: "pdf_archive_toggle_grid_icon")
        }
    }
    
    private func setupToggleBarButtonItem() {
        toggleBarButtonItem = UIBarButtonItem(image: #imageLiteral(resourceName: "pdf_archive_toggle_list_icon") , style: .plain, target: self, action: #selector(didToggleBarButtonItem))
        navigationItem.rightBarButtonItem = toggleBarButtonItem
    }
    
    private func showMobileDataAlert() {
        let okayAlertAction = UIAlertAction(title: Strings.OK, style: .default, handler: nil)
        let alert = UIAlertController(title: nil, message: Strings.mobileDataOffAlert, preferredStyle: .alert)
        alert.addAction(okayAlertAction)
        present(alert, animated: true)
    }
    
    @objc func didToggleBarButtonItem() {
        switch pdfArchiveViewControllerType {
        case .list:
            self.pdfArchiveViewControllerType = .grid
            break
        case .grid:
            self.pdfArchiveViewControllerType = .list
            break
        }
    }
    
    private func setupTableViewController() {
        tableViewController.refreshControl = tableViewRefreshControl
    }
    
    private func setupGridCollectionViewController() {
        let didSelectCollectionViewCellType: (CollectionViewCellType) -> () = { item in
            NotificationCenter.default.post(descriptor: CollectionViewCellType.didSelectCollectionViewCellType, value: DidSelectCollectionViewCellTypePayload(collectionViewCellType: item))
        }
        
        let flowLayout = UICollectionViewFlowLayout()
        flowLayout.minimumLineSpacing = 22
        flowLayout.minimumInteritemSpacing = 10
        flowLayout.scrollDirection = .vertical
        let aspectRatio = CGFloat(184.0/282.0)
        if UIDevice.current.userInterfaceIdiom == .pad {
            flowLayout.sectionInset = UIEdgeInsets.init(top: 8, left: 20, bottom: 8, right: 20)
        } else {
            flowLayout.sectionInset = UIEdgeInsets.init(top: 8, left: 0, bottom: 8, right: 0)
        }
        let collectionViewLayoutFactory = CollectionViewLayoutFactory(flowLayout: flowLayout,
                                                                      phonePortraitItemsCount: 2,
                                                                      phoneLandscapeItemsCount: 4,
                                                                      padPortraitItemsCount: 5,
                                                                      padLandscapeItemsCount: 6,
                                                                      itemAspectRatio: aspectRatio)
        
        collectionViewController = GenericCollectionViewController(items: collectionViewDataSource, cellDescriptor: {$0.collectionViewCellDescriptor}, collectionViewLayoutFactory: collectionViewLayoutFactory)
        collectionViewController?.backgroundColor =  .clear
        self.collectionViewController?.didSelect = didSelectCollectionViewCellType
        collectionViewController!.collectionView?.refreshControl = collectionViewRefreshControl
        collectionViewController?.collectionView?.isScrollEnabled = true
        collectionViewController?.collectionView?.showsVerticalScrollIndicator = false
    }
}
