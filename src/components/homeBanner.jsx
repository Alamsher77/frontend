import logo3 from '../asetes/logo7.jpg'
const HomeBanner = ()=>{
  return(
   <div className="h-52 relative rounded m-2 p-1 bg-pink-200 ">
    <div className="h-full w-full bg-gray-200">
     <img src={logo3} className="w-full h-full object-cover"/>
    </div>
    
    <div className="rounded flex-col gap-4 p-6 select-none h-48 top-0 flex items-center  bg-slate-800/50  absolute  m-2 p-1  ">
     <h1 className="text-2xl font-bold text-yellow-400">Welcome to This Shope</h1>
     <p className="text-yellow-100">Hey Your best expirence is here and your favrate products is here You can by this product any where for all items you can by or more</p>
    </div>
   </div>
    )
}
export default HomeBanner