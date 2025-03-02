package tree_sitter_ec_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_ec "github.com/tree-sitter/tree-sitter-ec/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_ec.Language())
	if language == nil {
		t.Errorf("Error loading Entry Compiler grammar")
	}
}
