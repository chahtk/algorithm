import sys

[n] = list(map(int, sys.stdin.readline().split()))
times = list(map(int, sys.stdin.readline().split()))

times.sort()
prev = 0
result = 0
for time in times:
  prev += time
  result += prev

print(result)