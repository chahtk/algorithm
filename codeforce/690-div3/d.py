import sys

def allElementSame(arr):
  return min(arr) == max(arr)

def getIndexOfMinVal(arr):
  minValue = 1e6
  minIndex = -1
  for i, v in enumerate(arr):
    if minValue > v:
      minIndex = i
      minValue = v
  return minIndex

def choiceNeighbour(arr, index):
  leftNeighbour = arr[index-1] if index > 0 else 1e6
  rightNeighbour = arr[index+1] if index + 1 < len(arr) else 1e6
  return index - 1 if leftNeighbour < rightNeighbour else index + 1

def solv():
  int(input())
  problemList = list(map(int, sys.stdin.readline().split()))
  cnt = 0
  while not allElementSame(problemList):
    minIndex = getIndexOfMinVal(problemList)
    neighbourIndex = choiceNeighbour(problemList, minIndex)
    problemList[neighbourIndex] += problemList[minIndex]
    del problemList[minIndex]
    cnt += 1
  return cnt

if __name__ == '__main__':
  tc = int(sys.stdin.readline().rstrip())
  answer = []
  
  for _ in range(tc):
    answer.append(solv())
  
  for i in answer:
    print(i)