컴포넌트

3. props 
- props는 properties를 줄인 표현으로 컴포넌트 속성을 설정하는 요소이다.
- props 값은 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트에서 설정할 수 있다.

기존 예시
App 컴포넌트에서 MyComponent의 props 값을 설정.

(ex1)
```
1) MyComponent 컴포넌트에서 name이라는 props를 렌더링 하도록 수정
```
```javascript
//[MyComponent라는 파일]

import React from ‘react‘;

const MyComponent = props => {
return <div>안녕하세요, 제 이름은 {props.name}입니다.</div>; {/** MyComponent 컴포넌트에서 name이라는 props를 렌더링 하도록 수정 */}
};

export default MyComponent;
```

```
2) MyComponent 컴포넌트를 불러와 사용하는 부모 컴포넌트인 App 컴포넌트에서 props의 값을 지정
```

```javascript
//[App라는 파일]
- App 컴포넌트에서 MyComponent 컴포넌트를 불러내기


import React from 'react';
import MyComponent from './MyComponent';  // import를 이용해 [MyComponent 불러오기]
 
const App = () => {
  return <MyComponent name="React" />; {/*MyComponent 컴포넌트를 불러와 사용하는 부모 컴포넌트인 App 컴포넌트에서 props의 값을 지정 */}
};
 
export default App;
```

```
3) props 값을 지정하지 않아도 보여줄 기본값 defaultProps을 설정
```

```javascript
import React from 'react';
 
const MyComponent = props => {
  return <div>안녕하세요, 제 이름은 {props.name}입니다.</div>;
};
 
MyComponent.defaultProps = {
  name: '기본 이름'
};
 
export default MyComponent;
```

<br><br>
4) 태그 사이의 내용을 보여주는 children
- children이란 컴포넌트 태그 사이의 내용을 보여주는 props

```javascript
import React from 'react';
import MyComponent from './MyComponent';
 
const App = () => {
  return <MyComponent>리액트</MyComponent>;
};
 
export default App;
```


```javascript
import React from 'react';
 
const MyComponent = props => {
  return (
    <div>
      안녕하세요, 제 이름은 {props.name}입니다. <br />
      children 값은 {props.children}
      입니다.
    </div>
  );
};
 
MyComponent.defaultProps = {
  name: '기본 이름'
};
 
export default MyComponent;
```
```
*
안녕하세요, 제 이름은 기본 이름 입니다.
children 값은 리액트
입니다.
```

<br><br>
5) *비구조화 할당 문법을 통해 props 내부 값 추출하기
- *비구조화 할당 문법을 사용하여 props. 키워드 사용 없이 내부 값을 바로 추출가능.
- 객체에서 값을 추출하는 문법을 *객체 비구조화 할당이라고 부른다. 
- 이 문법은 *구조 분해 문법이라고도 불리며, 함수의 파라미터 부분에서도 사용할 수 있다.

>*비구조화 할당 = 구조분해할당 : 객체나 배열로부터 데이터를 추출하고 변수에 할당하는 방식을 의미 = destructuring assignment

```javascript
import React from 'react';
 
const MyComponent = props => {
  const { name, children } = props;    //비구조화 할당 문법
  return (
    <div>
      안녕하세요, 제 이름은 {name}입니다. <br />
      children 값은 {children}
      입니다.
    </div>
  );
};
 
MyComponent.defaultProps = {
  name: '기본 이름'
};
 
export default MyComponent;
```

>*함수형 컴포넌트에서는 이렇게 파라미터 부분에서 비구조화 할당 문법을 사용

```javascript
import React from 'react';
 
const MyComponent = ({ name, children }) => { //*함수형 컴포넌트에서는 파라미터 부분에서 props를 바로 ({ name, children }) 이렇게 넣어서 사용
  return (
    <div>
      안녕하세요, 제 이름은 {name}입니다. <br />
      children 값은 {children}
      입니다.
    </div>
  );
};
 
MyComponent.defaultProps = {
  name: '기본 이름'
};
 
export default MyComponent;
```

<br><br>
6) propTypes를 통한 props 검증
(공부필요)


<br><br>
7) 클래스형 컴포넌트에서 props 사용하기
- 클래스형 컴포넌트에서 props를 사용할 때 render 함수에서 this.props를 작성.
- defaultProps와 propTypes는 함수형 컴포넌트와 같은 방식

(ex1)
```javascript
import React, { Component } from ‘react‘;
import PropTypes from ‘prop-types‘;

class MyComponent extends Component {
  render() {
    const { name, favoriteNumber, children } = this.props; // 비구조화 할당
    return (
      <div>
        안녕하세요, 제 이름은 {name}입니다. <br />
        children 값은 {children}
        입니다.
        <br />
        제가 좋아하는 숫자는 {favoriteNumber}입니다.
      </div>
    );
  }
}

MyComponent.defaultProps = {
  name: ‘기본 이름‘
};

MyComponent.propTypes = {
  name: PropTypes.string,
  favoriteNumber: PropTypes.number.isRequired
};

export default MyComponent;
```
<br>

