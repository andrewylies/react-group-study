리액트에서는 컴포넌트에도 ref를 달 수 있다. 

1)
```javascript
<MyComponent ref = {(ref) => {this.myComponent=ref}} />
```
이 코드에서 MyComponent 내부의 메서드 및 멤버 변수에도 접근할 수 있다.



ex1)

컴포넌트 초기 설정<br>
- ScrollBox 컴포넌트 파일을 생성한다. 
- JSX 인라인 스타일링 문법으로 스크롤 박스를 만들고 최상위 DOM에 ref를 달아보기.

```javascript
//컴포넌트 파일 생성

import React, { Component } from 'react';

class ScrollBox extends Component {
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
                ref={(ref) => { this.box = ref; }}>
                <div style={innerStyle} /> 
            </div>
        );
    }
}

export default ScrollBox;
```

<br><br><br>

```javascript
//App 컴포넌트에서 ScrollBox 컴포넌트를 렌더링

import React, { Component } from 'react';
import ScrollBox from './ ScrollBox';

class App extends Component {
  render() {
    return (
      < ScrollBox/>
    );
  }
}

export default App;

```

<br><br><br>

2)컴포넌트에 메서드 생성
```javascript
//컴포넌트에 메서드 생성
class ScrollBox extends Component {

    scrollToBottom = () => {
        const { scrollHeight, clientHeight } = this.box;
        this.box.scrollTop = scrollHeight - clientHeight;
    };
    
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
                ref={(ref) => { this.box = ref; }}>
        	<div style={innerStyle} /> 
            </div>
        );
    }
}
```
이 scrollToBottom 메서드는 부모인 App 컴포넌트에서 ScrollBox에 ref를 달면 사용할 수 있습니다.


>scrollTop: 세로 스크롤바 위치<br>
scrollHeight: 스크롤이 있는 박스 안의 div 높이<br>
clientHeight: 스크롤이 있는 박스의 높이

> scrollTop: 요소의 스크롤바의 수직 위치를 나타냅니다. 이 값은 요소의 맨 위에서 스크롤바까지의 거리(픽셀 단위)를 나타냄<br>
> scrollHeight: 요소의 전체 콘텐츠 높이를 나타냅니다. 즉, 스크롤바 없이 모든 콘텐츠를 보기 위해 필요한 높이<br>
> clientHeight: 요소의 높이를 나타냅니다. 이 값은 스크롤바를 포함하지 않는 요소의 내부 높이(픽셀 단위)를 의미<br>
```javascript
this.box.scrollTop = scrollHeight - clientHeight;
```
>scrollHeight - clientHeight는 요소의 전체 콘텐츠 높이에서 보이는 콘텐츠의 높이를 뺀 값이다. <br>
> 즉, 스크롤바를 맨 아래로 이동시키기 위해 얼마나 스크롤해야 하는지를 계산.<br>
>this.box.scrollTop = ...는 계산된 값으로 scrollTop 속성을 설정, 스크롤바가 요소의 맨 아래로 이동







<br><br><br>
3)컴포넌트에 ref 달고 내부 메서드 사용<br>
App 컴포넌트에서 ScrollBox 컴포넌트에 ref를 달고, <br>
버튼을 누르면 scrollToBottom 메서드를 실행하도록 렌더링.


```javascript
//컴포넌트에 ref 달고 내부 메서드 사용
import React, { Component } from 'react';
import ScrollBox from './ ScrollBox';

class App extends Component {
  render() {
    return (
      <div>
        <ScrollBox ref={(ref) => this.scrollBox=ref}/>
        <button onClick={() => this.scrollBox.scrollToBottom()}>맨 밑으로</button>
     </div>
    );
  }
}

export default App;
```

컴포넌트가 처음 렌더링 될 때에는<br>
this.scrollBox 값이 정의되어 있지 않으므로 <br>
onClick 값으로 바로 불러온다면 오류가 발생한다. <br>
따라서 화살표 함수 문법을 사용하여 새로운 함수를 만들고 <br>
그 내부에서 this.scrollBox. scrollToBottom 메서드를 실행하는 것이 안전하다.