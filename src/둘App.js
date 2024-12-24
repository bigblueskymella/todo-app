import { useCallback, useReducer, useRef } from "react";
import "./App.css";
import Header from "./component/Header";
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";

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

function reducer(state, action){
  switch(action.type){
    case "CREATE":{
      return [action.newItem, ...state]
    }
    case "UPDATE":{
      return state.map((item) => 
        item.id === action.targetId
      ?{
          ...item,
          isDone:!item.isDone,
        }
        :item
      )
    }
    case "DELETE":{
      return state.filter((item)=>item.id !== action.targetId)
    }
  // 상태 변화 코드
  default:
    return state;
  }
}

function App() {
  const [todo, dispatch] = useReducer(reducer, mockTodo)
  // useRef 페이지 처음 렌더링할 때는 콜백함수 실행하지 않고
  // 리렌더될 때만 실행하겠다 (3)초기값
  const idRef = useRef(3);
  // const [todo, setTodo] = useState(mockTodo);

  const onCreate = (content) => {
    // const newItem = {
    //   id: idRef.current, //💘id고유하게
    //   content,
    //   isDone: false,
    //   createdDate: new Date().getTime(),
    // };
    // setTodo([newItem, ...todo]);

    dispatch({
      type:"CREATE",
      newItem:{
        id:idRef.current,
        content,
        isDone:false,
        createdDate:new Date().getTime(),
      }
    })
    idRef.current += 1;
  };

  const onUpdate = useCallback((targetId) => {
    // setTodo(
    //   todo.map((it) =>
    //     it.id === targetId ? { ...it, isDone: !it.isDone } : it
    //   )
    // );
    dispatch({
      type:"UPDATE",
      targetId,
    })
  },[]);

  const onDelete = useCallback((targetId) => {
    // setTodo(todo.filter((it) => it.id !== targetId));

    dispatch({
      type:"DELETE",
      targetId,
    })
  },[]);

  return (
    <div className="App">
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
