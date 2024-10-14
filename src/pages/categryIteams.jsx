 import {useParams,useNavigate} from 'react-router-dom'
 import {ContestContext} from '../api/ContestContext'
 import {useState,useEffect, useContext} from 'react'
 import ProductIteam from '../components/productIteam/productIteam'
 import NoContent from '../components/noContent'
 import LoddingCardComponent from '../components/loddingCardComponent'
 const CategryIteams = ()=>{
    const navigate = useNavigate();
   const {categryId} = useParams()
     const {allProduct,lodding}= useContext(ContestContext)
   const result = allProduct.filter((e)=>{
    return e.categry === categryId
    })
 
   return(
       <>
       {
        lodding ? (
       
        <div className="flex w-full flex-wrap justify-center" >
          {
            Array.from({length:6},(_,index)=>(<LoddingCardComponent key={index} />))
          }
          </div>
  
  ):(
   result.length == 0 ?(
      <div className="text-center mt-20 mb-20">
      <NoContent message="categry products not found"/>
        <button onClick={()=>{navigate('/')}} className="px-3 py-1 border border-green-500 rounded hover:bg-green-500 hover:text-white">Home</button>
      </div>
      ):(
      <div className="flex gap-1 justify-center flex-wrap ove mt-2 ">
      {
        result.map((iteam,index)=>{
        return <ProductIteam key={index} name={iteam?.name} image={iteam?.image} newPrice={iteam?.newPrice} oldPrice={iteam?.oldPrice} id={iteam?._id}/>
          
      })
      }
       </div>
      )
      
      
    )
    
       }
       </>
     )
 }
 
 export default CategryIteams