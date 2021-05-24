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
