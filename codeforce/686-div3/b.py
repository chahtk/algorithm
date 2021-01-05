def solv():
  n = int(input())
  arr = list(map(int, input().split()))
  dictionary = {}

  for i, v in enumerate(arr):
    if not v in dictionary:
      dictionary[v] = i + 1
    else:
      dictionary[v] = -1
  
  answer = -1

  for key in sorted(dictionary.keys()):
    if dictionary[key] != -1:
      answer = dictionary[key]
      break
  return answer

if __name__ == '__main__':
    tc = int(input())
    result = []
    for _ in range(tc):
      result.append(solv())
    
    for r in result:
      print(r)