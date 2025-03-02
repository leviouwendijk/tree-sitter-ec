import XCTest
import SwiftTreeSitter
import TreeSitterEc

final class TreeSitterEcTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_ec())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Entry Compiler grammar")
    }
}
