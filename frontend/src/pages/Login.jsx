import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
function Login() {

   const [logininfo,setlogininfo]=useState({
    email:'',
    password:''
   })

   const navigate=useNavigate();
  
  const handleChange=(e)=>{
    const {name,value}=e.target;
    console.log(name,value);
    const copylogininfo={...logininfo};
    copylogininfo[name]=value;
    setlogininfo(copylogininfo);
  }
  
  const handlelogin=async (e)=>{
  e.preventDefault();
  const {name,email,password}=logininfo;
  if(!email||!password){
    return handleError('name,email,password are required');
  }
   try{
    const url="https://authentication-app-api-nu.vercel.app/auth/login";
    const response=await fetch(url,{
   method:"POST",
   headers:{
    'Content-Type':'application/json'
   },
   body:JSON.stringify(logininfo)
    })
const result=await response.json();
const {success,message,jwtToken,name,error}=result;
if(success){
  handleSuccess(message);
localStorage.setItem('token',jwtToken);
localStorage.setItem('loggedInUser',name);
  setTimeout(()=>{
    navigate('/home')
  },1000)
}
else if(error){
  const details=error?.details[0].message;
  handleError(details);
}
else if(!success){
  handleError(message);
}
   }
   catch(err){

   }

  } 

  return (
   <div className="container">
    <h1>Login</h1>
    <form onSubmit={handlelogin}>
      <div>
      
      <label htmlFor="email">email</label>
        <input 
        onChange={handleChange}
        type="email"
        name='email'
        autoFocus
        placeholder='enter your email...'
        value={logininfo.email}
        />
      
      <label htmlFor="password">password</label>
        <input 
        onChange={handleChange}
        type="text"
        name='password'
        autoFocus
        placeholder='enter your password...'
        value={logininfo.password}
        />
      </div>
      <button type='submit'>Login</button>

         <span>Dont have an account?
                <Link to="/signup">signup</Link>
                </span>      
           

    </form>
    <ToastContainer></ToastContainer>
   </div>
  )
}

export default Login;
