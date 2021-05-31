const readline = require('readline');

const solve = (n) => {
  const dp = Array(31).fill(0);
  dp[0] = 1;
  dp[2] = 3;
  for (let i = 4; i < 31; i += 2) {
    dp[i] = dp[i - 2] * 3;
    for (let j = 4; i - j >= 0; j += 2) {
      // 특이 케이스. 4, 6, 8, 일 때마다 새로운 케이스들이 생기는데 그것들을 더한다.
      dp[i] += dp[i - j] * 2;
    }
  }
  console.log(dp[n]);
};

const input = () => {
  let n;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    n = +line;
    solve(n);
    rl.close();
  }).on('close', () => process.exit());
};

input();
