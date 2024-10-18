import './displayProduct.css'
import SpeechMessage from './speechMessage'
import {useState,useEffect, useContext} from 'react'
import {ContestContext} from '../api/ContestContext'
import { IoIosStarOutline } from "react-icons/io";
import DomainUrl from '../Configuration/Index'
import{ toast } from 'react-hot-toast';
import { IoCloseSharp } from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import DisplayCurrency from '../displayCurrancy'  
import ZoomImage from './zoomimage'
import { FaCartPlus } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
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
     toast.error(error.message)
   }
 }
 
 const [scroll,setscroll] = useState(0)
 
 
 useEffect(()=>{
   window.addEventListener('scroll',()=>{
     setscroll(window.scrollY)
   })
 },[scroll])
 
 console.log(scroll)
   return(
     <div className="relative " >
       <div className="flex w-full gap-1 max-w-full max-h-[300px] overflow-x-scroll" style={{scrollbarWidth:'none'}}>
          {props.image.map((image,indes)=>{
            return(
            <div key={indes} className='min-w-full h-[300px]'> 
              <img onClick={()=>{
              setViewProduct({data:image.img,close:true})
                setIsPopUp(true)
              }} className="duration-500 ease-in-out transition-transform hover:scale-110 w-[100%] h-full object-contain" src={image.img} />  
            </div>
            )
          })}
       </div>
       
       {
      viewProduct.close &&(
        <div className="select-none fixed flex justify-center overflow-hidden items-center top-0 z-[2000] min-w-full min-h-[100%] bg-black">
        <div onClick={()=>{
          setViewProduct({...viewProduct,close:false})
          setIsPopUp(false)
        }} className='z-10 absolute right-2 top-2 text-red-600 shadow-red-400 text-3xl hover:bg-red-500 hover:text-white cursor-pointer rounded-full shadow border border-red-600'><IoCloseSharp /></div>
       
        <ZoomImage src={viewProduct.data}/>
        
      </div>
      )
         
       }
     
        <div className="product-info">
           <div className="ProductName">
       <p> <b className="text-slate-700">Product-Name : </b><span> {props.name} </span></p>
       </div>  
       
        <div className="">
        <p className="line-through text-gray-400">{DisplayCurrency(props.oldPrice)}</p>
       <strong className="text-red-600">{DisplayCurrency(props.newPrice)}</strong> <span className="text-green-600">-{m}%</span>
     
      </div>
 </div>
 
 <div className="product-description">
    <b  className="text-slate-700">Product Description :</b>
    <p>{props.productInfo}</p>
 </div>
 
 { /* button for addtocard and bay*/ }
     <div className={`fixed ${scroll < 200 ? 'bottom-0': '-bottom-20'} transition ease-in-out delay-200 bg-white flex justify-between  shadow rounded-t-2xl shadow-black z-[1000] w-full py-2 pb-5 px-4`}>
     
     <button onClick={()=>{addToCartController(props.id)}} className="py-1 transition ease-in-out delay-150 hover:bg-white hover:text-pink-400 border-pink-400 flex tracking-widest font-bold uppercase bg-pink-400 text-white justify-center items-center text-[18px] px-8 rounded-md  border gap-3">
      <FaCartPlus /> <span>cart</span>
     </button>
     
     <button className="py-1 transition ease-in-out delay-150 hover:bg-white hover:text-green-500 border-green-500 flex tracking-widest font-bold uppercase bg-green-500 text-white justify-center items-center text-[18px] px-8 rounded-md  border gap-3">
      <TbPlayerTrackNextFilled className="text-2xl" /> <span>Buy</span>
     </button>
     </div>
  </div>
    
    )
}
export default ProductDisplay