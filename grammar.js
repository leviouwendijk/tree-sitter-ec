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
      'id', 
        choice(
          $._id_new,
          $._id_block
        ),
    ),

    _id_block: $ => seq(
      '{',
          $.number,
      '}'
    ),

    _id_new: $ => seq(
      $.assignment,
      $.dynamic_id
    ),


    date: $ => seq(
      'date',
        choice(
          $._date_new,
          $._date_block
        )
    ),
    
    _date_block: $ => seq(
      '{',
        repeat($._date_options),
      '}'
    ),

    _date_new: $ => seq(
      $.assignment,
      $.dynamic_date
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

    dynamic_id: $ => seq(
      choice(
        'new',
        'local'
      ),
    ),

    dynamic_date: $ => seq(
      choice(
        'now',
        'yesterday',
        'tomorrow',
        'last month',
        'next month',
        'last quarter',
        'next quarter',
        'last year',
        'next year',
      ),
    ),

    _date_options: $ => seq(
      choice(
        $.days, $.months, $.years
      ),
    ),

    days: $ => seq(
      choice(
        'monday', 
        'mon', 
        'tuesday', 
        'tue', 
        'wednesday', 
        'wed', 
        'thursday', 
        'thu', 
        'friday', 
        'fri', 
        'saturday', 
        'sat', 
        'sunday', 
        'sun', 
      ),
      $.number // until 7?
    ),

    months: $ => seq(
      choice(
        'january', 'jan', 
        'february', 'feb', 
        'march', 'mar', 
        'april', 'apr', 
        'may', 'may', 
        'june', 'jun', 
        'july', 'jul', 
        'august', 'aug', 
        'october', 'oct', 
        'november', 'nov', 
        'december', 'dec'
      ),
      $.number // until 12
    ),

    years: $ => seq(
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
