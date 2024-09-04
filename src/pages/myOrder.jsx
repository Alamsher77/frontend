 import {useState,useContext,useEffect} from "react"
  import { toast} from 'react-toastify'; 
  import { MdCancel } from "react-icons/md";
  import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
  import DomainUrl from '../Configuration/Index'
   import DisplayCurrency from '../displayCurrancy'
   import {useNavigate}  from 'react-router-dom'
    import {ContestContext} from '../api/ContestContext'
const MyOrder = ()=>{
      const {userDetails,lodding} = useContext(ContestContext) 
  const navigate = useNavigate()
const [userOrderProduct,setUserOrderProduct] = useState([])
const [islodding,setIsLodding] = useState(false)
const userOrderProductApi = async()=>{
  try{
    setIsLodding(true)
    const response = await fetch(`${DomainUrl.url}showOrderProducts`,{
        method:"GET",
        credentials:"include"
      })
    const data = await response.json()
    setIsLodding(false)
    setUserOrderProduct(data.data) 
  }catch(error){
    toast.error(error.message)
  }
} 
 
useEffect(()=>{
  userOrderProductApi() 
},[]) 

// cancel order functionaliti
const cancelOrder = async(id)=>{
 
  try{ 
const response = await fetch(`${DomainUrl.url}updateDeleverType`,{
      method: 'post', 
     headers: { 
          "Content-type": "application/json",
        },
      body: JSON.stringify({id}),
    })
    const data = await response.json()
    if(!data.success){
      alert(data.message)
      return false
    }
    alert(data.message)
    userOrderProductApi() 
  }catch(error){
    alert(error.message)
  }
}
 console.log(userOrderProduct)
  return(
     <div className="m-1 flex flex-col gap-2">
      {
        !userDetails ? (
        <div className="text-center mt-20 mb-20 text-red-400">
          <p className="text-2xl mb-10">You are not login</p>
          <button onClick={()=>{navigate('/signup')}} className="px-3 py-1 border border-red-500 rounded hover:bg-red-500 hover:text-white">Login</button>
          </div>
       
        ):(
          islodding ?(
         [1,2,3,2,3,4,3].map((item,index)=>{
            return (
               <div  key={index} className="animate-pulse select-none  mt-2 bg-slate-200 p-1 shadow shadow-gray-600 w-screen  flex items-center">
                  <div className="flex flex-col gap-2 justify-center">
                   <div className="flex"> 
                    <p className="w-20 h-20  bg-slate-400"></p>
                    <div className="flex flex-col gap-4 w-52 p-2 ml-3">
                     <p className="bg-slate-400 h-4 w-full"></p>
                     <p className="bg-slate-400 h-4 w-full"></p>
                    </div>
                  </div>
                     <div className="flex"> 
                 <p className="w-20 h-20  bg-slate-400"></p>
                 <div className="flex flex-col gap-4 w-52 p-2 ml-3">
                 <p className="bg-slate-400 h-4 w-full"></p>
                 <p className="bg-slate-400 h-4 w-full"></p>
                </div>
                  </div>
                  </div>
               </div>
              )
          })  
        ):(
           userOrderProduct?.length == 0 ?(
          <div className="text-center mt-20 mb-20">
          <p className="text-2xl mb-10">No Order Products</p>
          <button onClick={()=>{navigate('/cart')}} className="px-3 py-1 border border-green-500 rounded hover:bg-green-500 hover:text-white">Order Now</button>
          </div>
       
         ):(
          userOrderProduct?.map((item,index)=>{
          let ordertypeFunction 
          
          if(item?.orderType == 'cancel'){
            ordertypeFunction = <p className= "flex items-center select-none text-red-600 text-[14px]"> <span className="font-bold">Delever : </span><MdCancel /></p>
          }else if(item?.orderType == 'done'){
            ordertypeFunction = <p className= "flex items-center select-none text-green-600 text-[14px]"> <span className="font-bold">Delever : </span><IoCheckmarkDoneCircleSharp /></p>
          }else{
             ordertypeFunction = <p className= "flex items-center select-none text-yellow-600 text-[14px]"> <span className="font-bold">Delever : </span>underOrder</p>
          }
      const totalquatity = item?.productDetails?.reduce((prev,curent)=>{
            return prev + curent.quantity
          },0)
      
      const TotalPrice = item?.productDetails?.reduce((prev,curent)=>{
     return prev + (curent?.quantity * curent?.productId?.newPrice)
          },0)
       const date = new Date(item?.createdAt).toLocaleDateString()
       const time = new Date(item?.createdAt).toLocaleTimeString()
       
         return(
       <div key={index} className="select-none border border-green-500 p-2">
           <div className="flex gap-3">
            <p className="select-none text-slate-600 text-[12px]"><span className="text-slate-800 font-bold">Date : </span>{date}</p>
           
           <p className="select-none text-slate-600 text-[12px]"><span className="text-slate-800 font-bold">Time : </span>{time}</p>
           </div>
        
          <div className="flex flex-col gap-1">
             {
               item?.productDetails.map((product,index)=>{
                
                 return(
                    <div key={index} className="flex items-center justify-between p-1 bg-slate-100"> 
                    
                     <div className="border border-green-500 bg-white w-24 h-20"> 
                      <img className="w-full h-full object-contain" src={product?.productId?.image[0]}/>
                     </div>
                      
                      <div className="p-2 w-56 bg-white">
                       <p className="text-nowrap text-ellipsis overflow-hidden  text-[10px] text-slate-800"><span className="font-bold">Name : </span>{product?.productId?.name}</p>
                       <p className="text-[10px] text-slate-800"><span className="font-bold">Price : </span>{product?.productId?.newPrice}</p>
                       <p className="text-[10px] text-slate-800"><span className="font-bold">Quantity : </span>{product?.quantity}</p>
                      </div>
                    </div>
                 )
               })
             }
             <div className="flex gap-2">
               <div>
               <p className="select-none text-pink-500 text-[14px]"><span className="font-bold">Total Quantity : </span>{totalquatity}</p>
              <p className="select-none text-green-600 text-[14px]"><span className="font-bold">Total Price : </span> {DisplayCurrency(TotalPrice)}</p></div>
               <div>
                  
                   {
                     ordertypeFunction
                   }
                  
                  <p className="select-none text-yellow-500 text-[14px]"><span className="font-bold">Payment Type : </span>COD</p>
               </div>
             </div>
             <div className="flex flex-row-reverse mt-3">
              <button disabled={item.orderType == 'cancel' || item.orderType == 'done' ? true : false}   onClick={ ()=> cancelOrder(item._id)} className={`${item.orderType == 'cancel' || item.orderType == 'done' ? 'border border-slate-200 bg-slate-100  text-slate-400':'border border-red-700 hover:bg-red-500 hover:text-white'} font-bold uppercase rounded px-3 py-1`}>Cancel Order</button>
             </div>
          </div>
      </div>
         )
       })
         )
        )
      
        )
      } 
     </div>
    )
}
export default MyOrder