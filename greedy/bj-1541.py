inputStr = input().split('-')
result = 0

def splitAboutPlus(item):
  result = 0
  splitPlus = item.split('+')
  for num in splitPlus:
    temp = 0
    for idx, val in enumerate(num):
      temp += (10**(len(num)-(idx+1))) * int(val)
    result += temp
  return result

if inputStr[0] == '':
  del inputStr[0]
else:
  result += splitAboutPlus(inputStr[0]) * 2

for item in inputStr:
  result -= splitAboutPlus(item)

print(result)
