import sys
import copy

dj = [0, -1, -1, -1, 0, 1, 1, 1]
di = [-1, -1, 0, 1, 1, 1, 0, -1]
globalBoard = [[0]*4 for _ in range(4)]
answer = 0

def init():
  for i in range(4):
    temp = list(map(int, sys.stdin.readline().split()))
    for j in range(4):
      globalBoard[i][j] = [temp[j*2] - 1, temp[j*2+1] - 1] # [물고기 번호, 물고기 방향]

def printBoard(board):
  for i in range(4):
    print(board[i])

def getPositionFish(board, fishNumber): # 17 is shark
  for i in range(4):
    for j in range(4):
      if board[i][j][0] == fishNumber:
        return [i, j]
  return None

def getCandidateFishes(board, sharkX, sharkY):
  candidates = []
  board = copy.deepcopy(board)
  sharkDir = board[sharkX][sharkY][1]
  cnt = 1
  while True:
    if sharkX + cnt * di[sharkDir] < 0 or sharkX + cnt * di[sharkDir] > 3 or sharkY + cnt * dj[sharkDir] < 0 or sharkY + cnt * dj[sharkDir] > 3:
      break
    tempFish = board[sharkX + cnt * di[sharkDir]][sharkY + cnt * dj[sharkDir]][0]
    if tempFish != -1:
      candidates.append(tempFish)
    cnt+=1
  return candidates

def dfs(board, total):
  board = copy.deepcopy(board)
  sharkPosition = getPositionFish(board, 17)
  for i in range(16):
    fishPos = getPositionFish(board, i)
    if fishPos == None:
      continue
    [x, y] = fishPos
    direction = board[x][y][1]
    nextX, nextY = x + di[direction], y + dj[direction]

    moveFlag = True
    if nextX < 0 or nextX > 3 or nextY < 0 or nextY > 3 or [nextX, nextY] == sharkPosition:
      for j in range(1,8):
        direction = (direction + 1) % 8
        nextX, nextY = x + di[direction], y + dj[direction]
        if nextX < 0 or nextX > 3 or nextY < 0 or nextY > 3 or [nextX, nextY] == sharkPosition:
          if j==7:
            moveFlag=False
          continue
        break

    # change postion
    if moveFlag:
      board[x][y][1] = direction
      temp = board[nextX][nextY]
      board[nextX][nextY] = board[x][y]
      board[x][y] = temp

  candidates = getCandidateFishes(board, sharkPosition[0], sharkPosition[1])

  if len(candidates) == 0:
    global answer
    answer = max(answer, total)
    return answer

  for fishNumber in candidates:
    foodPos = getPositionFish(board, fishNumber)
    [foodX, foodY] = foodPos
    tempBoard = copy.deepcopy(board)
    tempTotal = total + fishNumber + 1
    tempBoard[sharkPosition[0]][sharkPosition[1]][0] = -1
    tempBoard[foodX][foodY][0] = 17
    dfs(tempBoard, tempTotal)

if __name__ == '__main__':
    init()
    firstFishNumber = globalBoard[0][0][0]
    globalBoard[0][0][0] = 17 # shark into globalBoard
    dfs(globalBoard, firstFishNumber + 1)
    print(answer)