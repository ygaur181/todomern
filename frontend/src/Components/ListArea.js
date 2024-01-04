import React, { useEffect } from 'react'
import ListItems from './ListItems'
import {useDispatch, useSelector} from 'react-redux'
import { fetchedData } from '../redux/slice/todo';

function ListArea() {

  const dispatch = useDispatch();
  const { user } = useSelector((state)=>state.authReducer);
  const {isUpdating, data} = useSelector((state)=>state.todoReducer);

  useEffect(()=>{
    if(user){
      const tok = user.token;
      dispatch(fetchedData(tok))
    }
  },[dispatch, isUpdating, user])

if(data){
  return (
    <div className='ListingArea'>
      {data.todos.map((items)=>{
        return(
        <ListItems key={items._id} itemsArr = {items}/>
        )
      })}
    </div>
  )
    }
}

export default ListArea