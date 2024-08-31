import logo6 from '../asetes/logo6.jpg'
const HomeBanner = ()=>{
  return(
   <div className="h-40 m-2 p-1 bg-pink-200 flex gap-1">
    <div className="h-full w-44 bg-gray-200">
     <img src={logo6} className="w-full h-full object-cover"/>
    </div>
    <div className=" justify-center gap-6 bg-white w-44 p-1 flex flex-col items-center">
     <h1 className="text-gray-500 font-bold">Welcome to Shopes</h1>
     <p className="text-sm text-green-700 font-bold">This Year For Best Offers For All Users In This Website You Can By All Products </p>
    </div>
   </div>
    )
}
export default HomeBanner