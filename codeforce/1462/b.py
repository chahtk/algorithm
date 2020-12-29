tc = int(input())

result = []

for _ in range(tc):
  strLength = int(input())
  inputStr = input()
  answer = 'NO'
  for i in range(5):
    testStr = inputStr[0:i] + inputStr[strLength - 4 + i : strLength]
    if testStr == '2020':
      answer = 'YES'

  result.append(answer)

for i in result:
  print(i)
