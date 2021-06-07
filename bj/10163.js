const readline = require('readline');

const solve = (n, input) => {
  const board = Array.from(Array(101), () => Array(101).fill(0));
  const result = {};

  input.map((val, index) => {
    result[index + 1] = 0;
    const [x, y, w, h] = val;
    for (let i = 0; i < w; i += 1) {
      for (let j = 0; j < h; j += 1) {
        const check = board[y + j][x + i];
        if (check !== 0) {
          result[check] -= 1;
        }
        result[index + 1] += 1;
        board[y + j][x + i] = index + 1;
      }
    }
  });
  Object.keys(result)
    .sort((a, b) => Number(a) - Number(b))
    .map((key) => {
      console.log(result[key]);
    });
};

(() => {
  let n;
  const input = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    if (!n) n = +line;
    else {
      const [x, y, w, h] = line.split(' ').map((el) => +el);
      input.push([x, y, w, h]);
      if (input.length === n) {
        solve(n, input);
        process.exit();
      }
    }
  });
})();
