# algorithm
알고리즘 공부

## 입출력

### 프롬프트
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