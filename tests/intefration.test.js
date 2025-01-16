const prettify = require("../src/index");

test("should format JavaScript code", () => {
  const inputCode = `const tmp=(a,b)=>{\nreturn a+b}`;
  const outputCode = prettify(inputCode);
  const expectedCode = `const tmp = (a, b) => {\n  return a + b;\n};`;
  console.log(outputCode);
  console.log(expectedCode);
  expect(outputCode.trim()).toBe(expectedCode.trim());
});
