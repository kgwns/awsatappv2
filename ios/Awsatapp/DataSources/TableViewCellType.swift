//
//  TableViewCellType.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import Foundation

enum TableViewCellType {
    case pdfEdition(PDFEdition)
}

extension TableViewCellType {
    var tableViewCellDescriptor: TableViewCellDescriptor {
        let deviceOrientation = DeviceOrientation.current
                
        switch (self, deviceOrientation) {
            
        
        case(.pdfEdition(let pdfEdition), _):
          return TableViewCellDescriptor(reuseIdentifier: String(describing: PDFEditionTableViewCell.self), configure: pdfEdition.configurePDFEditionTableViewCell)
        }
    }
}
