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

  return { push, pop };
};
