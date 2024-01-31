# 6장. 컴포넌트 반복
*2024/1/29 5장 정리*
* * *
## 자바스크립트 배열의 map() 함수

```html
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
</ul>
```
위 코드에서 li가 반복되고 있는데, <br>
자바스크립트 배열 객체의 내장 함수인 map 함수를 사용하여 컴포넌트를 렌더링할 수 있다.

### map() 문법

```javascript
arr.map(callback, [thisArg])
```
* **callback**: 새로운 배열의 요소를 생성하는 함수
* * 파라미터1) currentValue: 현재 처리하고 있는 요소
* * 파라미터2) index: 현재 처리하고 있는 요소의 Index 값
* * 파라미터3) array: 현재 처리하고 있는 원본 배열
* **thisArg**: callback 함수 내부에서 사용할 this 레퍼런스

```javascript
var numbers = [1,2,3,4,5];

var processed = numbers.map(function(num) {
    return num * num;
})

console.log(processed);
```
위 코드를 실행할 경우,
```javascript
[1,4,9,16,25] 
```
각 numbers에 담긴 아이템끼리 곱한값이 나오게 된다.

### key
컴포넌트 배열을 렌더링 했을 때, 어떤 원소에 변동이 있었는지 알아내고자 사용한다.
>* key가 없을 때는 버츄얼 돔을 비교하는 과정에서 리스트를 순차적으로 비교하면서 변화를 감지한다.
>* key가 있으면, 해당 값을 사용해 빠르게 변화를 감지할 수 있다.

```javascript
const articleList = articles.map(article => (
    <Article
        title={article.title}
        writer={article.writer}
        key={article.id}
    />
));
```

### 유동적인 데이터 렌더링

#### 1. 초기 상태 설정하기
```javascript
import {useState} from 'react';

const IterationSample = () => {
    const [names, setNames] = useState([
        {id: 1, text: '눈사람'},
        {id: 2, text: '얼음'},
        {id: 3, text: '눈'},
        {id: 4, text: '바람'}
    ]);
    const [inputText, setInputText] = useState('');
    const [nextId, setNextId] = useState(5); // 새로운 항목을 추가할 때 사용할 id
    const namesList = names.map(name => <li key={name.id}>{name.text}</li>);
    return <ul>{namesList}</ul>;
    
    //map 돌릴 때 배열 값을 사용해서 JSX 코드로 된 배열을 생성하는 방법으로 return 시킴.
};

export default Intereationsample;
```
#### 2. 데이터 추가 기능 구현하기
#### 3. 데이터 제거 기능 구현하기

