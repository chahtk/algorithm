const readline = require('readline');

const solve = (n, k, arr) => {
  const dp = Array.from(Array(101), () => Array(100001).fill(0));
  for (let i = 0; i <= n; i += 1) {
    if (i === 0) {
      const [a, b, c, d] = arr[i];
      dp[i][a] = b;
      dp[i][c] = d;
      continue;
    }
    for (let j = 0; j <= k; j += 1) {
      if (dp[i - 1][j] === 0) continue;
      const [a, b, c, d] = arr[i - 1];
      const one = dp[i - 1][j];
      const two = j + a <= k ? dp[i][j + a] : 0;
      const three = j + c <= k ? dp[i][j + c] : 0;
      dp[i][j + a] = Math.max(one + b, two);
      dp[i][j + c] = Math.max(one + d, three);
    }
  }
  let ans = 0;
  for (let i = 0; i <= k; i += 1) {
    ans = Math.max(dp[n][i], ans);
  }
  console.log(ans);
};

(() => {
  let n;
  let k;
  const arr = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    if (!n) {
      [n, k] = line.split(' ').map((el) => +el);
    } else {
      const input = line.split(' ').map((el) => +el);
      arr.push(input);
      if (arr.length === n) {
        solve(n, k, arr);
        process.exit();
      }
    }
  });
})();
