//
//  TableViewCellDescriper.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import Foundation
import UIKit

struct TableViewCellDescriptor {
    let cellClass: UITableViewCell.Type
    let reuseIdentifier: String
    let configure: (UITableViewCell) -> ()
    
    init<Cell: UITableViewCell>(reuseIdentifier: String, configure: @escaping (Cell) -> ()) {
        self.cellClass = Cell.self
        self.reuseIdentifier = reuseIdentifier
        self.configure = { cell in
            configure(cell as! Cell)
        }
    }
}
