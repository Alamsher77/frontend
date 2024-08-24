import {useState,useEffect} from 'react'
const UserDetails = ()=>{
  
  const [showAdress,setShowAdress] = useState(false) 
  
 
 
 
  return(
     <div className="select-none w-full flex flex-col items-center bg-white p-4">
      <h1 className="shadow shadow-gray-600 rounded-full px-10 py-1 mb-2 font-bold uppercase text-gray-500 bg-pink-100">Your Profile</h1>
      <div className="shadow shadow-gray-600 bg-pink-100  gap-2 flex flex-col items-center w-full  p-2">
        <div className="  p-2 bg-slate-400 w-20 h-20 mb-2 rounded-full"> 
        </div>
      
       <div className="mb-2">
          <h1 className="mb-1">Name</h1>
         <input className="border px-4 py-1" typ="text" value="Alamsher Ansari"  placeholder="Name" />
        </div>
        
         <div className="mb-2">
          <h1 className="mb-1">Email</h1>
         <input className="border px-4 py-1" typ="text" value="alamsheransari15@gmail.com"  placeholder="Name" />
        </div>
        
         <div className="mb-2">
          <h1 className="mb-1">Phone</h1>
         <input className="border px-4 py-1" typ="text" value="8252637157"  placeholder="Name" />
        </div>
        
        
        <div className="mb-2">
           <h1 className="mb-1">Phone</h1>
          <input className="border px-4 py-1" typ="text" value="8252637157"  placeholder="Name" />
        </div> 
          
          
      </div>
      
       <h1 onClick={()=>{showAdress ? setShowAdress(false) : setShowAdress(true)}} className=" rounded-full mt-2 shadow shadow-gray-600 px-10 py-1 mb-2 font-bold uppercase text-gray-500 bg-pink-100 cursor-pointer select-none">View Address</h1>
      {
        showAdress && (
          
       <div  className="select-none shadow shadow-gray-600 bg-pink-100  gap-2 flex flex-col items-center w-full  p-2">
       
     
        
          <div className="mb-2"> 
           <h1 className="mb-1">District</h1>
          <input className="border px-4 py-1" typ="text" value='garhwa'  placeholder="Name" />
          </div> 
          
       </div>
        )
      }
     </div>
    )
}
export default UserDetails