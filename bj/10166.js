const readline = require("readline");

const getFloat = (num) => {
  return +num.toFixed(5).toString();
};

const uclid = (a, b) => {
  if (a === b) return a;
  let r = 0;
  let big = a > b ? a : b;
  let small = a < b ? a : b;
  while (true) {
    r = getFloat(big % small);
    if (r === 0) break;
    big = small;
    small = r;
  }
  return small;
};

const getAngles = (angle) => {
  const cnt = getFloat(360 / angle);
  const arr = new Array(cnt).fill(0);
  const angles = arr.map((v, idx) => angle * idx);
  return angles;
};

const getCount = (arr) => {
  const answerSet = new Set();
  Object.keys(arr).map((key) => {
    arr[key].forEach((val) => {
      answerSet.add(val);
    });
  });
  return answerSet.size;
};

const solve = ([startNum, endNum]) => {
  const angles = {};
  for (let i = startNum; i <= endNum; i += 1) {
    const angleI = getFloat(360 / i);
    for (let j = i; j <= endNum; j += 1) {
      const angleJ = getFloat(360 / j);
      const remainder = uclid(angleI, angleJ);
      if (remainder === angleJ) {
        if (angles[angleI]) delete angles[angleI];
        angles[angleJ] = getAngles(angleJ);
      }
    }
  }
  return getCount(angles);
};

const inputData = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (line) => {
    const inputNums = line.split(" ").map((num) => +num);
    const answer = solve(inputNums);
    console.log(answer);
    rl.close();
  }).on("close", () => {
    process.exit();
  });
};

inputData();
