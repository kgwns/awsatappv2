//
//  kingfiser+networking.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import UIKit
import Kingfisher

extension UIImageView {
    func aaa_setImage(_ stringURL: String?, indicatorType: IndicatorType = .activity) {
        let placeHolderImage =  UIImage(named: "placeholder_image")
        guard let stringURL = stringURL else {
            self.image = placeHolderImage
            return
        }
        guard let url = URL(string: stringURL) else { return }
        self.kf.indicatorType = indicatorType
        (self.kf.indicator?.view as? UIActivityIndicatorView)?.color = UIColor(named: "lightGreen")
        self.kf.setImage(with: url, options: [.transition(.fade(0.3))])
    }
}
