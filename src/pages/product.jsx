import {useParams} from 'react-router-dom'
import {useState,useEffect, useContext} from 'react'
import {ContestContext} from '../api/ContestContext'
import ProductDisplay from '../components/productdisplay'
import Bredcrumb from '../components/bredcrumb'
import ProductIteam from '../components/productIteam/productIteam'
const Product = ()=>{
  const {productId} = useParams()
  const {allProduct}= useContext(ContestContext)
    const result = allProduct.find((e)=>{
    return e._id === productId
    })
    
  if(!result){
    return false
  } 
  
  const reletedProduct = allProduct.filter((e)=>{
    return e.categry == result.categry
  })
   
  
  return(
     <>
      <Bredcrumb name={result.name} categry={result.categry}/>
      
      <ProductDisplay id={result._id} name={result.name} image={result.image} newPrice={result.newPrice} oldPrice={result.oldPrice} productInfo={result.productInfo} />
      
        <div className="product-description">
          <b  className="  text-xl font-bold uppercase text-slate-500">Reletedroduct :</b>
      <div className="grid gap-1 grid-cols-2 md:grid-cols-5 ">
       
     {
       reletedProduct.map((iteam,index)=>{
         return <ProductIteam key={index} name={iteam.name} image={iteam.image} newPrice={iteam.newPrice} oldPrice={iteam.oldPrice} id={iteam._id}/>
       })
     }
     </div>
         
        </div>
      
     </>
    )
}
export default Product