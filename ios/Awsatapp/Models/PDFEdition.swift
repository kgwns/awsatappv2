//
//  PDFEdition.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import Foundation
import SwiftyJSON

public final class PDFEdition: NSCoding {
    
    // MARK: Declaration for string constants to be used to decode and also serialize.
    private struct SerializationKeys {
        static let resource = "resource"
        static let issueDate = "issueDate"
        static let issueNumber = "issueNumber"
        static let thumbnail = "thumbnail"
        static let thumbnailLarge = "thumbnail_large"
    }
    
    // MARK: Properties
    public var resource: String?
    public var issueDate: String?
    public var issueNumber: String?
    public var thumbnail: String?
    public var thumbnailLarge: String?
    
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
        resource = json[SerializationKeys.resource].string
        issueDate = json[SerializationKeys.issueDate].string
        issueNumber = json[SerializationKeys.issueNumber].string
        thumbnail = json[SerializationKeys.thumbnail].string
        thumbnailLarge = json[SerializationKeys.thumbnailLarge].string
    }
    
    /// Generates description of the object in the form of a NSDictionary.
    ///
    /// - returns: A Key value pair containing all valid values in the object.
    public func dictionaryRepresentation() -> [String: Any] {
        var dictionary: [String: Any] = [:]
        if let value = resource { dictionary[SerializationKeys.resource] = value }
        if let value = issueDate { dictionary[SerializationKeys.issueDate] = value }
        if let value = issueNumber { dictionary[SerializationKeys.issueNumber] = value }
        if let value = thumbnail { dictionary[SerializationKeys.thumbnail] = value }
        if let value = thumbnailLarge { dictionary[SerializationKeys.thumbnailLarge] = value }
        return dictionary
    }
    
    // MARK: NSCoding Protocol
    required public init(coder aDecoder: NSCoder) {
        self.resource = aDecoder.decodeObject(forKey: SerializationKeys.resource) as? String
        self.issueDate = aDecoder.decodeObject(forKey: SerializationKeys.issueDate) as? String
        self.issueNumber = aDecoder.decodeObject(forKey: SerializationKeys.issueNumber) as? String
        self.thumbnail = aDecoder.decodeObject(forKey: SerializationKeys.thumbnail) as? String
        self.thumbnailLarge = aDecoder.decodeObject(forKey: SerializationKeys.thumbnailLarge) as? String
    }
    
    public func encode(with aCoder: NSCoder) {
        aCoder.encode(resource, forKey: SerializationKeys.resource)
        aCoder.encode(issueDate, forKey: SerializationKeys.issueDate)
        aCoder.encode(issueNumber, forKey: SerializationKeys.issueNumber)
        aCoder.encode(thumbnail, forKey: SerializationKeys.thumbnail)
        aCoder.encode(thumbnailLarge, forKey: SerializationKeys.thumbnailLarge)
    }
    
}
