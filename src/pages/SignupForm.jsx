// src/components/SignupForm.js
import React, { useState,useContext} from 'react';
import {useNavigate} from "react-router-dom";
import DomainUrl from '../Configuration/Index'
import { FaRegUserCircle } from "react-icons/fa";
import{ toast } from 'react-hot-toast';
import {ContestContext} from '../api/ContestContext'
const SignupForm = () => {
    const {userFechApi,userDetails,setUserDetails} = useContext(ContestContext) 
   const navigate = useNavigate();
  const [isLogin,setIsLogin] = useState(true)
  // sign up
  const [users,setUsers] = useState({
      name: '',
      email: '',
      password: '',
      profilePic: '',
    })

  const usersValue = (e)=> {
    setUsers({
      ...users, [e.target.name]: e.target.value
    })
  }

  const signupHandler = async (e)=> {
    e.preventDefault()
    try {

      const response = await fetch(`${DomainUrl.url}singup`, {
        method: 'POST',
         credentials:'include',
        headers: {
          Accept: 'application/json',
          "Content-type": "application/json",
        },
        body: JSON.stringify(users),
      })
      .catch(()=>{ toast.error("fetch error")}) 
      const data = await response.json()
        if (!data.success) {
          toast.error(data.message)
        }

        if (data.success) {
          toast.success(data.message)
          setUsers({
            name: '',
            email: '',
            password: '',
            profilePic: '',
          })
          setIsLogin(true) 
        } 

    }catch(error) {
    toast.error(error)
    }

  }

  // login
  const loginHandler = async (e)=> {
    e.preventDefault()
    try { 
     const response =  await fetch(`${DomainUrl.url}singin`,
        {
          method: 'POST',
          credentials:'include',
          headers: {
            Accept: 'application/json',
            "Content-type": "application/json",
          },
          body: JSON.stringify(users),
        })
      .catch(()=>{
         toast.error("fetch error")
        })
        
     
     if(!response.ok){
       toast.error('server error')
       return false
     }
      
   const data = await response.json() 
      
     if (!data.success || data.ok){
       toast.error(data.message)
     }

     if (data.success) {
        
      setUsers({
            name: '',
            email: '',
            password: '',
            profilePic: '',
          })
          toast.success(data.message)
          navigate('/') 
          userFechApi() 
     } 

    }catch(error) {
      toast.error(error)
    }

  }
 
 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
     
        {isLogin ? (
      <form onSubmit={loginHandler}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input type="email" id="email"
        onChange={usersValue}
        name="email"
        value={users.email}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input type="password" id="password"
        onChange={usersValue}
        name="password"
        value={users.password}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Login</button>
            <div className="flex py-2" ><p className="text-slate-600 mr-5">create a account ?</p><span className="text-blue-500 underline cursor-pointer" onClick={()=> setIsLogin(false)} >register now</span></div>
    </form>
    ): (
      <>
      <form onSubmit={signupHandler}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input type="text" id="name" value={users.name} name="name" onChange={usersValue} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
            <div className="mb-4">
              <label htmlFor="email-signup" className="block text-gray-700">Email</label>
              <input type="email" id="email-signup" value={users.email} name="email" onChange={usersValue} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
            <div className="mb-4">
              <label htmlFor="password-signup" className="block text-gray-700">Password</label>
              <input type="password" id="password-signup" value={users.password} name="password" onChange={usersValue} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
  </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Sign Up</button>
             <div className="flex py-2" ><p className="text-slate-600 mr-5">all ready have a account ?</p><span className="text-blue-500 underline cursor-pointer" onClick={()=> setIsLogin(true)} >login now</span></div>
</form>
</>
)}
</div>
</div>
);
};

export default SignupForm;
