//
//  NotificationCenterManager.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import Foundation

extension UIApplication {
    static let userMobileDataAlertNotification = CustomNotificationDescriptor<SuccessNotificationPayload>(name: Notification.Name("userMobileDataAlertNotification"))
}

extension UserBase {
    static let unfollowUserNotifification = CustomNotificationDescriptor<UserInfoPayload>(name: Notification.Name("unfollowUserNotifification"))
}

struct UserInfoPayload {
    let userBase: UserBase
}

struct DidSelectCollectionViewCellTypePayload {
    let collectionViewCellType: CollectionViewCellType
}

extension CollectionViewCellType {
    static let didSelectCollectionViewCellType =  CustomNotificationDescriptor<DidSelectCollectionViewCellTypePayload>(name: Notification.Name("didSelectCollectionViewCellType"))
}

extension PDFEdition {
    static let readPDFEditionNotification =  CustomNotificationDescriptor<PDFEditionNotificationInfoPayload>(name: Notification.Name("readPDFEditionNotification"))
}

extension PDFFileManager {
    static let downloadCompleteNotification = CustomNotificationDescriptor<PDFEditionNotificationInfoPayload>(name: Notification.Name("downlaodCompleteNotification"))
}

struct PDFEditionNotificationInfoPayload {
    let pdfEditon: PDFEdition
    let localPDFFilePath: URL
}

extension PDFEditionNotificationInfoPayload {
    init(note: Notification) {
        pdfEditon = note.userInfo?["pdfEditon"] as! PDFEdition
        localPDFFilePath = note.userInfo?["localPDFFilePath"] as! URL
    }
}

struct SuccessNotificationPayload {
    let sucess: String
}
