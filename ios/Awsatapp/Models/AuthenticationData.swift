//
//  AuthenticationData.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import Foundation
import SwiftyJSON

public final class AuthenticationData: NSObject, NSCoding {

  // MARK: Declaration for string constants to be used to decode and also serialize.
  private struct SerializationKeys {
    static let sessionName = "session_name"
    static let extra = "extra"
    static let sessid = "sessid"
    static let token = "token"
    
    static let message = "message"
    static let code = "code"
    static let error = "error"
  }

  // MARK: Properties
  public var sessionName: String?
  public var extra: UserBase?
  public var sessid: String?
  public var token: String?
    
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
    sessionName = json[SerializationKeys.sessionName].string
    extra = UserBase(json: json[SerializationKeys.extra])
    sessid = json[SerializationKeys.sessid].string
    token = json[SerializationKeys.token].string
    
    message = json[SerializationKeys.message].string
    code = json[SerializationKeys.code].int
    error = json[SerializationKeys.error].boolValue
  }

  /// Generates description of the object in the form of a NSDictionary.
  ///
  /// - returns: A Key value pair containing all valid values in the object.
  public func dictionaryRepresentation() -> [String: Any] {
    var dictionary: [String: Any] = [:]
    if let value = sessionName { dictionary[SerializationKeys.sessionName] = value }
    if let value = extra { dictionary[SerializationKeys.extra] = value.dictionaryRepresentation() }
    if let value = sessid { dictionary[SerializationKeys.sessid] = value }
    if let value = token { dictionary[SerializationKeys.token] = value }
    
    if let value = message { dictionary[SerializationKeys.message] = value }
    if let value = code { dictionary[SerializationKeys.code] = value }
    dictionary[SerializationKeys.error] = error
    return dictionary
  }

  // MARK: NSCoding Protocol
  required public init(coder aDecoder: NSCoder) {
    self.sessionName = aDecoder.decodeObject(forKey: SerializationKeys.sessionName) as? String
    self.extra = aDecoder.decodeObject(forKey: SerializationKeys.extra) as? UserBase
    self.sessid = aDecoder.decodeObject(forKey: SerializationKeys.sessid) as? String
    self.token = aDecoder.decodeObject(forKey: SerializationKeys.token) as? String
    
    self.message = aDecoder.decodeObject(forKey: SerializationKeys.message) as? String
    self.code = aDecoder.decodeObject(forKey: SerializationKeys.code) as? Int
    self.error = aDecoder.decodeObject(forKey: SerializationKeys.error) as? Bool ?? aDecoder.decodeBool(forKey: SerializationKeys.error)
  }

  public func encode(with aCoder: NSCoder) {
    aCoder.encode(sessionName, forKey: SerializationKeys.sessionName)
    aCoder.encode(extra, forKey: SerializationKeys.extra)
    aCoder.encode(sessid, forKey: SerializationKeys.sessid)
    aCoder.encode(token, forKey: SerializationKeys.token)
    
    aCoder.encode(message, forKey: SerializationKeys.message)
    aCoder.encode(code, forKey: SerializationKeys.code)
    aCoder.encode(error, forKey: SerializationKeys.error)
  }

}
