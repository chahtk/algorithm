const readline = require('readline');

const dyanmic = (dp, x, a, b, c, minVal) => {
  let A;
  let B;
  let C;
  if (x < minVal) return 0;
  if (dp[x] !== -1) return dp[x];

  A = dyanmic(dp, x - a, a, b, c, minVal);
  B = dyanmic(dp, x - b, a, b, c, minVal);
  C = dyanmic(dp, x - c, a, b, c, minVal);
  dp[x] = A || B || C;
  return dp[x];
};

const solve = (a, b, c, n) => {
  /*
  n = ax + by + cz 를 만족하는 x,y,z가 있다면 1, 없다면 0
  ex) a=5, b=9, c=12, n=113 일때
      dp[113] = dp[113-12] || dp[113-9] || dp[113-5]
  */
  const dp = Array(301).fill(-1);
  dp[a] = 1;
  dp[b] = 1;
  dp[c] = 1;
  const minVal = Math.min(a, b, c);
  const res = dyanmic(dp, n, a, b, c, minVal);
  console.log(res);
};

(() => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    const [a, b, c, n] = line.split(' ').map((el) => +el);
    solve(a, b, c, n);
    process.exit();
  });
})();
