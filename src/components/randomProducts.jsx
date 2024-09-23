import ProductIteam from './productIteam/productIteam'
import LoddingCardComponent from './loddingCardComponent'
import {useState,useEffect, useContext} from 'react'
import {ContestContext} from '../api/ContestContext'
const RandomProducts = ()=>{
    const loddingArry = [1,2,3,4,5,6,7,8,9,10]
   const {randomProduct,lodding}= useContext(ContestContext)
  
  return(
    <>
    <div className="p-2">
    <h1 className="font-bold text-pink-400 ">RANDOM PRODUCTS</h1>
    </div>
   <div  style={{ scrollbarWidth: "none"}} className="select-none  flex w-full overflow-scroll flex-wrap m-[3px] gap-1"> 
     {
       randomProduct.length == 0 && lodding ? (
     loddingArry.map((iteam,index)=>{
        return <LoddingCardComponent/>
      })
     ):(
     
    randomProduct.map((iteam,index)=>{
        return <ProductIteam width={38} key={index} name={iteam.name} image={iteam.image} newPrice={iteam.newPrice} oldPrice={iteam.oldPrice} id={iteam._id}/>
      })
      )
     }
     
     </div>
     </>
    )
}
export default RandomProducts