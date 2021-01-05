def solution(record):
    answer = []
    userInfo = {}
    commands = [] # without username

    for perform in record:
      performInfo = perform.split(' ')
      action, uid = performInfo[0:2]
      uname = performInfo[2] if len(performInfo) == 3 else None
      
      if action == 'Enter':
        userInfo[uid] = uname
      elif action == 'Change':
        userInfo[uid] = uname
      commands.append([action, uid])

    for action, uid in commands:
      if action == 'Change':
        continue
      string = userInfo[uid]
      if action == 'Enter':
        string += '님이 들어왔습니다.'
      elif action == 'Leave':
        string += '님이 나갔습니다.'
      answer.append(string)

    return answer

if __name__ == '__main__':
    inputs = ["Enter uid1234 Muzi", "Enter uid4567 Prodo","Leave uid1234","Enter uid1234 Prodo","Change uid4567 Ryan"]
    res = solution(inputs)
    print(res)