import {useState,useEffect,useContext,useRef} from 'react'
import{ toast } from 'react-hot-toast';
 import DomainUrl from '../Configuration/Index'
 import { FaRegWindowClose } from "react-icons/fa";
 import DisplayCurrency from '../displayCurrancy'
 import { FaRegCopy } from "react-icons/fa";
 import { MdCancel } from "react-icons/md";
import {NavLink,useNavigate} from "react-router-dom";
import NoContent from './noContent'
import SpeechMessage from './speechMessage'
import {ContestContext } from '../api/ContestContext'
  import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
  
const OrderItems = ({allOrders,islodding,userOrderProductApi,text})=>{
     const printRef = useRef(); 
     const {setIsPopUp} = useContext(ContestContext)
  const [viewalluserdetail,setviewalluserdetail] = useState(false)
  const navigate = useNavigate()
  const [seealluserDetail,setseealluserdetail] = useState() 
  const orderDone = async(id)=>{ 
   SpeechMessage('are you sure this order was completed')
    const grant = confirm('are you sure this order was completed') 
    if(!grant){
      SpeechMessage('you are canceled this process')
      return false
    }
  try{ 
const response = await fetch(`${DomainUrl.url}updateDeleverType`,{
      method: 'post', 
     headers: { 
          "Content-type": "application/json",
        },
      body: JSON.stringify({id:id,type:'done'}),
    })
    const data = await response.json()
    if(!data.success){
      console.log(data.message)
      return false
    }
    toast.success(data?.message)
    userOrderProductApi() 
    SpeechMessage(data?.message)
  }catch(error){
    console.log(error.message)
    SpeechMessage(error?.message)
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
  return(
     <div className="m-1 flex flex-col gap-2">
     <p className='px-3 '><strong>Total: </strong> <span className="ml-3">{allOrders?.length}</span></p>
      {
       
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
           allOrders?.length == 0 ?(
          <div className="text-center ">
          <NoContent message={text} />
          <button onClick={()=>{navigate('/cart')}} className="px-3 py-1 border border-green-500 rounded hover:bg-green-500 hover:text-white">Order Now</button>
          </div>
       
         ):(
          allOrders?.map((item,index)=>{
          let ordertypeFunction 
          
          if(item?.orderType == 'cancel'){
            ordertypeFunction = <p className= "flex items-center select-none text-red-600 text-[14px]"> <span className="font-bold">Delever : </span><span className="ml-2"><MdCancel /></span></p>
          }else if(item?.orderType == 'done'){
            ordertypeFunction = <p className= "flex items-center select-none text-green-600 text-[14px]"> <span className="font-bold">Delever : </span><span className="ml-2"><IoCheckmarkDoneCircleSharp /></span></p>
          }else{
             ordertypeFunction = <p className= "flex items-center select-none text-blue-600 text-[14px]"> <span className="font-bold">Delever : </span><span className="ml-2">underOrder</span></p>
          }
      const totalquatity = item?.productDetails?.reduce((prev,curent)=>{
            return prev + curent.quantity
          },0)
      
      const TotalPrice = item?.productDetails?.reduce((prev,curent)=>{
     return prev + (curent?.quantity * curent?.productId?.newPrice)
          },0)
       const date = new Date(item?.createdAt).toLocaleDateString()
       const time = new Date(item?.createdAt).toLocaleTimeString()
       
  
       
       const viewuserdetails = (detail)=>{ 
         setseealluserdetail(detail)  
       }
    
         return(
       <div key={index} className="  border border-green-500 p-2">
       
           <div className="flex gap-3">
            <p className="select-none text-slate-600 text-[12px]"><span className="text-slate-800 font-bold">Date : </span>{date}</p>
           
           <p className="select-none text-slate-600 text-[12px]"><span className="text-slate-800 font-bold">Time : </span>{time}</p>
           </div>
           
            <div className="flex items-center my-2 gap-2 text-sm"><strong>Order Id : </strong><span>{item?._id}</span> <span onClick={()=>orderidcoppyhandler(item?._id)} className={`flex justify-center ${coppyproduct == item?._id ? 'ring-2 ring-green-300 bg-green-500 text-white': ''} hover:ring-2 cursor-pointer items-center p-1 border`} >{coppyproduct == item?._id ? 'Copied !' : <FaRegCopy />}</span></div>
        
          <div className="flex flex-col gap-1">
             {
               item?.productDetails?.map((product,index)=>{
                
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
         
             <div className='border py-1 px-2'>
             <h1 className='text-center text-green-600 font-bold text-md uppercase'>user information</h1>
              <div className="flex items-center gap-2">
              
               <div className="w-12 h-12 rounded-full bg-slate-500">
               <img className="w-full h-full rounded-full object-cover" src={item?.userDetails?.profilePic?.img}/>
              </div>
              <div  className="text-slate-700 text-sm">
               <p>Name : {item.userDetails.name}</p>
               <p>Email : {item.userDetails.email}</p>
              </div>
               
              </div>
               <button 
                disabled={item.orderType == 'cancel' || item.orderType == 'done' ? true : false}
               onClick={()=>{
                  viewuserdetails(item.userDetails)
                  setIsPopUp(true)
                  setviewalluserdetail(true) 
               }} className={`${item.orderType == 'cancel' || item.orderType == 'done' ? 'border border-slate-200 bg-slate-100  text-slate-400':'border border-green-700 hover:bg-green-500 hover:text-white'} font-bold uppercase rounded px-3 py-1 mt-3`}>seemore</button> 
            {
              viewalluserdetail &&(
              
              <div style={{transform:'translate(-50%,-50%)'}}  className="fixed px-2 py-3  overflow-scroll w-[325px] max-h-[70vh] border border-gray-400 shadow  shadow-gray-400 left-[50%] top-[55%]  bg-slate-200 flex justify-center items-center flex-col">
                <div onClick={()=>{
                setIsPopUp(false)
                setviewalluserdetail(false)}} className="absolute top-0 right-0  w-8 h-8 border cursor-pointer text-white bg-red-500 border-red-700 rounded text-xl overflow-scroll flex items-center justify-center"><FaRegWindowClose /></div>
            <div className="mx-2 overflow-scroll   my-6  p-2">
                <h2 className="text-center uppercase font-bold underline mb-2" >User Details</h2>
                <p><strong>Name :</strong> {seealluserDetail?.name}</p>
                <p><strong>Email :</strong> {seealluserDetail?.email}</p>
                <p><strong>Phone :</strong> {seealluserDetail?.phone}</p>
                 
                <h2 className="text-center uppercase font-bold underline my-2" >User Address</h2> 
                <p><strong>CurrentAddress :</strong> {seealluserDetail?.currentAddress}</p>
                <p><strong>DeleverAddress :</strong> {seealluserDetail?.deleverAddress}</p>
                 <p><strong>Block :</strong> {seealluserDetail?.block}</p>
               <p><strong>City :</strong> {seealluserDetail?.city}</p>
                <p><strong>State :</strong> {seealluserDetail?.state}</p>
                <p><strong>Country :</strong> {seealluserDetail?.country}</p>
                    
                 </div>
                  
              </div>
              )
            }
           
             </div>
             
               <div className="flex gap-2"> 
               <div>
               <p className="select-none text-pink-500 text-[14px]"><span className="font-bold">Total Quantity : </span>{totalquatity}</p>
              <p className="select-none text-green-600 text-[14px]"><span className="font-bold">Total Price : </span> {DisplayCurrency(TotalPrice)}</p></div>
               <div>
                  
                   {
                     ordertypeFunction
                   }
                  
                  <p className="select-none text-yellow-500 text-[14px]"><span className="font-bold ">Payment Type : </span>COD</p>
               </div>
             </div>
                  
             <div className="flex flex-row-reverse mt-3">
              <button disabled={item.orderType == 'cancel' || item.orderType == 'done' ? true : false}   onClick={ ()=> orderDone(item._id)} className={`${item.orderType == 'cancel' || item.orderType == 'done' ? 'border border-slate-200 bg-slate-100  text-slate-400':'border border-green-700 hover:bg-green-500 hover:text-white'} font-bold uppercase rounded px-3 py-1`}>Order Done</button>
             </div>
             
          </div>
      </div>
         )
       })
         )
        )
       
      } 
     </div>
    )
}
export default OrderItems