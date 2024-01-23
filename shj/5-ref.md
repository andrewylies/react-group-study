# 5장. ref: DOM에 이름달기
*2024/1/23 4장 정리*
* * *
## Ref란?
HTML에 id를 사용하여 DOM에 이름을 다는 것 처럼, 리액트 프로젝트 내부에서 이름을 다는 방법이 ref(reference)이다.

> ref는 전역 작동이 아닌, 컴포넌트 내부에서만 작동하기 때문에, 컴포넌트를 여러번 사용할 때 중복되지 않는다.
> * id는 전역이기때문에 컴포넌트를 여러번 사용할 경우, 중복되어 에러가 난다.

## Ref는 어떤 상황에서 사용해야 할까?
DOM을 직접 건드려야 할때!

> 1. 특정 input에 포커스 주기
> 2. 스크롤 박스 조작하기
> 3. Canvas 요소에 그림 그리기 등등..

## Ref 사용법
#### 1) 콜백 함수를 통한 ref 설정
```
<input ref={(ref) => {this.input=ref}} />
// ref 이름은 자유롭게 지정 가능함.
```
#### 2) createRef를 통한 ref 설정
리액트 v16.3 부터 사용 가능
```
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
```

## 컴포넌트에 ref 달기
```
<My Component ref={(ref) => {this.myComponent=ref}} />
```

## 주의점
서로 다른 컴포넌트끼리 데이터를 교류할 때 ref를 사용하는 것을 지양한다.
컴포넌트끼리 데이터를 교류할 때는 언제나 부모-자식 흐름으로 교류해야하기 때문이다.