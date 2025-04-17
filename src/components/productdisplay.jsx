import './displayProduct.css'
import SpeechMessage from './speechMessage'
import {useState,useEffect, useContext} from 'react'
import {ContestContext} from '../api/ContestContext'
import { IoIosStarOutline } from "react-icons/io";
import DomainUrl from '../Configuration/Index'
import{ toast } from 'react-hot-toast';
import { IoCloseSharp,IoRemoveCircleSharp,IoAddCircleSharp } from "react-icons/io5";
import {useNavigate,Link} from "react-router-dom";
import DisplayCurrency from '../displayCurrancy'  
import ZoomImage from './zoomimage'
import Conformation from './conformation'
import { FaCartPlus } from "react-icons/fa"; 
import Card from './Card'
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import ProductImageGallery from "./ProductImageGallery";
const ProductDisplay = ({result,visible})=>{
   
  const [lodding,setlodding] = useState(false)
const [viewProduct,setViewProduct] = useState({
  close:false,
  data:''
})
const [productviwindex,setproductviewindex] = useState(0)
  const navigate = useNavigate();
   const {setIsPopUp,allProduct,userDetails,coutCartFetchApi,cartProduct,addToCart}= useContext(ContestContext)
   
   const similarproduct = allProduct?.filter((e)=>{
    // console.log(e.similarName)
    if(e?.similarName){
        return e?.similarName === result?.similarName
    }
  
  })
  
   const oldprice = Number(result?.oldPrice)
 const newprice = Number(result?.newPrice)
 const discount = 100 - (Math.floor(newprice/ oldprice* 100))   
 const [bysingleproduct,setsingleproduct] = useState([{
   userId:userDetails?._id,
   productId:result,
   quantity:1,
   size:null
 }])
 const [isvisible,setIsVisible]  = useState(false)
 const [cartconformation,setcartconformmation] = useState(false)
 const addToCartController = ()=>{ 
   setIsVisible(true)
   setcartconformmation(true) 
 }
 
 const [scroll,setscroll] = useState(0)
 
 
 useEffect(()=>{
   window.addEventListener('scroll',()=>{
     setscroll(window.scrollY)
   })
 },[scroll])
 
 useEffect(()=>{
   
   setsingleproduct((preve)=>[{...preve[0],size:result?.size[0]}])
 },[result])
 
 
// buy singale product 

const singleproductbuyhandler = async()=>{ 
    setcartconformmation(false)
    setIsVisible(true) 
}
 
  
 const onconform = async(id)=>{
 
  if(cartconformation){
    // product addet to cart function
     try{
       setlodding(true)
     const response = await fetch(`${DomainUrl.url}addToCart`,{
       method:'POST',
       credentials:"include",
        headers:{
        Accept:'application/json',
        "Content-type":"application/json",
      },
      body:JSON.stringify({productId:result?._id,size:sizeselect}),
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
  }else{
    
  try {
    
  userDetails ?  navigate("/orderconformation",{state:bysingleproduct}) : navigate('/login')
  
  } catch (e) {
    setlodding(false)
  toast.error(e.message)
  }
  }
   
   setIsVisible(false)
 } 
const quantityIncress = ()=>{
 setsingleproduct((prevItems) =>
      prevItems.map((item) =>
        item.quantity >= 1  ? { ...item, quantity: item.quantity + 1 } : item
      )
    ); 
}
const quantityDecress = ()=>{
   setsingleproduct((prevItems) =>
      prevItems.map((item) =>
        item.quantity > 1  ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
}

const [conteint,setconteint] = useState(false)
// back button press functionality
 useEffect(()=>{
  window.addEventListener('popstate',()=>{
  setViewProduct({...viewProduct,close:false})
  setIsPopUp(false)
  })
  return ()=>{
    window.removeEventListener('popstate',()=>{
    setViewProduct({...viewProduct,close:false})
    setIsPopUp(false)
    })
  }
   
 },[])
   
   return(
     <div className="relative md:flex " >
      {
      
       !cartconformation &&(
         <Conformation islodding={lodding} onClose={()=> setIsVisible(false)} onconform={onconform} isvisible={isvisible} onCancel={()=> setIsVisible(false)}>
       <div className="">
        <p>Product Orderd Price : {DisplayCurrency(bysingleproduct[0].quantity * result?.newPrice)}</p>
        <div className="flex gap-2 items-center">
         <p> Quantity : <span>{bysingleproduct[0]?.quantity}</span></p>
         <div className="flex text-2xl gap-2 items-center" >
            <IoRemoveCircleSharp onClick={quantityDecress} className="cursor-pointer text-red-600" />
            <IoAddCircleSharp onClick={quantityIncress} className="cursor-pointer text-green-600" />
         </div> 
        </div>
         {
           result?.sizable === "true" ? <p className="font-bold text-yellow-800">product Size : ( { bysingleproduct[0]?.size} )</p> : null
         }
       </div>
      </Conformation>
        ) 
      }
      {
       cartconformation && (
         <Conformation islodding={lodding} onClose={()=> setIsVisible(false)} onconform={onconform} isvisible={isvisible} onCancel={()=> setIsVisible(false)}>
       <div className="">
        <p>You are added product to cart</p> 
       </div>
      </Conformation>
        )
      }
    
     { /*big screen container iamge */ }
     
   
      { /*big mobile screen container iamge */ }
       <Card className="md:hidden flex w-full gap-1 relative max-w-full  flex flex-col " >
          <ProductImageGallery images={result?.image}/>
          <div className="mt-4 text-center text-gray-600 text-sm font-medium">Similar Product ({similarproduct?.length})</div>
             <div className="flex justify-center" >
               {
       similarproduct?.length == 0 ? null :  
         
           similarproduct?.map((item,index)=>{ 
           
          return( 
          <Link to={`/product/${item._id}`} key={index} className="flex h-28 cursor-pointer justify-center mt-3">
           <img className="p-1 w-full h-full  object-contain" src={item?.image[0]?.img}  />
          
          </Link> 
          )
        }) 
       } 
              </div>
       </Card>
       
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
       
     
    
        <div className="md:flex   md:p-2   md:m-1 md:flex-col md:gap-5">
       {
          result?.stock <= 5 ?
           <div className="px-2 font-bold text-red-600">{result?.stock <= 0 ? <p>Currently unavailable this product </p> : <p>In Stock left : {result.stock}</p>}</div>
         : ''
       }
      <Card  >
          <div className="p-6 space-y-5">
            <h2 className="text-2xl font-semibold text-gray-800">{result?.name}</h2>
            <div className="flex items-center space-x-3">
              <span className="line-through text-gray-400">{DisplayCurrency(result?.oldPrice)}</span>
              <span className="text-red-600 text-xl font-bold">{DisplayCurrency(result?.newPrice)}</span>
              <span className="text-green-600 font-semibold">-{discount}%</span>
            </div>
            <div>
            {
              result?.sizable == 'true' &&
              <>
              <span className="font-semibold text-gray-700">Select Size:</span>
              <div className="mt-2 flex gap-3">
              
              {
                result?.size?.map((productsize)=>{
                const activeColor = bysingleproduct[0]?.size === productsize 
                  return  <button onClick={()=> setsingleproduct((preve)=>[{...preve[0],size:productsize}])}  className={`rounded-full border-red-600 ${activeColor && "bg-red-300"} uppercase  hover:text-white hover:bg-black border px-5 py-1 text-sm`}>{productsize}</button>
                })
              }
                
              </div>
              </>
            }
            </div>
           
          </div>
        </Card>
 
 
  <Card  >
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Product Description</h3>
          <p className="text-gray-700 leading-relaxed">{result?.productdiscription}</p>
          {
          result?.keyfeuter == 'true' &&
            result?.productInfo?.map((iteams,index)=>{
              return(
            <div key={index}>
          <h4 className="text-lg font-semibold mt-5 text-gray-800">{iteams?.name}</h4>
          <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
           {
             iteams?.list?.map((iteam,index)=>{ 
             return <li key={index}>{iteam}</li> 
               
             })
           }
            
            
          </ul>
          </div>
              )
            })
          }
        </div>
      </Card>
 
 {/* if screen is bigger then show this container and if this product was in addproduct then not show this container and show when product display   */}
 
 {
   !visible && 
    <div className="md:block md:flex md:gap-3 hidden">
    <button  onClick={addToCartController}  className="py-1 transition ease-in-out delay-150 hover:bg-white hover:text-pink-400 border-pink-400 flex tracking-widest font-bold uppercase bg-pink-400 text-white justify-center items-center text-[18px] px-8 rounded-md  border gap-3">
      <FaCartPlus /> <span>cart</span>
     </button>
     
     <button onClick={singleproductbuyhandler} className="py-1 transition ease-in-out delay-150 hover:bg-white hover:text-green-500 border-green-500 flex tracking-widest font-bold uppercase bg-green-500 text-white justify-center items-center text-[18px] px-8 rounded-md  border gap-3">
      <TbPlayerTrackNextFilled className="text-2xl" /> <span>Buy</span>
     </button>
  </div>
 }
 </div>
   
 
 { /* button for addtocard and bay*/ }
    {
    visible ? null : // if preivew mode this hidden add to cart and buy proudcts
      result?.stock <= 0 ? null : (
        <div className={`md:hidden fixed ${scroll < 600 ? 'bottom-0': '-bottom-20'} transition ease-in-out delay-200 bg-white left-0 flex justify-between  shadow rounded-t-2xl shadow-black z-[1000] w-full py-2 pb-5 px-4`}>
     
     <button   onClick={addToCartController} className="py-1 transition ease-in-out delay-150 hover:bg-white hover:text-pink-400 border-pink-400 flex tracking-widest font-bold uppercase bg-pink-400 text-white justify-center items-center text-[18px] px-8 rounded-md  border gap-3">
      <FaCartPlus /> <span>cart</span>
     </button>
     
     <button onClick={singleproductbuyhandler} className="py-1 transition ease-in-out delay-150 hover:bg-white hover:text-green-500 border-green-500 flex tracking-widest font-bold uppercase bg-green-500 text-white justify-center items-center text-[18px] px-8 rounded-md  border gap-3">
      <TbPlayerTrackNextFilled className="text-2xl" /> <span>Buy</span>
     </button>
     </div>
      )
    }
  </div>
    
    )
}
export default ProductDisplay