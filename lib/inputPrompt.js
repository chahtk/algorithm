const readline = require("readline");

const input = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (line) => {
    console.log(line);
    rl.close();
  }).on("close", () => process.exit());
};

export default input;
