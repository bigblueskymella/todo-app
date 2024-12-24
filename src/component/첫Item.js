import React, { useState } from "react";
import "./Item.css";

const Item = ({ id, content, isDone, onDelete, onUpdate, onCheck }) => {
  console.log(`${id} Item업데이트`)
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [editContent, setEditContent] = useState(content); // 수정 내용

  const onClickDelete = () => {
    onDelete(id);
  };
  const handleEditClick = () => {
    setIsEditing(true); // 수정 모드로 전환
    // 🟠입력 필드, 저장 ,취소 버튼이 표시
  };
  const handleSave = () => {
    if(editContent.trim()!==""){
      onUpdate(id, editContent); // 🔴App으로 전달
    }
    setIsEditing(false); // 수정 모드 해제
  };
  const handleCancel = () => {
    setEditContent(content); // 수정 🟠취소 (기존 내용 복구)
    setIsEditing(false); // 수정 모드 해제
  };

  const handleInputChange = (e) => {
    setEditContent(e.target.value); // 입력값 업데이트
  };

  const onChangeCheckbox = () => {
    onCheck(id);
  };

  return (
    <div className="TodoItem">
      <div className="checkbox_col">
        <input type="checkbox" checked={isDone} onChange={onChangeCheckbox} />
      </div>

      {/* 🟠 조건부 렌더링 : isEditing === true (수정) false 기본 */}
      {isEditing ? (
        <div className="edit_mode">
          <input type="text" value={editContent} onChange={handleInputChange} />
          <button onClick={handleSave}>저장</button>
          <button onClick={handleCancel}>취소</button>
        </div>
      ) : (
        <div onClick={handleEditClick}> {content}</div>
      )}

      <div>{new Date().toLocaleDateString()}</div>
      <div className="btn_col">
        <button onClick={()=>onClickDelete(id)}>삭제</button>
      </div>
    </div>
  );
};

export default React.memo(Item);

// 바인딩 🔴 onClickDelete(id): 함수가 바로 실행되도록 호출하는 방식
// 즉시 실행되고, onClick 이벤트를 기다리지 않고 바로 호출되므로 
// 원하지 않는 동작이 발생할 수 있다.
// () => onClickDelete(id) 호출을 미룸.
// 이벤트 발생했을때만 실행
// 인자(id)를 전달할 때 사용