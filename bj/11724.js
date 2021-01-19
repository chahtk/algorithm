const readline = require('readline');

const solve = (n, m, edges) => {
  const visit = Array.from(Array(n + 1).fill(false));
  const matrix = Array.from(Array(n + 1), () => Array(n + 1).fill(false));
  const que = [];
  let answer = 0;

  edges.map(([a, b]) => {
    matrix[a][b] = true;
    matrix[b][a] = true;
  });

  for (let i = 1; i <= n; i += 1) {
    if (visit[i]) continue;
    answer += 1;
    que.push(i);
    while (que.length > 0) {
      const vertex = que.shift();
      matrix[vertex].map((v, j) => {
        if (j === 0) return;
        if (v) {
          visit[vertex] = true;
          if (visit[j] === false) {
            visit[j] = true;
            que.push(j);
          }
        }
      });
    }
  }
  return answer;
};

const input = () => {
  let n;
  let m;
  let countM = 0;
  const edges = [];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    if (!n) [n, m] = line.split(' ').map((el) => +el);
    else {
      edges.push(line.split(' ').map((el) => +el));
      countM += 1;
      if (countM === m) {
        const answer = solve(n, m, edges);
        console.log(answer);
        rl.close();
      }
    }
  }).on('close', () => process.exit());
};

input();
