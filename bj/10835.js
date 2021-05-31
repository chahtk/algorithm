/*
1. 언제든 왼쪽 카드, 양쪽 카드 버리기 가능. 점수는 없음
2. 왼쪽 카드의 숫자 > 오른쪽 카드 숫자 일 때, 오른쪽 카드 버리기 가능. 오른쪽 카드의 숫자만큼 점수 획득
3. 한 쪽 카드가 바닥나면 게임 종료.
=> 최종 점수의 최댓 값은?

1의 경우 왼쪽 카드만 버릴지 양쪽카드를 버릴지 어떻게 구분할 것인가?
우선 2번의 경우 무조건 오른쪽카드만 버려도 문제가 없을까? => 최댓값을 구하기 때문에 그렇다. 오른 카드를 많이 버릴수록 유리
그렇다면 1번의 조건은 'left >= right' 이다.
오른쪽 카드가 너무 크다면(왼쪽의 모든 값보다 크다면), 양쪽을 다버려야 하는데, 매번 이걸 체크하면 손해다.

dp[left][right] 로 구한다면?
*/

const readline = require('readline');

let maxValue = 0;
const dynamic = (dp, left, right, l, r) => {
  if (l === -1 || r === -1) {
    return 0;
  }
  if (dp[l][r] !== -1) {
    return dp[l][r];
  }
  if (left[l] > right[r]) {
    dp[l][r] = dynamic(dp, left, right, l, r - 1) + right[r];
  } else {
    const onlyLeft = dynamic(dp, left, right, l - 1, r);
    const both = dynamic(dp, left, right, l - 1, r - 1);
    dp[l][r] = Math.max(onlyLeft, both);
  }
  maxValue = Math.max(maxValue, dp[l][r]);
  return dp[l][r];
};

const solve = (n, left, right) => {
  const dp = Array.from(Array(n), () => Array(n).fill(-1));
  dynamic(dp, left, right, n - 1, n - 1);
  console.log(maxValue);
};

const input = () => {
  let n;
  let left = [];
  let right = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    if (!n) n = +line;
    else if (left.length === 0)
      left = line
        .split(' ')
        .map((el) => +el)
        .reverse();
    else {
      right = line
        .split(' ')
        .map((el) => +el)
        .reverse();
      solve(n, left, right);
      rl.close();
    }
  }).on('close', () => process.exit());
};

input();
