# 7장. 컴포넌트의 라이프사이클 메서드
*2024/2/7 7장 정리*
* * *
## 라이프사이클
라이프사이클은 컴포넌트가 렌더링되기 전 -> 페이지가 뜨고 -> 페이지가 사라질 때 끝난다. <br/>
프로젝트를 진행하다보면 페이지가 렌더링 되는 시점이나, 업데이트 전후에 기능을  추가하거나 처리해야하는 일이 생기는데,<br/>
이때 컴포넌트 라이프사이클 메서드를 사용한다.
> 라이프사이클 메서드는 클래스형에서만 사용할 수 있었으나, <br>
> 함수 컴포넌트에서 Hooks 기능으로 비슷하게 처리할 수 있게됨.

## 컴포넌트의 라이프사이클
![img](https://velog.velcdn.com/images/hang_kem_0531/post/81707b9e-063b-4b5e-a742-0dd3977aec6c/image.png)
1. Will 접두사가 붙은 메서드 : 어떤 작업이 작동되기 전
2. Did 접두사가 붙은 메서드 : 어떤 작업을 작동한 후
> 라이프사이클 메서드는 총 9개로,<br>
> 위 이미지와 같이 **마운트, 업데이트, 언마운트** 3가지의 카테고리로 나뉜다.


## 마운트(Mount)
DOM이 생성되고 웹브라우저상에 나타나는 것.

![img](https://blog.kakaocdn.net/dn/cr2zCJ/btqAjVjZsTM/zKq2Bn41srvEi7QMUcRjf1/img.png)
* **constructor** <br>
컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드로, 초기 state값을 설정할 수 있다.

* **getDerivedStateFromProps** <br>
props에 있는 값을 state에 넣을 때 사용하는 메서드

* **render** <br>
UI 렌더링하는 메서드

* **componentDidMount** <br>
컴포넌트가 웹 브라우저상에 나타난 후 호출되는 메서드


## 업데이트(update)
업데이트는 아래와 같은 경우에 메서드를 호출한다.
1. props / state가 바뀔 때
2. 부모 컴포넌트가 리렌더링 될 때
3. this.forceUpdate로 강제로 렌더링을 트리거할 때 <br>

![img](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FeljYxT%2FbtqAm3nl6Rb%2FT6aKBRyW5pq92n9YkWrBcK%2Fimg.png)

* **getDerivedStateFromProps** <br>
마운트 과정에서도 호출되는 이 메서드는 업데이트가 시작하기 전에 호출된다.<br>
props의 변화에 따라 state 값에 변화를 주고 싶을 때 사용한다.

* **shouldComponentUpdate** <br>
true / false 값을 반환해야 하며, true 반환시 다음 라이프사이클 메서드를 계속 실행하고, false 반환 시 중지한다.<br>
만약 특정함수에서 this.forceUpdate()를 호출하면 이과정을 생략하고 바로 render 함수를 호출한다.(리렌더링을 안할수도 있음)

* **render** <br>
컴포넌트 리렌더링

* **getSnapshotBeforeUpdate** <br>
컴포넌트 변화를 DOM에 반영하기 직전에 호출하는 메서드

* **componentDidUpdate** <br>
컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드

## 언마운트(unMount)
마운트의 반대 과정, 즉 컴포넌트를 DOM에서 제거하는 것
![img](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FwidUX%2FbtqAjahRLKU%2FsTL1OamYU0aLgcZkrwsAg0%2Fimg.png)
* **componentWillUnmount** <br>
컴포넌트가 웹 브라우저상에 사라지기 전 호출하는 메서드

## 라이프사이클 메서드 자세히보기

### render()
1. this.props와 this.state에 접근할 수 있다.
2. 보여줄 게 없으면 null 혹은 false값을 반환하면 된다.
3. **!!!주의점**: 브라우저 DOM 접근 안됨(렌더링이 완료된게 아니니까)

### constructor()
1. 컴포넌트 생성자 메서드(컴포넌트 처음만들 때 실행)
2. 초기 state값을 정할 수 있다.

### getDerivedStateFromProps()
1. props로 받아온 값을 state에 동기화시키는 용도로 사용한다.
2. 컴포넌트가 마운트, 업데이트 될 때 호출한다.
```javascript
static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.value !== prevState.value) {
        //조건에 따라 특정 값 동기화
        return {
            value: nextProps.value
        };
    };
    return null; //state를 변경할 필요 없다면 null 반환
}
```

### componentDidMount()
1. 컴포넌트 만들고, 첫 렌더링 마친 후 실행한다.
2. 다른 자바스크립트 라이브러리 또는 프레임워크의 함수를 호출한다.
3. 이벤트 등록, setTimeout, setInterval, 네트워크 요청 같은 비동기 작업을 처리한다.

### shouldComponentUpdate()
1. props, state를 변경했을 때 리렌더링을 여부를 지정하는 메서드이다.
2. 반드시 true / false 값을 반환해야 한다.(디폴트 true)
3. false가 반환되면 업데이트 과정은 여기서 중지된다.
4. 현재 props, state는 this.props, this.state로 접근한다.

### getSnapshotBeforeUpdate()
1. render에서 만들어진 결과물이 브라우저에 실제 반영되기 직전에 호출한다.
```javascript
//예시_ 스크롤바 위치 유지할 때 사용
getSnapshotBeforeUpdate(prevProps, prevState){
    if(prevState.array !== this.state.array){
    const { scrollTop, scrollHeight } = this.list
    return { scrollTop, scrollHeight };
    }
}
```

### componentDidUpdate()
1. 리렌더링 완료한 후 실행한다.
2. 업데이트가 끝난 직후여서, DOM 관련 처리해도 된다.
3. 컴포넌트가 이전에 가졌던 데이터에 접근할 수 있다.

### componentWillUnmount()
1. 컴포넌트를 DOM에서 제거할 때 실행한다.
2. **componentDidMount** 에서 등록한 이벤트, 타이머, 직접 생성한 DOM은 여기서 제거 작업을 해야한다.

### componentDidCatch()
1. 컴포넌트 렌더링 도중 에러가 발생했을 때 오류 UI를 보여줄 수 있게 한다.
2. 첫번째 파라미터는 에러난 내용이 담기고, 두번째 파라미터는 에러가 발생한 위치를 알려준다.

```javascript
componentDidCatch(error, info) {
    this.setState({
        error: true
    });
    console.log({ error, info });
    // error는 파라미터에 어떤 에러가 발생했는지 알려줌
}
```
> 위 메서드는 컴포넌트 자신에게 발생되는 에러를 잡을 수 없고, this.props.children으로 전달되는 컴포넌트에서 발생하는 에러만 잡을 수 있다.



