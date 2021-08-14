const readline = require('readline');

/*
  1. y 정렬(오름차순) -> set y range(1~750000): 섬 개수 만큼의 범위로 재설정 -> 세그먼트 트리를 위해
  2. x 정렬(오름차순)
  3. x 앞에서부터 쭉 가면서, y정보를 인덱스로 삼아 세그먼트 트리 업데이트 하면서, 자신보다 큰 y 구간의 합 찾기
*/

const setRangeY = (islands) => {
  let range = 1;
  let prev = islands[0][1];
  return islands.map(([x, y]) => {
    if (y !== prev) {
      prev = y;
      range += 1;
    }
    return [x, range];
  });
};

const fenwick = (arr) => {
  const tree = new Array(75001).fill(0);
  const update = (i, add) => {
    while (i <= tree.length) {
      tree[i] += add;
      i += i & -i;
      // console.log(`newI : ${i}, tree[${i}] : ${tree[i]}`);
    }
  };
  const sum = (i) => {
    let val = 0;
    while (i > 0) {
      val += tree[i];
      i -= i & -i;
    }
    return val;
  };
  const show = () => {
    console.log(tree.slice(1, 10));
  };
  return { update, sum, show };
};

const solve = (islands) => {
  islands.sort((a, b) => a[1] - b[1]);
  const newRange = setRangeY(islands);
  newRange.sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1];
    return a[0] - b[0];
  });
  const fw = fenwick(newRange);

  const answer = newRange.reduce((acc, cur, i) => {
    acc += fw.sum(75000) - fw.sum(cur[1] - 1);
    // console.log(fw.sum(75000), fw.sum(cur[1]));
    fw.update(cur[1], 1);
    return acc;
  }, 0);
  // fw.show();
  return answer;
};

const input = () => {
  let t;
  let n;
  let island = [];
  const testcases = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    if (!t) t = +line;
    else if (!n) n = +line;
    else {
      island.push(line.split(' ').map((el) => +el));
      if (island.length === n) {
        n = undefined;
        testcases.push(island);
        island = [];
      }
      if (testcases.length === t) {
        testcases.forEach((tc) => {
          console.log(solve(tc));
        });
        process.exit();
      }
    }
  });
};

input();
