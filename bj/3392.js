const readline = require('readline');

const maxY = 30001;

const sortXY = (a, b) => {
  if (a[0] === b[0]) {
    if (a[2] === b[2]) return b[1] - a[1];
    return b[2] - a[2];
  }
  return a[0] - b[0];
};

const getLines = (maps) => {
  const lines = [];
  maps.forEach(([x1, y1, x2, y2]) => {
    lines.push([x1, y1, y2, 1]);
    lines.push([x2, y1, y2, -1]);
  });
  lines.sort(sortXY);
  return lines;
};

const segment = () => {
  const count = Array(4 * maxY).fill(0);
  const active = Array(4 * maxY).fill(0);

  const update = ([y1, y2, add], node, s, e) => {
    if (e < y1 || y2 < s) return;
    if (y1 <= s && e <= y2) count[node] += add;
    else {
      const mid = Math.floor((s + e) / 2);
      update([y1, y2, add], node * 2, s, mid);
      update([y1, y2, add], node * 2 + 1, mid + 1, e);
    }
    if (count[node] === 0) {
      if (s === e) active[node] = 0;
      else active[node] = active[node * 2] + active[node * 2 + 1];
    } else {
      active[node] = e - s + 1;
    }
  };
  const sum = (dx) => {
    return (active[1] - 1) * dx;
  };

  return { update, sum };
};

const solve = (maps) => {
  let answer = 0;
  let prevX = -1;

  const lines = getLines(maps);
  const sg = segment();

  lines.forEach(([x, y1, y2, add]) => {
    if (prevX >= 0) {
      const dx = x - prevX;
      answer += sg.sum(dx);
    }
    sg.update([y1, y2, add], 1, 0, maxY);
    prevX = x;
  });
  console.log(answer);
};

const input = () => {
  let n;
  const maps = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    if (!n) n = +line;
    else {
      maps.push(line.split(' ').map((el) => +el));
      if (maps.length === n) {
        solve(maps);
        process.exit();
      }
    }
  });
};

input();
