const readline = require('readline');

const INF = 1e6 + 1;

const priorityQue = () => {
  const pq = [];
  const swap = (a, b) => {
    const temp = pq[a];
    pq[a] = pq[b];
    pq[b] = temp;
  };
  const getParentIndex = (index) => {
    return Math.floor((index - 1) / 2);
  };
  const getChildIndex = (index) => {
    return [index * 2 + 1, index * 2 + 2];
  };
  const push = (cost, node) => {
    pq.push([cost, node]);
    let index = pq.length - 1;
    while (index > 0) {
      const parentIndex = getParentIndex(index);
      if (pq[parentIndex][0] > pq[index][0]) {
        swap(parentIndex, index);
        index = parentIndex;
      } else break;
    }
  };
  const pop = () => {
    if (pq.length === 0) return undefined;
    if (pq.length === 1) return pq.pop();

    const minNode = pq[0];
    pq[0] = pq[pq.length - 1];
    pq.pop();
    let index = 0;
    while (index < pq.length) {
      const [leftChildIndex, rightChildIndex] = getChildIndex(index);
      if (leftChildIndex >= pq.length && rightChildIndex >= pq.length) break;
      if (rightChildIndex >= pq.length) {
        if (pq[leftChildIndex][0] < pq[index][0]) {
          swap(leftChildIndex, index);
          index = leftChildIndex;
        } else break;
      }
      if (leftChildIndex < pq.length && rightChildIndex < pq.length) {
        const minChildIndex =
          pq[leftChildIndex][0] < pq[rightChildIndex][0]
            ? leftChildIndex
            : rightChildIndex;
        if (pq[index][0] > pq[minChildIndex][0]) {
          swap(index, minChildIndex);
          index = minChildIndex;
        } else break;
      }
    }
    return minNode;
  };
  const len = () => pq.length;
  return { push, pop, len };
};

const initRelation = (n) => {
  return Array.from(Array(n + 1), () => Array(n + 1).fill(INF));
};
const initDist = (n, x) => {
  const dist = Array(n + 1).fill(INF);
  dist[x] = 0;
  return dist;
};

const getDistByPriorityQue = (n, pq, rel, dist, x) => {
  pq.push(0, x);
  while (pq.len() > 0) {
    const top = pq.pop();
    if (!top) break;
    const [cost, node] = top;
    for (let i = 1; i < n + 1; i += 1) {
      const nextCost = rel[node][i];
      if (dist[i] > cost + nextCost) {
        dist[i] = cost + nextCost;
        pq.push(dist[i], i);
      }
    }
  }
};

const solve = (n, revRel, relation, x) => {
  const revDist = initDist(n, x);
  const pq = priorityQue();
  getDistByPriorityQue(n, pq, revRel, revDist, x);

  const dist = initDist(n, x);
  const pq2 = priorityQue();
  getDistByPriorityQue(n, pq2, relation, dist, x);

  let result = 0;
  for (let i = 1; i < n + 1; i += 1) {
    result = Math.max(revDist[i] + dist[i], result);
  }
  console.log(result);
};

const input = () => {
  let n;
  let m;
  let x;
  let count = 0;
  let relation = [];
  let revRel = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.output,
  });
  rl.on('line', (line) => {
    if (!n) {
      [n, m, x] = line.split(' ').map((el) => +el);
      relation = initRelation(n);
      revRel = initRelation(n);
    } else {
      const [a, b, c] = line.split(' ').map((el) => +el);
      relation[a][b] = c;
      revRel[b][a] = c; // reverse for 'all to a' -> 'a to all'(dijkstra)
      count += 1;
      if (count === m) {
        solve(n, revRel, relation, x);
        rl.close();
      }
    }
  }).on('close', () => process.exit());
};

input();
