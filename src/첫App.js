import { useRef, useState } from "react";
import "./App.css";
import { Header } from "./component/Header";
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";
import TestComp from "./component/TestComp";

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
      id: idRef.current, //💘id고유하게
      content,
      isDone: false,
      createdDate: new Date().getTime(),
    };
    setTodo([newItem, ...todo]);
    idRef.current += 1;
  };

  // const onUpdate = (targetId) => {
  //   setTodo(todo.map((it) => {
  //       if (it.id === targetId) {
  //         return {
  //           ...it,
  //           isDone: !it.isDone,
  //         };
  //       } else {
  //         return it;
  //       }
  //     })
  //   );
  // };
  // 🔟✅ onUpdate를 삼항연산자를 이용해서 나타내기

  const onUpdate = (targetId) => {
    setTodo(
      todo.map((item) =>
        item.id === targetId ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  const onDelete = (targetId) => {
    setTodo(todo.filter((it) => it.id !== targetId));
  };

  return (
    <div className="App">
      {/* <TestComp/> useReducer */}
      <Header />
      {/* <main>Todo Editor</main> */}
      <TodoEditor onCreate={onCreate} />
      {/* <footer>Todo List</footer> 🔟✅onUpdate */}
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
