import React, { useEffect } from 'react'
import ListItems from './ListItems'
import {useDispatch, useSelector} from 'react-redux'
import { fetchedData } from '../redux/slice/todo';

function ListArea() {

  const dispatch = useDispatch();
  const {isUpdating, data} = useSelector((state)=>state.todoReducer);

  useEffect(()=>{
    dispatch(fetchedData());
  },[dispatch, isUpdating])

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