import React, { useState } from 'react';
import './List.css';
import Item from './첫Item';

const List = ({todo, onDelete, onUpdate, onCheck}) => { // ✅27번줄과 함께
  const [search,setSearch]=useState("");
  const onChangeSearch=(e)=>{
    console.log("검색어 : ", e.target.value)
    setSearch(e.target.value)
  }
  const getSearchResult=()=>{
     // 배열인지 확인 후 반환하도록 수정
     if (!Array.isArray(todo)) {
      return [];
     }
    return search ===""? todo : todo.filter((item) => item.content.toLowerCase().includes(search.toLowerCase()))
  }

  return (
    <div className='TodoList'>
       <h3>😁 List 컴포넌트 🌴 기록한 내용 보기</h3>
       <input
        value={search}
        onChange={onChangeSearch}
        className="searchbar"
        placeholder="검색어를 입력하세요."
        onUpdate={()=>onUpdate} // 🟠 27번줄과 함께
      />
      <div className="list_wrapper">
        {getSearchResult().map((item)=>(
          <Item key={item.id} {...item} onDelete={onDelete} onUpdate={onUpdate} onCheck={onCheck}/>
        ))}
      </div>
    </div>
  )
}

export default List