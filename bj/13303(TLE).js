const readline = require('readline');

const sortFunc = (a, b) => {
  if (a[0] === b[0]) {
    if (a[1] === b[1]) return b[2] - a[2];
    return a[1] - b[1];
  }
  return a[0] - b[0];
};

const solve = (startY, endX, inputArr) => {
  inputArr.sort(sortFunc);
  const que = [];
  que.push([0, startY, 0, 0]); // que : [x, y, dist]
  const res = {};
  let minDist = 1e9;
  while (que.length > 0) {
    const [x, y, dist, index] = que.shift();
    let flag = true; // for checking last

    for (let i = index; i < inputArr.length; i += 1) {
      const [curX, curYL, curYH] = inputArr[i];
      if (x >= curX) continue;
      if (curYL <= y && y <= curYH) {
        que.push([curX, curYH, dist + curX - x + curYH - y, i + 1]);
        que.push([curX, curYL, dist + curX - x + y - curYL, i + 1]);
        flag = false;
        break;
      }
    }
    if (flag) {
      res[y] = dist + endX - x;
      minDist = Math.min(minDist, res[y]);
    }
  }
  const keys = Object.keys(res);
  const resY = keys.join(' ');
  console.log(`${minDist}\n${keys.length} ${resY}`);
  process.exit();
};

(() => {
  let n;
  let startY;
  let endX;
  const inputArr = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    if (!n) n = +line;
    else if (!startY) {
      [startY, endX] = line.split(' ').map((el) => +el);
    } else {
      inputArr.push(line.split(' ').map((el) => +el));
      if (inputArr.length === n) solve(startY, endX, inputArr);
    }
  });
})();
