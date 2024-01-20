ref: DOM에 이름달기<br><br>
public/index.html 파일의 div 태그의 id가 root로 설정되어 있다. <br>
이처럼 id를 사용하면 특정 DOM 요소에 대하여 <code>쉽게 접근하여 처리</code>할 수 있다. <br>
이렇게 HTML에서 id를 사용하여 DOM에 이름을 다는 것처럼, <br>
리액트 프로젝트 내부에서 DOM에 이름을 다는 방법이 ref(reference)이다.<br>

```html
<!--public/index.html 파일-->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```


ref(Reference)는 HTML에서 id를 사용하여 DOM에 이름을 다는 것처럼 <br>
리액트 프로젝트 내부에서 DOM에 이름을 다는 방법<br>
특정 DOM 요소에 작업을 해야할 때<br>
id를 달면 css에서 특정 id에 특정 스타일을 적용하거나 <br>
자바스크립트에서 해당 id를 가진 요소를 찾아 작업할 수 있다.<br>

<br><br>

리액트 컴포넌트 안에서의 id 사용?
>리액트 컴포넌트안에서 id를 사용할 수 있다. <br>
JSX 안에서 DOM에 id를 달면 해당 DOM을 렌더링할 때 그대로 전달되지만 권장하지 않는다고 함.<br>
예를 들어, HTML에서 DOM의 id는 유일해야 하는데, <br>
같은 컴포넌트를 여러 번 사용하게 되면 <br>
중복 id를 가진 DOM이 여러 개 생기기 때문에 권장하지 않는다.



<br><br><br>

1)ref는 어떤 상황에서 사용해야 할까? <br>
<code>ref는 DOM을 직접적으로 건드려야 할 때 사용</code>해야 한다. <br>
예로 클래스형 컴포넌트에서 ref를 사용하는 방법




src 디렉터리 안에 ValidationSample.css와 ValidationSample.js 파일을 생성

제시된 예시
ex1)

```javascript
/*ValidationSample.css*/

.success {
    background-color: green;
  }
  .failure {
    background-color: red;
  }


```


```javascript
//ValidationSample.js
import React, { Component } from 'react';
import './ValidationSample.css';

class ValidationSample extends Component {
    state = {
        password: '',
        clicked: false,
        validated: false
    };

    handleChange = e => {
        this.setState({
            password: e.target.value
        });
    };
    
    handleButtonClick = () => {
        this.setState({
            clicked: true,
            validated: this.state.password === '0000'
        });
    };

    render() {
        return (
            <div>
                <input
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    className={this.state.clicked ? this.state.validated ? 'success' : 'failure' : ''}
                />
            <button onClick={this.handleButtonClick}>검증하기</button>
            </div>
        );
    }
}

export default ValidationSample;

```

- input 태그에서 onChange 이벤트가 발생하면 handleChange 함수를 호출한다. 
- handleChange 함수는 state의 password 값을 업데이트한다. 
- className 값은 버튼을 누르기 전에는 비어 있는 문자열을 전달하며, 
- 버튼이 눌린 후에는 검증 결과에 따라 success 또는 failure으로 설정한다. 
- 그리고 ValidationSample.css에 의하여 success일 땐 input 색상이 초록색으로, 
- failure일 땐 input 색상이 빨간색으로 나타난다.

<br>

- button에서 onClick 이벤트가 발생하면 handleButtonClick 함수를 호출한다. 
- handleButtonClick 함수는 clicked 값을 true로 설정하고, 
validated 값을 검증 결과로 설정한다.


<br><br><br>

2)App 컴포넌트에서 예제 컴포넌트 렌더링

App 컴포넌트에서 ValidationSample 컴포넌트를 렌더링하기.<br>
예제에서 App 컴포넌트는 함수 컴포넌트에서 클래스형 컴포넌트로 전환한다.
```javascript
import React, { Component } from 'react';
import ValidationSample from './ ValidationSample';

class App extends Component {
  render() {
    return (
      <ValidationSample/>
    );
  }
}

export default App;
```

<br><br><br>

3)DOM을 꼭 사용해야 하는 상황

위 예제에서 state를 사용하여 필요한 기능을 구현하였다. 
그러나 이 방법으로는 특정 input에 포커스 주기, 스크롤 박스 조작하기, Canvas 요소에 그림 그리기 등 DOM에 직접적으로 접근하는 상황을 처리하기 어렵다. 

<code>DOM에 직접 접근하기 위해 ref를 사용합니다.</code>
