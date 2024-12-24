import React, { useState } from 'react'
import Item from './Item'
import './List.css'

const List = ({todo, onUpdate, onDelete}) => {
  const [search,setSearch]=useState("");
  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }
  const getSearchResult = () => {
    return search === "" ? todo :
    todo.filter((item)=>item.content.toLowerCase().includes(search.toLowerCase()))
  }

  return (
    <div className='List'>
      <h3>😁 List 컴포넌트 🌴 기록한 내용 보기</h3>
      <input value={search} onChange={onChangeSearch} className='searchbar' placeholder='검색어를 입력하세요.'/>
      <div className='list_wrapper'>
        {/* 배열 요소 item의 모든 프로퍼티를 props로 전달 */}
        {/* todo 할일 아이템 객체 저장 = 객체로 전달 */}
        {getSearchResult().map((item)=>(<Item key={item.id} {...item} onUpdate={onUpdate} onDelete={onDelete}/>))}
      </div>
      {/* <Item/>
      <Item/>
      <Item/> */}
    </div>
  )
}

export default List

// 변형메서드 🔴map()
// let arr =[1,2,3]
// let newArr = arr.map((i)=>(i*3))
// undefined
// console.log(newArr)