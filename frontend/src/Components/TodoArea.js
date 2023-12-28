import React, {useState} from 'react'
import EntryField from './EntryField'
import ListArea from './ListArea'

function TodoArea() {
  const [todoList, setTodoList] = useState([
    {
      id: "1",
      str : "I will do something"
    },
    {
      id : "2",
      str : "What i will do?"
    },
    {
      id : "3",
      str : "Tomorrow i have to go on walk"
    }
  ])

  const [inputValue, setInputValue] = useState("");

  const changeInput = (e) =>{
    setInputValue(e.target.value);
  }

  const addItem = () =>{
    const item = {
      id : 4,
      str : inputValue
    }
    todoList.push(item);
    setTodoList(todoList);
    setInputValue("")
  }

  const deleteIt = (id) =>{
    const todos = todoList.filter((item) =>{
      return item.id !== id;
    })
    setTodoList(todos)
  }

  return (
    <>
        <div className="outer-box">
            <div className='app-name'>Todo List</div>
            <div className="entry-field">
              <EntryField inputV = {inputValue} setInputV = {changeInput} addItem = {addItem}/>
            </div>
            <div className="AreaForList">
              <ListArea itemArr = {todoList} deleteIt = {deleteIt}/>
            </div>
        </div>
        
    </>
  )
}

export default TodoArea