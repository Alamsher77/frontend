 import {useState,useContext,useEffect} from "react"
import{ toast } from 'react-hot-toast'; 
  import { MdCancel } from "react-icons/md";
  import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
  import DomainUrl from '../Configuration/Index'
 import DisplayCurrency from '../displayCurrancy'
 import { FaRegCopy,FaHistory } from "react-icons/fa";
 import {useNavigate}  from 'react-router-dom'
 import {ContestContext} from '../api/ContestContext'
 import NoContent from '../components/noContent'
 import SpeechMessage from '../components/speechMessage' 
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
    console.log(error.message)
  }
} 
 
useEffect(()=>{
  userOrderProductApi() 
},[]) 

// cancel order functionaliti
const cancelOrder = async(item)=>{
   
 const grant = confirm('Are You sure You Want To Cancel This Order')
if(!grant){
  toast.error('you are Cancel this process')
  return false
}
  try{ 
const response = await fetch(`${DomainUrl.url}updateDeleverType`,{
      method: 'post', 
     headers: { 
          "Content-type": "application/json",
        },
      body: JSON.stringify({id:item?._id,type:'cancel',productQuantity:item?.productDetails}),
    })
    const data = await response.json()
    if(!data.success){
     toast.error(data?.message)
      return false
    }
    toast.success(data.message)
    userOrderProductApi()  
  }catch(error){
    toast.error(error?.message)
  }
}

const [coppyproduct,setcoppyproduct] = useState(null)

const orderidcoppyhandler = async (id)=>{
 try {
    await navigator.clipboard.writeText(id);
   setcoppyproduct(id)
             setTimeout(function() {
               setcoppyproduct(null)
             }, 2000);
 } catch (e) {
   toast.error(e.message)
 }
}

const orderProcessList = userOrderProduct.filter((item)=>  item?.orderType === 'default')
const orderCancelAndDoneList = userOrderProduct.filter((item)=>  item?.orderType !== 'default')

