 import {useParams,useNavigate} from 'react-router-dom'
 import {ContestContext} from '../api/ContestContext'
 import {useState,useEffect, useContext} from 'react'
 import ProductIteam from '../components/productIteam/productIteam'
  import { DNA } from 'react-loader-spinner'
  import NoContent from '../components/noContent'
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
       allProduct.length == 0 && lodding ? (
       
        <div className="flex justify-center" >
          <DNA
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  />
          </div>
  
  ):(
   result.length == 0 ?(
      <div className="text-center mt-20 mb-20">
      <NoContent message="categry products not found"/>
        <button onClick={()=>{navigate('/')}} className="px-3 py-1 border border-green-500 rounded hover:bg-green-500 hover:text-white">Home</button>
      </div>
      ):(
      <div className="grid grid-cols-2 gap-1 mx-1 mt-2  md:grid-cols-5 ">
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