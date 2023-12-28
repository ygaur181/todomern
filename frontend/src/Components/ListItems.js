import React, { useState } from 'react'
import deleteButton from '../img/delete.png'
import updateButton from '../img/arrow.png'
import cancelButton from '../img/cancel.png'
import checkButton from '../img/check.png'
import { deleteData, updateNewData } from '../redux/slice/todo'
import { useDispatch } from 'react-redux'


function ListItems(props) {

  const [editing, setEditing] = useState(false);
  const [updateData, setUpdateData] = useState("")
  const [id, setId] = useState("")
  const dispatch = useDispatch();
  
  const handleClick = (data)=>{
    setEditing(true);
    setUpdateData(data.taskName)
    setId(data._id)
  }

  const updateNew = () =>{
    const newdata = {
      id,
      updateData
    }
    setEditing(false)
    dispatch(updateNewData(newdata))
  }

  const handleKeyPress = (event) =>{
    if(event.keyCode === 13 || event.which === 13){
      updateNew();
    }
  }

  let view = "block";
  let edit = "none";

  if(editing){
    view = "none";
    edit = "block"
  }
  
    return (
      <>
          <div className="item-box" id='inputDiv'>
                <span style={{display : view}}>{props.itemsArr.taskName}</span>
                <span style={{display : edit}}><input type="text" className='enfield' id='updatefield' value={updateData} onChange={(e)=>setUpdateData(e.target.value)} onKeyPress={handleKeyPress}/></span>

                <img src={deleteButton} alt="delete" className='buttonimg delete' style={{display : view}} onClick={()=>dispatch(deleteData(props.itemsArr._id))}/>
                <img src={cancelButton} alt="cancel" className='buttonimg delete' style={{display : edit}} onClick={()=>setEditing(false)}/>

                <img src={updateButton} alt="update" className='buttonimg update' style={{display : view}} onClick={()=>handleClick(props.itemsArr)}/>
                <img src={checkButton} alt="check" className='buttonimg update' style={{display : edit}} onClick={updateNew}/>

            </div>
      </>
    )

}

export default ListItems