"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseASTNodes = traverseASTNodes;
const _traverse = __importDefault(require("@babel/traverse"));
const _types = __importDefault(require("@babel/types"));
const _traverseStyledComponent = require("./traverse-styled-component");
function traverseASTNodes(ast, config) {
    let depth = 0;
    (0, _traverse.default)(ast, {
        enter: function (path) {
            depth++;
            // console.log(' '.repeat(depth), depth, path.node.type);
        },
        exit: function () {
            depth--;
        },
        CallExpression: (path) => {
            const callee = path.node.callee;
            if(
              ((0, _types.isMemberExpression)(callee) && (0, _types.isIdentifier)(callee.object, { name: "styled" })) ||
              ((0, _types.isCallExpression)(callee) && (0, _types.isIdentifier)(callee.callee, { name: "styled" }))
            ) {
            (0, _traverseStyledComponent.traverseStyledComponent)(path, 'node', config);
            }
        }
    })
    return ast;
}
