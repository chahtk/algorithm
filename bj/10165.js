const readline = require("readline");

const solve = (route) => {
  const result = {};
  let firstInFlag = true;

  route.sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    return b[1] - a[1];
  });
  route.reduce((prev, cur) => {
    if (firstInFlag && prev === route[0]) {
      firstInFlag = false;
      result[prev[2]] = [prev[0], prev[1]];
    }
    if (prev[0] > cur[0]) {
      result[cur[2]] = [cur[0], cur[1]];
      return cur;
    }
    return prev;
  });
  return Object.keys(result).map((key) => +key);
};

const input = () => {
  let n;
  let m;
  const route = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (line) => {
    if (!n) n = +line;
    else if (!m) m = +line;
    else {
      let [a, b] = line.split(" ").map((el) => +el);
      if (b > a) {
        b += 10;
        a += 10;
      } else if (b === 0) {
        a += 10;
        b += 20;
      } else {
        b += 10;
      }
      route.push([a, b, route.length + 1]);
      if (route.length === m) {
        const answer = solve(route);
        console.log(answer.join(" "));
        rl.close();
      }
    }
  }).on("close", () => process.exit());
};

input();
