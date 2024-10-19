import logo3 from '../asetes/logo7.jpg'
import logo4 from '../asetes/logo4.png'
import {ContestContext} from '../api/ContestContext'
import {useContext,useState,useEffect} from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Drawer from './drawer'
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
const [touches,settouches] = useState({ 
  touchstartx:0,
  touchstarty:0,
  touchendx:0,
  touchendy:0,
  padx:0,
  pady:0,
})

   const padsx = touches.touchendx - touches.touchstartx
    const padsy = touches.touchendy - touches.touchstarty
 
  const touchstart = (e)=>{  
    settouches({...touches,padx:padsx,pady:padsy,touchstartx:e.changedTouches[0].screenX,touchstarty:e.changedTouches[0].screenY})
  }
   const touchend = (e)=>{ 
  settouches({...touches,padx:padsx,pady:padsy,touchendx:e.changedTouches[0].screenX,touchendy:e.changedTouches[0].screenY})
  }
 
  return(
   <>
   <div className="select-none md:my-5 ring-pink-300 ring-4 relative flex justify-center items-center h-[170px] m-auto md:h-[480px] md:min-w-[950px]  max-w-[340px]">
   
   <div onClick={leftarrowhandler} className="cursor-pointer absolute left-1 flex justify-center items-center text-3xl z-50 top-[40%] border border-slate-300 text-slate-300 w-8 h-8"><IoIosArrowBack /></div>
   <div onClick={rigtharrowhandler} className="cursor-pointer absolute right-1 flex justify-center items-center text-3xl z-50 top-[40%] border border-slate-300 text-slate-300 w-8 h-8"><IoIosArrowForward /></div>
 
     <img  onTouchStart={touchstart} onTouchEnd={touchend} src={allbanners[imageindex].bannerimage.img} className="h-full w-full "/>
   </div>
   </>
    )
}
export default HomeBanner