const readline = require("readline");

const getXYofO = (m, o) => {
  const x = Math.floor((o - 1) / m);
  const y = (o - 1) % m;
  return [x, y];
};

const findPath = (board, start, end) => {
  for (let i = start[0]; i <= end[0]; i += 1) {
    for (let j = start[1]; j <= end[1]; j += 1) {
      if (i === start[0] || j === start[1]) board[i][j] = 1;
      else board[i][j] = board[i - 1][j] + board[i][j - 1];
    }
  }
  return board[end[0]][end[1]];
};

const solve = ([n, m, o]) => {
  const board = Array.from(Array(n), () => Array(m).fill(0));
  let answer = 1;
  let x = 0;
  let y = 0;

  if (o !== 0) {
    [x, y] = getXYofO(m, o);
    answer = findPath(board, [0, 0], [x, y]);
  }
  answer *= findPath(board, [x, y], [n - 1, m - 1]);
  return answer;
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
