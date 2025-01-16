const parseCode = require("../src/parser");

test("should parse JavaScript code into an AST", () => {
  const code = `function add(a, b) { return a + b; }`;
  const ast = parseCode(code);
  expect(ast.type).toBe("File");
  expect(ast.program.body[0].type).toBe("FunctionDeclaration");
});
