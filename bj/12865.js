const readline = require('readline');

const solve = (n, k, arr) => {
  const dp = Array.from(Array(101), () => Array(100001).fill(0));
  for (let i = 1; i <= n; i += 1) {
    for (let j = 1; j <= k; j += 1) {
      if (j - arr[i - 1][0] >= 0)
        dp[i][j] = Math.max(
          dp[i - 1][j],
          dp[i - 1][j - arr[i - 1][0]] + arr[i - 1][1]
        );
      else dp[i][j] = dp[i - 1][j];
    }
  }
  console.log(dp[n][k]);
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
    if (!n) [n, k] = line.split(' ').map((el) => +el);
    else {
      arr.push(line.split(' ').map((el) => +el));
      if (arr.length === n) {
        solve(n, k, arr);
        process.exit();
      }
    }
  });
})();
