import React,{useState,useEffect,useContext} from 'react'
import {ContestContext} from '../api/ContestContext'
import{ toast } from 'react-hot-toast';
import DomainUrl from '../Configuration/Index'
import {useNavigate} from 'react-router-dom'
import UploadImage from '../helpers/uploadsImage'
import DeleteImageCloudnary from '../helpers/deleteImageCloudnary'
import { FaRegUserCircle } from "react-icons/fa";
 import SpeechMessage from '../components/speechMessage'
const UserDetails = ()=>{
  const navigate = useNavigate()
const {userDetails,lodding} = useContext(ContestContext)
  const [showAdress,setShowAdress] = useState(false) 
 const [userValue,setUserValue] = useState({
name :'',
 email :'',
 phone:'',
 profilePic :'',
 currentAddress:'',
 deleverAddress:'',
 block:'',
 city :'',
 state:'',
 country:'',
 })
 const [updateUser,setUpdateUser] = useState(false) 
 const updateuserhandler = ()=>{ 
    try{
   setUserValue({
  name : userDetails?.name,
 email :userDetails?.email,
 phone:userDetails?.phone,
 profilePic : userDetails?.profilePic || userValue?.profilePic?.img,
 currentAddress:userDetails?.currentAddress,
 deleverAddress:userDetails?.deleverAddress,
 block:userDetails?.block,
 city:userDetails?.city,
 state:userDetails?.state,
 country:userDetails?.country,
   })
   toast.success('Now You Can Change Your Information')
   SpeechMessage("अब आप अपनी जानकारी बदल सकते हैं")
   
  setUpdateUser(true) 
    }catch(error){
      console.log(error?.message)
      SpeechMessage(error?.message)
    }
 } 
 const changeHandler = (e)=>{ 
   setUserValue({...userValue,[e.target.name]:e.target.value})
 } 
const imageHandler = async()=>{
    
  try{ 
     const file = event.target.files[0];  
    
 const resposedeleteimage = await  DeleteImageCloudnary(userDetails?.profilePic || {public_id:'ashdfhasd'},'deleteCloudnaryImage') 
 
 if(!resposedeleteimage.success){
    console.log(resposedeleteimage.message) 
    SpeechMessage(resposedeleteimage?.message)
    return false
 }
  toast.success(resposedeleteimage.message)  
  SpeechMessage(resposedeleteimage?.message)
   
 const uploadsimageresponse = await UploadImage(file)  
      setUserValue({...userValue,profilePic:{img:uploadsimageresponse.url,publicid:uploadsimageresponse.public_id}})
      toast.success('image upload success')
      SpeechMessage("तस्वीर सफलतापूर्वक अपलोड हो गया")
      // console.log(userValue)
  }catch(error){
    console.log(error?.message)
   SpeechMessage(error?.message)
  }
} 
const submitHandler = async()=>{
  try{
     const response = await fetch(`${DomainUrl.url}userUpdate`, {
        method: 'POST',
         credentials:'include',
        headers: {
          Accept: 'application/json',
          "Content-type": "application/json",
        },
        body: JSON.stringify(userValue),
      })
      const data = await response.json()
      if(!data?.success){
        console.log(data?.message)
        SpeechMessage(data?.message)
        return false
      }
      
     if(data?.success){
       toast.success(data?.message)
        SpeechMessage(data?.message)
     }
   setUpdateUser(false)
  }catch(error){
    console.log(error?.message)
    SpeechMessage(error?.message)
  }
 }  
  return(
     <div className="select-none w-full flex flex-col items-center bg-white p-4">
      <h1 className="shadow shadow-gray-600 rounded-full px-10 py-1 mb-2 font-bold uppercase text-gray-500 bg-pink-100">Your Profile</h1>
      <div className="shadow shadow-gray-600 bg-pink-100  gap-2 flex flex-col items-center w-full  p-2">
        <div className="relative flex flex-col items-center p-2"> 
           <div className=" bg-slate-400 w-20 h-20 mb-2 justify-center flex items-center rounded-full">
             {
            !userValue?.profilePic && !userDetails?.profilePic ? (
            <div>
             <FaRegUserCircle className="text-5xl" />
            </div>
            ):(
            
             userValue?.profilePic ?  <img src={userValue?.profilePic?.img} className="object-cover w-full h-full border rounded-full"  alt="imag"/>  :<img src={userDetails?.profilePic?.img} className="object-cover w-full h-full border rounded-full"  alt="imag"/>
               
            )
             } 
           </div>
          {updateUser ?   <label className="flex items-center justify-center cursor-pointer top-16 right-10 rounded-full absolute bg-white" htmlFor="file-name">
            <p className="px-1">✏️</p>
            <input type="file" onChange={imageHandler}  id="file-name" hidden />  
            
           </label> : null}
          <div onClick={updateuserhandler} className="bg-yellow-400 px-5 py-1 rounded-full cursor-pointer shadow-gray-600 shadow"><p className="text-slate-500">Change Your Profile</p></div>
        </div>
        <div className="mb-2 select-none">
          <h1 className="mb-1">Name</h1>
         <input name="name" onChange={changeHandler}  disabled={updateUser ? false : true} className=" rounded font-bold bg-gray-700 text-white border-4 outline-none border-pink-300 border px-4 py-1" typ="text" value={updateUser ? userValue?.name : userDetails?.name}  placeholder="Name" />
        </div>
        
         <div className="mb-2">
          <h1 className="mb-1">Email</h1>
         <input name="email" onChange={changeHandler} disabled={updateUser ? false : true} className="rounded font-bold bg-gray-700 text-white border-4 outline-none border-pink-300 border px-4 py-1" type="text" value={updateUser ? userValue?.email : userDetails?.email}  placeholder="Email" />
        </div>
          
          <div className="mb-2">
          <h1 className="mb-1">Phone</h1>
         <input name="phone" onChange={changeHandler} disabled={updateUser ? false : true} className="rounded font-bold bg-gray-700 text-white border-4 outline-none border-pink-300 border px-4 py-1" type="number" value={updateUser ? userValue?.phone : userDetails?.phone}  placeholder="Phone" />
        </div>
        
      </div>
      
       <h1 onClick={()=>{showAdress ? setShowAdress(false) : setShowAdress(true)}} className=" rounded-full mt-2 shadow shadow-gray-600 px-10 py-1 mb-2 font-bold uppercase text-gray-500 bg-pink-100 cursor-pointer select-none">View Address</h1>
      {
        showAdress && (
          
       <div  className="select-none shadow shadow-gray-600 bg-pink-100  gap-2 flex flex-col items-center w-full  p-2">
       
     
        
          <div className="mb-2"> 
           <h1 className="mb-1">CurrentAddress *</h1>
          <input name="currentAddress" onChange={changeHandler}  disabled={updateUser ? false : true}  className="rounded font-bold bg-gray-700 text-white border-4 outline-none border-pink-300 border px-4 py-1" typ="text" value={updateUser ? userValue?.currentAddress : userDetails?.currentAddress}  placeholder="currentAddress" />
          </div> 
          
          <div className="mb-2"> 
           <h1 className="mb-1">DeleverAddress</h1>
          <input name="deleverAddress" onChange={changeHandler}  disabled={updateUser ? false : true}  className="rounded font-bold bg-gray-700 text-white border-4 outline-none border-pink-300 border px-4 py-1" typ="text" value={updateUser ? userValue?.deleverAddress : userDetails?.deleverAddress} placeholder="deleverAddress" />
          </div> 
          
           <div className="mb-2"> 
           <h1 className="mb-1">Block</h1>
          <input name="block" onChange={changeHandler} disabled={updateUser ? false : true}  className="rounded font-bold bg-gray-700 text-white border-4 outline-none border-pink-300 border px-4 py-1" typ="text" value={updateUser ? userValue?.block : userDetails?.block} placeholder="block" />
          </div> 
          
           <div className="mb-2"> 
           <h1 className="mb-1">City</h1>
          <input name="city" onChange={changeHandler}  disabled={updateUser ? false : true}  className="rounded font-bold bg-gray-700 text-white border-4 outline-none border-pink-300 border px-4 py-1" typ="text" value={updateUser ? userValue?.city : userDetails?.city} placeholder="city" />
          </div> 
          
           <div className="mb-2"> 
           <h1 className="mb-1">State</h1>
          <input name="state" onChange={changeHandler} disabled={updateUser ? false : true}  className="rounded font-bold bg-gray-700 text-white border-4 outline-none border-pink-300 border px-4 py-1" typ="text" value={updateUser ? userValue?.state : userDetails?.state} placeholder="state" />
          </div> 
          
           <div className="mb-2"> 
           <h1 className="mb-1">country</h1>
          <input name="country" onChange={changeHandler}  disabled={updateUser ? false : true}  className="rounded font-bold bg-gray-700 text-white border-4 outline-none border-pink-300 border px-4 py-1" typ="text" value={updateUser ? userValue?.country : userDetails?.country} placeholder="country" />
          </div> 
       </div>
        )
      }
      
      
      {
         updateUser && (
            <div onClick={submitHandler} className=" select-none shadow border border-2 border-green-500 shadow-gray-600 bg-white w-52 rounded-full gap-2 flex flex-col items-center w-full mt-2  p-1 "><p className="font-bold text-xl text-green-500   ">Update</p></div>
         )
      }
     </div>
    )
}
export default UserDetails