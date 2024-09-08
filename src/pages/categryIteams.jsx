 import {useParams} from 'react-router-dom'
 import {ContestContext} from '../api/ContestContext'
 import {useState,useEffect, useContext} from 'react'
 import ProductIteam from '../components/productIteam/productIteam'
  import { DNA } from 'react-loader-spinner'
 const CategryIteams = ()=>{
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
      <div className="text-center text-2xl mt-20 mb-20">No Categry releted Product</div>
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