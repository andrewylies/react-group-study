# 3장. 컴포넌트
*2024/1/16 3장 정리*
* * *
## 3-1 클래스형 컴포넌트
#### <컴포넌트를 선언하는 방식>
1. 함수 컴포넌트
    - 클래스형 보다 메모리 자원을 덜 사용하여 가벼움
    - state, 라이프사이클 API 사용 불가능 -> <br>
    v16.8 리액트 Hook 기능 도입으로 문제 해결
    ```
    function App() {
        render() {
            return <div></div>
        }
    }
    ```
2. 클래스형 컴포넌트
    - 라이프 사이클 기능 & state 기능 사용 가능
    - 임의 메서드를 정의할 수 있음
    - render 함수가 꼭 있어야 함
    - JSX를 반환해야 함
    ```
    class App extends Component {
        render() {
            return <div></div>
        }
    }
    ```
> ### ES6 클래스 문법
> ES6 이전에는 자바스크립트에 클래스(class)가 없었다.<br> 개념 자체는 있었지만, 구현하기 위해 prototype 문법을 사용해야했다.

* * *
## 3-2 첫 컴포넌트 생성
### 1. 파일 만들기
    - src 디렉토리에 파일 생성
### 2. 코드 작성하기
    - ES6 arrow function
    * 기존 function과 용도가 다름
    (this 값의 차이)
    화살표는 위치한 곳에 최상에 있는 this를 불러오고,
    기존은 가장 안쪽에 있는 this를 불러온다고 생각하면 됨.
