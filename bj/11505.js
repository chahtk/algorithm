const readline = require('readline');

const segTree = (n, arr) => {
  const SIZE = n * 4;
  const node = Array(SIZE).fill(0);

  const init = (index, s, e) => {
    if (s > e) return 0;
    if (s === e) {
      node[index] = arr[s];
    } else {
      const mid = Math.floor((s + e) / 2);
      node[index] = init(index * 2, s, mid) * init(index * 2 + 1, mid + 1, e);
    }
    return node[index];
  };
  const update = (index, s, e, tI, diff) => {
    if (tI < s || tI > e) return;
    node[index] += diff;
    if (s === e) return;
    const mid = Math.floor((s + e) / 2);
    update(index * 2 + 1, mid + 1, e, tI, diff);
    update(index * 2, s, mid, tI, diff);
  };
  const search = (index, s, e, tS, tE) => {
    if (s > tE || e < tS) return 0;
    if (tS <= s && e <= tE) return node[index];
    const mid = Math.floor((s + e) / 2);
    return (
      (search(index * 2, s, mid, tS, tE) *
        search(index * 2 + 1, mid + 1, e, tS, tE)) %
      1000000007
    );
  };
  init(1, 0, n - 1);

  return { update, search };
};

const solve = (n, m, k, nums, query) => {
  const seg = segTree(n, nums);
  query.map(([a, b, c]) => {
    // a=1 => update(b,c) , a=2 => search(b,c)
    if (a === 1) seg.update(1, 0, n - 1, b, c - nums[b - 1]);
    if (a === 2) console.log(seg.search(1, 0, n - 1, b, c));
  });
};

(() => {
  let n;
  let m;
  let k;
  const nums = [];
  const query = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    if (!n) [n, m, k] = line.split(' ').map((el) => +el);
    else if (nums.length < n) nums.push(+line);
    else {
      query.push(line.split(' ').map((el) => +el));
      if (query.length === m + k) {
        solve(n, m, k, nums, query);
        process.exit();
      }
    }
  });
})();
