const generator = require("@babel/generator").default;

module.exports = (ast) => {
  return generator(ast, {
    compact: false,
    retainLines: false, // 불필요한 줄 유지 비활성화
    comments: true,       // 주석 유지
    concise: false,       // 간결한 출력 사용 안 함
  }).code;
}