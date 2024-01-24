# 2장. JSX
*2024/1/15 2장 정리*
* * *
## 2-1 코드 이해하기
> 1. import를 사용하여 다른 파일을 불러올 수 있다.
> 2. 모듈을 불러와 사용하는 것은 원래 브라우저에 없던 기능이다.
> 3. 브라우저가 아닌 환경에서 자바스크립트를 실행할 수 있게 해주는 것은 Node.js에서 지원하는 기능이다.
> 4. Node.js는 import가 아닌 require라는 구문으로 패키지를 불러올 수 있다.
> 5. 위와 같은 기능을 브라우저에서도 사용하기 위해 번들러(bundler)를 사용한다.(파일을 묶듯이 연결함)
> 6. 대표적인 번들러 : webPack, Parcel, browserify
> 7. 번들러 도구를 쓰면 import로 불러온 모든 모듈을 하나의 파일로 생성하며, 최적화 과정에서 여러개의 파일로 분리 될 수 있다.
> 8. webPack 웹팩을 사용하면 SVG, CSS 파일을 불러와서 사용할수 있다. 이렇게 파일을 불러오는 것은 웹펙 로더(loader) 기능이다.
> 9. loader : css-loader는 CSS 파일, file-loader는 웹폰트 미디어 파일, babel-loader는 js 파일을 불러오며 최신 js 문법으로 작성된 코드를 바벨이라는 도구를 사용해 ES5문법으로 변환해준다.

* * *

## 2-2 JSX란?
### 1) jsx 코드 번들링
**JSX를 사용하지 않고 렌더링할 때 어떻게 하는가?**
```
function App() {
    return React.createElement("div", null, "Hello", React.createElement("b", null, "react"));
}
```
**JSX를 사용하면 어떻게 되는가?**
```
function App() {
    return (
        <div>
            Hello <b>react</b>
        </div>
    );
}
```
### 2) jsx 자바스크립트 문법이 아니다?
1. JSX는 리액트로 프로젝트를 개발할 때 사용되므로, 공식적인 자바스크립트 문법이 아니다.
2. babel에서 여러 문법을 지원할 수 있게 preset 및 plugin을 설정한다.
3. babel을 통해 개발자들이 임의로 만든 문법, 차기 자바스크립트 문법들을 사용할 수 있다.

* * *
## 2-3  JSX의 장점
### 1) 보기 쉽고 익숙하다
HTML과 비슷하기 때문에 자바스크립트보다 가독성이 높고, 작성하기 쉽다.
### 2) 더욱 높은 활용도
컴포넌트도 JSX 안에서 작성할 수 있다.
리액트 컴포넌트를 보여줄 수 있는 루트 인스턴스를 createRoot 함수를 사용하여 생성한다.
```
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
    <App/>
    </React.StrictMode>
);
```
> #### React.StrictMode가 뭐지?
> 리액트 프로젝트에서 앞으로 사라질 레거시 기능을 사용할 때 경고를 주고, <br>
업데이트 될 리액트 버전에 도입되는 기능들이 정상적으로 호환될 수 있게 유도하는 디버깅용 컴포넌트 <br>
**개발환경에서만 활성화됨.*
* * *

## 2-4 JSX 문법
JSX의 규칙!
### 1) 감싸인 요소
컴포넌트에 여러 요소가 있다면 반드시 부모 요소 하나로 감싸야 한다.
```
// 오류 예시
function App() {
    return(
        <h1>Hi</h1>
        <h2>Bye</h2>
    )
}

// 성공 예시
function App() {
    return(
        <div>
            <h1>Hi</h1>
            <h2>Bye</h2>
        </div>
    )
}
```

> 꼭 div 요소로 사용하지 않아도 됨!
> 리액트 v16 이상부터 도입된 **Fragment** 기능을 쓰자.(컴포넌트 불러옴)

```
function App() {
    return(
        <Fragment>
            <h1>Hi</h1>
            <h2>Bye</h2>
        </Fragment>
    )
};

//Fragment 생략 가능함
function App() {
    return(
        <>
            <h1>Hi</h1>
            <h2>Bye</h2>
        </>
    )
};
```

