const readline = require("readline");

const gcd = (a, b) => {
  return a % b ? gcd(b, a % b) : b;
};

const solve = (s, e) => {
  let answer = 0;
  const visit = Array.from(Array(2001), () => Array(2001).fill(0));
  for (let i = s; i <= e; i += 1) {
    for (let j = 1; j <= i; j += 1) {
      const GCD = gcd(i, j);
      if (visit[j / GCD][i / GCD] === 0) {
        visit[j / GCD][i / GCD] = 1;
        answer += 1;
      }
    }
  }
  return answer;
};

const input = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (line) => {
    const [s, e] = line.split(" ").map((el) => +el);
    const answer = solve(s, e);
    console.log(answer);
    rl.close();
  }).on("close", () => process.exit());
};

input();
