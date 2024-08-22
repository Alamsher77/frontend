import './displayProduct.css'
import { FaBeer } from "@react-icons/all-files/fa/FaBeer";
import {useState,useEffect, useContext} from 'react'
import {ContestContext} from '../api/ContestContext'
import { IoIosStarOutline } from "react-icons/io";
import DomainUrl from '../Configuration/Index'
import{ toast } from 'react-hot-toast';
import {useNavigate} from "react-router-dom";
const ProductDisplay = (props)=>{

  const navigate = useNavigate();
   const {coutCartFetchApi,cartProduct,addToCart}= useContext(ContestContext)
   const p = Number(props.oldPrice)
 const l = Number(props.newPrice)
 const m = 100 - (Math.floor(l / p * 100))  
  const [productImage,setProductImage] = useState({
    imageName:'',
    imageId:'',
  })
 const addToCartController = async (prodId)=>{
    
   try{
     const response = await fetch(`${DomainUrl.url}addToCart`,{
       method:'POST',
       credentials:"include",
        headers:{
        Accept:'application/json',
        "Content-type":"application/json",
      },
      body:JSON.stringify({productId:prodId,proimage:productImage.imageId}),
     })
     
     const data = await response.json()
     
     if(!data.success){
       toast.error(data.message) 
      if(data.auth){
         navigate('/signup'); // Pushes 
         return false
      }
     }else{
       toast.success(data.message) 
       coutCartFetchApi()
     }
     
     
   }catch(error){
     toast.error('cart error',error)
   }
 }
 
  useEffect(()=>{
   setProductImage({...productImage,imageName:props.image[0],imageId:0})
 },[])
   return(
     <div className="container" >
       <div className="display-image"><img src={productImage.imageName} /></div>
       
       <div className="display-list-container">
        {
          props.image.map((iteam,index)=>{
            return  <div onClick={()=>{
            setProductImage({...productImage,imageName:iteam,imageId:index})
   
            }} className="display-list-iteam "><img style={{objectFit:"contain"}} src={iteam} /></div>
       
          })
        }
       </div> 
        
        <div className="product-info">
           <div className="ProductName">
       <p> <b className="text-slate-700">Product-Name : </b><span> {props.name} </span></p>
       </div>  
       
        <div className="break-all ">
        <p className="line-through text-red-400">₹{props.oldPrice}</p>
       <strong>₹{props.newPrice}</strong> <span className="text-green-600">-{m}%</span>
     
      </div>
  <button onClick={()=>{addToCartController(props.id)}} class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-6  my-2">
  Buy now
  </button>
 </div>
 
 <div className="product-description">
    <b  className="text-slate-700">Product Description :</b>
    <p>{props.productInfo}</p>
 </div>
      
     </div>
    
    )
}
export default ProductDisplay