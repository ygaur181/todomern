import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../redux/slice/auth';
import '../../App.css'


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user, error} = useSelector((state)=>state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit =(e)=>{
    e.preventDefault();
    dispatch(signIn({email, password}));
  }

  if(user){
    localStorage.setItem("user",JSON.stringify(user));
    navigate("/todo");
  }

  return (
    <div className='authform'>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Username' value={email} onChange={(e)=>setEmail(e.target.value)}/><br />
            <input type="password" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}/><br />
            <button type='submit'>Sign In</button>
        </form>
        {error && <div className='errordiv'>{error}</div>}
    </div>
  )
}

export default Login