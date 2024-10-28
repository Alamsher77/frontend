import './displayProduct.css'
import SpeechMessage from './speechMessage'
import {useState,useEffect, useContext} from 'react'
import {ContestContext} from '../api/ContestContext'
import { IoIosStarOutline } from "react-icons/io";
import DomainUrl from '../Configuration/Index'
import{ toast } from 'react-hot-toast';
import { IoCloseSharp } from "react-icons/io5";
import {useNavigate,Link} from "react-router-dom";
import DisplayCurrency from '../displayCurrancy'  
import ZoomImage from './zoomimage'
import { FaCartPlus } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
const ProductDisplay = ({result,similarproduct})=>{
  const [sizeselect,setsizeselect] = useState(null)
const [viewProduct,setViewProduct] = useState({
  close:false,
  data:''
})
const [productviwindex,setproductviewindex] = useState(0)
  const navigate = useNavigate();
   const {setIsPopUp,userDetails,coutCartFetchApi,cartProduct,addToCart}= useContext(ContestContext)
   const p = Number(result?.oldPrice)
 const l = Number(result?.newPrice)
 const m = 100 - (Math.floor(l / p * 100))  
 
 const bysingleproduct = [{
   userId:userDetails?._id,
   productId:result,
   quantity:1,
   size:sizeselect
 }]
 console.log(sizeselect)
 const addToCartController = async (prodId)=>{
    
   try{
     const response = await fetch(`${DomainUrl.url}addToCart`,{
       method:'POST',
       credentials:"include",
        headers:{
        Accept:'application/json',
        "Content-type":"application/json",
      },
      body:JSON.stringify({productId:prodId,size:sizeselect}),
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
 
 
// buy singale product 

const singleproductbuyhandler = async()=>{
   const grant = confirm('Are You Sure ? You want to order this Product')
  
    if(!grant) return false
    
  
   if(!userDetails?.phone || !userDetails?.currentAddress || !userDetails?.deleverAddress || !userDetails?.block || !userDetails?.city || !userDetails?.state || !userDetails?.country){
      toast.error('please add all your details')
      navigate('/userDetails')
      return false
    } 
  try {
 const response = await fetch(`${DomainUrl.url}cheqoutAndPayment`,{
      method: 'POST',
       credentials:'include',
        headers: {
          Accept: 'application/json',
          "Content-type": "application/json",
        },
        body: JSON.stringify(bysingleproduct),
    })
 const data  = await response.json()
 if(!data?.success){
   toast.error(data?.message)
   return false
 }
 toast.success(data?.message)
  navigate('/myOrderProducts')
  } catch (e) {
    
   toast.error(e.message)
  }
}
 
 
   return(
     <div className="relative md:flex " >
     { /*big screen container iamge */ }
       <div className="hidden border md:flex p-1 m-1 md:block max-h-[350px] min-w-[550px]">
      <div style={{ scrollbarWidth: "none"}} className="w-[130px]  p-0.5 max-h-[350px]  overflow-scroll border border-slate-700">
       {
         result?.image?.map((item,index)=>{
           return(
             <div onClick={()=> setproductviewindex(index)}  key={index} className="h-[130px] mb-0.5  w-full bg-white">
              <img className="w-full h-full object-cover" src={item?.img} />
             </div>
           )
         })
       }
      </div>
      <div className="h-[330px] w-[380px] m-auto" >
       <img className="w-full object-contain h-full" src={result?.image[productviwindex]?.img} />
      </div>
     </div>
   
      { /*big mobile screen container iamge */ }
       <div className="md:hidden flex w-full gap-1 max-w-full max-h-[300px] overflow-x-scroll" style={{scrollbarWidth:'none'}}>
          {result?.image.map((image,indes)=>{
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
        <div className="md:hidden select-none fixed flex justify-center overflow-hidden items-center top-0 z-[2000] min-w-full min-h-[100%] bg-black">
        <div onClick={()=>{
          setViewProduct({...viewProduct,close:false})
          setIsPopUp(false)
        }} className='z-10 absolute right-2 top-2 text-red-600 shadow-red-400 text-3xl hover:bg-red-500 hover:text-white cursor-pointer rounded-full shadow border border-red-600'><IoCloseSharp /></div>
       
        <ZoomImage src={viewProduct.data}/>
        
      </div>
      )
         
       }
      
       {
       similarproduct?.length == 0 ? null : 
       <div className="">
       <p className="px-2 text-sm"><strong>similarproduct</strong> <span>( {similarproduct?.length} )</span></p>
       <div className="px-2 justify-center gap-2 items-center flex my-1 w-full h-28 border border-yellow-600">
        {
           similarproduct?.map((item,index)=>{ 
          return(
          <Link to={`/product/${item._id}`} key={index} className="w-24 h-24 border border-yellow-600">
           <img className="p-1 w-full h-full object-cover" src={item?.image[0]?.img}  />
          </Link>
          )
        })
        }
       </div>
       </div>
       }
     <div className="md:flex border md:p-2   md:m-1 md:flex-col md:gap-5">
        <div className="product-info">
           <div className="ProductName">
       <p> <b className="text-slate-700">Product-Name : </b><span> {result?.name} </span></p>
       </div>  
       
        <div className="">
        <p className="line-through text-gray-400">{DisplayCurrency(result?.oldPrice)}</p>
       <strong className="text-2xl text-red-600">{DisplayCurrency(result?.newPrice)}</strong> <span className="text-green-600">-{m}%</span>
     
      </div>
      
     
        {
        !result?.sizable ? null:
         <div className="w-full select-none p-2"  >
       <p className="py-2 text-slate-600">Select Size</p>
       <div className="flex items-center gap-2 flex-wrap">
       {
          result?.size?.map((item,index)=>{
            return (
             <p onClick={()=>{setsizeselect(item) }} className={`text-[12px] ${sizeselect == item ? "text-white bg-yellow-600":''} flex hover:text-white font-bold hover:bg-yellow-600 border-yellow-600 cursor-pointer justify-center items-center w-8 h-8 border rounded-full`} key={index}>{item}</p>
            )
          })
        }
       </div>
      </div>
        }
 </div>
 
 <div className="product-description">
    <b  className="text-slate-700">Product Description :</b>
    <p>{result?.productInfo}</p>
 </div>
 
  <div className="md:block md:flex md:gap-3 hidden">
    <button onClick={()=>{addToCartController(result?.id)}} className="py-1 transition ease-in-out delay-150 hover:bg-white hover:text-pink-400 border-pink-400 flex tracking-widest font-bold uppercase bg-pink-400 text-white justify-center items-center text-[18px] px-8 rounded-md  border gap-3">
      <FaCartPlus /> <span>cart</span>
     </button>
     
     <button className="py-1 transition ease-in-out delay-150 hover:bg-white hover:text-green-500 border-green-500 flex tracking-widest font-bold uppercase bg-green-500 text-white justify-center items-center text-[18px] px-8 rounded-md  border gap-3">
      <TbPlayerTrackNextFilled className="text-2xl" /> <span>Buy</span>
     </button>
  </div>
 </div>
 
 { /* button for addtocard and bay*/ }
     <div className={`md:hidden fixed ${scroll < 200 ? 'bottom-0': '-bottom-20'} transition ease-in-out delay-200 bg-white flex justify-between  shadow rounded-t-2xl shadow-black z-[1000] w-full py-2 pb-5 px-4`}>
     
     <button onClick={()=>{addToCartController(result?._id)}} className="py-1 transition ease-in-out delay-150 hover:bg-white hover:text-pink-400 border-pink-400 flex tracking-widest font-bold uppercase bg-pink-400 text-white justify-center items-center text-[18px] px-8 rounded-md  border gap-3">
      <FaCartPlus /> <span>cart</span>
     </button>
     
     <button onClick={singleproductbuyhandler} className="py-1 transition ease-in-out delay-150 hover:bg-white hover:text-green-500 border-green-500 flex tracking-widest font-bold uppercase bg-green-500 text-white justify-center items-center text-[18px] px-8 rounded-md  border gap-3">
      <TbPlayerTrackNextFilled className="text-2xl" /> <span>Buy</span>
     </button>
     </div>
  </div>
    
    )
}
export default ProductDisplay