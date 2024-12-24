import React, { useState, useRef } from "react";
import "./Editor.css";

const Editor = ({onCreate}) => {
  // 입력할 데이터를 저장할 State변수 content를 만든다
  const [content, setContent] =useState("")
  const inputRef = useRef(); //🎹빈입력방지
  const onChangeContent=(e)=>{
    console.log(e.target.value)
    setContent(e.target.value)
  }

  // 에디터에서 작성한 콘텐츠의 값을 onCreate해준다
  const onSubmit=()=>{
    if(!content){ //🎹빈입력방지
      inputRef.current.focus(); 
      return;
    }
    onCreate(content)
    setContent(""); //🎹2-비우기
  }
  const onKeyDown = (e) => { //🎹3-엔터
        if(e.keyCode === 13){
          onSubmit()
        }
      }

  return (
    <div className="TodoEditor">
      <h3>😋 Editor 컴포넌트 🌴새롭게 작성할 곳 🎹</h3>
      <div className="editor_wrapper">
        <input
          ref={inputRef} //🎹빈입력방지
          value={content}
          onChange={onChangeContent}
          onKeyDown={onKeyDown} //🎹3-엔터
          placeholder="새로운 Todo..."
        />
        <button onClick={onSubmit}>추가</button>
      </div>
    </div>
  );
};

export default Editor;
