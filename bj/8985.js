const readline = require("readline");

const sortByY = (arr) => {
  const copyArr = JSON.parse(JSON.stringify(arr));
  copyArr.sort((a, b) => a[0] - b[0]);
  return copyArr;
};

let totalTime = 0;

const DC = (leftX, rightX, y, whole) => {
  const water = (rightX - leftX) * y;
  let time = 0;
  let leftWholesNum = 0;
  let rightWholesNum = 0;
  const nearWhole = whole.shift();
  if (nearWhole) {
    // need next whole and use this whole's x. so call function to get left or rigth
    // 1. 큐의 첫 번째(남은 것들 중 y가 작은)의 x좌표를 비교한다.
    // 2. 작으면 왼, 크면 오른을 수행
    // 3. 두 번째를 비교한다. 만약 첫 뻔째와 같다면 수행하지않고, 다르다면 수행한다.
    const next1 = whole[0];
    const next2 = whole[1];

    if (next1 && next1[1] < nearWhole[1])
      leftWholesNum = DC(leftX, nearWhole[1], nearWhole[0], whole);
    if (next2 && next2[1] > nearWhole[2])
      rightWholesNum = DC(nearWhole[2], rightX, nearWhole[0], whole);
    const wholesNum = leftWholesNum + rightWholesNum + 1;
    time = water / wholesNum;
    totalTime += time;
    return wholesNum;
  }
  return 0;
};

const solve = (sticks, whole) => {
  const sortedWhole = sortByY(whole);
  DC(
    0,
    sticks[sticks.length - 1][2],
    sticks[sticks.length - 1][0],
    sortedWhole
  );
};

const input = () => {
  let n = 0;
  let k = 0;
  let cntN = 0;
  let cntK = 0;
  const stick = [];
  const whole = [];
  let temp = [];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on("line", (line) => {
    if (!n) n = +line;
    else if (cntN !== n) {
      if (cntN !== 0 && cntN !== n - 1) {
        temp.push(line.split(" ").map((el) => +el));
        if (cntN % 2 === 0) {
          stick.push([temp[0][1], temp[0][0], temp[1][0]]);
          temp = [];
        }
      }
      cntN += 1;
    } else if (!k) {
      k = +line;
    } else if (cntK !== k) {
      const inputWhole = line.split(" ").map((el) => +el);
      whole.push([inputWhole[1], inputWhole[0], inputWhole[2]]);
      cntK += 1;
      if (k === cntK) {
        solve(stick, whole);
        console.log(totalTime);
      }
    }
  }).on("close", () => process.exit());
};

input();
