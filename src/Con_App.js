import React, { useMemo, useReducer, useCallback, useRef, useState } from "react";
import "./App.css";
import Header from "./component/Header";
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";

export const TodoContext = React.createContext();
// export const TodoStateContext = React.createContext();
// export const TodoDispatchContext = React.createContext();

//보통 리스트 형태의 데이터 저장할 때 배열을 이용한다
//배열이면서 데이터베이스 역할을 수행한다
const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래 널기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "줄넘기 하기",
    createdDate: new Date().getTime(),
  },
];

function App() {
  // useRef 페이지 처음 렌더링할 때는 콜백함수 실행하지 않고
  // 리렌더될 때만 실행하겠다 (3)초기값
  const idRef = useRef(3);
  const [todo, setTodo] = useState(mockTodo);

  const onCreate = (content) => {
    const newItem = {
      id: idRef.current,
      content,
      isDone: false,
      createdDate: new Date().getTime(),
    };
    setTodo([newItem, ...todo]);
    idRef.current += 1;
  };

  const onUpdate = (targetId) => {
    setTodo(
      todo.map((it) =>
        it.id === targetId ? { ...it, isDone: !it.isDone } : it
      )
    );
  };

  const onDelete = (targetId) => {
    setTodo(todo.filter((it) => it.id !== targetId));
  };

  // const memoizedDispatches = useMemo(()=>{
  //   return {onCreate, onUpdate, onDelete}
  // },[])

  return (
    <div className="App">
      <Header />
      {/* <TodoStateContext.Provider value={todo}> */}
        <TodoContext.Provider value={{todo,onCreate,onUpdate,onDelete}}>
          <TodoEditor />
          <TodoList />
        </TodoContext.Provider>
      {/* </TodoStateContext.Provider> */}
    </div>
  );
}

export default App;
