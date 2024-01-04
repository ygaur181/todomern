import React, { useEffect } from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import TodoArea from './Components/TodoArea'
import Login from './Components/Authentication/Login'
import Register from './Components/Authentication/Register'
import { useDispatch } from 'react-redux'
import { addWithToken } from './redux/slice/auth';
import Header from './Components/Header'

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    const lSdData = localStorage.getItem("user")
    dispatch(addWithToken(lSdData))
  },[])
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/todo' element={<TodoArea />} />
      </Routes>
    </>
  )
}

export default App