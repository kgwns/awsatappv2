//
//  ErrorJSON.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import Foundation
import SwiftyJSON

public final class ErrorJSONData: NSCoding {

  // MARK: Declaration for string constants to be used to decode and also serialize.
  private struct SerializationKeys {
    static let status = "status"
    static let message = "message"
    static let code = "code"
    static let error = "error"
  }

  // MARK: Properties
  public var status: String?
  public var message: String?
  public var code: Int?
  public var error: Bool? = false

  // MARK: SwiftyJSON Initializers
  /// Initiates the instance based on the object.
  ///
  /// - parameter object: The object of either Dictionary or Array kind that was passed.
  /// - returns: An initialized instance of the class.
  public convenience init(object: Any) {
    self.init(json: JSON(object))
  }

  /// Initiates the instance based on the JSON that was passed.
  ///
  /// - parameter json: JSON object from SwiftyJSON.
  public required init(json: JSON) {
    status = json[SerializationKeys.status].string
    message = json[SerializationKeys.message].string
    code = json[SerializationKeys.code].int
    error = json[SerializationKeys.error].boolValue
  }

  /// Generates description of the object in the form of a NSDictionary.
  ///
  /// - returns: A Key value pair containing all valid values in the object.
  public func dictionaryRepresentation() -> [String: Any] {
    var dictionary: [String: Any] = [:]
    if let value = message { dictionary[SerializationKeys.message] = value }
    if let value = status { dictionary[SerializationKeys.status] = value }
    if let value = code { dictionary[SerializationKeys.code] = value }
    dictionary[SerializationKeys.error] = error
    return dictionary
  }

  // MARK: NSCoding Protocol
  required public init(coder aDecoder: NSCoder) {
    self.message = aDecoder.decodeObject(forKey: SerializationKeys.message) as? String
    self.status = aDecoder.decodeObject(forKey: SerializationKeys.status) as? String
    self.code = aDecoder.decodeObject(forKey: SerializationKeys.code) as? Int
    self.error = aDecoder.decodeBool(forKey: SerializationKeys.error)
  }

  public func encode(with aCoder: NSCoder) {
    aCoder.encode(status, forKey: SerializationKeys.status)
    aCoder.encode(message, forKey: SerializationKeys.message)
    aCoder.encode(code, forKey: SerializationKeys.code)
    aCoder.encode(error, forKey: SerializationKeys.error)
  }

}

