const readline = require('readline');

const mySort = (a, b) => {
  if (a[0] === b[0]) {
    return a[1] - b[1];
  }
  return a[0] - b[0];
};

const solve = (n, arr) => {
  arr.sort(mySort);
  let prev = [...arr[0]];
  let answer = n === 1 ? prev[1] - prev[0] : 0;

  for (let i = 1; i < n; i += 1) {
    if (arr[i][0] > prev[1]) {
      answer += prev[1] - prev[0];
      prev = [...arr[i]];
    } else {
      prev[1] = Math.max(prev[1], arr[i][1]);
    }
    if (i === n - 1) {
      answer += prev[1] - prev[0];
    }
  }
  console.log(answer);
};

const input = () => {
  let n;
  const arr = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    if (!n) n = +line;
    else {
      arr.push(line.split(' ').map((el) => +el));
      if (arr.length === n) {
        solve(n, arr);
        process.exit();
      }
    }
  });
};

input();
