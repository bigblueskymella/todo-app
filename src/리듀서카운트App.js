import React, { useReducer } from "react";

// 1. 리듀서 함수 정의
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + action.data; // 상태 증가
    case "DECREMENT":
      return state - action.data; // 상태 감소
    default:
      return state; // 기본 상태 반환
  }
};

const Counter = () => {
  // 2. useReducer 초기화 : useState의 대체제
  const [count, dispatch] = useReducer(reducer, 0); // 초기값은 0

  // 3. 이벤트 핸들러 함수
  // dispatch: 상태변화 필요시 🟡촉발하는 함수 {인수2개 객체 전달}
  // 객체 : State의 변경 정보를 담고 있다 (= action객체)
  // type프로퍼티 : 어떤 상황발생? 
  // data프로퍼티 : 상태 변화에 필요한 값
  const onInCrease = () => dispatch({ type: "INCREMENT" , data:1 });
  const onDecrease = () => dispatch({ type: "DECREMENT" , data:1});

  return (
    <div>
      <h1>useReducer를 이용한 Counter</h1>
      <h2>{count}</h2>
      <button onClick={onInCrease}>+</button>
      <button onClick={onDecrease}>-</button>
    </div>
  );
};

export default Counter;