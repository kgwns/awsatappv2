//
//  Extensions.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import UIKit
import SwiftyUserDefaults
import DateToolsSwift

extension NSObject {
    var className: String {
        return String(describing: type(of: self))
    }
    
    class var className: String {
        return String(describing: self)
    }
}

extension UIView {
    func addRoundedCorners() {
        self.layer.cornerRadius = self.bounds.size.height / 2.0
        self.layer.masksToBounds = true
    }
    
    
    func removeSelectionBorders() {
        self.layer.borderWidth = 0.0
        self.layer.cornerRadius = 0.0
        self.layer.borderColor = UIColor.clear.cgColor
    }
    
    public func constrainEdges(toMarginOf view: UIView) {
        NSLayoutConstraint.activate([
            self.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 0),
            self.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: 0),
            self.topAnchor.constraint(equalTo: view.topAnchor, constant: 0),
            self.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: 0),
            ])
    }
    
    @discardableResult
    func fromNib<T : UIView>() -> T? {
        guard let view = Bundle.main.loadNibNamed(String(describing: type(of: self)), owner: self, options: nil)?[0] as? T else {
            return nil
        }
        self.addSubview(view)
        view.translatesAutoresizingMaskIntoConstraints = false
        view.constrainEdges(toMarginOf: self)
        return view
    }
}

extension UIViewController {
  func add(contentViewController: UIViewController, toContainerView: UIView) {
    addChild(contentViewController)
    toContainerView.addSubview(contentViewController.view)
    contentViewController.view.translatesAutoresizingMaskIntoConstraints = false
    contentViewController.view.constrainEdges(toMarginOf: toContainerView)
    contentViewController.didMove(toParent: self)
  }
  
    func remove(contentViewController: UIViewController) {
      contentViewController.willMove(toParent: nil)
      contentViewController.view.removeFromSuperview()
      contentViewController.removeFromParent()
    }
    
  func setupBackButton() {
    let customBackButton = UIBarButtonItem(title: "", style: .plain, target: nil, action: nil)
    navigationItem.backBarButtonItem = customBackButton
  }
}


extension UILabel {
    
    func setFullDateLabel(_ timestamp: String?) {
      let currentLocale = Locale(identifier: "ar-AE")
      if let timestamp = timestamp, let timeInterval = TimeInterval(timestamp) {
          self.text = Date(timeIntervalSince1970: timeInterval).format(with: .full, locale: currentLocale)
      } else {
          self.text = nil
      }
    }
    
    var numberOfVisibleLines: Int {
        let textSize = CGSize(width: CGFloat(self.frame.size.width), height: CGFloat(MAXFLOAT))
        let rHeight: Int = lroundf(Float(self.sizeThatFits(textSize).height))
        let charSize: Int = lroundf(Float(self.font.pointSize))
        return rHeight / charSize
    }
}

extension UIFont {
    static func boldAwsatFont(size: CGFloat) -> UIFont {
        return UIFont(name: "Awsat-Bold", size: size)!
    }
    
    static func lightAwsatFont(size: CGFloat) -> UIFont {
        return UIFont(name: "Awsat-Light", size: size)!
    }
    
    static func blackAwsatFont(size: CGFloat) -> UIFont {
        return UIFont(name: "Awsat-Black", size: size)!
    }
}

