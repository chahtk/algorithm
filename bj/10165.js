const readline = require("readline");

const sortCB = (a, b) => {
  if (a[1] === b[1]) {
    if (a[0] > a[1] && b[0] > b[1]) return a[0] - b[0];
    if (a[0] > a[1] || b[0] > b[1]) return b[0] - a[0];
    return a[0] - b[0];
  }
  return b[1] - a[1];
};

const filterCB = (minS, maxE) => {
  return (r) => {
    if (r[0] < r[1]) {
      if (minS > r[0] && maxE < r[1]) return true;
      return false;
    }
    return true;
  };
};

const solve = (route, minS, maxE) => {
  const result = {};
  let firstInFlag = true;

  route.sort(sortCB);
  const removeIncludeRoute = route.filter(filterCB(minS, maxE));

  removeIncludeRoute.reduce((prev, cur) => {
    if (firstInFlag) {
      result[prev[2]] = [prev[0], prev[1]];
      firstInFlag = false;
    }
    if ((prev[1] - prev[0]) * (cur[1] - cur[0]) > 0) {
      if (prev[0] > cur[0]) {
        result[cur[2]] = [cur[0], cur[1]];
        return cur;
      }
    } else {
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
  let maxE = -1; // 얘보다 작으면 포함
  let minS = 1e9 + 1; // 얘보다 크면 포함
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
      if (a > b) {
        maxE = maxE < b ? b : maxE;
        minS = minS > a ? a : minS;
      }
      route.push([a, b, route.length + 1]);
      if (route.length === m) {
        const answer = solve(route, minS, maxE);
        console.log(answer.join(" "));
        rl.close();
      }
    }
  }).on("close", () => process.exit());
};

input();
