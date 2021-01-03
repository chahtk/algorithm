tc = int(input())
total = []
for _ in range(tc):
  seqLength = int(input())
  seq = list(map(int, input().split()))
  
  result = []

  for i in range(seqLength//2):
    result.append(seq[i])
    result.append(seq[seqLength-1-i])
  if seqLength%2 == 1:
    result.append(seq[seqLength//2])
  total.append(result)

for i in range(tc):
  answer = ''
  for num in total[i]:
    answer += str(num) + ' '
  answer.rstrip()
  print(answer)