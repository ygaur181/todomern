import React, { useEffect } from 'react'
import EntryField from './EntryField'
import ListArea from './ListArea'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function TodoArea() {
  const {user} = useSelector((state)=>state.authReducer);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!user){
      navigate("/")
    }
  },[navigate, user])
  
  return (
    <>
        <div className="outer-box">
            <div className='app-name'>Todo List</div>
            <div className="entry-field">
              <EntryField/>
            </div>
            <div className="AreaForList">
              <ListArea/>
            </div>
        </div>
        
    </>
  )
}

export default TodoArea