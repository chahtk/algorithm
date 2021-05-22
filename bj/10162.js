const readline = require('readline');

const solve = (T) => {
  const buttons = [300, 60, 10];
  let t = T;
  let result = '';

  buttons.map((btn) => {
    result += `${Math.floor(t / btn)} `;
    t %= btn;
  });

  return t === 0 ? result : -1;
};

const inputData = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', (line) => {
    const T = +line;
    const answer = solve(T);
    console.log(answer);
    rl.close();
  }).on('close', () => {
    process.exit();
  });
};

inputData();
