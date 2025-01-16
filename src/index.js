const parseCode = require("./parser");
const formatAST = require("./formatter");
const generateCode = require("./generator");

module.exports = (code) => {
  const ast = parseCode(code);
  const formattedAST = formatAST(ast);
  return generateCode(formattedAST).replace(/\/\/ temp line/g, "");
}

// var options = {
//   importOrder: {
//       type: 'path',
//       category: 'Global',
//       array: true,
//       default: [{ value: [] }],
//       description: 'Provide an order to sort imports.',
//   },
//   importOrderCaseInsensitive: {
//       type: 'boolean',
//       category: 'Global',
//       default: false,
//       description: 'Provide a case sensitivity boolean flag',
//   },
//   importOrderParserPlugins: {
//       type: 'path',
//       category: 'Global',
//       array: true,
//       // By default, we add ts and jsx as parsers but if users define something
//       // we take that option
//       default: [{ value: ['typescript', 'jsx'] }],
//       description: 'Provide a list of plugins for special syntax',
//   },
//   importOrderSeparation: {
//       type: 'boolean',
//       category: 'Global',
//       default: false,
//       description: 'Should imports be separated by new line?',
//   },
//   importOrderGroupNamespaceSpecifiers: {
//       type: 'boolean',
//       category: 'Global',
//       default: false,
//       description: 'Should namespace specifiers be grouped at the top of their group?',
//   },
//   importOrderSortSpecifiers: {
//       type: 'boolean',
//       category: 'Global',
//       default: false,
//       description: 'Should specifiers be sorted?',
//   },
// };
// module.exports = {
//   parsers: {
//       babel: __assign(__assign({}, parser_babel_1.parsers.babel), { preprocess: default_processor_1.defaultPreprocessor }),
//       flow: __assign(__assign({}, parser_flow_1.parsers.flow), { preprocess: default_processor_1.defaultPreprocessor }),
//       typescript: __assign(__assign({}, parser_typescript_1.parsers.typescript), { preprocess: default_processor_1.defaultPreprocessor }),
//       vue: __assign(__assign({}, parser_html_1.parsers.vue), { preprocess: vue_preprocessor_1.vuePreprocessor }),
//   },
//   options: options,
// };
