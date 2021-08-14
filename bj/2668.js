const readline = require("readline");

const checkCycle = (n, arr, start) => {
  const cycle = [];
  const visit = Array(n).fill(false);

  const dfs = (x) => {
    if (!visit[x]) {
      visit[x] = true;
      cycle.push(x + 1);
      return dfs(arr[x] - 1);
    } else if (x === start) {
      return true;
    }
    return false;
  }
  const isCycle = dfs(start);
  if (isCycle) return cycle;
}

const solve = (n, arr) => {
  const set = new Set([]);

  for (let i=0; i< n; i+=1) {
    const result = checkCycle(n, arr, i);
    if (result) {
      set.add(...result);
    }
  }
  console.log(set.size);
  Array.from(set)
  .sort((a,b) => a-b)
  .map(el => {console.log(el)})
  
}

const input = () => {
  let n;
  const secondline = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    if (!n) {
      n = +line;
    } else {
      secondline.push(+line);
      if (secondline.length === n) {
        solve(n, secondline);
        process.exit();
      }
    }
  });
}

input();
