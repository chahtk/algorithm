const readline = require('readline');

const solve = (n) => {
  let answer = 0;
  const result = new Set();
  // 등차 수열 체크 (d가 1일 때, 맨 앞을 하나씩 늘려가면서 n보다 같거나 작은지 체크)
  // 크게 되면 브레이크하고 다음 d로 이동
  for (let d = 1; d <= 9; d += 1) {
    for (let first = 1; first <= 9; first += 1) {
      let prev = first;
      let temp = first.toString();
      if (first > n) break;
      result.add(first.toString());
      while (true) {
        const now = prev + d;
        prev = now;
        if (now > 9) break;
        temp += now.toString();
        if (+temp > n) break;
        result.add(temp);
      }
      prev = first;
      temp = first.toString();
      while (true) {
        const now = prev - d;
        prev = now;
        if (now < 0) break;
        temp += now.toString();
        if (+temp > n) break;
        result.add(temp);
      }
      temp = first.toString();
      while (true) {
        temp += first.toString();
        if (+temp > n) break;
        result.add(temp);
      }
    }
  }
  console.log(result.size);
};

const input = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', (line) => {
    solve(+line);
    rl.close();
  }).on('close', () => process.exit());
};

input();
