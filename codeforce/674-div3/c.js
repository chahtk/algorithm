const readline = require("readline");

const sumArr = (arr) => {
  return arr.reduce((acc, cur) => acc + cur);
};

const solve = (n) => {
  let cnt = 0;
  const que = [];
  que.push([0, [1]]);
  while (1) {
    const now = que.shift();
    if (sumArr(now[1]) >= n) return now[0];
    for (let i = 0; i < now[1].length; i += 1) {
      const addArr = JSON.parse(JSON.stringify(now[1]));
      const copyArr = JSON.parse(JSON.stringify(now[1]));

      addArr[i] += 1;
      copyArr.push(copyArr[i]);

      que.push([now[0] + 1, addArr]);
      que.push([now[0] + 1, copyArr]);
    }
  }
};

const input = () => {
  let tc = 0;
  let tcCnt = 0;
  const result = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (line) => {
    if (!tc) tc = +line;
    else {
      const n = +line;
      const ans = solve(n);
      result.push(ans);
      tcCnt += 1;
      if (tcCnt === tc) {
        result.map((r) => console.log(r));
        rl.close();
      }
    }
  }).on("close", () => process.exit());
};

input();
