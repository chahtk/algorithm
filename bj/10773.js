const readline = require('readline');

const sumArr = (arr) => {
  return arr.reduce((acc, cur) => acc + cur);
};

const solve = (inputArr) => {
  const que = [];

  inputArr.map((v) => {
    if (v === 0) que.pop();
    else que.push(v);
  });
  const result = que.length === 0 ? 0 : sumArr(que);
  return result;
};

const input = () => {
  let k;
  let cntK = 0;
  const inputArr = [];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', (line) => {
    if (!k) k = +line;
    else {
      inputArr.push(+line);
      cntK += 1;
      if (k === cntK) {
        const answer = solve(inputArr);
        console.log(answer);
        rl.close();
      }
    }
  }).on('close', () => process.exit());
};

input();
