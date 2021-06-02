const readline = require('readline');

const mySort = (a, b) => {
  if (a[0] === b[0]) return b[1] - a[1];
  return a[0] - b[0];
};
const solve = (n, m, route) => {
  // route : [start, end, number]
  route.sort(mySort);
  route.push(route[0]); // 마지막 - 첫번째 비교로 첫번째를 res에 넣기 위해서
  let prev = [...route[0]];
  const res = []; // 삭제 되는 루트 저장

  for (let i = 1; i < m + 1; i += 1) {
    if (prev[2] === route[i][2]) continue;
    // console.log(prev, route[i]);
    // first case: 둘 다 (s < e) -> 끝 비교
    if (prev[0] < prev[1] && route[i][0] < route[i][1]) {
      if (prev[1] >= route[i][1]) {
        res.push(route[i][2]);
      } else prev = [...route[i]];
    }
    // second case: 둘 다 (s > e) -> 둘의 e에 n을 더하고 비교
    if (prev[0] > prev[1] && route[i][0] > route[i][1]) {
      if (prev[1] + n >= route[i][1] + n) {
        res.push(route[i][2]);
      } else prev = [...route[i]];
    }
    // third case: route[i]가 s > e. 둘의 끝 비교하고 route가 크면 이전거 삭제
    if (prev[0] < prev[1] && route[i][0] > route[i][1]) {
      if (prev[0] === route[i][0] && prev[1] < route[i][1] + n) {
        res.push(prev[2]);
      }
      prev = [...route[i]];
    }
    // fourth case: prev가 route를 무조건 포함
    if (prev[0] > prev[1] && route[i][0] < route[i][1]) {
      res.push(route[i][2]);
    }
  }
  res.sort((a, b) => a - b);
  let count = 0;
  let answer = '';
  for (let i = 1; i <= m; i += 1) {
    if (res[count] === i) {
      count += 1;
      continue;
    }
    answer += `${i} `;
  }
  console.log(answer);
  process.exit();
};

const input = () => {
  let n;
  let m;
  let routeNumber = 1;
  const route = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    if (!n) n = +line;
    else if (!m) m = +line;
    else {
      route.push([...line.split(' ').map((el) => +el), routeNumber]);
      routeNumber += 1;
      if (route.length === m) {
        solve(n, m, route);
      }
    }
  });
};

input();
