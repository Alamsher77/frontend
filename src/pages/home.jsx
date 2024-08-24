
import ProductIteam from '../components/productIteam/productIteam'
import {useState,useEffect, useContext} from 'react'
import {ContestContext} from '../api/ContestContext'
 import { DNA } from 'react-loader-spinner'
const Home = ()=>{
   const {allProduct,lodding}= useContext(ContestContext)
 
     const reslocal = JSON.parse(localStorage.getItem('cloudimage'))
     console.log(reslocal)
  //     useEffect(()=>{
  //   setCategyValue({
  //   ...categryValue,catelogo:reslocal
  // })
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
       <div className="grid grid-cols-2 md:grid-cols-5 ">
  
   {allProduct.map((iteam,index)=>{
         return <ProductIteam key={index} name={iteam.name} image={iteam.image} newPrice={iteam.newPrice} oldPrice={iteam.oldPrice} id={iteam._id}/>
       })
       }
       </div>
    )
    
       }
     
     </>
    )
}
export default Home