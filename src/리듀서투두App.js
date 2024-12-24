import { useReducer, useEffect } from "react";
import "./App.css";
import Header from "./component/Header";
import Editor from "./component/Editor";
import List from "./component/List";

function reducer(state, action) {
  switch (action.type) {
    case "CREATE": {
      return {
        todos: [action.newItem, ...state.todos],
        nextId: state.nextId + 1, // 아이디 증가
      }
    }
    case "CHECK": {
      return {
        ...state,
        todos: state.todos.map((item) =>
        item.id === action.targetId
          ? {
              ...item,
              isDone: !item.isDone,
            }
          : item
      )
    }
  }
    case "UPDATE":{
      return {
        ...state,
        todos: state.todos.map((item) =>
        item.id === action.targetId
          ? {
              ...item,
              content: action.newContent,  // 수정된 content로 업데이트
            }
          : item
      )
    }
  }
    case "DELETE": {
      return {
        ...state,
        todos: state.todos.filter((item)=>item.id!==action.targetId),
      }
    }
    default:
      return state;
  }
}

// 초기 todo 항목 (로컬스토리지에서 가져올 수 있도록 설정)
const getInitialTodos = () => {
  const savedTodos = localStorage.getItem("todos");
  const parsedTodos = savedTodos ? JSON.parse(savedTodos) : [];
  const nextId = parsedTodos.length ? Math.max(...parsedTodos.map(item => item.id)) + 1 : 0;
  return {
    todos: parsedTodos,
    nextId,
  };
};

function App() {
  const [state, dispatch] = useReducer(reducer, getInitialTodos());//✅ 반환 값을 state로 받음
  const {todos, nextId} = state; // state에서 todos와 nextId 분리
  console.log("초기 상태:", getInitialTodos());
  // todo 상태가 변경될 때마다 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state]);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: nextId,
        content,
        isDone: false,
        createdDate: new Date().toLocaleString(),
      },
    });
  };

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

  const onUpdate = (targetId, newContent) => {
    dispatch({
      type: "UPDATE",
      targetId,
      newContent
    });
  };

  const onCheck = (targetId) => {  //list와 item
    dispatch({
      type: "CHECK",
      targetId,
    });
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List
        todo={state.todos}  // todos를 명확히 전달
        onDelete={onDelete}
        onUpdate={onUpdate}
        onCheck={onCheck}
      />
    </div>
  );
}

export default App;
