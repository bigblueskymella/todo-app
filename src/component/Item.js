import React,{useContext} from 'react'
import { TodoDispatchContext } from '../App'
import './Item.css'

// 구조분해 할당해 가져옴
const Item = ({id, isDone, content, createdDate}) => {
  const {onUpdate, onDelete} = useContext(TodoDispatchContext);
  const onClickDelete = () => {
    onDelete(id);
  }
  const onChangeCheckbox = () =>{
    onUpdate(id)
  }
  return (
    <div className='Item'>
      <label>
      <div><input onChange={onChangeCheckbox} checked={isDone} type='checkbox'/></div>
      <div className='title'>{content}</div>
      <div className='date'>{new Date(createdDate).toLocaleDateString()}</div>
      <div className='btn'><button onClick={onClickDelete}>삭제</button></div>
      </label>
    </div>
  )
}

export default Item