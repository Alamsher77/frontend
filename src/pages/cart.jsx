 import {useState,useContext,useEffect} from "react"
 import DomainUrl from '../Configuration/Index'
 import CartIteam from "../components/cart.iteam"
 import { DNA } from 'react-loader-spinner'
 import{ toast } from 'react-hot-toast'; 
 import DisplayCurrency from '../displayCurrancy'
 import {useNavigate}  from 'react-router-dom'
 import {ContestContext} from '../api/ContestContext'
 import NoContent from '../components/noContent'
  import SpeechMessage from '../components/speechMessage'
const Cart = () => { 
   
 const {userDetails,lodding,coutCartFetchApi} = useContext(ContestContext) 
  const navigate = useNavigate()
 const [cartProductView,setCartProductView] = useState([])
 const [islodding,setIslodding] = useState(false) 
const cartProductViewFetch = async ()=>{
    try{
       setIslodding(true)
         // allproduct api
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
 
  const totalquatity = cartProductView?.reduce((prev,curent)=>{
            return prev + curent.quantity
          },0)
 const TotalPrice = cartProductView?.reduce((prev,curent)=>{
     return prev + (curent.quantity * curent.productId?.newPrice)
          },0)
          
  // make a payment function
    
const checkOutHandler = async(e)=>{
  try{
    SpeechMessage("Are You Sure ? You want to order this Product")
    const grant = confirm('Are You Sure ? You want to order this Product')
  
    if(!grant){
        SpeechMessage("You are cancel this process")
      return false
    } 
    
    if(!userDetails?.phone || !userDetails?.currentAddress || !userDetails?.profilePic || !userDetails?.deleverAddress || !userDetails?.block || !userDetails?.city || !userDetails?.state || !userDetails?.country){
      toast.error('please add addres all fileds')
        SpeechMessage("please add addres all fileds")
      navigate('/userDetails')
      return false
    } 
   if(TotalPrice <= 200){
     toast.error('You Can Buy MoreThan 200 ruppese')
     SpeechMessage('You Can Buy MoreThan 200 roopeese')
     return false
   }
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
   if(!data.success){
    toast.error(data?.message)
    SpeechMessage(data?.message)
    return false
   }
   toast.success(data?.message)
   SpeechMessage(data?.message)
   navigate('/myOrderProducts')
   coutCartFetchApi()
   cartProductViewFetch()
   
  }catch(error){
    toast.error(error?.message)
    SpeechMessage(error?.message)
  }
}
 
  return (
   <>
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
        <div className="text-center ">
          <NoContent message='empaty carts' />
          <button onClick={()=>{navigate('/')}} className="px-3 py-1 border border-green-500 rounded hover:bg-green-500 hover:text-white">Shop now</button>
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
      <div onClick={checkOutHandler} className="border border-pink-500 my-5">
      <p className="px-7 py-2 text-black hover:bg-pink-500 hover:text-white rounded cursor-pointer select-none">Order now</p>
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