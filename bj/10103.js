const readline = require("readline");

const solve = (scores) => {
  let scoreA = 100;
  let scoreB = 100;

  scores.map(([a, b]) => {
    if (a > b) scoreB -= a;
    if (b > a) scoreA -= b;
  });
  console.log(`${scoreA}\n${scoreB}`);
};

const input = () => {
  let n = 0;
  let cnt = 0;
  const scores = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on("line", (line) => {
    if (!n) n = +line;
    else {
      const [x, y] = line.split(" ").map((el) => +el);
      scores.push([x, y]);
      cnt += 1;
      if (cnt === n) solve(scores);
    }
  }).on("close", () => process.exit());
};

input();
