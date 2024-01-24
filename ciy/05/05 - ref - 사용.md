ref 사용


1)콜백 함수를 통한 ref 설정<br>
콜백 함수를 사용하여 ref를 만드는 것은 가장 기본적인 방법이다. <br>
ref를 달고자 하는 요소에 ref라는 콜백 함수를 props로 전달하면 된다.<br> 
이 콜백 함수는 ref 값을 <code>파라미터</code>로 전달받는다.<br> 
그리고 함수 내부에서 파라미터로 받은 ref를 컴포넌트의 멤버 변수로 설정한다.

ex1)
>파라미터를 사용하는 예시<br>
>파라미터를 사용하여 ref와 함께 특정 요소의 스타일을 변경하는 예시<br>
>함수에 파라미터를 전달하여, 그 파라미터를 사용해 ref로 참조된 요소의 스타일을 변경한다.

```javascript
//React 클래스 컴포넌트 예시
import React, { Component } from "react";

class ColorChanger extends Component {
    constructor(props) {
        super(props);
        this.divRef = React.createRef(); // ref 생성
    }

    changeColor = (newColor) => {
        // changeColor 함수는 새로운 색상을 파라미터로 받음
        this.divRef.current.style.backgroundColor = newColor;
        // ref를 사용하여 div의 배경색을 파라미터로 받은 색상으로 변경
    };

    render() {
        return (
            <div>
                <div
                    ref={this.divRef}
                    style={{ width: "100px", height: "100px", backgroundColor: "red" }}
                >
                    {/* div 요소에 ref 할당 */}
                </div>
                <button onClick={() => this.changeColor("blue")}>파란색으로 변하기</button>
                {/* 버튼 클릭 시 changeColor 함수를 파란색 인자와 함께 호출 */}
                <button onClick={() => this.changeColor("green")}>
                    초록색으로 변하기
                </button>
                {/* 버튼 클릭 시 changeColor 함수를 초록색 인자와 함께 호출 */}
            </div>
        );
    }
}

export default ColorChanger;
```


ColorChanger 컴포넌트의 작동방법

>ref 생성: 생성자에서 React.createRef()를 사용하여 divRef라는 ref를 생성.<br>
>ref 할당: render 메소드에서 div 요소에 this.divRef ref를 할당.<br>
>이벤트 핸들러 정의: changeColor 메소드는 새로운 색상을 파라미터로 받고, this.divRef를 사용하여 div 요소의 배경색을 해당 색상으로 변경하려고.<br>
>이벤트 핸들러 연결: button 요소들에 changeColor 메소드를 각각 다른 색상 파라미터와 함께 onClick 이벤트 핸들러로 연결.<br>
각 버튼을 클릭할 때마다 changeColor 함수가 해당 색상 파라미터(파란색 또는 초록색)와 함께 호출되어, div의 배경색이 해당 색상으로 변경된다.








```javascript
//콜백 함수 예시
<input ref={(ref) => {this.input=ref}} />
```
이 코드에서 this.input은 input 요소의 DOM을 가리킨다.


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
    
    //ValidationSample.js의 handleButtonClick 메서드

    handleButtonClick = () => {
            this.setState({
            clicked: true,
            validated: this.state.password === '0000'
            });
        this.input.focus(); //ref를 통한 접근
    };
    render() {
        return (
            <div>
                //ValidationSample.js의 input 요소
                <input
                    ref={(ref) => this.input = ref} /*ref 달기*/
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

this.input이 컴포넌트 내부의 input 요소를 가리키고 있으므로 일반 DOM을 다루듯이 작성하면 된다.

<br><br><br>
2)createRef를 통한 ref 설정<br>
리액트에 내장된 createRef 함수를 사용하여 ref를 만드는 방법도 있다.<br>
리액트 v16.3부터 도입되어 보다 더 적은 코드로 사용 가능하다.
```javascript
import React, { Component } from 'react';

class RefSample extends Component {
    input = React.createRef();
    
    handleFocus = () => {
      this.input.current.focus();
    }

    render() {
        return (
            <div>
            	<input ref={this.input} />
            </div>
        );
    }
}

export default RefSample;
```


createRef 함수를 사용하여 ref를 만들려면<br> 
컴포넌트 내부에서 멤버 변수로 React.createRef()를 담아야 한다. <br> 
그리고 해당 멤버 변수를 ref를 달고자 하는 요소에 ref props로 넣으면 ref 설정이 된다.<br> 이후 접근 시 this.input.current를 조회하면 된다. <br>
콜백 함수와 다르게 뒷부분에 . current를 넣어야 한다.




<br><br><br>

ex2) 추가예시
```javascript
import React, { Component } from 'react';

class SimpleRefExample extends Component {
  // div 요소를 저장할 변수 선언
  divElement = null;

  // 콜백 함수를 통해 div 요소의 ref 설정
  setDivRef = element => {
    this.divElement = element;
  };

  // 버튼 클릭 시 div 요소의 배경색 변경
  changeBackgroundColor = () => {
    if (this.divElement) {
      this.divElement.style.backgroundColor = 'lightblue';
    }
  };

  render() {
    return (
      <div>
        <div ref={this.setDivRef} style={{ width: '100px', height: '100px', border: '1px solid black' }}>
          Sample Div
        </div>
        <button onClick={this.changeBackgroundColor}>Change Color</button>
      </div>
    );
  }
}

export default SimpleRefExample;
```

이 코드에서는 

setDivRef라는 콜백 함수를 사용하여 div 요소의 참조를 this.divElement에 저장. <br>
그리고 changeBackgroundColor라는 메서드에서 이 참조를 사용하여 해당 div 요소의 배경색을 변경한다.<br> 
이 예시는 ref를 사용하여 DOM 요소에 직접적으로 접근하고, 그 요소의 스타일을 조작


ex3)
```javascript
import React, { Component } from 'react';

class SimpleRefExample extends Component {
  // div 요소를 저장할 변수 선언
  divElement = null;

  // 버튼 클릭 시 div 요소의 배경색 변경
  changeBackgroundColor = () => {
    if (this.divElement) {
      this.divElement.style.backgroundColor = 'lightblue';
    }
  };

  render() {
    return (
      <div>
        <div
          ref={element => { this.divElement = element; }} //ref를 바로 직접넣기
          style={{ width: '100px', height: '100px', border: '1px solid black' }}
        >
          Sample Div
        </div>
        <button onClick={this.changeBackgroundColor}>Change Color</button>
      </div>
    );
  }
}

export default SimpleRefExample;
```


ref 속성은 화살표 함수 element => { this.divElement = element; }를 사용하여 
div 요소에 직접 할당된다. <br> 
이 함수는 div 요소가 마운트될 때 호출되어 this.divElement에 해당 요소를 할당하고, <br> 언마운트될 때는 null을 할당한다.<br>  
changeBackgroundColor 메서드는 this.divElement를 사용하여 해당 div 요소의 배경색을 변경

```javascript
<div ref={(ref) => { this.divElement = ref; }} style={{ width: '100px', height: '100px', border: '1px solid black' }}>해도 상관없음
```