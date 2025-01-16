const formatAST = require("../src/formatter");
const parseCode = require("../src/parser");

test("should apply Hello formatting when Hello is true", () => {
  const inputCode = `const x = a + b;`;
  const ast = parseCode(inputCode);

  // Hello 옵션 적용
  const formattedAST = formatAST(ast);

  // Hello 규칙 테스트 (변수명과 연산자 줄 바꿈)
  expect(
    formattedAST.program.body[0].declarations[0].id.leadingComments
  ).toEqual(
    expect.arrayContaining([
      { type: "CommentLine", value: " Hello formatting applied " },
    ])
  );
});
