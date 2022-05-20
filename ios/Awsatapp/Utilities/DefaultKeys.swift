//
//  DefaultKeys.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import Foundation
import SwiftyUserDefaults
import CoreLocation

extension DefaultsKeys {
    static let appLanguage                = "ar-AE"
    static let iOSLanguages               = "ar-AE"
    static let currentLocation            = DefaultsKey<CLLocation?>("UserLocation")
    static let currentIsoCountryCode      = DefaultsKey<String?>("currentIsoCountryCode")
    static let globalEnglishFontSize      = DefaultsKey<Double?>("GlobalEnglishFontSize")
    static let globalArabicFontSize       = DefaultsKey<Double?>("GlobalArabicFontSize")
    static let systemToken                = DefaultsKey<String?>("SystemToken")
    static let authenticationData         = DefaultsKey<AuthenticationData?>("AuthenticationData")
    static let useMobileDataSetting       = DefaultsKey<Bool?>("useMobileDataSetting")
    static let offlineBrowsingSetting     = DefaultsKey<Bool?>("offlineBrowsingSetting")

}


extension UserDefaults {
    subscript(key: DefaultsKey<CLLocation?>) -> CLLocation? {
        get { return unarchive(key) }
        set { archive(key, newValue) }
    }
}

extension UserDefaults {
    subscript(key: DefaultsKey<AuthenticationData?>) -> AuthenticationData? {
        get { return unarchive(key) }
        set { archive(key, newValue) }
    }
}
