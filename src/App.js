import React, { useRef, useState, useReducer } from "react";
import "./App.css";
import Header from "./component/Header";
import TodoEditor from "./component/Editor";
import TodoList from "./component/List";
export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

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

function reducer(state, action) {
  switch (action.type) {
    case "CREATE": {
      return [action.newItem, ...state];
    }
    case "UPDATE": {
      return state.map((item) =>
        item.id === action.targetId
          ? {
              ...item,
              isDone: !item.isDone,
            }
          : item
      );
    }

    case "DELETE": {
      return state.filter((item) => item.id !== action.targetId);
    }
    default:
      return state;
  }
}

// export const TodoContext = React.createContext();

function App() {
  // useRef 페이지 처음 렌더링할 때는 콜백함수 실행하지 않고
  // 리렌더될 때만 실행하겠다 (3)초기값
  const idRef = useRef(3);
  const [todo, dispatch] = useReducer(reducer, mockTodo);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().toLocaleDateString(),
      },
    });
    idRef.current += 1;
  };

  const onUpdate = (targetId) => {
    dispatch({
      type: "UPDATE",
      targetId,
    });
  };

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todo}>
        <TodoDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
          <TodoEditor />
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
//399까지..