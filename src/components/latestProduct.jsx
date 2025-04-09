import ProductIteam from './productIteam/productIteam'
import LoddingCardComponent from './loddingCardComponent'
import {useState,useEffect, useContext} from 'react'
import {ContestContext} from '../api/ContestContext'
const LatestProduct = ()=>{
    const loddingArry = [1,2,3,4,5,6,7,8,9,10]
   const {latestProduct,lodding}= useContext(ContestContext)

  return(
    <>
    <div className="px-1 ">
    <h1 className="font-bold text-pink-400 ">LATEST PRODUCTS</h1>
    </div>
  <div  style={{ scrollbarWidth: "none"}} className="select-none mx-1 flex gap-1 px-1 overflow-x-auto"> 
     {
       latestProduct.length == 0 && lodding ? (
     loddingArry.map((iteam,index)=>{
        return <LoddingCardComponent key={index}/>
      })
     ):(
     
    latestProduct.map((iteam,index)=>{
        return <ProductIteam key={index} iteam={iteam} name={iteam.name} image={iteam.image} newPrice={iteam.newPrice} oldPrice={iteam.oldPrice} id={iteam._id}/>
      })
      )
     }
     
     </div>
     </>
    )
}
export default LatestProduct