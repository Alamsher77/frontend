import ProductIteam from './productIteam/productIteam'
import LoddingCardComponent from './loddingCardComponent'
import {useState,useEffect, useContext} from 'react'
import {ContestContext} from '../api/ContestContext'
const RandomProducts = ()=>{
    const loddingArry = [1,2,3,4,5,6,7,8,9,10]
   const {randomProduct,lodding}= useContext(ContestContext)
  
  return(
    <>
   <div  style={{ scrollbarWidth: "none"}} className="select-none  flex w-full overflow-scroll flex-wrap justify-center gap-1"> 
     {
       randomProduct.length == 0 && lodding ? (
     loddingArry.map((iteam,index)=>{
        return <LoddingCardComponent/>
      })
     ):(
     
    randomProduct.map((iteam,index)=>{
        return <ProductIteam key={index} name={iteam.name} image={iteam.image} newPrice={iteam.newPrice} oldPrice={iteam.oldPrice} id={iteam._id}/>
      })
      )
     }
     
     </div>
     </>
    )
}
export default RandomProducts