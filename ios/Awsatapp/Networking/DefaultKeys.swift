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
  var offlineBrowsingSetting: DefaultsKey<Bool> { .init("offlineBrowsingSetting", defaultValue: false) }
}
