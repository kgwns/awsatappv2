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
        let placeHolderImage =  #imageLiteral(resourceName: "globe-placeholder")
        guard let stringURL = stringURL else {
            self.image = placeHolderImage
            return
        }
        guard let url = URL(string: stringURL) else { return }
        self.kf.indicatorType = indicatorType
        self.kf.setImage(with: url, placeholder: nil, options: [.transition(.fade(1.0))])
    }
}
