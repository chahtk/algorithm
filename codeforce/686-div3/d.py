from math import sqrt

def solv():
  n = int(input())
  ans = {}
  ans[1] = [n]

  for v in range(2, int(sqrt(n+1) + 1 )):
    tempN = n
    prev = -1

    while True:
      prev = tempN
      if tempN % v != 0:
        break
      tempN = tempN // v
      if tempN % v == 0:
        if not v in ans: # init
          ans[v] = []
        ans[v].append(v)
      else:
        if prev == n:
          if tempN * v == n:
            if not v in ans: # init
              ans[v] = []
            ans[v].append(v)
            ans[v].append(tempN)
        else:
          if not v in ans: # init
            ans[v] = []
          ans[v].append(prev)
        break

  maxLength = -1
  ansStr = ''
  for ansKey in ans.keys():
    if maxLength < len(ans[ansKey]):
      flag = False # 유효성검사
      for i, v in enumerate(ans[ansKey]):
        if i + 1 == len(ans[ansKey]):
          break
        if ans[ansKey][i+1] % ans[ansKey][i] != 0:
          flag = True
      if flag:
        break
      tempStr = ''
      for item in ans[ansKey]:
        tempStr += str(item) + ' '
      ansStr = tempStr
      maxLength = len(ans[ansKey])
  return ansStr

if __name__ == '__main__':
  tc = int(input())
  result = []
  for _ in range(tc):
    result.append(solv())
  for r in result:
    print(len(r.split()))
    print(r)