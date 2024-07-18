 import React, { useState,useEffect} from 'react'; 
 import DomainUrl from '../Configuration/Index'
 import CartIteam from "../components/cart.iteam"
 import { DNA } from 'react-loader-spinner'
 import{ toast } from 'react-hot-toast';
const Cart = () => {
 const [ cartProductView,setCartProductView] = useState([])
 const [islodding,setIslodding] = useState(false)
 
 
 let TotalPrice = 0
 let DiscountPrice = 0 
   const cartProductViewFetch = async ()=>{
     setIslodding(true)
         // allproduct api
      await fetch(`${DomainUrl.url}cartProductView`,{
        method:'GET',
        credentials:'include'
      })
     .catch((error)=> console.log(error))
     .then((res)=> res.json())
     .then((data)=> {
      setCartProductView(data.allProducts)
      setIslodding(false)
     }) 
}
   useEffect(()=>{
     cartProductViewFetch()
   },[])

const checkOutHandler = ()=>{
  toast.success('product order successfull')
}
  return (
   <>
 
    {
      islodding ? (
        
          <div className="flex justify-center " >
           <DNA
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  />
          </div>
        ):(
      
      cartProductView?.length == 0   ? (
        <div className="text-center text-2xl mt-20 mb-20">Cart is empty</div>
        ):(
         <>    
    <div className="flex flex-col gap-1 "> 
     <h1 className="text-2xl text-center mt-10 uppercase">Cart Datails</h1>
      
    { cartProductView?.map((product,index)=>{
          TotalPrice += Number(product.productId?.newPrice)
        return <CartIteam cartProductViewFetch={cartProductViewFetch} product={product} key={index}/> 
      
      })
     
   }
      
    
    </div>
    
      
    <div className="cart-checkout">
      <h1>Total Amount</h1>
      <div className="w-full p-2 bg-slate-200 flex flex-col gap-2">
       <p><b>Total Price : {TotalPrice}</b></p>
       <p><b>Discount : {DiscountPrice}</b></p>
       <p><b>Grand total : {TotalPrice - DiscountPrice}</b></p>
       <button onClick={()=>checkOutHandler()} >checkOut</button>
      </div>
    </div>
   </>
    ))
    }
     
   </>
  );
};

export default Cart