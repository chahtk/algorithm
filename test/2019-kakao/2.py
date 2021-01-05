def solution(n, stages):
    answer = []
    diction = {}
    for idx, stage in enumerate(stages):
      if not stage in diction:
        diction[stage] = []
      diction[stage].append(idx+1)
    
    total = len(stages)
    acc = 0
    failure = []

    for idx in range(n):
      if not idx+1 in diction:
        failure.append((0, idx+1))
        continue
      if total-acc == 0:
        print('err')
        continue
      failNum = len(diction[idx+1])/(total-acc)
      failure.append((failNum, idx+1))
      acc += len(diction[idx+1])
    failure.sort(key=lambda t: t[0], reverse=True)
    for el in failure:
      answer.append(el[1])
    return answer

if __name__ == '__main__':
  inputs = [ [5, [2, 1, 2, 6, 2, 4, 3, 3]], [4, [4,4,4,4,4]]]
  for n, inpt in inputs:
    answer = solution(n, inpt)
    print(answer)
    