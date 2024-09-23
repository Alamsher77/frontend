import logo3 from '../asetes/logo7.jpg'
import logo4 from '../asetes/logo4.png'
const HomeBanner = ()=>{
  // <div className="h-full w-full bg-gray-200">
  //  
  //   </div>
    
  //   <div className="rounded flex-col gap-4 p-6 select-none h-48 top-0 flex items-center  bg-slate-800/50  absolute  m-2 p-1  ">
  //   <h1 className="text-2xl font-bold text-yellow-400">Welcome to This Shope</h1>
  //   <p className="text-yellow-100">Hey Your best expirence is here and your favrate products is here You can by this product any where for all items you can by or more</p>
  //   </div>
  return(
   <div className="overflow-scroll flex gap-1 min-w-[340px] m-auto max-w-[340px] min-h-[150px] bg-slate-200">
    <div className="overflow-hidden  min-w-full max-w-full min-h-[170px] max-h-[190px]">
      <img src={logo3} className="w-full h-full object-contain"/>
    </div>
    <div className="overflow-hidden bg-red-200 min-w-full max-w-[300px] min-h-[170px] max-h-[190px] ">
      <img src={logo4} className="w-full h-full object-contain"/>
    </div>
   </div>
    )
}
export default HomeBanner