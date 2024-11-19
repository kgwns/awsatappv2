//
//  WebServices.swift
//  Awsatapp
//
//  Created by Deepak Kumar on 11/05/22.
//

import Foundation
import CryptoSwift
import SwiftyJSON
import SwiftyUserDefaults

public typealias JSONDictionary = [String: Any]

public enum Result<A> {
    case success(A)
    case error(Error)
}

extension Result {
    public init(_ value: A?, or error: Error) {
        if let value = value {
            self = .success(value)
        } else {
            self = .error(error)
        }
    }
    
    public var value: A? {
        guard case .success(let v) = self else { return nil }
        return v
    }
}


public enum WebserviceError: Error {
    case notAuthenticated
    case other
}

func logError<A>(_ result: Result<A>) {
    guard case let .error(e) = result else { return }
    assert(false, "\(e)")
}

var session: URLSession {
    let config = URLSessionConfiguration.default
    config.urlCache = nil
    config.httpShouldSetCookies = false
    config.httpCookieStorage = nil
    config.httpCookieAcceptPolicy = .never
    return URLSession(configuration: config)
}

extension URLRequest {
    init<A>(endpoint: Endpoint<A>) {
        self.init(url: endpoint.url)
        httpMethod = endpoint.method.method
        if case let .post(data) = endpoint.method {
            httpBody = data
        }
    }
}

public final class Webservice {
    public init() { }
    
    public func load<A>(_ endpoint: Endpoint<A>, completion: @escaping (Result<A>) -> () ) {

        var request = URLRequest(endpoint: endpoint)
        
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
                
        session.dataTask(with: request) { data, _, _ in
            let result: Result<A>
            #if DEBUG
                if data != nil {
                    print("Request result is here:")
                    print(String(data: data!, encoding: .utf8) ?? "No Data Response")
                }
            #endif
             let parsed = data.flatMap(endpoint.parse)
            result = Result(parsed, or: WebserviceError.other)

            DispatchQueue.main.async { completion(result) }
            }.resume()
    }
}

public enum HttpMethod<A> {
    case get
    case post(payload: A?)
    
    public var method: String {
        switch self {
        case .get: return "GET"
        case .post: return "POST"
        }
    }
    
    public func map<B>(f: (A) throws -> B) rethrows -> HttpMethod<B> {
        switch self {
        case .get: return .get
        case .post(let payload):
            guard let payload = payload else { return .post(payload: nil) }
            return .post(payload: try f(payload))
        }
    }
}

public struct Endpoint<A> {
    public var url: URL
    public var parse: (Data) -> A?
    public var method: HttpMethod<Data> = .get
    
    public init(url: URL, parse: @escaping (Data) -> A?, method: HttpMethod<Data> = .get) {
        self.url = url
        self.parse = parse
        self.method = method
    }
}

extension Endpoint {
    
    public init(url: URL, parseJSON: @escaping (Any) -> A?) {
        self.url = url
        self.method = .get
        self.parse = { data in
            let json = try? JSONSerialization.jsonObject(with: data, options: JSONSerialization.ReadingOptions())
            return json.flatMap(parseJSON)
        }
    }
    
    public init(url: URL, method: HttpMethod<Any>, parseJSON: @escaping (Any) -> A?) throws {
        self.url = url
        self.method = try method.map { jsonObject in
            print(jsonObject)
            return try JSONSerialization.data(withJSONObject: jsonObject, options: JSONSerialization.WritingOptions())
        }
        self.parse = { data in
            let json = try? JSONSerialization.jsonObject(with: data, options: JSONSerialization.ReadingOptions())
            return json.flatMap(parseJSON)
        }
    }
}

extension Endpoint where A: RangeReplaceableCollection {
    public init(url: URL, method: HttpMethod<Any> = .get, parseElement: @escaping (JSONDictionary) -> A.Iterator.Element?) throws {
        self = try Endpoint(url: url, method: method, parseJSON: { json in
            guard let jsonDicts = json as? [JSONDictionary] else { return nil }
            let result = jsonDicts.compactMap(parseElement)
            return A(result)
        })
    }
}

extension Endpoint {
    var cacheKey: String {
        return "cache" + url.absoluteString.sha1()
    }
}

struct FileStorage {
    let baseURL = try! FileManager.default.url(for: .cachesDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
    
    subscript(key: String) -> Data? {
        get {
            let url = baseURL.appendingPathComponent(key)
            return try? Data(contentsOf: url)
        }
        set {
            let url = baseURL.appendingPathComponent(key)
            _ = try? newValue?.write(to: url)
        }
    }
}

final class Cache {
    var storage = FileStorage()
    
    func load<A>(_ endpoint: Endpoint<A>) -> A? {
        guard case .get = endpoint.method else { return nil }
        if Defaults[\.offlineBrowsingSetting] == false {
            return nil
        }
        let data = storage[endpoint.cacheKey]
        return data.flatMap(endpoint.parse)
    }
    
    func save<A>(_ data: Data, for endpoint: Endpoint<A>) {
        guard case .get = endpoint.method else { return }
        if Defaults[\.offlineBrowsingSetting] == false {
            return
        }
        storage[endpoint.cacheKey] = data
    }
    
    static func deleteAllFiles() {
        let baseURL = try! FileManager.default.url(for: .cachesDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
        let itemsURLs = try? FileManager.default.contentsOfDirectory(at: baseURL, includingPropertiesForKeys: nil, options: [])
        guard let items = itemsURLs else { return }
        for item in items {
            do { try FileManager.default.removeItem(at: item) } catch { print("\(error)") }
        }
    }
}

final class CachedWebservice {
    let webservice: Webservice
    let cache = Cache()
    
    init(_ webservice: Webservice) {
        self.webservice = webservice
    }
    
    func request<A>(_ endpoint: Endpoint<A>, update: @escaping (Result<A>, Bool) -> ()) {
        
        if let result = cache.load(endpoint) {
            /* JSON result is now available from Cache */
            update(.success(result), true)
        }
        
        let dataEndpoint = Endpoint<Data>(url: endpoint.url, parse: { $0 }, method: endpoint.method)
        webservice.load(dataEndpoint, completion: { result in
            switch result {
            case let .error(error):
                update(.error(error), false)
            case let .success(data):
                self.cache.save(data, for: endpoint)
                update(Result(endpoint.parse(data), or: WebserviceError.other), false)
            }
        })
    }
}

let API = CachedWebservice(Webservice())


