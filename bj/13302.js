/*
하루: 10,000
3일: 25,000 (+ 쿠폰1)
5일: 37,000 (+ 쿠폰2)

dp[day][coupon]
*/

const readline = require('readline');

const MAX = 1e8;
const ONE = 10000;
const THREE = 25000;
const FIVE = 37000;
const checkingVisitDay = (n, arr) => {
  const visit = Array(n + 1).fill(true);
  arr.map((el) => {
    visit[el] = false;
  });
  return visit;
};

const dynamic = (visit, dp, n, day, coupon, price) => {
  if (day > n) return price;
  if (dp[day][coupon] !== -1) return dp[day][coupon] + price;
  if (!visit[day]) return dynamic(visit, dp, n, day + 1, coupon, price);

  const a = dynamic(visit, dp, n, day + 1, coupon, price + ONE);
  const b = dynamic(visit, dp, n, day + 3, coupon + 1, price + THREE);
  const c = dynamic(visit, dp, n, day + 5, coupon + 2, price + FIVE);
  const d =
    coupon >= 3 ? dynamic(visit, dp, n, day + 1, coupon - 3, price) : MAX;
  const min = Math.min(a, b, c, d);
  dp[day][coupon] = min - price;
  return min;
};

const solve = (n, m, arr) => {
  const visit = checkingVisitDay(n, arr);
  const dp = Array.from(Array(n + 1), () => Array(101).fill(-1));
  const res = dynamic(visit, dp, n, 1, 0, 0);
  console.log(res);
  process.exit();
};
(() => {
  let n;
  let m;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    if (!n) {
      [n, m] = line.split(' ').map((el) => +el);
      if (m === 0) {
        solve(n, m, []);
      }
    } else {
      const arr = line.split(' ').map((el) => +el);
      solve(n, m, arr);
    }
  });
})();
