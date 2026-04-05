(comment) @comment

[
    "{"
    "}"
    "("
    ")"
] @punctuation.bracket

[
    "."
    ","
    "#"
] @punctuation.delimiter

[
    "="
    "->"
] @operator

[
    "settings"
    "entity"
    "entry"
    "reference"
    "for"
    "in"
    "transactions"
    "ref"
    "use"
    "alias"
    "unit"
    "of"
    "display"
    "details"
] @keyword

(settings_document
    "settings" @keyword)

(entity_document
    "entity" @keyword)

(entry_document
    "entry" @keyword)

(reference_document
    "reference" @keyword)

(text_block
    name: "display" @keyword)

(text_block
    name: "details" @keyword)

(simple_block
    name: (identifier) @keyword)

(headed_block
    name: (identifier) @keyword)

(directive_statement
    head: (identifier) @keyword)

(use_alias_statement
    "use" @keyword
    "alias" @keyword)

(use_alias_statement
    alias: (identifier) @constant)

(use_alias_statement
    alias: (symbol) @constant)

(use_alias_statement
    alias: (path) @constant)

(unit_block
    "unit" @keyword)

(unit_block
    "of" @keyword)

(unit_block
    owner: (identifier) @variable)

(unit_block
    owner: (symbol) @variable)

(unit_block
    owner: (path) @variable)

(unit_block
    alias: (identifier) @constant)

(unit_block
    alias: (symbol) @constant)

(unit_block
    alias: (path) @constant)

(assignment
    left: (assignable
        (identifier) @property))

(assignment
    left: (assignable
        (path) @property))

(call_statement
    callee: (path_segment
        (identifier) @function))

(call_atom
    (identifier) @function)

(for_in_clause
    entity: (ref_target
        (paren_ref_list
            (path) @variable)))

(for_in_clause
    entity: (ref_target
        (paren_ref_list
            (identifier) @variable)))

(for_in_clause
    entity: (ref_target
        (paren_ref_list
            (symbol) @variable)))

(for_in_clause
    entity: (ref_target
        (call_atom
            (identifier) @function)))

(for_in_clause
    entity: (ref_target
        (path) @variable))

(for_in_clause
    entity: (ref_target
        (identifier) @variable))

(for_in_clause
    entity: (ref_target
        (symbol) @variable))

(for_in_clause
    account: (paren_ref_list
        (path) @type))

(for_in_clause
    account: (paren_ref_list
        (identifier) @type))

(for_in_clause
    account: (paren_ref_list
        (symbol) @type))

(in_clause
    account: (paren_ref_list
        (path) @type))

(in_clause
    account: (paren_ref_list
        (identifier) @type))

(in_clause
    account: (paren_ref_list
        (symbol) @type))

(nested_for_clause
    entity: (ref_target
        (paren_ref_list
            (path) @variable)))

(nested_for_clause
    entity: (ref_target
        (paren_ref_list
            (identifier) @variable)))

(nested_for_clause
    entity: (ref_target
        (paren_ref_list
            (symbol) @variable)))

(nested_for_clause
    entity: (ref_target
        (call_atom
            (identifier) @function)))

(nested_for_clause
    entity: (ref_target
        (path) @variable))

(nested_for_clause
    entity: (ref_target
        (identifier) @variable))

(nested_for_clause
    entity: (ref_target
        (symbol) @variable))

(variant_suffix
    (identifier) @constant)

(number) @number
(date_literal) @string.special
(string_literal) @string
(boolean) @boolean
(nil_literal) @constant.builtin
(text_line) @string

(symbol) @constant

(path_segment
    (identifier) @variable)

(collapses_statement) @keyword
