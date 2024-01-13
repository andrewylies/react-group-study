
4. JSX 문법

1) *감싸인 요소
- *Virtual DOM에서 컴포넌트 변화를 감지할 때 효율적으로 비교할 수 있도록 컴포넌트 내부는 하나의 DOM 트리 구조이다.
- div 요소가 아니더라도 Fragment 기능을 사용한다.
- import 구문에서 react 모듈에 들어 있는 Fragment 컴포넌트를 추가로 불러옵니다. 불러온 뒤 <div></div> 대신 <></>를 사용하면 같은 효과

*Virtual DOM은?
*Virtual DOM(가상 DOM)은 React와 같은 라이브러리 및 프레임워크에서 사용되는 개념이다. 
실제로 브라우저에 렌더링되는 DOM(Document Object Model)의 가상 표현이다. 
가상 DOM은 JavaScript 객체로 이루어져 있고, 웹 애플리케이션의 UI를 효율적으로 업데이트하고 관리하기 위한 목적으로 사용된다.


*DOM은 HTML 문서의 구조를 나타내며, 웹 페이지의 요소(태그), 속성, 텍스트 등을 트리 구조로 표현한다. 
웹 애플리케이션에서는 DOM을 조작하여 화면에 내용을 추가하거나 수정하며 사용자 상호 작용에 반응하도록 만든다. 
그러나 DOM 조작은 비용이 많이 들고 느리기 때문에, 큰 규모의 애플리케이션에서는 효율성의 문제가 발생할 수 있다.

그래서

*Virtual DOM은 이러한 문제를 해결하기 위해 사용된다. 
가상 DOM은 실제 DOM의 가벼운 복사본이며, 
React와 같은 라이브러리는 가상 DOM을 사용하여 컴포넌트의 상태 변화를 추적하고, 이를 효율적으로 실제 DOM으로 업데이트한다. 
이로써 React는 필요한 변경 사항만을 업데이트하고, 실제 DOM 조작 횟수를 최소화하여 성능을 향상시킨다.*

*감싸인 요소(Wrapper Element)와 Fragment은 Virtual DOM에서 컴포넌트의 구조를 표현하는 방법 중 하나이다. 
Virtual DOM에서는 컴포넌트 변화를 감지할 때, 두 상태의 가상 DOM 트리를 비교한다. 
이때 컴포넌트 내부는 하나의 트리 구조여야함! 

때때로, JSX 코드를 작성하다 보면 컴포넌트 내부에 여러 요소를 렌더링하고 싶을 때가 있다.

그런데 이러한 요소들을 하나의 부모 요소로 감싸지 않으면 Virtual DOM에서 비교가 어려워질 수 있다. 
이를 해결하기 위해 Fragment를 사용하거나, 빈 태그 (<> </>)를 사용하여 감싸는 방법을 사용한다. 
이렇게 하면 가상 DOM에서는 하나의 부모 요소로 간주되어 비교가 용이.


*
<h1>Title</h1>
<p>P 1</p>
<p>P 2</p>
이렇게 부모 요소로 감싸지 않은 구조를 가지고 있다면 Virtual DOM에서는 이것을 하나의 단일 트리 구조로 처리하기 어려움.

<h1>과 <p> 엘리먼트들이 각각 독립적으로 있기 때문에 이전 상태와 비교할 때 위치나 관계가 무시되어야 한다.
이로 인해 변화를 감지하고 업데이트를 최적화하는데에 어려움이 생긴다.
부모 요소로 감싸면 Virtual DOM에서 구조를 일치시키기 쉽고, 변화를 효율적으로 감지하고 처리할 수 있다.


[컴포넌트에 여러 요소가 있다면 반드시 부모 요소로 감싸주기]


(ex1)
import React, { Fragment }  from ‘react’;

function App(){
   return (
      <Fragment>
         <h1>Fragment 를 사용해서</h1>
         <h2>감싼다.</h2>
      </Fragment>

      {/* or */}
      <>
         <h1>이렇게도 사용할 수 있다.</h1>
      </>
   );
}

export default App;





2) 자바스크립트 표현
- JSX 안에서는 자바스크립트 표현식을 사용 가능하다.
- JSX 내부에서 코드를 { } 로 감싸면 됨.


