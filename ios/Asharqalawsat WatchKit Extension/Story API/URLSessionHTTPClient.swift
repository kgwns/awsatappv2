//
//  URLSessionHTTPClient.swift
//  Asharqalawsat WatchKit Extension
//
//  Created by Gowri Shankaran on 19/10/22.
//

import Foundation

public class URLSessionHTTPClient: HTTPClient {
  private let session: URLSession
  
  public init(session: URLSession = .shared) {
    self.session = session
  }
  
  private struct UnExpectedValuesRepresentation: Error {}
  
  public func get(from url: URL, completion: @escaping (HTTPClient.Result) -> Void) {
    let semaphore = DispatchSemaphore(value: 0)
    askForAssertion(with: semaphore)
    session.dataTask(with: url) { data, response, error in
      completion(Result{
        if let error = error {
          throw error
        } else if let data = data, let response = response as? HTTPURLResponse {
          return (data, response)
        } else {
          throw UnExpectedValuesRepresentation()
        }
      })
      semaphore.signal()
    }.resume()
  }
  
  private func askForAssertion(with semaphore: DispatchSemaphore) {
    ProcessInfo.processInfo.performExpiringActivity(withReason: "NetworkRequest") { expired in
      if !expired {
        print("We have a background assertion task")
        let time = DispatchTime(uptimeNanoseconds: UInt64(Int64(30 * Double(NSEC_PER_SEC))))
        _ = semaphore.wait(timeout: time)
      }
      else {
        print("No background assertion task was given")
        semaphore.signal()
      }
    }
  }
}
