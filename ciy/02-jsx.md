02. jsx

1. 코드 이해하기
- import 구문은 특정 파일을 불러오는 것이다. (모듈을 불러와서 사용하는 것은 브라우저에는 없는 기능이다. 브라우저가 아닌 환경에서 자바스크립트를 실행할 수 있게 해주는 환경인 Node.js에서 지원한다.)
- 브라우저에서도 사용하기 위해 번들러(bundler)를 사용한다. (번들은 묶는다는 의미, 파일을 묶듯이 연결하는 것이다)
- 파일들을 불러오는 것을 웹팩의 로더(loader)라는 기능이 담당한다.

* 
webpack에서 타입스크립트를 읽을 수 있는 loader의 종류에는 2가지가 있다. (2021~)

- babel-loader + @babel/preset-typescript
- ts-loader
- (x)Awesome-typescript-loader (ts-loader의 발전으로 개발이 중지된 상태이다.)


2. JSX란?
- JSX는 자바스크립트의 확장 문법이다.
- 작성된 코드는 브라우저에서 실행되기 전, 코드가 번들링되는 과정에서 바벨을 사용하여 일반 자바스크립트 형태의 코드로 변환한다.

(ex1)
function App(){
  return (
    <div>
      Hello <b>react<b>
    </div>
  );
}


function App(){
  return React.createElement(“div”, null, “Hello ”, React. createElement(“b”, null, “react”));
}





*바벨?
JSX 문법은, 브라우저가 잘 모르는 문법이기 때문에, 브라우저가 이해할 수 있는 Vanilla JS로 변경해 주어야 한다. 이것을 babel이 해 준다.



*createElement?
createElement는 React의 핵심 함수 중 하나로, React 엘리먼트를 생성하는 역할이다.

React.createElement(type, [props], [...children])

type: 엘리먼트의 종류를 나타내며, 문자열 형태로 HTML 태그 이름 (예: "div", "span")이나 React 컴포넌트를 나타낸다.
props (선택사항): 엘리먼트의 속성을 정의하는 객체이다. 속성은 엘리먼트에 대한 추가 정보를 제공하며, (ex: CSS 클래스, 스타일, 이벤트 핸들러 등을 포함)
children (선택사항): 엘리먼트 내에 포함될 자식 엘리먼트나 텍스트를 나타내는 인자이다. 엘리먼트의 내용을 구성한다.

(ex)
<div className="my-class">Hello, World!</div>

React.createElement("div", { className: "my-class" }, "Hello, World!")

type은 "div"로, 이것은 <div> 엘리먼트를 생성한다.
props는 { className: "my-class" }로, 이것은 엘리먼트의 속성을 정의한다.
children은 "Hello, World!"로, 이것은 엘리먼트 내의 내용을 정의한다.


따라서,

(ex1)
첫 번째 createElement 호출:

type: "div" (HTML 태그 이름)
props: null (없음)
children: "Hello " (텍스트)


두 번째 createElement 호출:

type: "b" (HTML 태그 이름)
props: null (없음)
children: "react" (텍스트)







3. JSX의 장점
- 가독성이 높고 작성하기 쉬움.
- 활용도 높음(JSX는 div 같은 HTML 태그를 사용가능, 컴포넌트 또한 안에서 작성)

4. JSX의 문법
- 추가 md에 기록.


5. ESLINT와 PRETTIER 적용하기
- ESLint는 문법 검사 도구(에러 메시지 에디터에서 바로 확인)
- Prettier는 코드 스타일 자동 정리 도구

* 웹스톰 세팅 시 https://modipi.tistory.com/10 체크!

