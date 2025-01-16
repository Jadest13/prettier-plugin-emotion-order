const formatAST = require("../src/formatter");

test("should format the AST without modification (placeholder)", () => {
  const mockAST = {
    type: "File",
    program: {
      body: [],
    },
  };
  const formattedAST = formatAST(mockAST);
  expect(formattedAST).toEqual(mockAST);
});
