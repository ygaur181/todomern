import React from 'react'
import { Link } from 'react-router-dom'
import "../App.css"
import { useSelector, useDispatch } from 'react-redux'
import { removeUser } from '../redux/slice/auth'

function Header() {
    const {user} = useSelector((state)=>state.authReducer);
    const dispatch = useDispatch();
    const handleLogout = ()=>{
        dispatch(removeUser());
        localStorage.removeItem("user");
    }
    
  return (
    <div className='background-img'>
        <nav>
                {!user ? <ul>
                    <li><Link to="/">Sign In</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    </ul> 
                    : 
                    <ul>
                        <li className='logoutlayout'>{user.email}</li>
                        <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                    </ul>}
        </nav>
    </div>
  )
}

export default Header