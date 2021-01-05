import sys

def solv():
  n = int(input())
  arr = list(map(int, sys.stdin.readline().rstrip().split()))

  diction = {}
  for i, v in enumerate(arr):
    if not v in diction:
      diction[v] = [i]
      continue
    diction[v].append(i)
  
  countArr = []

  for key in diction.keys():
    keyArr = diction[key]
    
    cnt = 0
    prev = -1

    if keyArr[0] != 0:
      cnt += 1
    if keyArr[len(keyArr) - 1 ] != n - 1:
      cnt += 1
    
    for index in keyArr:
      if prev + 1 != index and prev != -1:
        cnt += 1
      prev = index
    countArr.append(cnt)
  
  return min(countArr)

if __name__ == '__main__':
    tc = int(input())
    result = []
    for _ in range(tc):
      result.append(solv())
    for r in result:
      print(r)
    