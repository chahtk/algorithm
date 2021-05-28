const readline = require('readline');

const INF = 2e9;
const solve = (n, m, edge) => {
  const dist = Array(n + 1).fill(INF);
  dist[1] = 0;
  for (let i = 0; i < n + 1; i += 1) {
    for (let j = 0; j < m; j += 1) {
      const [s, e, t] = edge[j];
      if (dist[s] !== INF && dist[e] > dist[s] + t) {
        if (i === n) {
          console.log(-1);
          return;
        }
        dist[e] = dist[s] + t;
      }
    }
  }
  for (let i = 2; i < n + 1; i += 1) {
    const res = dist[i] !== INF ? dist[i] : -1;
    console.log(res);
  }
};

const input = () => {
  let n;
  let m;
  const edge = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    if (!n) {
      [n, m] = line.split(' ').map((el) => +el);
    } else {
      const [s, e, t] = line.split(' ').map((el) => +el);
      edge.push([s, e, t]);
      if (edge.length === m) {
        solve(n, m, edge);
        rl.close();
      }
    }
  }).on('close', () => process.exit());
};

input();
