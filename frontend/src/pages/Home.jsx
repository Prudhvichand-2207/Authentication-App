import React,{useEffect, useState}from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
   
  const [loggedInUser,setloggedInUser]=useState('');
  const [products,setproducts]=useState('');
  const navigate=useNavigate();
  useEffect(()=>{
    setloggedInUser(localStorage.getItem('loggedInUser'))
  },[])

  const handleLogout=(e)=>{
   localStorage.removeItem('token');
   localStorage.removeItem('loggedInUser');
   handleSuccess("user loggedout")
   setTimeout(()=>{
    navigate('/login');
   },1000)
  }

  const fetchProducts=async()=>{
    try{
    const url="https://authentication-app-api-nu.vercel.app/products";
    const headers={
      headers:{
        'Authorization':localStorage.getItem('token')
      }
    }
    const response=await fetch(url,headers);
    const result=await response.json();
    setproducts(result);
    console.log(result)
    }
    catch(err){
      handleError(err);
    }
  }

  useEffect(()=>{
   fetchProducts();
  },[])
  return (
   
    <div>
      <h1>WELCOME HOME</h1>
    <br />
    <br />
   <h1>{loggedInUser}</h1>
   <button onClick={handleLogout}>Logout</button>
   <div>{
   products && products?.map((item, index) => (
    <ul key={index}>
    <span>{item.name} : {item.cost}</span>
     </ul>
      ))
                }
            </div>
   

   <ToastContainer></ToastContainer>
    </div>
  )
}

export default Home
