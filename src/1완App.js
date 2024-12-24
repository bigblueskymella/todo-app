import { useRef, useState, useEffect } from "react";
import "./App.css";
import Header from "./component/Header";
import Editor from "./component/Editor";
import List from "./component/List";

function App() {
  const getInitialTodos = () => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  };

  const [todo, setTodo] = useState(getInitialTodos());
  const idRef = useRef(todo.length); // idRef 초기값을 현재 배열 길이로 설정

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  const onCreate = (content)=>{
    const newItem = {
      id:idRef.current, //💌
      content,
      isDone:false,
      createdDate:new Date().toLocaleString()
    }
    setTodo([newItem, ...todo])
    idRef.current += 1; //💌
  }

  const onDelete = (targetId)=>{
    setTodo(todo.filter((item)=>item.id!==targetId))
  }

  // 🟠 List & Item
  const onUpdate = (targetId, newContent) => {
    setTodo(
      todo.map((item) =>
        item.id === targetId ? { ...item, content: newContent } : item
      )
    );
  };

  const onCheck = (targetId) => { //list와 item
    setTodo(todo.map((item)=>{
      if(item.id === targetId){
        return{
          ...item, isDone:!item.isDone,
        };
      }else{
        return item;
      }
    }))
    // setTodo(todo.map((item)=>item.id===targetId?{...item, isDone:!item.isDone}:item))
  }

  return (
    <div className="App">
      <Header/>
      <Editor onCreate={onCreate}/>
      <List todo={todo} onDelete={onDelete} onUpdate={onUpdate} onCheck={onCheck}/> {/* 🟠 */}
    </div>
  );
}

export default App;