### 3. 모듈 내보내기 및 불러오기
> Turning Point!
> JS 모듈을 내보내거나 불러올 때 2가지 방법이 있다. <br>
> 1. common.js <br>
    불러올 때: require(//)<br>
    내보낼 때: module.export<br>
> 2. ES Modules<br>
    불러올 때: import // from //<br>
    내보낼 때: export default
* * *
## 3-3 props
**properties의 약어로, 컴포넌트 속성을 설정할 때 사용하는 요소**
### 1) JSX 내부에서 props 렌더링
props 값은 컴포넌트 함수의 파라미터로 받아 와서 사용할 수 있다.
```
const MyComponent = props => {
    return <div>Hello, My name is {props.name}.</div>
}
```
### 2) 컴포넌트를 사용할 때 props 값 지정하기
```
const App = () => {
    return <MyComponent name='React'/>;
};

//결과 => Hello, My name is React.
```
### 3) props 기본값 설정: defaultProps
>**Turning Point**<br>
>코드에서 (...) 표시는 지면 관계상 생략된 코드를 의미함

props값을 따로 지정하지 않을 때 보여주는 기본값이 defaultPorps 이다.
```
//App.js -> 부모에 props를 설정하지 않을 때
(...)
    return <MyComponent />;
(...)

//myComponent.js
const MyComponent = props => {
    return <div>Hello, My name is {props.name}.</div>
}

//자식에 디폴트 값을 선언할 수 있다.
MyComponent.defaultProps = {
    name: 'default'
};

// 결과 => Hello, My name is default.
```


### 4) 태그 사이의 내용을 보여주는 children
```
// App.js
const App = () => {
    return <MyComponent>어린이</MyComponent>;
}

//myComponent.js
const MyComponent = props => {
    return (
        <div>
            Hello, My name is {props.name}. <br/>
            children 값은 {props.children} 입니다.
        </div>
    )
}

MyComponent.defaultProps = {
    name: 'default'
}

/*
결과 =>
Hello, My name is default.
children 값은 어린이 입니다.
*/ 
```

```
/* class형 defaultPorps 지정 방식 */
class MyComponent extends Component {
    static defaultProps ={
        name: 'default'
    };
}
```

### 5) 비구조화 할당 문법을 통해 props 내부 값 추출하기
props값을 조회하려면 앞단에 무조건 "props."을 붙히는데,<br>
ES6 문법에서는 다음과 같은 추출 방식을 사용할 수 있다.<br>
**비구조화 할당(destructuring assignment)*

```
//myComponent.js
const MyComponent = props => {
    const {name, children} = props;
    return (
        <div>
            Hello, My name is {name}. <br/>
            children 값은 {children} 입니다.
        </div>
    )
}

MyComponent.defaultProps = {
    name: 'default'
}
```
```
/* class형 컴포넌트의 비구조화 할당 방식 */
class MyComponent extends Component {
    render() {
        const {name, children} = this.props;
        return (
            <div>
                Hello, My name is {name}. <br/>
                children 값은 {children} 입니다.
            </div>
        );
    }
}
```

### 6) propTypes를 통한 props 검증
props의 타입을 지정할 때 쓰는 propTypes.

```
import PropTypes from 'prop-types';

const MyComponent = ({name, children}) => {
    return (...);
}

MyComponent.PropTypes = {
    name: PropTypes.string
}

// props 타입을 string(문자)로 설정

/*
EX ------
return <MyComponent name = {1}></MyComponent>;
타입이 string이기 때문에 예시처럼 number를 넣으면 warning 뜬다.
*/
```

```
/* class형 defaultPorps 지정 방식 */
class MyComponent extends Component {
    static propTypes ={
        name: PropTypes.string
    };
}
```

> **isRequired를 사용하여 필수 propTypes 설정**<br>
> propTypes를 설정하지 않을 떄 경고메시지를 띄워주는 작업

```
//App.js
const App = () => {
    return <MyComponent age={0}></MyComponent>;
}

//부모한테 자식에 선언한 isRequired Props를 선언하지 않으면, warning이 뜬다.


import PropTypes from 'prop-types';

const MyComponent = ({name, children}) => {
    return <div>{age}</div>;
}

MyComponent.PropTypes = {
    name: PropTypes.string
    age: PropTypes.number.isRequired
}

// props 타입을 string(문자)로 설정

/*
EX ------
return <MyComponent name = {1}></MyComponent>;
타입이 string이기 때문에 예시처럼 number를 넣으면 warning 뜬다.
*/
```

> **앞에서 본 defaultProps & propTypes는 꼭 사용할 필요는 없다.**<br>
> 큰 규모의 프로젝트를 진행하거나, 다른 개발자들과 협업할 때 해당 컴포넌트에 어떤 props가 필요한지 쉽게 알 수 있기 때문에 상황에 따라 사용하는 것이 좋을 수 있다.

* * *
## 3-4 state
> react state는 컴포넌트 내부에서 바뀔 수 있는 값을 의미한다.<br>
> **리액트 state 2가지 종류*
> - 클래스형 컴포넌트 'state'
> - 함수 컴포넌트 'useState'

```
/* 클래스형 컴포넌트 state 방식 */

class Counter extends Component {

    //컴포넌트 state를 설정할 때 constructor 메서드 사용
    constructor(props) {

        //constructor 사용 시 super(props) 무조건 호출
        super(props);

        //state 초기값 설정
        this.state = {
            number = 0
        };
    }


    render() {
        //state 조회 방식
        const {number, fixedNumber } = this.state;

        <div>
            <h1>{number}</h1>
            <h2>바뀌지 않는 값: {fixedNumber}</h2>

            //onClick으로 버튼 클릭시 호출 이벤트 지정
            //this.setState로 state값 변경
            //this.state가 2개여도, number 개체만 선언했기에 fixedNumber는 영향 없음
            <button onClick={()=>{this.setState({number:number + 1})}}> +1 </button>

        </div>
    }
}
```
#### Construct 대신 state 초깃값 설정 방법
```
class Counter extends Component {
    state = {
        number: 0,
        fixedNumber: 0
    }
    render() {
        const { number, fixedNumber } = this.state;
        return (...);
    }
}
```
##### this.setState에 객체 대신 함수 인자 전달하기
함수 내부에서 this.setState를 두번 호출할때?
```
//this.state를 사용하여 state에 새로운 값 넣기
onClick={() => {
    this.setState({ number: number + 1 });
    this.setState({ number: this.state.number + 1 });
}}

// 위 처럼 반영해도 state값은 바뀌지 않기 때문에, 아래와 같이 함수 인자로 전달한다.
// preveState는 기존 상태, props는 현재 지니고 있는 것
onClick={() => {
    this.setState((prevState, props) => {
        return {
        //업데이트 내용
        }
    })
}}
```

### 2) 함수 컴포넌트에서 useState 사용하기
#### 배열 비구조화 할당
```angular2html
const array = [1,2];
const one = array[0];
const two = array[1];

// 위 코드를 배열 비구조화 할당으로 바꾸면?
const array = [1,2];
const [one, two] = array;
```
#### useState 사용하기

1. useState 함수 인자에는 초기값을 넣어준다.(숫자,배열,문자 등 상관없음)
2. 함수 호출 시 배열이 반환되는데, 첫 번째 원소는 현재 상태, 두번째 원소는 상태를 바꾸어 주는 함수이다.(Setter)
3. 

```
import { useState } from 'react';

const Say = () => {
    const [message, setMessage] = useState(''); //초기값 세팅
    const onClickEnter = () => setMessage('Hi');
    const onClickLeave = () => setMessage('Bye');

    return (
    <div>
        <button onClick={onClickEnter}>입장</button>
        <button onClick={onClickLeave}>퇴장</button>
        <h1>{ message }</h1>
    </div>
)
}
```
* * *
## 3-5 state를 사용할 때 주의 사항
**state값을 바꾸어야 할 때 setState 혹은 useState를 통해 전달받은 세터 함수를 사용해야 한다.*

