def method1():
  a, b = input().split()
  print(int(a), int(b))

def method2():
  a, b = map(int, input().split())
  print(a + b)

def method3():
  import sys
  a, b = map(int, sys.stdin.readline().split())
  print(a + b)

method3()