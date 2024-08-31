 import React, { useState,useEffect} from 'react'; 
 import DomainUrl from '../Configuration/Index'
 import CartIteam from "../components/cart.iteam"
 import { DNA } from 'react-loader-spinner'
 import{ toast } from 'react-hot-toast'; 
 import DisplayCurrency from '../displayCurrancy'
const Cart = () => { 
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

  const totalquatity = cartProductView.reduce((prev,curent)=>{
            return prev + curent.quantity
          },0)
 const TotalPrice = cartProductView.reduce((prev,curent)=>{
     return prev + (curent.quantity * curent.productId.newPrice)
          },0)
          
  // make a payment function
    
const checkOutHandler = (e)=>{
 toast.success('order success')
 console.log(cartProductView)
}
 
  return (
   <>
  {
      islodding ? ( 
             
             [1,2,3,2,3,4,3].map(()=>{
            return (
               <div className="animate-pulse select-none  mt-2 bg-slate-200 p-1 shadow shadow-gray-600 h-28 w-screen  flex items-center">
                <p className="w-20 h-20 rounded-full bg-slate-400"></p>
                <div className="flex flex-col gap-4 w-52 p-2 ml-3">
                 <p className="bg-slate-400 h-8 w-full"></p>
                 <p className="bg-slate-400 h-8 w-full"></p>
                </div>
               </div>
              )
          })  
 
        ):(
      
      cartProductView?.length == 0   ? (
        <div className="text-center text-2xl mt-20 mb-20">Cart is empty</div>
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
     <p>Total Quanity</p> <p>{totalquatity}</p>
      </div>
       
       <div className="w-full px-4 py-2 flex justify-between gap-2">
     <p>Total Amount</p> <p>{DisplayCurrency(TotalPrice)}</p>
      </div>
      <div onClick={checkOutHandler} className="border border-pink-500 my-5">
       <p className="text-white px-7 py-2 text-black hover:bg-pink-500 hover:text-white rounded cursor-pointer select-none">Payment</p>
      </div>
    </div>
    
  </>
    ))
    }
   </>
  );
};

export default Cart