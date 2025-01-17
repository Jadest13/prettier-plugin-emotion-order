"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocessor = preprocessor;
var parser_1 = require("@babel/parser");
var traverse_ast_nodes_1 = require("@jadest/prettier-plugin-sort-imports/lib/src/utils/utils/traverse-ast-nodes");


// var extract_ast_nodes_1 = require("@jadest/prettier-plugin-sort-imports/lib/src/utils/extract-ast-nodes");
// var get_code_from_ast_1 = require("@jadest/prettier-plugin-sort-imports/lib/src/utils/get-code-from-ast");
var get_code_from_ast_1 = require("@jadest/prettier-plugin-sort-imports/lib/src/utils/utils/get-code-from-ast");
var get_experimental_parser_plugins_1 = require("@jadest/prettier-plugin-sort-imports/lib/src/utils/get-experimental-parser-plugins");
const _get_config_option = require("@jadest/prettier-plugin-sort-imports/lib/src/utils/utils/get-config-option");
function preprocessor(code, options) {
    var emotionOrderParserPlugins = options.emotionOrderParserPlugins, importOrder = options.importOrder, importOrderCaseInsensitive = options.importOrderCaseInsensitive, importOrderSeparation = options.importOrderSeparation, importOrderGroupNamespaceSpecifiers = options.importOrderGroupNamespaceSpecifiers, importOrderSortSpecifiers = options.importOrderSortSpecifiers, importOrderSideEffects = options.importOrderSideEffects, importOrderImportAttributesKeyword = options.importOrderImportAttributesKeyword;
    var parserOptions = {
        sourceType: 'module',
        plugins: (0, get_experimental_parser_plugins_1.getExperimentalParserPlugins)(emotionOrderParserPlugins),
    };
    var ast = (0, parser_1.parse)(code, parserOptions);

    const config = (0, _get_config_option.getConfigOption)(options);
    
    ast = (0, traverse_ast_nodes_1.traverseASTNodes)(ast, config);
    
    const res = (0, get_code_from_ast_1.getCodeFromAst)(ast, {
        importOrderImportAttributesKeyword: importOrderImportAttributesKeyword,
        ...options,
    })
    return res;
}
