

const fs = require("fs");
const path = require("path");
const prettify = require("./src/index");

// 입력 파일 경로
const inputFilePath = path.join(__dirname, "input.ts");
// 출력 파일 경로
const outputFilePath = path.join(__dirname, "output.ts");

// 입력 파일 읽기
fs.readFile(inputFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading input file:", err.message);
    process.exit(1);
  }

  try {
    // Prettify 적용
    const formattedCode = prettify(data);

    // 출력 파일에 저장
    fs.writeFile(outputFilePath, formattedCode, (writeErr) => {
      if (writeErr) {
        console.error("Error writing to output file:", writeErr.message);
        process.exit(1);
      }
      console.log(`Formatted code written to: ${outputFilePath}`);
    });
  } catch (formatErr) {
    console.error("Error formatting code:", formatErr.message);
    process.exit(1);
  }
});
const t = require("@babel/core").types;

const generator = require("@babel/generator").default;


// const binaryExpression = t.binaryExpression("+", t.identifier("a"), t.identifier("b"));
// console.log(binaryExpression)
// console.log(generator(binaryExpression, {
//   compact: false,
//   retainLines: true,    // 줄 번호 유지
//   comments: true,       // 주석 유지
//   concise: false,       // 간결한 출력 사용 안 함
// }).code);