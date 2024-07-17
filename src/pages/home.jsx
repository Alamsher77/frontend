
import ProductIteam from '../components/productIteam/productIteam'
import {useState,useEffect, useContext} from 'react'
import {ContestContext} from '../api/ContestContext'
const Home = ()=>{
   const {allProduct}= useContext(ContestContext)
  
  return(
     <>
     <div className="grid grid-cols-2 md:grid-cols-5 ">
     {
       allProduct.map((iteam,index)=>{
         return <ProductIteam key={index} name={iteam.name} image={iteam.image} newPrice={iteam.newPrice} oldPrice={iteam.oldPrice} id={iteam._id}/>
       })
     }
     </div>
     </>
    )
}
export default Home