//
//  DataSourceFactory.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import UIKit
import SwiftyUserDefaults

struct DataSourceFactory {
    
    static func dataSourceForPDFList(_ pdfEditions: [PDFEdition]) -> [TableViewCellType] {
        var items: [TableViewCellType] = []
        
        for edition in pdfEditions.reversed() {
            items.append(.pdfEdition(edition))
        }
        
        return items
    }
    
    static func dataSourceForPDFCollage(_ pdfEditions: [PDFEdition]) -> [CollectionViewCellType] {
        var items: [CollectionViewCellType] = []
        
        for edition in pdfEditions.reversed() {
            items.append(.pdfEdition(edition))
        }
        
        return items
    }
    
    static func dataSourceForLargePDFCollage(_ pdfEditions: [PDFEdition]) -> [CollectionViewCellType] {
        var items: [CollectionViewCellType] = []
        
        for edition in pdfEditions.reversed() {
            items.append(.largePDFEdition(edition))
        }
        
        return items
    }
    
}
