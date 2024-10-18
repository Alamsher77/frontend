import {useParams} from 'react-router-dom'
import {useState,useEffect, useContext,} from 'react'
import {ContestContext} from '../api/ContestContext'
import ProductDisplay from '../components/productdisplay'
import Bredcrumb from '../components/bredcrumb' 
import { IoStarSharp } from "react-icons/io5";  
import DomainUrl from '../Configuration/Index'
import{ toast } from 'react-hot-toast';
import NoContent from '../components/noContent'
import { MdDelete } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import ProductIteam from '../components/productIteam/productIteam' 
const Product = ()=>{
  // products display functionality

  const {productId} = useParams() 
  const {allProduct,userDetails,lodding}= useContext(ContestContext)
    const result = allProduct.find((e)=>{
      
    return e?._id === productId
    })
  
 

// reviews and reattings functionality

 const [rating, setRating] = useState(4);
 const [openRateProduct,setOpenRateProduct] = useState(false)
 const [rattingData,setRattingData] = useState({
   productId,
   userRatting:0,
   comment:'',
 })
 const [allproductreview,setallproductreview] = useState([])
 const [producereviewlodding,setproductreviewlodding] = useState(false)
 let message 
 const totalStars = 5; 
 
// starts componentes

 const Star = ({ filled,click,size}) => {
  return (
    <span onClick={click} style={{ fontSize: size, marginRight: "1px" }}>
      {filled ? "★" : "☆"}
    </span>
  );
};

 
 
// eatins handler each stars
 const  handalindex = (value)=>{
   setRattingData({...rattingData,userRatting:value})
 }
  
// ratings adn review sumbit handler 
 const submithandler = async()=>{
   try{
      const response = await fetch(`${DomainUrl.url}productreview`,{
      method:'POST',
      credentials:"include",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(rattingData)
    })
      
      const data = await response.json()
      if(!data.success){
        toast.error(data?.message)
        return false
      }
      toast.success(data?.message)
      setOpenRateProduct(false)
      setRattingData({...rattingData,comment:""})
        fetchallcomments()
   }catch(error){
     toast.error(error?.message)
   }
 }
 
// show all comments each products 

const fetchallcomments = async()=>{
  try{
    setproductreviewlodding(true)
   const response = await fetch(`${DomainUrl.url}showProductreview`,{
     method:'POST',
     headers:{
       'Content-Type':'application/json'
     },
     body:JSON.stringify({productId})
   })
   const data = await response.json()
  setproductreviewlodding(false)
  setallproductreview(data)
  }catch(error){
    toast.error(error.message)
  }
}

const commentsDelete = async(id)=>{ 
 try{
    const response = await fetch(`${DomainUrl.url}deleteReview`,{
    method:'POST',
    credentials:'include',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({id})
  })
  const data = await response.json()
  if(!data?.success){
    toast.error(data?.message)
    return false
  }
  toast.success(data?.message)
  fetchallcomments()
 }catch(error){
   toast.error(error.message)
 }
}
 
useEffect(()=>{
  fetchallcomments() 
},[]) 
 const totalratting = allproductreview?.reduce((prev,curent)=>{
   
            return prev + curent.rating
          },0)
const resultretting = totalratting / allproductreview?.length
      
 
 if(resultretting <= 1){
  message = 'Bade'
}else if(resultretting <= 2){
  message = 'Medium'
}else if(resultretting <= 4){
  message = 'Good'
}else{
  message = 'Verry Good '
}
const countByRating = (users, rating) => users.filter(user => user.rating === rating).length;
 
const allratingbyusers = {
  5:countByRating(allproductreview,5),
  4:countByRating(allproductreview,4),
  3:countByRating(allproductreview,3),
  2:countByRating(allproductreview,2),
  1:countByRating(allproductreview,1)
}

 const all = allratingbyusers.rating4 / allproductreview?.length * 100
 
 return(
  // lodding components
   
    !result  ? 
   <div className="w-full animate-pulse p-4">
   <div className="h-4 mt-3 bg-slate-200"></div>
   <div className="mt-3 h-40 bg-slate-200"></div>
   <div className=" h-8 mt-3 bg-slate-200 w-20"></div>
   <div className="h-4 mt-3 bg-slate-200"></div>
   <div className="h-4 w-40 mt-3 bg-slate-400"></div>
    <div className="h-4 mt-3 bg-slate-200"></div>
   <div className="h-4 w-40 mt-3 bg-slate-400"></div>
    <div className="h-4 mt-3 bg-slate-200"></div>
   <div className="h-24 mt-3 bg-slate-200"></div>
  <div className="w-[300px] mt-3 animate-pulse p-1 bg-slate-100">
          <div className="w-full h-3 bg-slate-300 mb-2"></div>
          <div className="w-[230px] h-3 bg-slate-300"></div>
        </div>
   </div>
   
   : 
  // product iteams components
     <>
      <Bredcrumb name={result?.name} categry={result?.categry}/>
      
      <ProductDisplay id={result?._id} name={result?.name} image={result?.image} newPrice={result?.newPrice} oldPrice={result?.oldPrice} productInfo={result?.productInfo} />
  
      <div className="mt-3 border py-6 select-none">
      
      {/*ratings and reviews buttons*/}
      
        <div className="flex justify-between px-4 pb-3">
         <h1 className="text-slate-700">Ratings & Reviews</h1>
         <button onClick={()=>setOpenRateProduct(true)} className="font-[800] text-blue-400 rounded px-8 py-1 border">Rate Product</button>
        </div>
         
        {/*total ratings and review container*/}
        
        <div className="flex justify-between px-2">
         <div className="w-40 flex flex-col items-center">
          <h1 className='text-sm font-bold uppercase' >{message}</h1>
          <div className="text-green-700">
          {Array.from({ length: totalStars }, (_, index) => (
        <Star 
          key={index}
          filled={index < resultretting} 
          size='18px'
        />
      ))}
      </div>
          <p className="px-1 text-slate-500 text-[14px] text-center">{totalratting} ratings and {allproductreview?.length} reviews</p>
         </div>
         <div className="w-44 flex flex-col gap-1">
          
        {
         
         Object.entries(allratingbyusers).map(([key,value])=>{ 
         const reviewlentght = value / allproductreview?.length * 100  
          return(
             <div key={key} className="flex text-[12px] justify-center gap-1 h-3  items-center">
           <span className="font-bold">{key}</span>  <IoStarSharp className="text-[10px]" />  <div className="h-1 rounded-full w-24  bg-slate-200"><div style={{width:allproductreview?.length == 0 ? 0 : reviewlentght}} className="rounded-full h-full bg-green-600" ></div> </div> <span className="font-bold"> {value}</span>
          </div>
          )
         })
        }
          
         </div>
        </div>
        
        {/*review and ratting components of product */}
        
        <div  className="relative  mt-3  m-auto  ">
             
            <h1 className="font-[800] text-center text-slate-400">Rate The Product</h1>
             <div className=" m-auto items-center text-green-700 max-w-[30%] flex justify-between text-center">
               {Array.from({ length: totalStars }, (_,index) => (
                <Star  
                  key={index}
                  filled={index < rattingData?.userRatting} 
                  click={()=>{
                     handalindex(index + 1)
                     setOpenRateProduct(true)
                  }}
                  size="20px"
                  />
                  ))}
              </div>
          
              {
          openRateProduct && (
             <div className="items-center flex relative mx-2">
                 <textarea
                 style={{overFlow:'scroll',scrollBarWidth:'none'}}
                 value={rattingData?.comment}
                 onChange={(e)=>setRattingData({...rattingData,comment:e.target.value})}
                 className=" bg-transparent border text-green-700 border-green-600 rounded p-2 w-full outline-none">
                 
                 </textarea>
                 <div className=" mx-1 rounded-full text-green-700 text-3xl" onClick={submithandler} ><IoIosSend /></div>
                  
                </div> 
          )
          }
           </div>
        
        {/*list of product comments*/}
      <div className="mt-5  max-w-full min-w-full flex overflow-hidden flex-col items-center">
       
       {
        producereviewlodding ? 
        <div className="flex-col flex gap-3">
        {
            [4,34,4,4,43].map((item,index)=>{
        return(
          <div key={index} className="w-[300px] animate-pulse p-1 bg-slate-100">
          <div className="w-full h-3 bg-slate-300 mb-2"></div>
          <div className="w-[230px] h-3 bg-slate-300"></div>
        </div>
        )
      })
         }
        </div>
         :
         
         allproductreview == 0 ?
          
          <NoContent message="no comments" /> 
         
         :
          
          <div className="gap-4  flex flex-col">
            {
              allproductreview.map((item,index)=>{
              
              const curentData = new Date().getTime()
               const date = new Date(item?.createdAt).getTime()
               const totaltime = curentData - date 
               
               let time
               
               if(totaltime /1000 < 60){
                 time = `${Math.floor(totaltime / 1000)} sec`
               }else if( totaltime /1000/60 < 60){
                 time = `${Math.floor(totaltime /1000 /60)} min`
               }else if(totaltime /1000/60/60 < 60){
                 time = `${Math.floor(totaltime /1000 /60/60)} h`
               }else if(totaltime /1000/60/60/24 < 24){
                 time = `${Math.floor(totaltime /1000 /60/60/24)} day`
               }else if(totaltime /1000/60/60/24/7 < 7){
                 time = `${Math.floor(totaltime /1000 /60/60/24/7)} w`
               }else if(totaltime /1000/60/60/24/30 < 30){
                 time = `${Math.floor(totaltime /1000 /60/60/24/30)} m`
               }else{
                time = new Date(item?.createdAt).toLocaleDateString()
               }
                
                return(
                 <div key={index} className="group min-w-[340px] relative p-1  overflow-hidden border border-2 shadow rounded">
                 {
                   userDetails?.email == item.users?.email &&(
                   <>
                    <div className="top-0 right-16 text-[10px] font-bold underline absolute text-green-700">You</div>
                    
                    <div onClick={()=>commentsDelete(item?._id)} className="absolute cursor-pointer group-hover:block hidden rounded-full   hover:bg-red-500 hover:text-white p-1 text-sm border border-red-500 top-5 right-0 text-red-500"><MdDelete /></div>
                   </>
                   )
                 }
                 <div className="absolute text-[10px] text-blue-500 right-1 top-0">
                  <p>{time}</p>
                 </div>
                 
                  <div className="flex gap-2">
                   <div className="w-8 h-8 bg-slate-200 rounded-full"><img className="w-full h-full rounded-full object-cover" src={item?.users?.profilePic?.img} />
                   </div>
                   <div>
                    <h1 className="font-bold text-[14px]">{item?.users?.name}</h1>
                    <p className="text-slate-500 text-[12px]">{item?.users?.email}</p>
                   </div>
                  </div>
                   <div className="text-green-700 ">
                     {Array.from({ length: totalStars }, (_, index) => (
                    <Star 
                     key={index}
                     filled={index < item?.rating} 
                      />
                      ))}
                     </div>
                     
                    <div className="p-1 m-auto w-[320px] text-[14px]">
                     <p className="w-full text-ellipsis break-words overflow-hidden">{item?.comment}</p>
                    </div>
                 </div>
                )
              })
            }
          </div>
          
       }
      
      </div>
      
      </div>
        </>    
   )
}
export default Product