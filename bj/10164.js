const readline = require("readline");

const findPath = (start, end, path) => {
  const dx = [0, 1]; // 행
  const dy = [1, 0]; // 열
  let countPathO = 0;

  const que = [];
  que.push(start);

  while (que.length) {
    const [x, y] = que.shift();
    if (x === end[0] && y === end[1]) {
      countPathO += 1;
      continue;
    }

    for (let i = 0; i < 2; i += 1) {
      const ndx = x + dx[i];
      const ndy = y + dy[i];
      if (ndx <= end[0] && ndy <= end[1]) {
        que.push([ndx, ndy]);
      }
    }
  }
  return countPathO;
};

const solve = ([n, m, o]) => {
  let cnt = 1;
  let ox = 0;
  let oy = 0;
  const board = Array.from(Array(n), () => new Array(m));
  const path = Array.from(Array(n), () => Array(m).fill(0));
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < m; j += 1) {
      board[i][j] = cnt;
      if (cnt === o) {
        ox = i;
        oy = j;
      }
      cnt += 1;
    }
  }

  let countPathO = 1;
  if (o !== 0) countPathO = findPath([0, 0], [ox, oy], path);
  const countPathX = findPath([ox, oy], [n - 1, m - 1], path);
  return countPathO * countPathX;
};

const inputData = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (line) => {
    const inputNums = line.split(" ").map((l) => +l);
    const answer = solve(inputNums);
    console.log(answer);
    rl.close();
  }).on("close", () => {
    process.exit();
  });
};

inputData();
