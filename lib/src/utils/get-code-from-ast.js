"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeFromAst = void 0;
const _generator = __importDefault(require("@babel/generator"));
const _constants = require("prettier-plugin-emotion-order/lib/src/constants");
/**
 * This function generate a code string from the passed nodes.
 * @param nodes all imports
 * @param originalCode
 */
var getCodeFromAst = function (nodes, options) {
    var code = (0, _generator.default)(nodes, {
        importAttributesKeyword: options === null || options === void 0
            ? void 0
            : options.importOrderImportAttributesKeyword
    }).code;
    
    return (code.replace(/\/\/ TMP/g, '').replace(/"PRETTIER_PLUGIN_SORT_IMPORTS_NEW_LINE";/gi, _constants.newLineCharacters));
};
exports.getCodeFromAst = getCodeFromAst;
