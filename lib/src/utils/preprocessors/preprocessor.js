"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocessor = preprocessor;
const _parser = require("@babel/parser");
const _traverse_ast_nodes = require("prettier-plugin-emotion-order/lib/src/utils/traverse-ast-nodes");

const _get_code_from_ast = require("prettier-plugin-emotion-order/lib/src/utils/get-code-from-ast");
const _get_experimental_parser_plugins = require("prettier-plugin-emotion-order/lib/src/utils/parsers/get-experimental-parser-plugins");
const _get_config_option = require("prettier-plugin-emotion-order/lib/src/utils/get-config-option");
function preprocessor(code, options) {
    var emotionOrderParserPlugins = options.emotionOrderParserPlugins, importOrder = options.importOrder, importOrderCaseInsensitive = options.importOrderCaseInsensitive, importOrderSeparation = options.importOrderSeparation, importOrderGroupNamespaceSpecifiers = options.importOrderGroupNamespaceSpecifiers, importOrderSortSpecifiers = options.importOrderSortSpecifiers, importOrderSideEffects = options.importOrderSideEffects, importOrderImportAttributesKeyword = options.importOrderImportAttributesKeyword;
    var parserOptions = {
        sourceType: 'module',
        plugins: (0, _get_experimental_parser_plugins.getExperimentalParserPlugins)(emotionOrderParserPlugins),
    };
    var ast = (0, _parser.parse)(code, parserOptions);

    const config = (0, _get_config_option.getConfigOption)(options);
    
    ast = (0, _traverse_ast_nodes.traverseASTNodes)(ast, config);
    
    const res = (0, _get_code_from_ast.getCodeFromAst)(ast, {
        importOrderImportAttributesKeyword: importOrderImportAttributesKeyword,
        ...options,
    })
    return res;
}
