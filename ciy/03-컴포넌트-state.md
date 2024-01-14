03. 컴포넌트

4. state 
- props는 부모 컴포넌트에서 설정하는 값으로, 컴포넌트 자신은 읽기 전용으로만 접근할 수 있다.
- state란 컴포넌트 내부에서 바뀔 수 있는 값을 의미한다. 리액트에는 두 가지 종류의 state가 있다. 
- 하나는 클래스형 컴포넌트가 지니고 있는 state,
- 다른 하나는 함수형 컴포넌트에서의 useState라는 함수를 통해 사용하는 state.






1)함수형 컴포넌트에서 useState 사용하기

- useState 함수의 인자에는 상태의 초깃값을 넣는다.
- 클래스형 컴포넌트에서는 state가 객체 형태여야하지만, useState에서는 자유다.
- 함수를 호출하면 배열이 반환되는데 배열의 첫 번째 요소는 현재 상태이고, 두 번째 요소는 상태를 바꾸어주는 함수이다.(상태를 바꾸어주는 함수를 세터(setter) 함수라고 부른다.)

제시된 예시
(ex1)
import React, { useState } from ‘react‘;


const Say = () => {
  const [message, setMessage] = useState(“); //배열 비구조화 할당
  const onClickEnter = () => setMessage(‘안녕하세요!’);
  const onClickLeave = () => setMessage(‘안녕히 가세요!’);



return (
    <div>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1>{message}</h1>
    </div>
  );
};

--

import React from 'react';
import Say from './Say';
 
const App = () => {
  return <Say />;
};
 
export default App;


- 한 컴포넌트에서 useState를 여러 번 사용가능하다.














2)클래스형 컴포넌트의 state

이해하기 쉬운 기초예시
(ex1)
import React, { Component } from ‘react‘;
 
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {          // state의 초깃값 설정하기
      number: 0
    };
  }
  render() {
    const { number } = this.state; // state를 조회할 때는 this.state로 조회한다.
    return (
      <div>
        <h1>{number}</h1>
        <button
          // onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정.
          onClick={() => {
            // this.setState를 사용하여 state에 새로운 값을 넣을 수 있음.
            this.setState({ number: number + 1 });
          }}
        >
          +1
        </button>
      </div>
    );
  }
}
 
export default Counter;



*
(ex1-1)
constructor(props) {
  super(props);
  this.state = {        // state의 초깃값 설정하기
      number: 0
    };
  }


- 컴포넌트에서 state를 설정할 때는 *constructor 메서드를 작성한다. 
- constructor 메서드는 컴포넌트의 생성자 메서드인데, constructor을 작성할 때는 반드시 super(props)를 호출해야 한다. 
- *super(props) 함수가 호출되면, 현재 클래스형 컴포넌트가 상속하고 있는 리액트의 Component 클래스가 지닌 생성자 함수를 호출한다. 
- this.state 값에 초깃값을 설정해 주어야한다. 
- 컴포넌트의 state는 객체 형식이어야 한다. (클래스형 컴포넌트에서는 state가 객체 형태여야하지만, useState에서는 자유다.)

*
클래스에서 인스턴스 속성을 정의하고 사용하기 위해서는 주로 constructor 메서드를 사용한다.
constructor는 클래스의 새 인스턴스가 생성될 때 자동으로 호출되는 특별한 메서드이다.
constructor 내에서는 this 키워드를 사용하여 인스턴스 속성을 설정할 수 있다. 
this는 '생성된 인스턴스'를 가리킨다. 인스턴스 속성은 각 객체(인스턴스)에 고유한 데이터를 저장하는 데 사용한다.

(ex1-2)
render() {
  const { number } = this.state; // state를 조회할 때는 this.state로 조회한다.
  return (
      <div>
        <h1>{number}</h1>
        <button
        // onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정
        onClick={() => { //기능이 되는 부분 props로 넣어줌.
          // this.setState를 사용하여 state에 새로운 값을 넣을 수 있음.
          this.setState({ number: number + 1 });
          }}
        >
          +1
        </button>
      </div>
    );
  }

- 위 render 함수에서 현재 state를 조회하려면 this.state를 조회하면 된다. 
- 이 컴포넌트에서 버튼을 클릭할 때마다, 화면에 출력되는 숫자의 값을 증가시킨다. 
- 이러한 기능을 구현하기 위해 button 안에 onClick이라는 값을 props로 넣어준다. 
- 이를 통해 버튼이 클릭될 때, this.setState를 이용해 state에 새로운 값을 넣어준다.


(ex1-3)
- Counter 컴포넌트(화면에 출력되는 숫자의 값을 증가시키는 기능을 구현한 컴포넌트)를
- App에 불러와 렌더링

import React from ‘react‘;
import Counter from ‘./Counter‘;


const App = () => {
  return <Counter />;
};



export default App;



- state 안에 여러값이 올 수 있따

import React, { Component } from ‘react‘;


class Counter extends Component {
  constructor(props) {
    super(props);
    // state의 초깃값 설정
    this.state = {
      number: 0,
      fixedNumber: 0 //fixedNumber라는 값도 들어옴~
    };
  }
  render() {
    const { number, fixedNumber } = this.state;
    return (
      <div>
        <h1>{number}</h1>
        <h2>바뀌지 않는 값: {fixedNumber}</h2>
        <button
          // onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정.
          onClick={() => {
            this.setState({ number: number + 1 });
          }}
        >
          +1
        </button>
      </div>
    );
  }
}





- state를 constructor에서 꺼내기 