### 2) 자바스크립트 표현
JSX 안에 자바스크립트 표현식을 쓸 수 있는데, 이는 내부에서 코드를 **{}** 로 감싸면 된다.
```
function App() {
    const name = 'React';
    return(
        <>
            <h1>{React} Hi</h1>
            <h2>Bye</h2>
        </>
    )
};
```

> #### Es6 Const & let
> **Const** - 한번 지정하고 나면 변경이 불가한 상수를 선언 (재설정 불가) <br/><br/>
> **let** - 동적인 값을 담을 수 있는 변수를 선언 (재설정 가능 / 중복 선언 불가) <br/><br/>
> **var** - let과 비슷하지만 제일 마지막에 선언한 데이터값으로 무조건 바뀜 (재설정 가능 / 중복 선언 가능) 


### 3) if문 대신 조건부 연산자
JSX 내부 자바스크립트 표현식에 if문 선언은 아래 2가지만 사용 가능하다.
1. JSX 밖에 if문을 사용하여 사전에 값을 설정
2. {} 안에 조건부 연산자(삼항 연산자)를 사용
```
const name = '리액트';
<div>
    {name === '리액트' ? (//true 값 반환) : (//false 값 반환)}
</div>
```

### 4) AND 연산자(&&)를 사용한 조건부 렌더링
특정 조건을 만족할 때 내용을 보여주되, 만족하지 않을 때에는 아무것도 렌더링 되지 않게 해야할 때가 있다.

```
const name = '리액트';
<div>
    {name === '리액트' ? (//true 값 반환) : null}
</div>
```
**위와 같이 null을 렌더링하면 아무것도 나오지 않는다.**

##### 위 조건을 && 연산자를 사용하면?
```
const name = '리액트';
<div>
    {name === '리액트' && (//true 값 반환)}
</div>
```
> #### 위처럼 && 연산자로 조건부 렌더링을 할 수 있는 이유? <br>
> 리액트에서 false를 렌더링할 때 null과 마찬가지로 아무것도 나타나지 않기 때문이다. <br>
> *주의할 점!!! false 값인 0은 예외적으로 화면에 나타난다.*

### 5) undefined를 렌더링하지 않기
리액트 컴포넌트는 함수에서 undefined만 반환하여 렌더링하는 상황을 만들면 안된다.
```
function App() {
    const name = undefined;
    return name;
}
```
**이때, OR(||) 연산자를 사용하면 해당 값이 undefined일 때 사용할 값을 지정할 수 있어 간단한 오류 방지가 가능하다.**
```
function App() {
    const name = undefined;
    return name || '값이 undefined 입니다.';
}
```
**JSX 내부에 undefined를 렌더링하는 것은 가능하다.**
```
function App() {
    const name = undefined;
    return <div>{name}</div>;
}

// undefined일 때 보여주고 싶은 문구가 있다면??
function App() {
    const name = undefined;
    return <div>{name || 'undefined이라서 안보였습니다.'}</div>;
}
```

### 6) 인라인 스타일링
리액트 DOM 요소에 스타일 적용할 때는 객체 형태로, **카멜표기법(camelCase)**으로 작성해야 한다.
> background-color (X) || backgroundColor (0) <br>
> '-' 대쉬를 없애고, 대쉬 간격으로 띄워진 부분을 대문자로 표기한다.


### 7) class 대신 className
JSX에서는 class를 *className* 으로 설정해야한다.
```
<div className="name"></div>
```

### 8) 꼭 닫아야 하는 태그
JSX에서 모든 코드는 꼭 닫아야 한다. (input, br 태그 모두!!!)
```
<input></input>

// 태그 사이에 내용이 없을 때는 아래 방식으로 사용 가능(self-closing)
<input />
```

### 9) 주석
JSX 주석 사용 방식
```
<>
    {/* 주석 작성 방식 */}
    <div>
        // 여기도 작성 가능
    </div> 
</>
```

* * *

## 2-5 ESLint와 Prettier 적용하기

#### 1) ESLint
> **ESLint** : 문법 검사 도구
> **Prettier** : 코드 스타일 자동 정리 도구










