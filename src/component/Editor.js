import React, { useState, useRef, useContext } from 'react'
import { TodoDispatchContext } from '../App'
import './Editor.css'

const Editor = () => {
  const {onCreate} = useContext(TodoDispatchContext)
  const [content, setContent]=useState("")
  const inputRef = useRef()
  const onChangeContent = (e) =>{
    // console.log("입력한 내용", e.target.value)
    setContent(e.target.value)
  }
  const onSubmit = () => {
    // 2️⃣입력한 내용 없으면
    if(!content){
      inputRef.current.focus();
      return;
    }
    onCreate(content)
    setContent("")
  }
  const onKeyDown = (e) => {
    if(e.keyCode === 13){
      onSubmit();
    }
  }

  return (
    <div className='Editor'>
      <h3>😋 Editor 컴포넌트 🌴새롭게 작성할 곳 🎹</h3>
      <div className="editor_wrapper">
        <input value={content} ref={inputRef} // 2️⃣
        onKeyDown={onKeyDown}
        onChange={onChangeContent} placeholder='새로운 내용을 입력해주세요.'/>
        <button onClick={onSubmit}>추가</button>
      </div>
    </div>
  )
}

export default Editor