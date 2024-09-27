import {useParams} from 'react-router-dom'
import {useState,useEffect, useContext} from 'react'
import {ContestContext} from '../api/ContestContext'
import ProductDisplay from '../components/productdisplay'
import Bredcrumb from '../components/bredcrumb' 
import { IoStarSharp } from "react-icons/io5";
import DomainUrl from '../Configuration/Index'
import{ toast } from 'react-hot-toast';
import NoContent from '../components/noContent'
import ProductIteam from '../components/productIteam/productIteam' 
const Product = ()=>{
  // products display functionality
  
  const {productId} = useParams()
  const {allProduct}= useContext(ContestContext)
    const result = allProduct.find((e)=>{
    return e?._id === productId
    })
    
 if(!result){
   return false
 }
 
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

 const Star = ({ filled,click}) => {
  return (
    <span onClick={click} style={{ fontSize: "25px", marginRight: "1px" }}>
      {filled ? "★" : "☆"}
    </span>
  );
};

// condition by messages

if(rating <= 1){
  message = 'Bade'
}else if(rating <= 2){
  message = 'Medium'
}else if(rating <= 4){
  message = 'Good'
}else{
  message = 'Verry Good '
}
 
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
      fetchallcomments()
      setOpenRateProduct(false)
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
 
useEffect(()=>{
  fetchallcomments()
},[])
  return(
     <>
      <Bredcrumb name={result?.name} categry={result?.categry}/>
      
      <ProductDisplay id={result?._id} name={result?.name} image={result?.image} newPrice={result?.newPrice} oldPrice={result?.oldPrice} productInfo={result?.productInfo} />
  
      <div className="mt-3 border py-6 select-none">
      
      {/*ratings and reviews buttons*/}
      
        <div className="flex justify-between px-4 pb-3">
         <h1 className="text-slate-700">Ratings & Reviews</h1>
         <button onClick={()=>setOpenRateProduct(true)} className="font-[800] text-blue-400 rounded px-8 py-1 border">Rate Product</button>
        </div>
        {
          openRateProduct && (
           <div  className="relative w-[300px] my-3 px-2 py-4 m-auto bg-slate-100 ">
            <div onClick={()=>setOpenRateProduct(false)} className="absolute top-1 right-1 w-6 h-6 rounded   bg-red-400 hover:bg-white transition ease-in-out delay-100 cursor-pointer text-white  hover:text-red-500 flex justify-center items-center "><span className="text-4xl font-bold rotate-45">+</span></div>
            <h1 className="font-[800] text-center text-green-600">Rate The Product</h1>
             <div className="text-green-700 text-center">
               {Array.from({ length: totalStars }, (_,index) => (
        <Star 
          key={index}
          filled={index < rattingData?.userRatting} 
          click={()=> handalindex(index + 1)}
        />
      ))}
              </div>
                <div className="text-center">
                 <textarea value={rattingData?.comment} onChange={(e)=>setRattingData({...rattingData,comment:e.target.value})} className="bg-transparent border text-green-700 border-green-600 rounded p-2 h-40 w-full outline-none">
                 
                 </textarea>
                  <button onClick={submithandler} className = "border-green-600 border px-8 py-2 rounded font-bold text-green-500 delay-150 ease-in-out transition  hover:text-white hover:bg-green-600 mt-3 text-xl uppercase">submit</button>
                </div> 
           </div>
          )
        }
        {/*total ratings and review container*/}
        
        <div className="flex justify-between px-2">
         <div className="w-40 flex flex-col items-center">
          <h1>{message}</h1>
          <div className="text-green-700">
          {Array.from({ length: totalStars }, (_, index) => (
        <Star 
          key={index}
          filled={index < rating} 
        />
      ))}
      </div>
          <p className="px-1 text-slate-700 text-[17px] text-center">345 ratings and 234 reviews</p>
         </div>
         <div className="w-44 flex flex-col gap-1">
          
           <div className="flex text-[14px] justify-center gap-1 h-6  items-center">
           <span>5</span>  <IoStarSharp />  <div className="h-2 rounded-full w-24  bg-slate-200"><div className="w-[100%] rounded-full h-full bg-green-600"></div> </div> <span>3634</span>
          </div>
          
           <div className="flex text-[14px] justify-center gap-1 h-6  items-center">
           <span>4</span>  <IoStarSharp />  <div className="h-2 rounded-full w-24  bg-slate-200"><div className="w-[80%] rounded-full h-full bg-green-600"></div> </div> <span>342</span>
          </div>
          
           <div className="flex text-[14px] justify-center gap-1 h-6  items-center">
           <span>3</span>  <IoStarSharp />  <div className="h-2 rounded-full w-24  bg-slate-200"><div className="w-[60%] rounded-full h-full bg-green-600"></div> </div> <span>865</span>
          </div>
          
           <div className="flex text-[14px] justify-center gap-1 h-6  items-center">
           <span>2</span>  <IoStarSharp />  <div className="h-2 rounded-full w-24  bg-slate-200"><div className="w-[40%] rounded-full h-full bg-green-600"></div> </div> <span>86</span>
          </div>
          
           <div className="flex text-[14px] justify-center gap-1 h-6  items-center">
           <span>1</span>  <IoStarSharp />  <div className="h-2 rounded-full w-24 bg-slate-200"><div className="w-[20%] rounded-full h-full bg-green-600"></div> </div> <span>534</span>
          </div>
          
         </div>
        </div>
        
        {/*list of product comments*/}
      <div className="mt-5 flex flex-col items-center">
      
         
       {
         producereviewlodding ? 
         <div className="flex-col flex gap-3">
         {
            [4,34,4,4,43].map(()=>{
        return(
          <div className="w-[300px] animate-pulse p-2 bg-slate-100">
          <div className="w-full h-6 bg-slate-300 mb-2"></div>
          <div className="w-[230px] h-8 bg-slate-300"></div>
         </div>
        )
      })
         }
        </div>
         :
         
         allproductreview == 0 ?
          
          <NoContent message="no comments" /> 
         
         :
          
          <div className="gap-4 m-2 flex flex-col">
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
                 <div key={index} className="relative bg-slate-100 p-2  shadow rounded">
                 
                 <div className="absolute text-blue-500 right-4 top-0">
                  <p>{time}</p>
                 </div>
                 
                  <div className="px-3 py-2 flex gap-2">
                   <div className="w-12 h-12 bg-slate-200 rounded-full"><img className="w-full h-full rounded-full object-cover" src={item?.users?.profilePic?.img} />
                   </div>
                   <div>
                    <h1 className="font-bold">{item?.users?.name}</h1>
                    <p className="text-slate-500">{item?.users?.email}</p>
                   </div>
                  </div>
                   <div className="text-green-700 text-center">
                     {Array.from({ length: totalStars }, (_, index) => (
                    <Star 
                     key={index}
                     filled={index < item?.rating} 
                      />
                      ))}
                     </div>
                     
                     <div className="text-[14px]">
                      <p>{item?.comment}</p>
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