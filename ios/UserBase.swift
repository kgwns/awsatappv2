//
//  UserBase.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import Foundation
import SwiftyJSON

public final class UserBase: NSObject, NSCoding {
    
    // MARK: Declaration for string constants to be used to decode and also serialize.
    private struct SerializationKeys {
        static let name = "name"
        static let thumb = "thumb"
        static let fullName = "full_name"
        static let uid = "uid"
        static let followed = "followed"
        static let preferredCategoriesCount = "preferred_categories_count"
    }
    
    // MARK: Properties
    public var name: String?
    public var thumb: String?
    public var fullName: String?
    public var uid: String?
    public var followed: Bool? = false
    public var preferredCategoriesCount: Int?

    
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
        name = json[SerializationKeys.name].string
        thumb = json[SerializationKeys.thumb].string
        fullName = json[SerializationKeys.fullName].string
        uid = json[SerializationKeys.uid].string
        followed = json[SerializationKeys.followed].boolValue
        preferredCategoriesCount = json[SerializationKeys.preferredCategoriesCount].int
    }
    
    /// Generates description of the object in the form of a NSDictionary.
    ///
    /// - returns: A Key value pair containing all valid values in the object.
    public func dictionaryRepresentation() -> [String: Any] {
        var dictionary: [String: Any] = [:]
        if let value = name { dictionary[SerializationKeys.name] = value }
        if let value = thumb { dictionary[SerializationKeys.thumb] = value }
        if let value = fullName { dictionary[SerializationKeys.fullName] = value }
        if let value = uid { dictionary[SerializationKeys.uid] = value }
        dictionary[SerializationKeys.followed] = followed
        if let value = preferredCategoriesCount { dictionary[SerializationKeys.preferredCategoriesCount] = value }
        return dictionary
    }
    
    // MARK: NSCoding Protocol
    required public init(coder aDecoder: NSCoder) {
        self.name = aDecoder.decodeObject(forKey: SerializationKeys.name) as? String
        self.thumb = aDecoder.decodeObject(forKey: SerializationKeys.thumb) as? String
        self.fullName = aDecoder.decodeObject(forKey: SerializationKeys.fullName) as? String
        self.uid = aDecoder.decodeObject(forKey: SerializationKeys.uid) as? String
        self.followed = aDecoder.decodeObject(forKey: SerializationKeys.followed) as? Bool ?? aDecoder.decodeBool(forKey: SerializationKeys.followed)
        self.preferredCategoriesCount = aDecoder.decodeObject(forKey: SerializationKeys.preferredCategoriesCount) as? Int

    }
    
    public func encode(with aCoder: NSCoder) {
        aCoder.encode(name, forKey: SerializationKeys.name)
        aCoder.encode(thumb, forKey: SerializationKeys.thumb)
        aCoder.encode(fullName, forKey: SerializationKeys.fullName)
        aCoder.encode(uid, forKey: SerializationKeys.uid)
        aCoder.encode(followed, forKey: SerializationKeys.followed)
        aCoder.encode(preferredCategoriesCount, forKey: SerializationKeys.preferredCategoriesCount)
    }
}
