const readline = require('readline');

const solve = (arr) => {
  const n = Array(12).fill(-1);
  n[1] = 1;
  n[2] = 2;
  n[3] = 4;

  for (let i = 4; i < 12; i += 1) {
    n[i] = n[i - 3] + n[i - 2] + n[i - 1];
  }

  arr.map((el) => console.log(n[el]));
};
const input = () => {
  let t;
  const arr = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    if (!t) t = +line;
    else {
      arr.push(+line);
      if (arr.length === t) {
        solve(arr);
        rl.close();
      }
    }
  }).on('close', () => process.exit());
};
input();
