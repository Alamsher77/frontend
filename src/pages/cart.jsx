 import {useState,useContext,useEffect} from "react"
 import DomainUrl from '../Configuration/Index'
 import CartIteam from "../components/cart.iteam"
 import{ toast } from 'react-hot-toast'; 
 import DisplayCurrency from '../displayCurrancy'
 import {useNavigate}  from 'react-router-dom'
 import { FiShoppingCart } from "react-icons/fi";
 import { FaBasketShopping } from "react-icons/fa6";
 import {ContestContext} from '../api/ContestContext'
 import Conformation from '../components/conformation'
 import LoddingButton from '../components/loddingbutton'
const Cart = () => { 
   
 const {userDetails,lodding,coutCartFetchApi} = useContext(ContestContext) 
  const navigate = useNavigate()
 const [cartProductView,setCartProductView] = useState([])
 const [islodding,setIslodding] = useState(false) 
 
// fetch cart products list
const cartProductViewFetch = async ()=>{
    try{
       
       setIslodding(true) 
   const response =   await fetch(`${DomainUrl.url}cartProductView`,{
        method:'GET',
        credentials:'include'
      })
     const data = await response.json()
    setCartProductView(data.allProducts)
      setIslodding(false)
    }catch(error){
      toast.error(error.message)
    }
     
}
   useEffect(()=>{
     cartProductViewFetch()   
   },[])
 
// get the value of total cart product quantity and  prices
  const totalquatity = cartProductView?.reduce((prev,curent)=>{
            return prev + curent.quantity
          },0)
 const TotalPrice = cartProductView?.reduce((prev,curent)=>{
     return prev + (curent.quantity * curent.productId?.newPrice)
          },0)
          
  // make a payment function
  const [isVisible,setIsVisible] = useState(false)
  const [isConform,setIsConform]  = useState(false)
  const [checkOutlodding,setcheckoutlodding] = useState(false)
  // procide to cheqoutAndPayment
const checkOutHandler = async(e)=>{
  try{
    setIsVisible(false) 
    if(!userDetails?.phone || !userDetails?.currentAddress || !userDetails?.deleverAddress || !userDetails?.block || !userDetails?.city || !userDetails?.state || !userDetails?.country){
 
      navigate('/userDetails')
      return false
    }  
    setcheckoutlodding(true)
     
  const response = await fetch(`${DomainUrl.url}cheqoutAndPayment`,{
      method: 'POST',
       credentials:'include',
        headers: {
          Accept: 'application/json',
          "Content-type": "application/json",
        },
        body: JSON.stringify(cartProductView),
    })
  
  const data = await response.json()
  setcheckoutlodding(false)
   if(!data.success){
    toast.error(data?.message) 
    return false
   }
   toast.success(data?.message) 
   navigate('/myOrderProducts')
   coutCartFetchApi()
   cartProductViewFetch()
   
  }catch(error){
    setcheckoutlodding(false)
    toast.error(error?.message) 
  }
} 
 
  return (
   <>
   <Conformation onconform={()=>{ 
     checkOutHandler()
     setIsVisible(false)
   }} onCancel={()=>setIsVisible(false)} onClose={()=>setIsVisible(false)} isvisible={isVisible} >
   <p>Your All Cart Products Order !</p>
   </Conformation>
  {
     islodding ? (   
            [1,2,3,2,3,4,3].map((item,index)=>{
            return (
              <div  key={index} className="animate-pulse select-none  mt-2 bg-slate-200 p-1 shadow shadow-gray-600 h-28 w-screen  flex items-center">
                <p className="w-20 h-20 rounded-full bg-slate-400"></p>
                <div className="flex flex-col gap-4 w-52 p-2 ml-3">
                <p className="bg-slate-400 h-8 w-full"></p>
                <p className="bg-slate-400 h-8 w-full"></p>
                </div>
              </div>
              )
          })   
        ):( 
      !userDetails ?(
          <div className="text-center mt-20 mb-20 text-red-400">
          <p className="text-2xl mb-10">You are not login</p>
          <button onClick={()=>{navigate('/signup')}} className="px-3 py-1 border border-red-500 rounded hover:bg-red-500 hover:text-white">Login</button>
          </div>
         ):(
     cartProductView?.length == 0   ? (
        <div className="flex flex-col h-[70vh] justify-center items-center">
          <div className="text-7xl text-pink-500 mb-4"><FiShoppingCart /></div>
          <p className="text-sm text-slate-500 capitalize">Your Cart is Eampty</p>
          <button onClick={()=>navigate('/')} className="flex px-5 py-1 mt-3 rounded text-pink-600 border border-pink-500 gap-2  justify-center items-center" >continue <span><FaBasketShopping /></span></button>
          </div>
        ):(
        <>    
    <div className="flex flex-col gap-1 "> 
    <h1 className="text-2xl text-center mt-10 uppercase">Cart Datails</h1>
      
    { cartProductView?.map((product,index)=>{
        
        return <CartIteam   cartProductViewFetch={cartProductViewFetch} products={product} key={index}/> 
      
      })
     
  } 
    </div>
    
      
    <div className="cart-checkout  bg-slate-100">
      <h1>Order Summery</h1>
      <div className="w-full px-4 py-2 flex justify-between gap-2">
    <p>Total Quantity</p> <p>{totalquatity}</p>
      </div>
       
      <div className="w-full px-4 py-2 flex justify-between gap-2">
    <p>Total Amount</p> <p>{DisplayCurrency(TotalPrice)}</p>
      </div>
      <div  onClick={()=>setIsVisible(true)} className="border border-pink-500 my-5">
      <p className="px-7 py-2 text-black hover:bg-pink-500 hover:text-white rounded cursor-pointer select-none">{checkOutlodding ? <LoddingButton /> : 'Order now'}</p>
      </div>
    </div>
    
  </>
    )
           )
          
    )
      
  }
   </>
  );
};

export default Cart