import {useState,useEffect} from 'react'
  import { toast} from 'react-toastify'; 
  import DomainUrl from '../Configuration/Index'
   import DisplayCurrency from '../displayCurrancy'
   import {useNavigate}  from 'react-router-dom'
const MyOrder = ()=>{
  const navigate = useNavigate()
const [userOrderProduct,setUserOrderProduct] = useState([])
const [lodding,setLodding] = useState(false)
const userOrderProductApi = async()=>{
  try{
    setLodding(true)
    const response = await fetch(`${DomainUrl.url}showOrderProducts`,{
        method:"GET",
        credentials:"include"
      })
    const data = await response.json()
    setLodding(false)
    setUserOrderProduct(data.data) 
  }catch(error){
    toast.error(error.message)
  }
} 
 
useEffect(()=>{
  userOrderProductApi()
},[]) 
 
  return(
     <div className="m-1 flex flex-col gap-2">
      {
        lodding ?(
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
         userOrderProduct.length == 0 ?(
          <div className="text-center mt-20 mb-20">
          <p className="text-2xl mb-10">No Order Products</p>
          <button onClick={()=>{navigate('/cart')}} className="px-3 py-1 border border-green-500 rounded hover:bg-green-500 hover:text-white">Order Now</button>
          </div>
       
         ):(
          userOrderProduct?.map((item,index)=>{
      const totalquatity = item?.productDetails?.reduce((prev,curent)=>{
            return prev + curent.quantity
          },0)
      
      const TotalPrice = item?.productDetails?.reduce((prev,curent)=>{
     return prev + (curent?.quantity * curent?.productId?.newPrice)
          },0)
       const date = new Date(item?.createdAt).toLocaleDateString()
       const time = new Date(item?.createdAt).toLocaleTimeString()
       console.log(date)
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
                 <p className="select-none text-green-500 text-[14px]"><span className="font-bold">Delever : </span> Done</p>
                  
                  <p className="select-none text-yellow-500 text-[14px]"><span className="font-bold">Payment Type : </span>COD</p>
               </div>
             </div>
             <div className="flex flex-row-reverse mt-3">
              <button className="border border-red-700 hover:bg-red-500 hover:text-white font-bold uppercase rounded px-3 py-1">Cancel Order</button>
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
export default MyOrder