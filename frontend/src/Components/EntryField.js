import React, { useState } from 'react'
import addButton from '../img/check.png'
import { useDispatch } from 'react-redux';
import { postData } from '../redux/slice/todo';

function EntryField() {
  const [entry, setEntry] = useState("");
  const dispatch = useDispatch();

  // code for making enter submit code 

  const handleKeyPress = (event) =>{
    if(event.keyCode === 13 || event.which === 13){
      document.getElementById("addButton").click();
    }
  }

  const handleClick =()=>{
    dispatch(postData(entry));
    setEntry("");
  }

  // code ends

  return (
    <div className='mainBox'>
      <div className="field">
        <input type="text" className='enfield' id='inputField' value={entry} onChange = {(e)=>setEntry(e.target.value)} onKeyPress={handleKeyPress}/>
        <img src={addButton} alt="Button" className='buttonimg' id='addButton' onClick={handleClick}/>
      </div>
    </div>
  )
}

export default EntryField