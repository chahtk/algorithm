# algorithm
- 알고리즘 공부 (python, javascript)
- 주요 함수 lib에 정리

## JS

### 프롬프트 입출력
```js
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.on('line', (line) => {
  input = line;
  rl.close();
}).on('close', () => {
  process.exit();
})
```

### 이차원 배열
```js
const arr1 = Array.from(Array(5), () => new Array(2)
const arr2 = Array.from(Array(5), () => Array(2).fill(1))
```

### 부동 소수점
```js
const getFloat = (num) => {
  return +num.toFixed(5).toString();
};
```

### 벨만포드
relax 하는 과정에서 가중치가 음수임을 고려하여 이전 노드 비용이 INF인지 체크해야함
```js
if (dist[s] !== INF && dist[e] > dist[s] + t)
```

## Python

### 프롬프트 입출력
- input()
- sys.stdin.readline()

### 파일
- f.readline()

### mutable
- list, set, dicts는 mutable
- 할당을 해도 메모리 주소를 바라본다(얕은 복사). 따라서 할당 받은 변수를 변경하면 원본 변수도 변경됨
```python
a = [1,2,3]
b = a
b[0] = 4
print(a, b) # a: [4,2,3], b: [4,2,3]
```
- deep copy: copy library를 사용하여 내부 객체를 복사한다.
```python
import copy
a = [[1,2],[3,4]]
b = copy.deepcopy(a)
a[1].append(5)
b[1][1] = 7
print(a,b) # a: [[1, 2], [3, 4, 5]], b: [[1, 2], [3, 7]]
```

### 문자열
- slice : arr[start:end], arr[:]로 deep copy 가능!
- strip : 특정 문자를 양쪽에서 제거. lstrip, rstrip은 각각 좌, 우에 대해 삭제

### 반복문
- enumerate : index 사용가능

### 정렬(sort)
- list.sort()
- sorted(iterable)
- 내림차순: 위 함수 옵션으로 reverse=True를 주면됨
- 에를들어 리스트의 값들이 튜플/리스트... 등 원시값이 아닐 때, 다음과 같이 정렬을 정의할 수 있음
```python
somList = [ (1,2), (2,3), (3,3)]
someList.sort(key=lambda t:t[0]) # 0번째 기준으로
```

### 람다식
- lambda 'parameter': express
- ex) lambda x,y: x+y