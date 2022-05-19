//
//  CollectionViewCellDescriper.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//


import Foundation
import UIKit

struct CollectionViewCellDescriptor {
    let cellClass: UICollectionViewCell.Type
    let reuseIdentifier: String
    let configure: (UICollectionViewCell) -> ()
    
    init<Cell: UICollectionViewCell>(reuseIdentifier: String, configure: @escaping (Cell) -> ()) {
        self.cellClass = Cell.self
        self.reuseIdentifier = reuseIdentifier
        self.configure = { cell in
            configure(cell as! Cell)
        }
    }
}
