def recursive(num, val, result):
  if num == 0:
    return True
  
  if num - val >= 0:
    result.append(val)
    recursive(num - val, val - 1, result)
  else:
    recursive(num, val - 1, result)

def sol():
  num = int(input())

  if num > 45:
    return -1
  elif num < 10:
    return num

  result = []
  recursive(num, 9, result)
  result.sort()
  answer = ''
  for element in result:
    answer += str(element)
  return answer
  
if __name__ == '__main__':
    tc = int(input())
    result = []
    for _ in range(tc):
      result.append(sol())
    for i in range(tc):
      print(result[i])