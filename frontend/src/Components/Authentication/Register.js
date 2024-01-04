import React, { useState } from 'react';
import { signUp } from '../../redux/slice/auth';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmP, setConfirmP] = useState("");
  const {error, isLoading, user} = useSelector((state)=>state.authReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();
    const obj = {email,password,confirmP};
    dispatch(signUp(obj));
  }

  if(user){
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/todo");
  }


    return (
      <div className='authform'>
          <form onSubmit={handleSubmit}>
              <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/><br />
              <input type="text" placeholder='Set Password' value={password} onChange={(e)=>setPassword(e.target.value)}/><br />
              <input type="password" placeholder='Confirm Password' value={confirmP} onChange={(e)=>setConfirmP(e.target.value)}/><br/>
              <button disabled={isLoading}>SignUp</button>
          </form>
          {error && <div className='errordiv'>{error}</div>}
      </div>
    )
}

export default Register