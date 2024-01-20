BgChange 컴포넌트: <br>
배경색을 변경할 수 있는 버튼을 가진 컴포넌트.

App 컴포넌트: <br>
BgChange 컴포넌트에 ref를 전달하고, <br>
버튼 클릭 시 BgChange 컴포넌트의 배경색을 변경.

```javascript
//BgChange 컴포넌트
import React, { Component } from 'react';

class BgChange extends Component {
  constructor(props) {
    super(props);
    this.state = { color: 'white' };
    this.changeColor = this.changeColor.bind(this);
  }

  changeColor(color) {
    this.setState({ color });
  }

  render() {
    return (
      <div style={{ backgroundColor: this.state.color, padding: '20px' }}>
        <button onClick={() => this.changeColor('blue')}>Blue</button>
        <button onClick={() => this.changeColor('green')}>Green</button>
      </div>
    );
  }
}

export default BgChange;
```

```javascript
//App 컴포넌트
import React, { Component } from 'react';
import BgChange from './BgChange'; // BgChange 컴포넌트를 임포트

class App extends Component {
  constructor(props) {
    super(props);
    this.bgChangeRef = React.createRef();
  }

  changeBgColor = (color) => {
    this.bgChangeRef.current.changeColor(color);
  }

  render() {
    return (
      <div>
        <BgChange ref={this.bgChangeRef} />
        <button onClick={() => this.changeBgColor('red')}>Change to Red</button>
      </div>
    );
  }
}

export default App;
```


이 예제에서 App 컴포넌트는 BgChange 컴포넌트에 ref를 생성하여 전달한다. <br>
App 컴포넌트의 버튼을 클릭하면 BgChange 컴포넌트의 changeColor 메서드를 호출하여 배경색을 변경한다.<br> ref를 사용하여 부모 컴포넌트에서 자식 컴포넌트의 메서드를 직접 호출할 수 있다.




<br><br><br>

콜백 함수를 사용하여 ref를 설정하는 방법



BgChange 컴포넌트는 이전과 동일. <br>
여기서는 컴포넌트의 메서드와 상태를 사용하여 배경색을 변경한다.


```javascript
//BgChange 컴포넌트
import React, { Component } from 'react';

class BgChange extends Component {
  constructor(props) {
    super(props);
    this.state = { color: 'white' };
    this.changeColor = this.changeColor.bind(this);
  }

  changeColor(color) {
    this.setState({ color });
  }

  render() {
    return (
      <div style={{ backgroundColor: this.state.color, padding: '20px' }}>
        <button onClick={() => this.changeColor('blue')}>Blue</button>
        <button onClick={() => this.changeColor('green')}>Green</button>
      </div>
    );
  }
}

export default BgChange;
```


App 컴포넌트에서는 콜백 함수를 사용하여 BgChange 컴포넌트의 참조를 저장한다.

```javascript
//App 컴포넌트
import React, { Component } from 'react';
import BgChange from './BgChange';

class App extends Component {
  constructor(props) {
    super(props);
    this.bgChangeRef = null;
    this.setBgChangeRef = element => {
      this.bgChangeRef = element;
    };
  }

  changeBgColor = (color) => {
    if (this.bgChangeRef) {
      this.bgChangeRef.changeColor(color);
    }
  }

  render() {
    return (
      <div>
        <BgChange ref={this.setBgChangeRef} />
        <button onClick={() => this.changeBgColor('red')}>Change to Red</button>
      </div>
    );
  }
}

export default App;
```