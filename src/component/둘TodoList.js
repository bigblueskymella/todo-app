import React, { useMemo, useState } from "react";
import "./TodoList.css";
import TodoItem from "./TodoItem";

const TodoList = ({ todo, onUpdate, onDelete }) => { //🔟✅onUpdate  //7️⃣read
  const [search, setSearch] = useState(""); //8️⃣검색기능
  const onChangeSearch = (e) => {
    //8️⃣이벤트 핸들러
    setSearch(e.target.value);
  };
  const getSearchResult = () => {
    //9️⃣기능
    return search === ""
      ? todo
      : todo.filter((it) => 
        // it.content.includes(search));
        it.content.toLowerCase().includes(search.toLowerCase())); ///9️⃣
  };
  const analyzeTodo = useMemo(()=>{
    console.log("analyze 함수 호출")
    const totalCount = todo? todo.length:0;
    const doneCount = todo.filter((item)=>item.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    }
  },[todo])
  const {totalCount, doneCount, notDoneCount} = analyzeTodo

  return (
    <div className="TodoList">
      <h4>Todo List 💌</h4>
      <div>
        <div>총개수: {totalCount}</div>
        <div>완료된 할 일: {doneCount}</div>
        <div>아직 완료되지 못한 일: {notDoneCount}</div>
      </div>
      <input
        className="searchbar"
        placeholder="검색어를 입력하세요."
        value={search} //8️⃣
        onChange={onChangeSearch} //8️⃣
      />
      <div className="list_wrapper">
        {/* <TodoItem/>
        <TodoItem/>
        <TodoItem/> */}
        {/* {todo.map( 8️⃣🅿*/}
        {getSearchResult().map((item)=>(<TodoItem key={item.id} {...item} onUpdate={onUpdate} onDelete={onDelete}/>))}
      </div>
    </div>
  );
};

TodoList.defaultProps ={
  todo:[],
}

export default TodoList;
