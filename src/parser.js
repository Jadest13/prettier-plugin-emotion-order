const parser = require("@babel/parser");

module.exports = (code) => {
  return parser.parse(code, { sourceType: "module", plugins: ["jsx", "typescript"] });
}
