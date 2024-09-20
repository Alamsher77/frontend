import {ContestContext} from '../api/ContestContext'
import React,{useContext, useState, useEffect} from 'react'
import DomainUrl from '../Configuration/Index'
import{ toast } from 'react-hot-toast';
import logo5 from '../asetes/upload.jpg'
import UploadImage from '../helpers/uploadsImage'
import NoContent from '../components/noContent'
import SpeechMessage from '../components/speechMessage'
import DeleteImageCloudnary from '../helpers/deleteImageCloudnary'
const AddCategry = ()=>{ 
const {allProductsCategry,categryapi}= useContext(ContestContext)
const [showCategryForm,setShowCategryForm] = useState(false)
const [categryValue,setCategyValue] = useState({
      categry:'',
      catelogo:''
    })
 
const imageHandler = async(e)=>{
   try{
      const uploadsimage = e.target.files[0]
    const uploadsimageresponse = await UploadImage(uploadsimage) 
    toast.success('image uploded')
    SpeechMessage('image uploded')
    setCategyValue({
     ...categryValue,catelogo:{public_id:uploadsimageresponse?.public_id,img:uploadsimageresponse?.url}
  })

   }catch(error){
    toast.error(error?.message)
    SpeechMessage(error?.message)
   }
    
  }
  
  const removeCategry = async (e,image)=>{
    try{
   
      SpeechMessage('are you sure delete this caategry')
       const cotegryRquir = confirm('this categry was delete are you sure')
     if(!cotegryRquir){
       SpeechMessage('you are cancel this process')
       return false
     }
     
     const responseimagedelete = await DeleteImageCloudnary(image,"deleteCloudnaryImage")
     if(!responseimagedelete?.success){
       toast.error(responseimagedelete?.message)
       SpeechMessage(responseimagedelete?.message)
     }
     toast.success(responseimagedelete?.message)
     SpeechMessage(responseimagedelete?.message) 
    const respose =   await fetch(`${DomainUrl.url}removeCategry`,{
      method:'DELETE',
      headers:{
        Accept:'application/json',
        "Content-type":"application/json",
      },
      body:JSON.stringify({_id:e}),
    })
    const data = await respose.json()
    if(!data?.success){
      toast.error(data?.message)
      SpeechMessage(data?.message)
    }
     toast.success(data?.message) 
     SpeechMessage(data?.message)
     categryapi()
    }catch(error){
      toast.error(error?.message)
      SpeechMessage(error?.message)
    }
  }
     
  const submitHandler = async()=>{
    try{ 
  const respose = await fetch(`${DomainUrl.url}productcategry`,{
       method:'POST',
       headers:{
         Accept:'application/json',
         "Content-type":"application/json",
       },
       body:JSON.stringify(categryValue),
     })
    const data = await respose.json() 
    if(!data?.success){
      toast.error(data?.message)
      SpeechMessage(data?.message)
      return false
    } 
       toast.success(data?.message)
       SpeechMessage(data?.message)
       categryapi() 
       setCategyValue({categry:'',catelogo:''})
       setShowCategryForm(false)
    }catch(error){
      toast.error(error?.message)
      SpeechMessage(error?.message)
    }
    
  }
  
 
  return(
     <>
     <div className="addCategry">
     <h4>Add Categry</h4> 
    <input type="button" onClick={()=> { showCategryForm ? setShowCategryForm(false) : setShowCategryForm(true)}} value="add"/>
     </div>
       {showCategryForm ? <div className="addCategryForm " >
        <h3>Add Categrys</h3>
         <div className="flex  items-center w-56  gap-2">
           <div className="flex w-28 items-center ">
       
            <label htmlFor="file-name">
             <img src={logo5} className="w-full border"  alt="imag"/>
            </label>  
             <input type="file" onChange={imageHandler}  id="file-name" hidden /> 
           </div>
           <div className='flex w-full  '>
            {
           
               categryValue.catelogo == '' ?(
                <div className="text-red-500"> * please upload image</div>
               ):(
                <div onClick={()=>alert('deleted')} className="w-26 h-26  flex gap-1 p-2 flex-wrap">
                 <img className="w-full h-full object-contain" src={categryValue?.catelogo?.img}/>
                </div>
               )
            }
           </div>
         </div>
        <div className="categryform">
        <label htmlFor="categry" >Categry Name</label>
        <input type="text" id="categry" value={categryValue.categry} onChange={(e)=>{setCategyValue({...categryValue,categry:e.target.value})}} />
        <button onClick={submitHandler}>add</button>
        </div>
      </div>
      :  ''}
     
     {
       allProductsCategry.length !== 0 ?(
          <>
           <div className="showCategry">
      {
         allProductsCategry?.map((iteam,index)=>{
    return  <div className="showCategryIteam" key={index}> 
      <p> {iteam.categry}</p> <span onClick={()=>{removeCategry(iteam._id,iteam?.catelogo)}}>✕</span></div>
    })
      }
     </div>
          </>
         ):(
           <NoContent message='no categrys' />
           )
     }
     </>
    )
}
export default AddCategry