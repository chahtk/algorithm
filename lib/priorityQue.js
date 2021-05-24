const priorityQue = () => {
  const pq = [];
  const swap = (a, b) => {
    const temp = pq[a];
    pq[a] = pq[b];
    pq[b] = temp;
  };
  const getParentIndex = (index) => {
    return Math.floor((index - 1) / 2);
  };
  const getChildIndex = (index) => {
    return [index * 2 + 1, index * 2 + 2];
  };
  const push = (cost, node) => {
    pq.push([cost, node]);
    let index = pq.length - 1;
    while (index > 0) {
      const parentIndex = getParentIndex(index);
      if (pq[parentIndex][0] > pq[index][0]) {
        swap(parentIndex, index);
        index = parentIndex;
      } else break;
    }
  };
  const pop = () => {
    if (pq.length === 0) return undefined;
    if (pq.length === 1) return pq.pop();

    const minNode = pq[0];
    pq[0] = pq[pq.length - 1];
    pq.pop();
    let index = 0;
    while (index < pq.length) {
      const [leftChildIndex, rightChildIndex] = getChildIndex(index);
      if (leftChildIndex >= pq.length && rightChildIndex >= pq.length) break;
      if (rightChildIndex >= pq.length) {
        if (pq[leftChildIndex][0] < pq[index][0]) {
          swap(leftChildIndex, index);
          index = leftChildIndex;
        } else break;
      }
      if (leftChildIndex < pq.length && rightChildIndex < pq.length) {
        const minChildIndex =
          pq[leftChildIndex][0] < pq[rightChildIndex][0]
            ? leftChildIndex
            : rightChildIndex;
        if (pq[index][0] > pq[minChildIndex][0]) {
          swap(index, minChildIndex);
          index = minChildIndex;
        } else break;
      }
    }
    return minNode;
  };
  const len = () => pq.length;
  return { push, pop, len };
};
