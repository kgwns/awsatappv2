//
//  PDFArchivesViewController.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 16/05/22.
//

import UIKit
import SwiftyJSON

enum PDFArchiveViewControllerTypes: String {
    case grid
    case list
}

class PDFArchiveView: UIView, LoadingView {
    
//    var showPDFEdition: (PDFEdition, URL) -> () = { _,_  in }
  
  @objc var onItemClick: RCTBubblingEventBlock?
  @objc var selectedLayoutTypeInfo: String = PDFArchiveViewControllerTypes.grid.rawValue {
    didSet {
      self.pdfArchiveViewControllerType = PDFArchiveViewControllerTypes(rawValue: selectedLayoutTypeInfo)!
    }
  }
    
    private var readPDFEditionNotificationToken: Token?
    private var downloadCompleteNotificationToke: Token?
    private var showMobileDataAlertNotification: Token?
  
    var isFromCache = false

    private var pdfArchiveViewControllerType: PDFArchiveViewControllerTypes = .grid {
        didSet {
            switch pdfArchiveViewControllerType {
            case .grid:
                tableView?.isHidden = true
                collectionView?.isHidden = false
                collectionView?.reloadData()
                if collectionViewDataSource.count > 0 {
                    collectionView?.setContentOffset(.zero, animated: false)
                }
            case .list:
                tableView?.isHidden = false
                tableView?.reloadData()
                collectionView?.isHidden = true
                if tableViewDataSource.count > 0 {
                    tableView?.scrollToRow(at: IndexPath(row: 0, section:0), at: .top, animated: false)
                }
            }
        }
    }
  
    private var sectionInset: UIEdgeInsets {
        if UIDevice.current.userInterfaceIdiom == .pad {
            return UIEdgeInsets.init(top: 20, left: 20, bottom: 20, right: 20)
        }
        return UIEdgeInsets.init(top: 10, left: 0, bottom: 10, right: 0)
    }
    private let MINIMUM_LINE_SPACING: CGFloat = 20
    private let MINIMUM_INTERIM_SPACING: CGFloat = 10
    private var reuseIdentifiers: Set<String> = []
    private var collectionView: UICollectionView?
    private var tableView: UITableView?
          
    // MARK: - Datasource
    private var collectionViewDataSource: [CollectionViewCellType] = [] {
        didSet {
            collectionView?.reloadData()
            collectionView?.layoutIfNeeded()
        }
    }
    
    private var tableViewDataSource: [TableViewCellType] = [] {
        didSet {
            tableView?.reloadData()
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
    
    // MARK: - View Life Cycle
    override init(frame: CGRect) {
        super.init(frame: UIScreen.main.bounds)
        setUp()
    }
      
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setUp()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        collectionView?.collectionViewLayout.invalidateLayout()
    }
    
    override func willMove(toWindow newWindow: UIWindow?) {
        super.willMove(toWindow: newWindow)
        if newWindow == nil {
            removeObservers()
        }
    }

    deinit {
        print("<- PDFArchiveView DeInit ->")
    }
    
    // MARK: - Loading View
    func configure(value: JSON) {
        let pdfArchiveData = PDFArchiveData(json: value)
      if pdfArchiveData.data?.isEmpty == false {
            let pdfEditions = Array(pdfArchiveData.data!.suffix(14))
            if isFromCache == false {
                collectionViewDataSource = DataSourceFactory.dataSourceForPDFCollage(pdfEditions)
                tableViewDataSource = DataSourceFactory.dataSourceForPDFList(pdfEditions)
            } else {
                let lastCurrentItem = collectionViewDataSource.first!
                let lastNewItem = pdfEditions.last!
                switch lastCurrentItem {
                    case .pdfEdition(let pdfEdition):
                        if pdfEdition.issueNumber! != lastNewItem.issueNumber! {
                            collectionViewDataSource = DataSourceFactory.dataSourceForPDFCollage(pdfEditions)
                            tableViewDataSource = DataSourceFactory.dataSourceForPDFList(pdfEditions)
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
        showMobileDataAlertNotification =  NotificationCenter.default.addObserver(descriptor: UIApplication.userMobileDataAlertNotification) { _ in
            self.showMobileDataAlert()
        }
        readPDFEditionNotificationToken = NotificationCenter.default.addObserver(descriptor: PDFEdition.readPDFEditionNotification) { (pdfEditionNotificationInfoPayload) in
          self.showPDFEdition(pdfEditionNotificationInfoPayload.pdfEditon, pdfEditionNotificationInfoPayload.localPDFFilePath)
        }
        downloadCompleteNotificationToke = NotificationCenter.default.addObserver(descriptor: PDFFileManager.downloadCompleteNotification) { _ in
            self.collectionView?.reloadData()
            self.tableView?.reloadData()
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
        } else {
          if let issueNumber = pdfEdition.issueNumber {
                title = Strings.edition + " " +  issueNumber
            } else {
                title = ""
            }
        }
      
      consolidatedDictionary["title"] = title
      onItemClick?(["SelectedPDF": consolidatedDictionary])
    }
      
    private func removeObservers() {
        readPDFEditionNotificationToken = nil
        downloadCompleteNotificationToke = nil
        showMobileDataAlertNotification = nil
    }
    
    @objc func handleRefresh(_ refreshControl: UIRefreshControl) {
        load(EndPoints.pdfArchive.endPoint)
    }
    
    private func setUp() {
      //TODO: Need to add toggle between Grid & List
        setUpGridCollectionView()
        setUpTableView()
        load(EndPoints.pdfArchive.endPoint)
        addObservers()
    }
            
    private func showMobileDataAlert() {
        let okayAlertAction = UIAlertAction(title: Strings.OK, style: .default, handler: nil)
        let alert = UIAlertController(title: nil, message: Strings.mobileDataOffAlert, preferredStyle: .alert)
        alert.addAction(okayAlertAction)
        self.window?.rootViewController?.present(alert, animated: true)
    }
        
    private func setUpTableView() {
        tableView = UITableView(frame: .zero)
        tableView?.dataSource = self
        tableView?.delegate = self
        tableView?.separatorStyle = .none
        tableView?.rowHeight = UITableView.automaticDimension
        tableView?.showsVerticalScrollIndicator = false
        tableView?.refreshControl = tableViewRefreshControl
        tableView?.isHidden = true
        addSubview(tableView!)
      
        tableView?.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            tableView!.topAnchor.constraint(equalTo: self.topAnchor),
            tableView!.bottomAnchor.constraint(equalTo: self.bottomAnchor),
            tableView!.leftAnchor.constraint(equalTo: self.leftAnchor),
            tableView!.rightAnchor.constraint(equalTo: self.rightAnchor)
        ])
    }
    
    private func setUpGridCollectionView() {
        let flowLayout = UICollectionViewFlowLayout()
        flowLayout.minimumLineSpacing = MINIMUM_LINE_SPACING
        flowLayout.minimumInteritemSpacing = MINIMUM_INTERIM_SPACING
        flowLayout.scrollDirection = .vertical
        flowLayout.sectionInset = sectionInset
      
        collectionView = UICollectionView(frame: .zero, collectionViewLayout: flowLayout)
        collectionView?.delegate = self
        collectionView?.dataSource = self
        collectionView?.refreshControl = collectionViewRefreshControl
        collectionView?.isScrollEnabled = true
        collectionView?.showsVerticalScrollIndicator = false
        collectionView?.backgroundColor = UIColor(named: "backgroundColor")
        collectionView?.semanticContentAttribute = .forceRightToLeft
        addSubview(collectionView!)
      
        collectionView?.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            collectionView!.topAnchor.constraint(equalTo: self.topAnchor),
            collectionView!.bottomAnchor.constraint(equalTo: self.bottomAnchor),
            collectionView!.leftAnchor.constraint(equalTo: self.leftAnchor),
            collectionView!.rightAnchor.constraint(equalTo: self.rightAnchor)
        ])
    }
}

extension PDFArchiveView: UICollectionViewDataSource, UICollectionViewDelegateFlowLayout, UICollectionViewDelegate {
  
