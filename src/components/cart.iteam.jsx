import DomainUrl from '../Configuration/Index'
import { IoCloseCircle,IoRemoveCircleSharp,IoAddCircleSharp} from "react-icons/io5";
 
import{ toast } from 'react-hot-toast';
import {useState,useContext,useEffect} from "react"
import {ContestContext} from '../api/ContestContext'
import { Grid} from 'react-loader-spinner'
import {Link} from 'react-router-dom'
const CartIteam = ({cartProductViewFetch,products}) => {
const product = products.productId
  const { coutCartFetchApi} = useContext(ContestContext) 
  const [lodding,setLodding] = useState(false) 
  
const cartIteamDeleteHandler = async (id)=>{
   try{
       setLodding(true)
    const response = await fetch(`${DomainUrl.url}cartDelete`,{
        method:"POST",
        credentials:"include",
       headers:{ 
        "Content-type":"application/json",
      },
        body:JSON.stringify({id})
      })
     .catch((error)=> console.log(error))
     const data = await response.json()
     if(data.success){
      toast.success(data.message)
       cartProductViewFetch()
      coutCartFetchApi()
      setLodding(false)
     }
   }catch(error){
     toast.error(error.message)
   }
}
 
 const increese = async(id,qty)=>{
   try{
     const response = await fetch(`${DomainUrl.url}updateCartCount`,{
        method:"POST",
        credentials:"include",
       headers:{
        "Content-type":"application/json",
      },
        body:JSON.stringify({
          _id:id,
          quantity:qty + 1 
        })
      })
      
      const data = await response.json() 
      toast.success(data.message)
      cartProductViewFetch() 
   }catch(error){
      
   }
 }
 const decress = async(id,qty)=>{
    try{
    if(qty > 1){
         const response = await fetch(`${DomainUrl.url}updateCartCount`,{
        method:"POST",
        credentials:"include",
       headers:{
        "Content-type":"application/json",
      },
        body:JSON.stringify({
          _id:id,
          quantity:qty - 1 
        })
      })
      
      const data = await response.json() 
      toast.success(data.message)
      cartProductViewFetch() 
    }
   }catch(error){
     toast.error(error.message)
   }
 }
 
  return (
   <div className="select-none mx-3 relative bg-white p-1 shadow shadow-gray-600 flex justify-between ">
   
   <div className="w-28 h-28">
    <img src={product?.image[0]} className="w-full h-full object-contain" alt="" /> 
   </div>
   
      <div className="flex flex-col w-64 gap-1 py-5 px-3">
        <h1 className="text-nowrap text-ellipsis font-bold overflow-hidden">{product?.name}</h1>
          <div className="flex justify-between "> 
          <p className="text-slate-600 font-bold">₹{product?.newPrice }</p>
          <p className="text-slate-600 font-bold">₹{product?.newPrice * products?.quantity}</p>
          </div>
          <div className="flex gap-1 items-center">
         <IoAddCircleSharp className="cursor-pointer text-xl text-green-600" onClick={()=>increese(products?._id,products?.quantity)} /> <p>{products?.quantity
         }</p> <IoRemoveCircleSharp className="cursor-pointer text-red-600 text-xl" onClick={()=> decress(products?._id,products?.quantity)} />
        </div>
        <button className="absolute right-1 top-1 text-bold text-red-400 hover:text-red-500  text-3xl " onClick={()=> cartIteamDeleteHandler(products._id)}><IoCloseCircle /></button>

      </div>
    </div>
  );
};

export default CartIteam;
