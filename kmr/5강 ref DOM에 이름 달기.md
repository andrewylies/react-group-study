
## ref는 어떤 상황에서 사용해야할까
DOM을 꼭 직접적으로 건드려야 할 때 ref를 사용한다.

예시로 input에 입력한 password를 업데이트 하는 경우는 state를 사용하면 DOM에 직접적인 접근이 필요 없이 문자열 전달이 가능하다.
```

//클래스형 컴포넌트 패스워드 업데이트 예시
class Vali extends Component {
	state = {
    	password: '';
    }

	handleChange = (e) => {
		this.setState({
		password: e.target.value
   		})
    }
    
    render() {
    	return (
        	<div>
          		<input
          			type="password"
          			value={this.state.password}
					onChange={this.handleChange}
          		>
          	</div>
        )
    }
}

export default Vali
```
이런 경우가 아니라 특정 Input에 포커스 주기, 스크롤 박스 조작, canvas요소에 그림그리기 등에는 ref를 사용한다.
> id 적용도 가능하지만 컴포넌트를 여러번 쓴다면 중복 id를 가진 DOM이 여러 개 생길 것이다.

## ref 사용
### 콜백 함수
```
<input ref={(ref) => {this.input=ref}}/>
```
ref라는 콜백 함수를 prop로 전달해준다.
이 콜백함수는 ref값을 파라미터로 전달받고,
함수 내부에서 파라미터로 받은 ref를 컴포넌트의 멤버 변수로 설정해준다.

### createRef
createRef는 리액트에 내장된 함수다.

```
import React, { Component } from 'react';

class RefSample extends Component {
	input = React.createRef();
// 1. 멤버 변수로 React.createRef()를 담아준다.

	handleFocus = () => {
		this.input.current.focus();
      // 3. 나중에 ref를 설정해준 DOM에 접근하려면 this.input.current를 조회
	}

render() {
	return (
		<div>
  			<input ref={this.input}>
      // 2. 해당 멤버변수를 ref 달고자 하는 요소에 ref props로 넣어준다.
    	</div>
		)
	}
}
```

## 컴포넌트에 ref 달기
컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때 쓴다.
```
//내부 컴포넌트 
import React, { Component } from 'react';

class ScrollBox extends Component {

    scrollToBottom = () => {
        const { scrollHeight, clientHeight } = this.box;

        this.box.scrollTop = scrollHeight - clientHeight;
      }
  
    render() {
      const style = {
        border: '1px solid black',
        height: '300px',
        width: '300px',
        overflow: 'auto',
        position: 'relative'
      };
  
      const innerStyle = {
        width: '100%',
        height: '650px',
        background: 'linear-gradient(white, black)'
      };

      return (
        <div
          style={style} 
          ref={(ref) => { this.box = ref }}>
          <div style={innerStyle} />
        </div>
      );
    }
  }
  
  export default ScrollBox;
```
```
//외부 컴포넌트
import React, { Component } from 'react';
import ScrollBox from './ScrollBox' //스크롤 컨트롤 js

	class App extends Component {
      return (
       	<div>
			<ScrollBox ref={(ref) => this.scrollBox=ref}/>
			<button onClick={() => this.scrollBox.scrollToBottom()}>
              // onClick={this.scrollBox.scrollToBottom}
              // 처음 랜더링 시 this.scrolllBox가 undefined라 오류 발생 : ref 콜백 함수가 실행되기 전에 렌더링이 완료되기 때문에. 
              // 리액트는 렌더링과 관련된 모든 작업이 완료된 후에 'componentDidMount' 라이프사이클 메서드가 호출되는데, 이때 ref 콜백함수가 실행된다.
              
              // 화살표 함수로 새로운 함수 만들어서 실행하면 버튼 누를 때는 이미 한 번 랜더링 한 상태라서 값 읽어올 수 있기 때문에 오류 안남 
              맨밑
			</button>
         </div>
      )
	}
