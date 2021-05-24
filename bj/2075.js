const readline = require('readline');

const minHeap = () => {
  const heap = [];
  function getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  function getLeftChildIndex(index) {
    return index * 2 + 1;
  }
  function getRightChildIndex(index) {
    return index * 2 + 2;
  }
  function swap(a, b) {
    const temp = heap[a];
    heap[a] = heap[b];
    heap[b] = temp;
  }

  function push(x) {
    heap.push(x);
    let index = heap.length - 1;
    while (index > 0) {
      const parentIndex = getParentIndex(index);
      if (heap[index] < heap[parentIndex]) {
        swap(parentIndex, index);
        index = parentIndex;
      } else break;
    }
  }

  function pop() {
    if (heap.length === 0) return undefined;
    if (heap.length === 1 || heap.length === 2) return heap.shift();
    let index = 0;
    const minVal = heap[0];
    heap[0] = heap.pop();
    if (heap.length === 2) {
      if (heap[0] > heap[1]) swap(0, 1);
      return minVal;
    }
    while (index < heap.length) {
      const lcIndex = getLeftChildIndex(index);
      const rcIndex = getRightChildIndex(index);
      if (lcIndex >= heap.length && rcIndex >= heap.length) break;
      if (lcIndex < heap.length && rcIndex >= heap.length) {
        if (heap[index] > heap[lcIndex]) swap(index, lcIndex);
        break;
      }
      if (lcIndex < heap.length && rcIndex < heap.length) {
        const minIndex = heap[lcIndex] < heap[rcIndex] ? lcIndex : rcIndex;
        if (heap[index] > heap[minIndex]) {
          swap(index, minIndex);
          index = minIndex;
        } else break;
      }
    }
    return minVal;
  }
  function isEmpty() {
    return heap.length === 0;
  }
  function getLength() {
    return heap.length;
  }
  function showHeap() {
    console.log(heap);
  }
  return { push, pop, isEmpty, getLength, showHeap };
};

const priorityQue = () => {
  const pq = [];
  const getParentIndex = (index) => {
    return Math.floor((index - 1) / 2);
  };
  const getChildIndex = (index) => {
    return [index * 2 + 1, index * 2 + 2];
  };
  const getLastIndex = () => {
    return pq.length - 1;
  };
  const swap = (a, b) => {
    const temp = pq[a];
    pq[a] = pq[b];
    pq[b] = temp;
  };
  const push = (key, value) => {
    pq.push([key, value]);
    let index = getLastIndex();
    while (index > 0) {
      const parentIndex = getParentIndex(index);
      const parent = pq[parentIndex][0];
      const child = pq[index][0];
      if (parent > child) {
        swap(parentIndex, index);
        index = parentIndex;
      } else break;
    }
  };
  const pop = () => {
    const minNode = pq[0];
    const lastIndex = getLastIndex();
    const pqLen = pq.length;
    pq[0] = pq[lastIndex];

    if (pqLen === 0) return undefined;
    if (pqLen === 1) {
      pq.shift();
      return minNode;
    }

    let index = 0;
    while (index <= lastIndex) {
      const [leftChildIndex, rightChildIndex] = getChildIndex(index);
      if (leftChildIndex > lastIndex && rightChildIndex > lastIndex) break;
      else if (rightChildIndex > lastIndex) {
        if (pq[index][0] > pq[leftChildIndex][0]) {
          swap(index, leftChildIndex);
          index = leftChildIndex;
        } else break;
      } else {
        const minChildIndex =
          pq[leftChildIndex][0] > pq[rightChildIndex][0]
            ? rightChildIndex
            : leftChildIndex;
        if (pq[index][0] > pq[minChildIndex][0]) {
          swap(index, minChildIndex);
          index = minChildIndex;
        } else break;
      }
    }
    return minNode;
  };
  const getElement = (index) => {
    return pq[index];
  };
  const checkQue = () => pq;
  return { push, pop, getElement, checkQue };
};

const solve = (n, heap) => {
  const arr = [];
  while (!heap.isEmpty()) {
    const val = heap.pop();
    arr.push(val);
  }
  console.log(arr[0]);
};

const input = () => {
  let n;
  let count = 0;
  const heap = minHeap();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', (line) => {
    if (!n) {
      n = +line;
    } else {
      const arr = line.split(' ').map((el) => +el);
      arr.map((el) => {
        const heapLength = heap.getLength();
        if (heapLength === n) {
          const minValue = heap.pop();
          if (minValue > el) {
            heap.push(minValue);
          } else {
            heap.push(el);
          }
        } else {
          heap.push(el);
        }
      });
      count += 1;
      if (count === n) {
        solve(n, heap);
        rl.close();
      }
    }
  }).on('close', () => process.exit());
};

input();
