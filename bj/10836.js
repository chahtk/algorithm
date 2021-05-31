const readline = require('readline');

const solve = (m, reduced) => {
  const arr = Array.from(Array(m), () => Array(m).fill(1));
  reduced.map((el, index) => {
    // index : 0 ~ 2m-2
    if (index < m) {
      arr[m - 1 - index][0] += el;
    } else {
      // arr[0:m-1][m - index + 1] += el;
      for (let i = 0; i < m; i += 1) {
        arr[i][index - m + 1] += el;
      }
    }
  });
  // console.log({ reduced, arr });
  arr.map((row) => {
    console.log(row.join(' '));
  });
};

const input = () => {
  let m;
  let n;
  let reduced = [];
  let count = 0;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    if (!m) {
      [m, n] = line.split(' ').map((el) => +el);
      reduced = Array(2 * m - 1).fill(0);
    } else {
      let [zero, one, two] = line.split(' ').map((el) => +el);
      // reduced[zero:zero+one-1] += 1
      // reduced[zero+one:] += 2
      for (let i = 0; i < one; i += 1) {
        reduced[zero + i] += 1;
      }
      for (let i = 0; i < two; i += 1) {
        reduced[zero + one + i] += 2;
      }
      count += 1;
      if (count === n) {
        solve(m, reduced);
        rl.close();
      }
    }
  }).on('close', () => process.exit());
};
input();
