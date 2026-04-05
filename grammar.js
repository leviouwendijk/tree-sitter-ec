/**
 * @file Parser for entry compiler files.
 * @author Levi Ouwendijk <leviouwendijk@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const commaSep1 = (rule) => seq(rule, repeat(seq(",", rule)), optional(","));

module.exports = grammar({
    name: "ec",

    word: $ => $.identifier,

    extras: $ => [
        /[\s\uFEFF\u2060\u200B]+/,
    ],

    conflicts: $ => [],

    rules: {
        source_file: $ => repeat($._top_level_item),

        _top_level_item: $ => choice(
            $.settings_document,
            $.entity_document,
            $.entry_document,
            $.reference_document,
            $.assignment,
            $.directive_statement,
            $.comment
        ),

        comment: $ => token(seq("//", /.*/)),

        settings_document: $ => seq(
            "settings",
            "{",
            repeat($._generic_item),
            "}"
        ),

        entity_document: $ => seq(
            "entity",
            "{",
            repeat($._generic_item),
            "}"
        ),

        entry_document: $ => seq(
            "entry",
            "{",
            repeat($._entry_item),
            "}"
        ),

        reference_document: $ => seq(
            "reference",
            "{",
            repeat($._generic_item),
            "}"
        ),

        _entry_item: $ => choice(
            $.for_in_clause,
            $.in_clause,
            $.transactions_block,
            $.transaction_ref,
            $.use_alias_statement,
            $.unit_block,
            $.assignment,
            $.directive_statement,
            $.text_block,
            $.simple_block,
            $.headed_block,
            $.call_statement,
            $.comment,
            $.text_line
        ),

        _generic_item: $ => choice(
            $.use_alias_statement,
            $.unit_block,
            $.assignment,
            $.directive_statement,
            $.text_block,
            $.simple_block,
            $.headed_block,
            $.call_statement,
            $.comment,
            $.text_line
        ),

        assignment: $ => seq(
            field("left", $.assignable),
            "=",
            field("right", $._value)
        ),

        assignable: $ => choice(
            $.path,
            $.identifier
        ),

        use_alias_statement: $ => prec(3, seq(
            "use",
            "alias",
            field("alias", choice(
                $.identifier,
                $.symbol,
                $.path
            ))
        )),

        unit_block: $ => prec(3, seq(
            "unit",
            optional(seq(
                "of",
                field("owner", choice(
                    $.identifier,
                    $.symbol,
                    $.path
                ))
            )),
            optional(field("alias", choice(
                $.identifier,
                $.symbol,
                $.path
            ))),
            "{",
            repeat($._generic_item),
            "}"
        )),

        directive_statement: $ => prec.left(1, seq(
            field("head", $.identifier),
            repeat1(field("argument", $._directive_arg))
        )),

        text_block: $ => seq(
            field("name", choice("display", "details")),
            "{",
            repeat(choice(
                $.comment,
                $.text_line
            )),
            "}"
        ),

        simple_block: $ => seq(
            field("name", $.identifier),
            "{",
            repeat($._generic_item),
            "}"
        ),

        headed_block: $ => seq(
            field("name", $.identifier),
            repeat1(field("argument", $._directive_arg)),
            "{",
            repeat($._generic_item),
            "}"
        ),

        call_statement: $ => seq(
            field("callee", seq(
                $.path_segment,
                repeat1(seq(choice("->", "."), $.path_segment))
            )),
            "(",
            optional(commaSep1($._value)),
            ")"
        ),

        for_in_clause: $ => seq(
            "for",
            field("entity", $.ref_target),
            "in",
            field("account", $.paren_ref_list),
            field("body", $.posting_body)
        ),

        in_clause: $ => seq(
            "in",
            field("account", $.paren_ref_list),
            choice(
                field("body", $.posting_body),
                seq(
                    "{",
                    repeat1($.nested_for_clause),
                    "}"
                )
            )
        ),

        nested_for_clause: $ => seq(
            "for",
            field("entity", $.ref_target),
            field("body", $.posting_body)
        ),

        posting_body: $ => seq(
            "{",
            repeat(choice(
                $.assignment,
                $.directive_statement,
                $.text_block,
                $.simple_block,
                $.headed_block,
                $.call_statement,
                $.comment,
                $.text_line
            )),
            "}"
        ),

        transactions_block: $ => seq(
            "transactions",
            "{",
            repeat(choice(
                $.transaction_ref,
                $.comment
            )),
            "}"
        ),

        transaction_ref: $ => seq(
            "ref",
            commaSep1($.number)
        ),

        ref_target: $ => choice(
            $.paren_ref_list,
            $.call_atom,
            $.path,
            $.identifier,
            $.symbol
        ),

        paren_ref_list: $ => seq(
            "(",
            commaSep1(choice(
                $.path,
                $.identifier,
                $.symbol
            )),
            ")"
        ),

        path: $ => choice(
            seq(
                $.path_segment,
                repeat1(seq(choice("->", "."), $.path_segment))
            ),
            seq(
                $.identifier,
                repeat1($.variant_suffix)
            )
        ),

        path_segment: $ => seq(
            $.identifier,
            repeat($.variant_suffix)
        ),

        call_atom: $ => seq(
            $.identifier,
            "(",
            optional(commaSep1($._value)),
            ")"
        ),

        variant_suffix: $ => seq(
            "#",
            $.identifier
        ),

        _directive_arg: $ => choice(
            $.paren_ref_list,
            $.date_literal,
            $.number,
            $.string_literal,
            $.boolean,
            $.nil_literal,
            $.identifier,
            $.symbol,
            $.path
        ),

        _value: $ => choice(
            $.date_literal,
            $.number,
            $.string_literal,
            $.boolean,
            $.nil_literal,
            $.identifier,
            $.symbol,
            $.path
        ),

        date_literal: $ => token(/\d{4}-\d{2}-\d{2}/),
        number: $ => token(/-?\d+(?:\.\d+)?/),
        string_literal: $ => token(seq('"', repeat(choice(/[^"\\]+/, /\\./)), '"')),
        nil_literal: $ => "nil",
        boolean: $ => choice("true", "false"),

        identifier: $ => token(/[A-Za-z_][A-Za-z0-9_]*/),
        symbol: $ => token(/[A-Za-z_][A-Za-z0-9_]*(?:\/[A-Za-z0-9_]+)+/),

        text_line: $ => token(prec(-1, /[^{}\n][^{}\n]*/)),
    }
});
