import './displayProduct.css'
import Zoom from 'react-medium-image-zoom';
import ReactImageMagnify from 'react-image-magnify';
import 'react-medium-image-zoom/dist/styles.css';
import SpeechMessage from './speechMessage'
import { FaBeer } from "@react-icons/all-files/fa/FaBeer";
import {useState,useEffect, useContext} from 'react'
import {ContestContext} from '../api/ContestContext'
import { IoIosStarOutline } from "react-icons/io";
import DomainUrl from '../Configuration/Index'
import{ toast } from 'react-hot-toast';
import { IoCloseSharp } from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import DisplayCurrency from '../displayCurrancy'  
const ProductDisplay = (props)=>{
const [viewProduct,setViewProduct] = useState({
  close:false,
  data:''
})
  const navigate = useNavigate();
   const {setIsPopUp,coutCartFetchApi,cartProduct,addToCart}= useContext(ContestContext)
   const p = Number(props.oldPrice)
 const l = Number(props.newPrice)
 const m = 100 - (Math.floor(l / p * 100))  
 
 const addToCartController = async (prodId)=>{
    
   try{
     const response = await fetch(`${DomainUrl.url}addToCart`,{
       method:'POST',
       credentials:"include",
        headers:{
        Accept:'application/json',
        "Content-type":"application/json",
      },
      body:JSON.stringify({productId:prodId}),
     })
     
     const data = await response.json()
     
     if(!data?.success){
       toast.error(data?.message) 
       SpeechMessage(data?.message)
      if(data.auth){
         navigate('/signup'); // Pushes 
         return false
      }
     }else{
       toast.success(data?.message) 
       SpeechMessage(data?.message)
       navigate('/cart')
       coutCartFetchApi()
     }
     
     
   }catch(error){
     toast.error('cart error',error)
   }
 }
  
  
   return(
     <div className="" >
       <div className="flex w-full gap-1 max-w-full max-h-[300px] overflow-x-scroll" style={{scrollbarWidth:'none'}}>
          {props.image.map((image,indes)=>{
            return(
            <div className='min-w-full h-[300px]'> 
              <img className="duration-500 ease-in-out transition-transform hover:scale-110 w-[100%] h-full object-contain" src={image.img} />  
            </div>
            )
          })}
       </div>
       
       {
      // viewProduct.close &&(
      //   <div className="fixed p-5 top-0 z-[2000] min-w-full min-h-[100vh] bg-slate-200">
      //   <div onClick={()=>{
      //     setViewProduct({...viewProduct,close:false})
      //     setIsPopUp(false)
      //   }} className='absolute right-2 top-2 text-red-600 shadow-red-400 text-3xl hover:bg-red-500 hover:text-white cursor-pointer rounded-full shadow border border-red-600'><IoCloseSharp /></div>
         
        
      // </div>
      // )
         
       }
     
        <div className="product-info">
           <div className="ProductName">
       <p> <b className="text-slate-700">Product-Name : </b><span> {props.name} </span></p>
       </div>  
       
        <div className="">
        <p className="line-through text-gray-400">{DisplayCurrency(props.oldPrice)}</p>
       <strong className="text-red-600">{DisplayCurrency(props.newPrice)}</strong> <span className="text-green-600">-{m}%</span>
     
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