const readline = require("readline");

const solve = (x) => {
  const nums = [
    1,
    11,
    111,
    1111,
    2,
    22,
    222,
    2222,
    3,
    33,
    333,
    3333,
    4,
    44,
    444,
    4444,
    5,
    55,
    555,
    5555,
    6,
    66,
    666,
    6666,
    7,
    77,
    777,
    7777,
    8,
    88,
    888,
    8888,
    9,
    99,
    999,
    9999,
  ];
  let answer = 0;
  for (let i = 0; i < nums.length; i += 1) {
    answer += (i % 4) + 1;
    if (nums[i] === x) break;
  }
  return answer;
};

const input = () => {
  let t = 0;
  let cnt = 0;
  const result = [];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (line) => {
    if (t === 0) t = +line;
    else {
      result.push(solve(+line));
      cnt += 1;
      if (cnt === t) {
        result.map((r) => console.log(r));
        rl.close();
      }
    }
  }).on("close", () => process.exit());
};

input();