(ex1)
import React from ‘react’;

function App() {
   const name = “자바스크립트는”;
   return (
      <>
         <h1>{name} 이렇게</h2>
         <h2>사용하는거다.</h2>
      </>
   );
}

export default App;




3) If문 대신 조건부 연산자 (삼항 연산자)
- JSX 내부의 자바스크립트 표현식에서 if문을 사용불가임.

하지만 

조건에 따라 다른 내용을 렌더링해야 할 때
JSX 밖에서 if문을 사용하거나 괄호({ }) 안에 조건부 연산자를 사용하면 됨.


(ex1)
function App() {
  const name = '리액트';
  return (
    <>
      <h1>{name}안녕!</h1>
      <h2>잘 작동하니?</h2>
      {name == '리액트'?(
        <h1>리액트입니다.</h1>
      ):(
        <h2>리액트가 아닙니다.</h2>
      )}
    </>
  );
}
export default App;




4) AND 연산자(&&)를 사용한 조건부 렌더링



- 특정 조건을 만족할 때 내용을 보이고, 만족하지 않을 때 아무것도 렌더링하지 않는 상황일 때 조건부 연산자를 통해 구현할 수 있다. 
(프로젝트 개발 시 특정 조건을 만족할 때 내용을 보여 주고, 그렇지 않아야 할 상황이 올 수 있음)
- 그러나 AND 연산자(&&)를 사용하여 더 짧은 코드로 조건부 렌더링 가능.
- AND 연산자(&&)로 조건부 렌더링을 할 수 있는 이유는 리액트에서 false를 렌더링할 때는 null과 마찬가지로 아무것도 나타나지 않기 때문.

(ex1)
function App() {
  const name = '최인영';
  return <div>{name === '최인영' ? <h1>맞습니다. 최인영입니다.</h1> : null}</div>
}

(ex2)
function App() {
  const name = '최인영';
  return <div>{name === '최인영' && <h1>맞습니다. 최인영입니다.</h1>}</div>
}



function App() {
  const name = '리액트';
  return (
    <>
      {name == '리액트'?(
        <h1>리액트입니다.</h1>
      ):null}
    </>
  );
}
export default App;



function App() {
  const name = '리액트';
  return (
    <>
      {name == '리액트' && <h1>리액트입니다.</h1>}
    </>
  );
}
export default App;





5) undefined를 렌더링하지 않기
- 리액트 컴포넌트에서는 함수에서 undefined만 반환하여 렌더링하는 상황을 만들면 (오류나서...) 안된다. 
- 어떤 값이 undefined일 가능성이 있다면, OR(||) 연산자를 사용하여 해당 값이 undefined일 때 사용할 값을 지정할 수 있어서 오류를 방지할 수 있다.

(ex1)
function App() {
  const name = undefined;
  return name;
}

이러면 에러,

function App() {
  const name = undefined;
  return name || 'undefined';
}

name 값이 undefined일 때, 보여주고 싶은 문구나 기본 값을 보여주고 싶을 때,
OR(||) 연산자를 사용






6) 인라인 스타일링
리액트에서 DOM 요소에 스타일을 적용할 때, 문자열 형태로 넣는 것이 아니라 객체 형태로 넣어야한다.
스타일 이름 또한 – 문자를 없애고 카멜 표기법으로 작성해야 합니다. (ex) background-color -> backgroundColor - DEV 작업 시 경험.

(ex1)

function App() {
  const name = '리액트';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize:'48px',
    fontWeight:'bold',
  }
  return (
    <div style={style}>
      {name}
    </div>
  );
}

export default App;





7) class 대신 className

제곧내






8) 꼭 닫아야 하는 태그

<input></input>
<input />






9) 주석

{/* 주석 작성법 */}



import React from ‘react’;

function App() {
   return (
      {/* JSX 안에서 주석은 이렇게 작성한다. */}
      <div className=“react” // 이런식으로 주석을 작성할 수도 있다.
      >{name}</div>
      // 하지만 이런 주석이나
      /* 이런 주석은 페이지에 그대로 나타난다. */
   );
}

export default App;



