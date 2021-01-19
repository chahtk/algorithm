const readline = require("readline");

const getSegmentArr = (arr) => {
  const segments = [];
  let temp = [-1, -1];
  arr.map((v, i) => {
    if (v === 1) {
      if (temp[0] === -1) temp[0] = i;
      else if (temp[1] === -1) temp[1] = i;
      else temp[1] += 1;
      if (i === arr.length - 1) {
        if (temp[1] === -1) temp[1] = temp[0];
        segments.push(temp);
      }
    } else if (temp[0] !== -1) {
      if (temp[1] === -1) temp[1] = temp[0];
      segments.push(temp);
      temp = [-1, -1];
    }
  });
  return segments;
};

const solve = (arr) => {
  let segments = getSegmentArr(arr);
  let answer = 0;
  // console.log(segments);
  while (segments.length > 1) {
    let diffMin = 50;
    let idxMin = 50;
    segments.reduce((prev, cur, index) => {
      const diff = cur[0] - prev[1];
      if (diffMin > diff) {
        diffMin = diff;
        idxMin = index;
      }
      return cur;
    });
    // move right
    segments[idxMin - 1][0] += 1;
    segments[idxMin - 1][1] += 1;
    // check contiguous
    if (segments[idxMin][0] - segments[idxMin - 1][1] === 1) {
      segments[idxMin - 1][1] = segments[idxMin][1];
      segments.splice(idxMin, 1);
    }
    // console.log(segments);
    answer += 1;
  }
  return answer;
};

const input = () => {
  let t;
  let tCnt = 0;
  let n;
  const result = [];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (line) => {
    if (!t) t = +line;
    else if (!n) n = +line;
    else {
      const arr = line.split(" ").map((el) => +el);
      result.push(solve(arr));
      n = undefined;
      tCnt += 1;
      if (t === tCnt) {
        result.map((r) => console.log(r));
        rl.close();
      }
    }
  }).on("close", () => process.exit());
};

input();
