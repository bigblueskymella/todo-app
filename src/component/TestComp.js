import React, { useReducer } from 'react'
import { useState } from 'react'

function reducer(state, action){
  switch(action.type){
    case "INIT":
      return 0;
    case "INCREASE":
      return state + action.data;
    case "DECREASE":
      return state - action.data;
    default:
      return state;
  }
}

const TestComp = () => {
  //const [count, setCount]=useState(0) //1️⃣
  //2️⃣state함수, 상태변화촉발함수 = 생성자(상태변화함수,초깃값)
  const [count, dispatch] =useReducer(reducer, 0)

  // const onIncrease=()=>{
  //   setCount(count+1)
  // }

  // const onDecrease=()=>{
  //   setCount(count-1)
  // }

  return (
    <div>
      <h4>테스트 컴포넌트</h4>
      <div>
        {/* <bold>useState {count}</bold> <br/> */}
        <bold>{count}</bold>
      </div>
      {/* <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button> */}

{/* dispatch에서는 인수로 객체전달(State변경정보 담고있다)=action객체 */}
      <button onClick={()=>dispatch({type:"INCREASE", data:1})}>+</button>
      <button onClick={()=>dispatch({type:"DECREASE", data:1})}>-</button>
      <button onClick={()=>dispatch({type:"INIT" })}>0으로 초기화</button>
    </div>
  )
}

export default TestComp