import logo3 from '../asetes/logo7.jpg'
import logo4 from '../asetes/logo4.png'
import {ContestContext} from '../api/ContestContext'
import {useContext} from 'react'
const HomeBanner = ()=>{
  const {allbanners,lodding} = useContext(ContestContext)
 
 if(allbanners?.length == 0 || lodding ){
   return null
 }
  return(
   <div className="overflow-scroll flex gap-1 min-w-[340px] m-auto max-w-[340px] min-h-[150px] ">
    {
      lodding ?(
      <div>lodding</div>
      ):(
      
       allbanners?.map((item,index)=>{
        console.log(item)
         return(
           <div key={index} className="overflow-hidden  min-w-full max-w-full min-h-[170px] max-h-[190px]">
      <img src={item.bannerimage?.img} className="w-full h-full object-contain"/>
    </div>
    
         )
       })
      )
    }
   </div>
    )
}
export default HomeBanner