const [opanviewhistory,setviewhistory] = useState(false)
  return(
     <div className="m-1 flex flex-col gap-2">
      {
      lodding ? (
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
        !userDetails ? (
        <div className="text-center mt-20 mb-20 text-red-400">
          <p className="text-2xl mb-10">You are not login</p>
          <button onClick={()=>{navigate('/login')}} className="px-3 py-1 border border-red-500 rounded hover:bg-red-500 hover:text-white">Login</button>
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
         <>
         <div className=" p-2 flex justify-end">
          <button onClick={()=>setviewhistory(!opanviewhistory)} className=" font-bold uppercase px-3 cursor-pointer hover:bg-green-500  hover:text-white text-sm rounded  border border-green-500 text-gray-500">{opanviewhistory ? "close history" : "view history"}</button>
         </div>
          {
        
        opanviewhistory ? 
        orderCancelAndDoneList?.length == 0 ?( 
          <div className="text-center ">
          <NoContent message="No Order Products" />
          <button onClick={()=>{
          navigate('/cart')
            
          }} className="px-3 py-1 border border-green-500 rounded hover:bg-green-500 hover:text-white">Order Now</button>
          </div>
       
         ):(
       
        orderCancelAndDoneList?.map((item,index)=>{
          let ordertypeFunction 
          
          if(item?.orderType == 'cancel'){
            ordertypeFunction = <p className= "flex items-center select-none text-red-600 text-[14px]"> <span className="font-bold">Status : Canceled</span></p>
          }else if(item?.orderType == 'done'){
            ordertypeFunction = <p className= "flex items-center select-none text-green-600 text-[14px]"> <span className="font-bold">Status : Success</span></p>
          }else{
            ordertypeFunction = <p className= "flex items-center select-none text-blue-600 text-[14px]"> <span className="font-bold">Status : </span><span className="ml-3">Proccess</span></p>
          }
      const totalquatity = item?.productDetails?.reduce((prev,curent)=>{
            return prev + curent.quantity
          },0)
      
      const TotalPrice = item?.productDetails?.reduce((prev,curent)=>{
    return prev + (curent?.quantity * curent?.productId?.newPrice)
          },0)
      const date = new Date(item?.createdAt).toLocaleDateString()
      const time = new Date(item?.createdAt).toLocaleTimeString()
      console.log(item?.paymentMethod)
      
        return(
      <div key={index} className="select-none border border-green-500 p-2">
          <div className="flex gap-3">
            <p className="select-none text-slate-600 text-[12px]"><span className="text-slate-800 font-bold">Date : </span>{date}</p>
           
          <p className="select-none text-slate-600 text-[12px]"><span className="text-slate-800 font-bold">Time : </span>{time}</p>
          </div>
           
          <div className="flex items-center my-2 gap-2 text-sm"><strong>Order Id : </strong><span>{item?._id}</span> <span onClick={()=>orderidcoppyhandler(item?._id)} className={`flex justify-center ${coppyproduct == item?._id ? 'ring-2 ring-green-300 bg-green-500 text-white': ''} hover:ring-2 cursor-pointer items-center p-1 border`} >{coppyproduct == item?._id ? 'Copied !' : <FaRegCopy />}</span></div>
        
          <div className="flex flex-col gap-1">
            {
              item?.productDetails.map((product,index)=>{
              
                return(
                    <div key={index} className="flex items-center justify-between p-1 bg-slate-100"> 
                    
                    <div className="border border-green-500 bg-white w-24 h-20"> 
                      <img className="w-full h-full object-contain" src={product?.productId?.image[0]?.img}/>
                    </div>
                      
                      <div className="p-2 w-56 bg-white">
                      <p className="text-nowrap text-ellipsis overflow-hidden  text-[10px] text-slate-800"><span className="font-bold">Name : </span>{product?.productId?.name}</p>
                      <p className="text-[10px] text-slate-800"><span className="font-bold">Price : </span>{product?.productId?.newPrice}</p>
                        <p className="text-[10px] text-slate-800"><span className="font-bold">Quantity : </span>{product?.quantity}</p>
                        {
                          product?.size &&(
                          <p className="text-[10px] text-slate-800"><span className="font-bold">Size : </span>{product?.size}</p>
                          )
                        }
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
                  
                  <p className="select-none text-yellow-500 text-[14px]"><span className="font-bold">Payment Type : </span>{item?.paymentMethod}</p>
              </div>
            </div>
            <div className="flex flex-row-reverse mt-3">
              <button disabled={item.orderType == 'cancel' || item.orderType == 'done' ? true : false}   onClick={ ()=> cancelOrder(item)} className={`${item.orderType == 'cancel' || item.orderType == 'done' ? 'border border-slate-200 bg-slate-100  text-slate-400':'border border-red-700 hover:bg-red-500 hover:text-white'} font-bold uppercase rounded px-3 py-1`}>Cancel Order</button>
            </div>
          </div>
      </div>
        )
      })
      
         )
         :
           orderProcessList?.length == 0 ?( 
          <div className="text-center ">
          <NoContent message="No Order Products" />
          <button onClick={()=>{
          navigate('/cart')
            
          }} className="px-3 py-1 border border-green-500 rounded hover:bg-green-500 hover:text-white">Order Now</button>
          </div>
       
         ):(
       
        orderProcessList?.map((item,index)=>{
          let ordertypeFunction 
          
          if(item?.orderType == 'cancel'){
            ordertypeFunction = <p className= "flex items-center select-none text-red-600 text-[14px]"> <span className="font-bold">Status : Canceled</span></p>
          }else if(item?.orderType == 'done'){
            ordertypeFunction = <p className= "flex items-center select-none text-green-600 text-[14px]"> <span className="font-bold">Status : Success</span></p>
          }else{
            ordertypeFunction = <p className= "flex items-center select-none text-blue-600 text-[14px]"> <span className="font-bold">Status : </span><span className="ml-3">Proccess</span></p>
          }
      const totalquatity = item?.productDetails?.reduce((prev,curent)=>{
            return prev + curent.quantity
          },0)
      
      const TotalPrice = item?.productDetails?.reduce((prev,curent)=>{
    return prev + (curent?.quantity * curent?.productId?.newPrice)
          },0)
      const date = new Date(item?.createdAt).toLocaleDateString()
      const time = new Date(item?.createdAt).toLocaleTimeString()
      console.log(item?.paymentMethod)
      
        return(
      <div key={index} className="select-none border border-green-500 p-2">
          <div className="flex gap-3">
            <p className="select-none text-slate-600 text-[12px]"><span className="text-slate-800 font-bold">Date : </span>{date}</p>
           
          <p className="select-none text-slate-600 text-[12px]"><span className="text-slate-800 font-bold">Time : </span>{time}</p>
          </div>
           
          <div className="flex items-center my-2 gap-2 text-sm"><strong>Order Id : </strong><span>{item?._id}</span> <span onClick={()=>orderidcoppyhandler(item?._id)} className={`flex justify-center ${coppyproduct == item?._id ? 'ring-2 ring-green-300 bg-green-500 text-white': ''} hover:ring-2 cursor-pointer items-center p-1 border`} >{coppyproduct == item?._id ? 'Copied !' : <FaRegCopy />}</span></div>
        
          <div className="flex flex-col gap-1">
            {
              item?.productDetails.map((product,index)=>{
              
                return(
                    <div key={index} className="flex items-center justify-between p-1 bg-slate-100"> 
                    
                    <div className="border border-green-500 bg-white w-24 h-20"> 
                      <img className="w-full h-full object-contain" src={product?.productId?.image[0]?.img}/>
                    </div>
                      
                      <div className="p-2 w-56 bg-white">
                      <p className="text-nowrap text-ellipsis overflow-hidden  text-[10px] text-slate-800"><span className="font-bold">Name : </span>{product?.productId?.name}</p>
                      <p className="text-[10px] text-slate-800"><span className="font-bold">Price : </span>{product?.productId?.newPrice}</p>
                        <p className="text-[10px] text-slate-800"><span className="font-bold">Quantity : </span>{product?.quantity}</p>
                        {
                          product?.size &&(
                          <p className="text-[10px] text-slate-800"><span className="font-bold">Size : </span>{product?.size}</p>
                          )
                        }
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
                  
                  <p className="select-none text-yellow-500 text-[14px]"><span className="font-bold">Payment Type : </span>{item?.paymentMethod}</p>
              </div>
            </div>
            <div className="flex flex-row-reverse mt-3">
              <button disabled={item.orderType == 'cancel' || item.orderType == 'done' ? true : false}   onClick={ ()=> cancelOrder(item)} className={`${item.orderType == 'cancel' || item.orderType == 'done' ? 'border border-slate-200 bg-slate-100  text-slate-400':'border border-red-700 hover:bg-red-500 hover:text-white'} font-bold uppercase rounded px-3 py-1`}>Cancel Order</button>
            </div>
          </div>
      </div>
        )
      })
      
         )
         
          }
         </> 
       
         )))} 
     </div>
    )
}
export default MyOrder