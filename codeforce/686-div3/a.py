from itertools import permutations

def solv():
  n = int(input())
  initialArr = [i+2 for i in range(n)]
  initialArr[n-1] = 1
  
  answer = ''
  for num in initialArr:
    answer += str(num) + ' '
  return answer

if __name__ == '__main__':
  tc = int(input())
  result = []

  for _ in range(tc):
    result.append(solv())
  
  for item in result:
    print(item)