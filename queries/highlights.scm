(entry "entry" @function)

(entry "{" @punctuation.bracket)
(entry "}" @punctuation.bracket)

(id "{" @punctuation.bracket)
(id "}" @punctuation.bracket)
(id "id" @keyword.repeat)

(date "{" @punctuation.bracket)
(date "}" @punctuation.bracket)
(date "date" @keyword.repeat)

(details "{" @punctuation.bracket)
(details "}" @punctuation.bracket)
(details "details" @keyword.repeat)

(reference "reference" @keyword.repeat)
(reference "{" @punctuation.bracket)
(reference "}" @punctuation.bracket)

(transaction "{" @punctuation.bracket)
(transaction "}" @punctuation.bracket)
(transaction "for" @keyword.repeat)
(transaction "in" @keyword.repeat)

(transaction_to "{" @punctuation.bracket)
(transaction_to "}" @punctuation.bracket)
(transaction_to "to" @keyword.repeat)
(transaction_to "in" @keyword.repeat)

(transaction_from "{" @punctuation.bracket)
(transaction_from "}" @punctuation.bracket)
(transaction_from "from" @keyword.repeat)
(transaction_from "in" @keyword.repeat)

(scoped_transaction "{" @punctuation.bracket)
(scoped_transaction "}" @punctuation.bracket)
(scoped_transaction "in" @keyword.repeat)

(entity_reference (identifier) @constant)

(special_transaction
  [
    "add"
    "rm"
    "remove"
    "sub"
    "subtract"
    "credit"
    "debit"
  ] @function.builtin
)

[
  "="
  "->"
] @operator

(number) @number
(string) @string
(comment) @comment
