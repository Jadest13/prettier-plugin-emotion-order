"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseStyledComponent = traverseStyledComponent;
const _types = __importDefault(require("@babel/types"));
const _sortObjectProperties = require("./sort-object-properties");
const single = ['body', 'left', 'right', 'consequent', 'alternate', 'argument'];
const multi = ['arguments', 'params'];
function traverseStyledComponent(node, key, config) {

  if(node[key].comments || node[key].leadingComments || node[key].trailingComments) {
    if(node[key].leadingComments) {
      node[key].leadingComments = node[key].leadingComments.filter((e) => e.value.trim() != 'TMP')
    }
  }

  if((0, _types.isObjectExpression)(node[key])) {
    node[key] = (0, _sortObjectProperties.sortObjectProperties)(node[key], config);
  } else {
    single.forEach((e) => {
      if(e in node[key])
        node[key][e] = traverseStyledComponent(node[key], e, config);
    })

    multi.forEach((e) => {
      if(e in node[key])
        node[key][e].map((_, i) => traverseStyledComponent(node[key][e], i, config));
    })
  }
  return node[key];
}