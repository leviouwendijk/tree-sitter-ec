/**
* @file Parser for entry compiler files.
* @author Levi Ouwendijk <leviouwendijk@gmail.com>
* @license MIT
*/

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: 'ec',

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.entry,
      $.comment,
      $.assignment,
      $.id,
      $.date,
      $.details,
      $.transaction,
      $.transaction_to,
      $.transaction_from,
      $.scoped_transaction,
      $.reference
    ),

    comment: $ => token(seq('//', /.*/)),

    entry: $ => seq(
      'entry',
      '{',
        repeat($._statement),
      '}'
    ),

    entry_keyword: $ => alias(token('entry'), 'entry_keyword'),

    reference: $ => seq(
      'reference', '{',
        repeat($._statement),
      '}'
    ),

    id: $ => seq(
      'id', '{',
        repeat($._statement),
      '}'
    ),

    date: $ => seq(
      'date', '{',
        repeat($._statement),
      '}'
    ),

    details: $ => seq(
      'details', '{',
        repeat($._statement),
      '}'
    ),

    assignment: $ => seq($.identifier, '=', $._value),

    transaction: $ => seq(
      'for', '(', $.entity_reference, ')', 'in', '(', $.entity_reference, ')', '{',
          repeat($._transaction_statement),
      '}'
    ),

    transaction_to: $ => seq(
      'to', '(', $.entity_reference, ')', 'in', '(', $.entity_reference, ')', '{',
          repeat($._transaction_statement),
      '}'
    ),

    transaction_from: $ => seq(
      'from', '(', $.entity_reference, ')', 'in', '(', $.entity_reference, ')', '{',
          repeat($._transaction_statement),
      '}'
    ),

    scoped_transaction: $ => seq(
      'in', '(', $.entity_reference, ')', '{',
          repeat(choice($.transaction, $._transaction_statement)),
      '}'
    ),

    _transaction_statement: $ => choice(
      $.assignment,
      $.special_transaction
    ),

    special_transaction: $ => seq(
      choice('add', 'rm', 'remove', 'sub', 'subtract', 'credit', 'debit'),
      $.number
    ),

    entity_reference: $ => seq(
      $.identifier, repeat(seq('->', $.identifier))
    ),

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,
    _value: $ => choice(
      $.number,
      $.string,
      $.boolean
    ),
    number: $ => /\d+(\.\d+)?/,
    string: $ => seq('{', /[^}]*/, '}'),
    boolean: $ => choice('true', 'false')
  }
});
