import React from 'react'
import "./Header.css"

const Header = () => {
  // console.log("date", new Date().toDateString())
  // console.log("date", new Date().toLocaleDateString())
  console.log("Header 업데이트")
  return (
    <div className='Header'>
      <h3>😊 Header 컴포넌트 🌴 할 일 목록</h3>
      <h4>오늘의 날짜 : {new Date().toLocaleDateString()}</h4>
    </div>
  )
}

export default React.memo(Header);