* defaultProps와 propTyeps를 설정할 때 클래스 내부에서 지정가능
  
(ex1)

```javascript
import React, { Component } from ‘react‘;
import PropTypes from ‘prop-types‘;

class MyComponent extends Component {
  static defaultProps = {
    name: ‘기본 이름‘
  };
  static propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired
  };
  render() {
    const { name, favoriteNumber, children } = this.props; // 비구조화 할당
    return (…);
  }
}


export default MyComponent;
```

>static은<br>
>- static defaultProps와 static propTypes는 MyComponent 클래스 내부에 정의되었다. <br>
>- static 키워드를 사용함으로써, 이 두 속성은 클래스의 정적 속성이 된다. <br>
>- *정적 속성은 클래스의 인스턴스가 아니라 클래스 자체에 바인딩되며, 이 속성들은 모든 *인스턴스에 공통적으로 사용된다.



>내부에 두는 static 방식의 장점은 <br>
>- 관련 설정이 클래스 정의 내에 포함되어 있어 코드의 구성이 더 명확해짐. <br>
>- 관련 속성과 메서드가 같은 위치에 있어 관리하기 쉬움. <br>
>- 클래스 기반 컴포넌트를 사용할 때 내부에 static을 쓰는 이 방식이 더 일관된 구조를 제공한다.<br>

<br>
*정적 속성?

>일단 클래스부터.<br>

>클래스는 객체 지향 프로그래밍에서 사용되는 '설계도'와 같다.  <br>
>이 설계도를 바탕으로 실제 객체(인스턴스)를 생성할 수 있다. <br>
>예를 들어, Car 클래스(설계도)가 있다면, 여러 대의 Car 인스턴스(자동차)를 만들 수 있다.<br>

<br>
클래스에는 두 종류의 속성이 있다. (인스턴스 속성과 정적 속성)


>인스턴스 속성: <br>
>- 이들은 클래스의 각 인스턴스에 고유.<br>
>- 예를 들어, 각 Car 인스턴스는 고유의 색상, 모델 등을 가질 수 있다.<br>
>- 이러한 속성들은 각각의 Car 객체 내에서 서로 다를 수 있다.<br>

>정적 속성: <br>
>- 반면에, 정적 속성은 클래스 자체에 바인딩된다. <br>
>- 이는 클래스의 모든 인스턴스가 공유하는 속성입니다. (아! 모든 인스턴스가 공유하는 속성!)<br>
>- 예를 들어, Car 클래스에 wheels = 4라는 정적 속성을 설정할 수 있습니다.<br>
>- 이 경우, 모든 Car 인스턴스는 4개의 바퀴를 공유하게 된다.<br>
>- 클래스의 모든 인스턴스에 공통된 값이 필요할 때 유용하다.<br>



>정적 속성은 클래스에 속하는 '공통의' 속성이며, <br>
>인스턴스 속성은 각 객체(인스턴스)에 고유한 속성이다.

```javascript
class Dog {
  // 정적 속성
  static species = "리트리버";
  static legCount = 4;

  constructor(name, age) {
    // 인스턴스 속성
    this.name = name;
    this.age = age;
  }
}

// 인스턴스 생성
let dog1 = new Dog("햇님", 2);
let dog2 = new Dog("달님", 5);

// 인스턴스 속성 사용
console.log(dog1.name); // "햇님"
console.log(dog2.age); // 5

// 정적 속성 사용
console.log(Dog.species); // "리트리버"
console.log(Dog.legCount); // 4
```


*
>클래스에서 인스턴스 속성을 정의하고 사용하기 위해서는 주로 constructor 메서드를 사용한다. <br>
>constructor는 클래스의 새 인스턴스가 생성될 때 자동으로 호출되는 특별한 메서드이다. <br>
>constructor 내에서는 this 키워드를 사용하여 인스턴스 속성을 설정할 수 있다.  <br>
>this는 '생성된 인스턴스'를 가리킨다. 인스턴스 속성은 각 객체(인스턴스)에 고유한 데이터를 저장하는 데 사용한다. <br>

(ex2)
```javascript
class Cat {
  constructor(name, age) { //constructor는 name과 age라는 두 개의 매개변수를 받는다. 
    this.name = name; // 인스턴스 속성
    this.age = age;   // 인스턴스 속성
  }
}

let cat1 = new Cat("풀잎", 30);
let cat2 = new Cat("꽃잎", 25);

console.log(cat1.name); // "풀잎"
console.log(cat2.name); // "꽃잎"
```

>*예시는<br>
>constructor는 name과 age라는 두 개의 매개변수를 받는다. <br>
>이 두 매개변수는 각각의 Cat 인스턴스에 대해 this.name과 this.age로 설정된다. <br>
>따라서, 각 Cat 인스턴스는 고유한 name과 age 값을 가지게 된다.<br>

정리.. 인스턴스 속성을 설정하고 사용하기 위해서  <br>
constructor 내에서 this 키워드를 사용하여 이러한 속성을 초기화하는 것이 일반적이다.
