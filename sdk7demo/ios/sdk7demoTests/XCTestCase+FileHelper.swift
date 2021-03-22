//
//  XCTestCase+FileHelper.swift
//  sdk7demoTests
//
//  Created by Gábor Vass on 16/02/2021.
//

import XCTest
import GetSocialSDK

extension XCTestCase {

  fileprivate func baseURL() -> URL {
    return Bundle.init(for: Self.self).bundleURL.appendingPathComponent("output", isDirectory: true)
  }


  internal func readContent(of: String) -> String? {
    return try? String(contentsOf: self.baseURL().appendingPathComponent(of))
  }

  internal func readFiles(in dir: String) -> [String] {
    do {
      let directory = Bundle.init(for: Self.self).bundlePath.appending("/output/\(dir)")
      return try FileManager().contentsOfDirectory(atPath: directory)
    } catch {
      print("🧨 ERROR: test file location is missing: \(self.baseURL)")
    }
    return []
  }

  internal func execute<Type: Decodable>(folder: String, onDecode: @escaping (Type?) -> Void) {
    let files = self.readFiles(in: folder)
    guard files.count > 0 else {
      XCTFail("🧨 Failed to get test files in [\(folder)] folder")
      return onDecode(nil)
    }
    files.forEach {
      guard let testContent = readContent(of: "\(folder)/\($0)") else {
        XCTFail("🧨 Failed to get file content: \(folder)/\($0)")
        return onDecode(nil)
      }
      guard let result: Type = JSONBridge.decode(testContent, failure: nil) else {
        XCTFail("🧨 Failed to decode \(Type.self)")
        return onDecode(nil)
      }
      onDecode(result)
    }
  }

}
