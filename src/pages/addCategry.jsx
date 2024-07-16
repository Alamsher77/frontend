import {ContestContext} from '../api/ContestContext'
import React,{useContext, useState, useEffect} from 'react'
import DomainUrl from '../Configuration/Index'
import{ toast } from 'react-hot-toast';
const addCategry = ()=>{
    const {allProductsCategry,categryapi}= useContext(ContestContext)
    const [showCategryForm,setShowCategryForm] = useState(false)
    const [categryValue,setCategyValue] = useState({categry:''})
  
    const submitHandler = async()=>{
      
  await fetch(`${DomainUrl.url}productcategry`,{
       method:'POST',
       headers:{
         Accept:'application/json',
         "Content-type":"application/json",
       },
       body:JSON.stringify(categryValue),
     })
     .then((res)=> res.json()).then((data)=> {
       if(!data.success){
        toast.error(data.message)

         return false
       }
      
       toast.success(data.message)
       categryapi()
        
      setCategyValue({categry:''})
      setShowCategryForm(false)
     })
    
    }
     
  const removeCategry = async (e)=>{
     const cotegryRquir = confirm('this categry was delete are you sure')
     if(!cotegryRquir){
       return false
     }
      await fetch(`${DomainUrl.url}removeCategry`,{
      method:'DELETE',
      headers:{
        Accept:'application/json',
        "Content-type":"application/json",
      },
      body:JSON.stringify({_id:e}),
    })
    .then((res)=> res.json()).then((data)=> {
      if(!data.success){
        toast.error(data.message)
        return false
      }
      toast.success(data.message) 
      categryapi()
       
    })
  }
    
  
  return(
     <>
     <div className="addCategry">
     <h4>Add Categry</h4>
    <input type="button" onClick={()=> { showCategryForm ? setShowCategryForm(false) : setShowCategryForm(true)}} value="add"/>
     </div>
       {showCategryForm ? <div className="addCategryForm" >
        <h3>Add Categrys</h3>
        <div className="categryform">
        <lable htmlFor="categry" >Categry Name</lable>
        <input type="text" id="categry" value={categryValue.categry} onChange={(e)=>{setCategyValue({categry:e.target.value})}} />
        <button onClick={submitHandler}>add</button>
        </div>
      </div>
      :  ''}
     
     {
       allProductsCategry.length !== 0 ?(
          <>
           <div className="showCategry">
      {
         allProductsCategry.map((iteam,index)=>{
    return  <div className="showCategryIteam" key={index}> 
      <p> {iteam.categry}</p> <span onClick={()=>{removeCategry(iteam._id)}}>✕</span></div>
    })
      }
     </div>
          </>
         ):(
            <>
             no categry
            </>
           )
     }
     </>
    )
}
export default addCategry