- constructor 메서드를 선언하지 않고 초깃값을 설정할 수 있다.
- 클래스 내부에 constrcutor  메서드 대신 아래 코드를 입력가능.

  state = {
    number: 0,
    fixedNumber: 0
  };
 

 
- this.setState를 사용한다고 해서 state 값이 바로 바뀌지 않는다. 
- 만약 바로 업데이트를 하고 싶다면 this.setState를 사용할 때, 객체 대신 함수를 인자로 넣어주면 된다. 
- prevState는 기존 상태이고, 
- props는 현재 지니고 있는 props이다. 
- props가 필요하지 않으면 생략할 수 있다.

 

this.setState((prevState, props) => {
return {
  // 업데이트하고 싶은 내용
}
})
 


- this.setState를 두 번 호출하기

 

<button
  // onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정.
  onClick={() => {
    this.setState(prevState => {
      return {
        number: prevState.number + 1
      };
    });
    // 위 코드와 아래 코드는 완전히 똑같은 기능을 한다.
    // 아래 코드는 함수에서 바로 객체를 반환한다는 의미.
    this.setState(prevState => ({
      number: prevState.number + 1
    }));
  }}
>
  +1
</button>
 
- OnClick에서 두 번째로 setState 함수를 사용할 때, 화살표 함수에서 바로 객체를 반환하도록 함.
- 이렇게 객체 대신 함수를 인자로 넣어주면, 브라우저에서 [+1]을 누르면 숫자가 2씩 증가.

 

 

 

- setState를 사용해 값을 업데이트한 후, 
- 특정 작업을 하고 싶다면 setState의 두 번째 파라미터로 *콜백 함수를 등록하여 작업을 처리할 수 있다.

<button
  onClick={() => {
    this.setState(
      {
        number: number + 1
      },
      () => {
        console.log(‘방금 setState가 호출되었습니다.’);
        console.log(this.state);
      }
    );
  }}
>
  +1
</button>
 
- console 창을 열면 ‘방금 setState가 호출되었습니다.’라는 메시지와 state 값이 출력.


*
- setState의 콜백 함수는 React에서 상태가 업데이트되고 나서 실행되는 함수를 의미한다. 
- React의 setState 메소드는 비동기적으로 작동하기 때문에, 상태가 업데이트되고 해당 업데이트가 화면에 반영된 후 특정 작업을 수행하고 싶을 때 콜백 함수를 사용한다.

*
- 예시 코드에서 this.setState를 사용하여 number 상태를 업데이트하고 있다. (number를 증가)
- 여기서 setState의 첫 번째 인자는 상태를 업데이트하는 객체이고, 
- 두 번째 인자는 상태 업데이트 후 실행될 콜백 함수이다.
(콜백 함수에서는 console.log를 사용하여 '방금 setState가 호출되었습니다.'라는 메시지와 업데이트된 state를 출력하고 있다.)

- 이 콜백 함수는 setState가 상태를 업데이트하고, 그 업데이트가 컴포넌트에 반영된 후에 호출된다.
- 콜백 함수는 setState로 상태를 변경한 후, 그 변경이 완료되고 난 뒤에 실행되는 함수이다. 
- 이를 통해 상태 변경이 확실히 완료된 후 추가적인 작업을 수행할 수 있다.

 














5. state를 사용할 때 주의 사항 
- state 값을 바꿀 때, 세터 함수를 사용해야 한다.(세터함수는 상태를 바꾸어주는 함수)
- setState나 useState에서 바로 state 값을 바꾸면 오류가 발생한다. 


// 아래는 모두 잘못된 코드 예시 나열.

// 클래스형 컴포넌트에서 이렇게 사용하면 안된다
this.state.number = this.state.number + 1;
this.state.array = this.array.push(2);
this.state.object.value = 5;


// 함수형 컴포넌트에서 이렇게 사용하면 안된다.
const [object, setObject] = useState({ a: 1, b: 1 }); // 이렇게 바로 state값을 바꾸면 안된다.
object.b = 2;





- state 값을 바꾸기 위해서는 배열이나 객체의 사본을 만들고, 
- 그 사본에 값을 업데이트한 후, 
- 그 사본의 상태를 setState 또는 세터 함수를 통해 업데이트한다.

 

// 객체 다루기
const object = { a: 1, b: 2, c: 3 };
const nextObject = { ...object, b: 20 }; // b 값만 수정한 사본 만들기
 
- 객체에 대한 사본을 만들 때는 점 세 개가 연달아 붙어있는 *spread 연산자를 사용하여 처리한다. 
- *스프레드 연산자는 배열, 문자열, 객체 등 반복 가능한 객체를 개별 요소로 분리할 수 있다. 
- 위의 예시에서는 nextObject 객체에 object의 값을 덮어쓴 후, b의 값을 수정하였다.

 

// 배열 다루기
- 배열에 대한 사본을 만들 때는 *배열의 내장 함수들을 사용한다. 

이해하기쉬운예시
(ex1)

const array = [
{ id: 1, value: true },
{ id: 2, value: true },
{ id: 3, value: false }
];

let nextArray = array.concat({ id: 4 }); // 새 항목 추가 //*concat 함수를 통해 원본 배열 array에 id가 4인 새 항목을 추가한 사본을 만들기
nextArray.filter(item => item.id !== 2); // id가 2인 항목 제거 //*filter 함수를 이용하여 id가 2가 아닌 함수들만을 필터링
nextArray.map(item => (item.id === 1 ? { ...item, value: false } : item)); // id가 1인 항목의 value를 false로 설정 // *map 함수를 이용하여 id가 1이면, value 값을 false로 설정
