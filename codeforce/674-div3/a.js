const { COPYFILE_FICLONE_FORCE } = require("constants");
const readline = require("readline");

let tc = 0;
let endCnt = 0;

const solve = (n, x) => {
  let prev = 0;
  let floor = 0;
  while (1) {
    if (prev + 1 > n) break;
    if (floor === 0) prev = 2;
    else prev += x;
    floor += 1;
  }
  return floor;
};

const input = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (line) => {
    if (tc === 0) tc = +line;
    else {
      const [n, x] = line.split(" ").map((el) => +el);
      const answer = solve(n, x);
      console.log(answer);
      endCnt += 1;
      if (endCnt === tc) rl.close();
    }
  }).on("close", () => process.exit());
};

input();