    private var aspectRatio: CGFloat {
      get {
        UIDevice.current.userInterfaceIdiom == .pad ? CGFloat(768.0/916.0) : CGFloat(414.0/590.0)
      }
    }

    private var itemWidth: CGFloat {
        get {
          let screenWidth = UIScreen.main.bounds.width
          return (screenWidth - collectionView!.contentInset.left - collectionView!.contentInset.right - sectionInset.left - sectionInset.right - ((horizontalLineItems - 1) * MINIMUM_INTERIM_SPACING)) / horizontalLineItems
        }
    }

    private var itemHeight: CGFloat {
        get {
            return itemWidth / aspectRatio
        }
    }
  
    private var horizontalLineItems: CGFloat {
        get {
            switch DeviceOrientation.current {
            case .PhonePortrait:
                return 2
            case .PhoneLandscape:
                return 4
            case .PadPortrait:
                return 5
            case .PadLandscape:
                return 6
            }
        }
    }
  
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return collectionViewDataSource.count
    }
  
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let descriptor = collectionViewDataSource[indexPath.row].collectionViewCellDescriptor
        if !reuseIdentifiers.contains(descriptor.reuseIdentifier) {
            let nib = UINib(nibName: descriptor.reuseIdentifier, bundle: nil)
            collectionView.register(nib, forCellWithReuseIdentifier: descriptor.reuseIdentifier)
            reuseIdentifiers.insert(descriptor.reuseIdentifier)
        }
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: descriptor.reuseIdentifier, for: indexPath)
        descriptor.configure(cell)
        return cell
    }
  
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: itemWidth, height: itemHeight)
    }
}

extension PDFArchiveView: UITableViewDataSource, UITableViewDelegate {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return tableViewDataSource.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let descriptor = tableViewDataSource[indexPath.row].tableViewCellDescriptor
        if !reuseIdentifiers.contains(descriptor.reuseIdentifier) {
            let nib = UINib(nibName: descriptor.reuseIdentifier, bundle: nil)
            tableView.register(nib, forCellReuseIdentifier: descriptor.reuseIdentifier)
            reuseIdentifiers.insert(descriptor.reuseIdentifier)
        }
        
        let cell = tableView.dequeueReusableCell(withIdentifier: descriptor.reuseIdentifier, for: indexPath)
        descriptor.configure(cell)
        return cell
    }
  
    func tableView(_ tableView: UITableView, estimatedHeightForRowAt indexPath: IndexPath) -> CGFloat {
        return UITableView.automaticDimension
    }
}
