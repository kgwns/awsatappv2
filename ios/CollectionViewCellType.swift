//
//  CollectionViewCellType.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import Foundation

enum CollectionViewCellType {
    case pdfEdition(PDFEdition)
    case largePDFEdition(PDFEdition)
}

extension CollectionViewCellType {
    var collectionViewCellDescriptor: CollectionViewCellDescriptor {
        switch self {
        case .pdfEdition(let pdfEdition):
          return CollectionViewCellDescriptor(reuseIdentifier: String(describing: PDFEditionCollectionViewCell.self), configure:pdfEdition.configurePDFEditionCollectionViewCell)
            
        case .largePDFEdition(let pdfEdition):
          return CollectionViewCellDescriptor(reuseIdentifier: String(describing: PDFEditionLargeCollectionViewCell.self), configure:pdfEdition.configurePDFEditionLargeCollectionViewCell)
        }
    }
}
