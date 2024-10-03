import logo3 from '../asetes/logo7.jpg'
import logo4 from '../asetes/logo4.png'
import {ContestContext} from '../api/ContestContext'
import {useContext,useState,useEffect} from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
const HomeBanner = ()=>{
  const {allbanners,lodding} = useContext(ContestContext) 
 if(allbanners?.length == 0 || lodding ){
   
   return null
 }
 
 const [imageindex,setimageindex] = useState(0)
 
 const rigtharrowhandler =()=>{
  
   if(imageindex < allbanners.length -1){
     setimageindex(imageindex+1)
   }
   
 }
 const leftarrowhandler = ()=>{
   if(imageindex > 0){
     setimageindex(imageindex-1)
   }
 }
 
useEffect(()=>{
try{
    const intervel = setInterval(()=>{
    if(imageindex < allbanners.length -1){
      setimageindex(imageindex + 1) 
      return false
    }
    if(imageindex > 0){
      setimageindex(0)
      return false
    }
  },5000)
  return ()=> clearInterval(intervel)
}catch(error){
  console.log(error.message)
}
},[imageindex])
console.log(allbanners)
  
  return(
   <div className="select-none ring-pink-300 ring-4 relative min-h-[150px] max-h-[170px] flex justify-center items-center shadow-slate-400 bg-white shadow m-auto max-w-[340px]">
   
   <div onClick={leftarrowhandler} className="cursor-pointer absolute left-1 flex justify-center items-center text-3xl z-50 top-[40%] border border-slate-300 text-slate-300 w-8 h-8"><IoIosArrowBack /></div>
   <div onClick={rigtharrowhandler} className="cursor-pointer absolute right-1 flex justify-center items-center text-3xl z-50 top-[40%] border border-slate-300 text-slate-300 w-8 h-8"><IoIosArrowForward /></div>
 
<img src={allbanners[imageindex].bannerimage.img} className="relative h-[150px] object-contain"/>
   </div>
    )
}
export default HomeBanner