const readline = require('readline');

const INF = 1e10;

const checkCycle = (n, edge, x, e) => {
  const visit = Array(n).fill(false);
  const stack = [];
  stack.push(x);
  visit[x] = true;
  const rel = Array.from(Array(n), () => new Array(0));
  edge.map(([a, b, c]) => {
    rel[a].push(b);
  });
  while (stack.length > 0) {
    const cur = stack.pop();
    if (cur === e) {
      return true;
    }
    for (let i = 0; i < rel[cur].length; i += 1) {
      const nextNode = rel[cur][i];
      if (!visit[nextNode]) {
        visit[nextNode] = true;
        stack.push(nextNode);
      }
    }
  }
  return false;
};

const solve = (n, m, edge, s, e, salary) => {
  const dist = Array(n).fill(INF);
  dist[s] = -salary[s];
  for (let i = 0; i < n + 1; i += 1) {
    for (let j = 0; j < m; j += 1) {
      const [a, b, c] = edge[j];
      if (dist[a] !== INF && dist[b] > dist[a] + c - salary[b]) {
        if (i === n) {
          if (dist[e] === INF) {
            console.log('gg');
            return;
          }
          const check = checkCycle(n, edge, b, e);
          if (check) {
            console.log('Gee');
            return;
          }
        }
        dist[b] = dist[a] + c - salary[b];
      }
    }
  }
  console.log(-dist[e]);
};
const input = () => {
  let n;
  let m;
  let s;
  let e;
  const edge = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    if (!n) {
      [n, s, e, m] = line.split(' ').map((el) => +el);
    } else if (edge.length === m) {
      const salary = line.split(' ').map((el) => +el);
      solve(n, m, edge, s, e, salary);
      rl.close();
    } else {
      const [a, b, c] = line.split(' ').map((el) => +el);
      edge.push([a, b, c]);
    }
  });
};

input();
