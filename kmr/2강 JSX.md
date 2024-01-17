## 코드 이해하기
### Import
리액트에서 : 다른 파일 불러와 사용하는 용도
Node.js에서 지원하는 기능이다.(브라우저X)

### bundler
브라우저는 모듈화된 자바스크립트는 읽지 못하기 때문에 브라우저에서 코드를 실행하려면 반드시 번들러가 필요하다.
웹팩, parcel, browserify 등이 있고, 리액트 프로젝트에서는 주로 웹팩을 사용하는 추세다.
리액트에서는 Create-react-app이 웹팩 로더 작업 등을 대신해준다.

>웹팩
* entry 속성은 웹팩에서 웹 자원을 변환하기 위해 필요한 최초 진입점이자 자바스크립트 파일 경로
* output 속성은 웹팩을 돌리고 난 결과물의 파일 경로
* 로더(Loader)는 웹팩이 웹 애플리케이션을 해석할 때 자바스크립트 파일이 아닌 웹 자원(HTML, CSS, Images, 폰트 등)들을 변환할 수 있도록 도와주는 속성(module라는 이름을 사용)
* 플러그인(plugin)은 웹팩의 기본적인 동작에 추가적인 기능을 제공하는 속성(웹팩으로 변환한 파일에 추가적인 기능을 더하고 싶을 때 사용하는 속성. 웹팩 변환 과정 전반에 대한 제어권을 갖고 있음)
* https://joshua1988.github.io/webpack-guide/concepts/overview.html


## JSX란
자바스크립트의 확장 문법이다.

변환 전 JSX 코드
```javascript
function App(){
  return (
  <div>
    hello
  </div>
  )
}
```
변환 후 JSX 코드
```javascript
function App(){
reutn React.createElement("div",null,"hello")};
```
🧐JSX는 가독성이 높고 작성하기도 쉽다.
코드로 보면 XML형식이지만, 실제로는 자바스크립트 객체다.



## JSX문법
* 여러 요소가 있다면 반드시 부모 요소 하나로 감싸야 한다.
  <> </> 프래그먼트로 감싸도 된다.
> Virtual DOM에서 컴포넌트 변화를 감지해 낼 때 효율적으로 비교할 수 있도록 컴포넌트 내부는 하나의 DOM트리 구조로 이루어져야 한다는 규칙 때문.

* 자바스크립트 표현식을 쓸 수 있다.
  내부에서 {}코드로 감싸면 된다.
>표현식 = 값을 반환하는 식 또는 코드

* if문 못쓰니까 대신 조건부 연산자(삼항연산자) 쓰면 된다.
> false 이외의 falsy한 표현식에는 null, NaN, 0, 비어있는 문자열 (""), 그리고 undefined가 있다.


* AND연산자 &&를 사용해 조건부 렌더링을 할 수도 있다.
```javascript
// 삼항연산자 사용
<div>{name === 'jsx' ? <h1>jsx jsx jsx</h1> : null}</div>
      
// AND연산자 사용      
<div>{name === 'jsx' && <h1>jsx jsx jsx</h1>}</div>
```
이때 falsy한 값 중 0은 예외적으로 화면에 나타난다.

* undefined 렌더링하지 않기
  리액트 컴포넌트에서는 함수에서 undefined 반환 시 오류난다. 이를 방지하기 위해 OR연산자를 사용할 수 있다.

```javascript
//리턴값 undefined일 때 OR연산자로 사용할 값을 지정
function App(){
	const money = undefined;
  	return money || '값이 undefined입니다.'
}

function App(){
	const name = undefined;
  	return <div>{name || '리액트'}</div>;
}
```
Undefined일 수도 있다면 or || 사용하자.<br/>
해당 값이 언디파인드일 때 사용할 값을 지정할 수 있으므로 간단하게 오류를 방지할 수 있다.

> result = value1 || value2 || value3;<br/>
OR "||" 연산자를 여러 개 체이닝(chaining) 하면 첫 번째 truthy를 반환한다.<br/>
(truthy를 만나면 평가를 멈추고 해당 피연산자의 변환 전 원래 값을 반환)<br/>
피연산자에 truthy가 하나도 없다면 마지막 피연산자를 반환한다.


* 스타일은 인라인 형태로 작성한다.
```
Const style = {backgroundColor: ‘black’, color:’’aqua’}
<div style={style}></div>
```

* className을 쓴다

* 태그를 닫아주자.
```
<img><img> //이런거 X
<img></img> //처럼 꼭 닫아주거나 셀프클로징<img/>해주자!
```

* 주석은 
```
{/*이렇게에에에에*/}
```