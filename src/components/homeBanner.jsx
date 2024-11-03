import logo3 from '../asetes/logo7.jpg'
import logo4 from '../asetes/logo4.png'
import {ContestContext} from '../api/ContestContext'
import {useContext,useState,useEffect} from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Drawer from './drawer'
import './header.css'
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

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
  const touchstart = (e)=>{  
   touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
  }
   const touchend = (e)=>{ 
    touchEndX = event.changedTouches[0].screenX;
      touchEndY = event.changedTouches[0].screenY;
      handleSwipeGesture()
  }
  function handleSwipeGesture() {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal Swipe
        if (deltaX > 50) {
 if(imageindex > 0){
     setimageindex(imageindex - 1)
   }
        } else if (deltaX < -50) {
           if(imageindex < allbanners.length -1){
     setimageindex(imageindex+1)
   }
        }
      }
    }
  
 
  return(
   <>
   
   <div className="select-none md:my-5 ring-pink-300 ring-4 relative flex justify-center items-center h-[170px] m-auto md:h-[480px] md:min-w-[950px]  max-w-[340px] homebanner ">
   
  {
    imageindex != 0 &&(
     <div onClick={leftarrowhandler} className="cursor-pointer absolute left-1 flex justify-center items-center bg-pink-500 text-3xl z-50 top-[40%] border border-slate-300 text-slate-300 w-8 h-8"><IoIosArrowBack /></div>
    )
  }
  {
   imageindex != (allbanners?.length -1) &&(
     <div onClick={rigtharrowhandler} className="cursor-pointer absolute right-1 flex justify-center items-center bg-pink-500 text-3xl z-50 top-[40%] border border-slate-300 text-slate-300 w-8 h-8"><IoIosArrowForward /></div>
   )
  }
 
     <img  onTouchStart={touchstart} onTouchEnd={touchend} src={allbanners[imageindex].bannerimage.img} className="select-none h-full w-full "/>
   </div>
   <div className="w-full gap-2 flex justify-center pt-3">
    {
      allbanners?.map((item,index)=>{
        return (
         <span className={`w-3 ${imageindex == index ? 'bg-pink-400':'' } rounded-full h-3 border border-pink-400 transition ease-in-out delay-${index * 150}`} key={index}></span>
        )
      })
    }
   </div>
   </>
    )
}
export default HomeBanner