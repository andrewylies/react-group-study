# 4장. 이벤트 핸들링
*2024/1/23 4장 정리*
* * *
## 이벤트(event)란?
사용자가 웹 브라우저에서 DOM 요소들과 상호작용하는 것

## 리액트에서 이벤트 사용 시 주의사항
1. 이벤트 이름은 카멜 표기법으로 작성
2. 이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달해야함
3. DOM 요소에만 이벤트를 설정할 수 있음
    > 컴포넌트에는 이벤트를 설정할 수 없지만, props로 함수를 넘겨줄 수 있음

## onChange 이벤트 핸들링하기
* console.log(e) = 이벤트 목록들이 나옴
* console.log(e.target) = 내가 선택한 이벤트 목록이 나옴

## 임의 메서드 만들기
위에서본 리액트 이벤트 사용 주의점 3번째 이야기를 바탕으로 아래와 같이 진행될 수 있다.

```
class EventPractice extends Component {
    state = {
        message: ''
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        alert(this.state.message);
        this.setState({
            message: ''
        })
    }

    render() {
        return (
            <div>
            <button onClick={this.handleClick}>확인</button>
            </div>
        )
    }
}
```
> 여기서 **bind**는 무엇일까?
>* 함수가 호출될 때 this는 호출부에 따라 결정되므로, 클래스의 임의 메서드가 특정 HTML요소의 이벤트로 등록되는 과정에서 메서드와 this의 관계가 끊어져 버린다.
>* 이 때문에 임의 메서드가 이벤트로 등록되어도 this가 컴포넌트 자신으로 가리키기 위해서는 메서드를 this와 바인딩하는 작업이 필요하다.
>* 만약 바인딩하지 않으면 위에서 가르킨 this는 undefined가 나온다.