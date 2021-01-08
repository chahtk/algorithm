const readline = require("readline");

const solve = (tiles) => {
  let flag = false;
  tiles.map((tile) => {
    if (tile[1] === tile[2]) flag = true;
  });
  return flag;
};

const input = () => {
  let tc = 0;
  let tcCount = 0;
  let n;
  let m;
  let inputCnt = 0;
  let inputArr = [];
  let prevTile = [];
  const result = [];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (line) => {
    if (tc === 0) tc = +line;
    else if (!n) {
      [n, m] = line.split(" ").map((el) => +el);
    } else {
      prevTile.push(...line.split(" ").map((el) => +el));
      inputCnt += 1;
      if (inputCnt % 2 === 0) {
        inputArr.push(prevTile);
        prevTile = [];
      }
      if (inputCnt === 2 * n) {
        let answer;
        if (m % 2 === 1) answer = "NO";
        else answer = solve(inputArr) ? "YES" : "NO";
        result.push(answer);
        inputCnt = 0;
        inputArr = [];
        n = undefined;
        tcCount += 1;
        if (tcCount === tc) {
          result.map((r) => console.log(r));
          rl.close();
        }
      }
    }
  }).on("close", () => process.exit());
};

input();
