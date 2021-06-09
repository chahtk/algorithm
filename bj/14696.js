/*
< 승리 조건 : 다음 우선순으로 많은 것들. 같다면 다음 조건으로 >
1. 별 4
2. 동그라미 3
3. 네모 2
4. 세모 1
5. 다 같다면 무승부
*/

const readline = require('readline');

const solve = (n, A, B) => {
  // round
  for (let i = 0; i < n; i += 1) {
    const aBit = Array(5).fill(0);
    const bBit = Array(5).fill(0);
    A[i].map((el, idx) => {
      if (idx === 0) return;
      aBit[el] += 1;
    });
    B[i].map((el, idx) => {
      if (idx === 0) return;
      bBit[el] += 1;
    });
    for (let j = 4; j >= 0; j -= 1) {
      if (j === 0) {
        console.log('D');
        break;
      }
      if (aBit[j] > bBit[j]) {
        console.log('A');
        break;
      }
      if (aBit[j] < bBit[j]) {
        console.log('B');
        break;
      }
    }
  }
};

(() => {
  let n;
  const A = [];
  const B = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    if (!n) n = +line;
    else if (A.length === B.length) {
      A.push(line.split(' ').map((el) => +el));
    } else {
      B.push(line.split(' ').map((el) => +el));
      if (B.length === n) {
        solve(n, A, B);
        process.exit();
      }
    }
  });
})();
