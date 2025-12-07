import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
function Signup() {

   const [signupinfo,setsignupinfo]=useState({
    name:'',
    email:'',
    password:''
   })

   const navigate=useNavigate();
  
  const handleChange=(e)=>{
    const {name,value}=e.target;
    console.log(name,value);
    const copysignupinfo={...signupinfo};
    copysignupinfo[name]=value;
    setsignupinfo(copysignupinfo);
  }
  
  const handleSignup=async (e)=>{
  e.preventDefault();
  const {name,email,password}=signupinfo;
  if(!name||!email||!password){
    return handleError('name,email,password are required');
  }
   try{
    const url="https://authentication-app-api-nu.vercel.app/auth/signup";
    const response=await fetch(url,{
   method:"POST",
   headers:{
    'Content-Type':'application/json'
   },
   body:JSON.stringify(signupinfo)
    })
const result=await response.json();
const {success,message,error}=result;
if(success){
  handleSuccess(message);
  setTimeout(()=>{
    navigate('/login')
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
    <h1>Signup</h1>
    <form onSubmit={handleSignup}>
      <div>
      <label htmlFor="name">name</label>
        <input 
        onChange={handleChange}
        type="text"
        name='name'
        autoFocus
        placeholder='enter your name...'
        value={signupinfo.name}
        />
      
      <label htmlFor="email">email</label>
        <input 
        onChange={handleChange}
        type="email"
        name='email'
        autoFocus
        placeholder='enter your email...'
        value={signupinfo.email}
        />
      
      <label htmlFor="password">password</label>
        <input 
        onChange={handleChange}
        type="text"
        name='password'
        autoFocus
        placeholder='enter your password...'
        value={signupinfo.password}
        />
      </div>
      <button type='submit'>Signup</button>
      <span>Already have an account?
        <Link to="/login">Login</Link>
        </span>      

    </form>
    <ToastContainer></ToastContainer>
   </div>
  )
}

export default Signup
