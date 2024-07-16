import {useState,useEffect} from 'react'
 import DomainUrl from '../Configuration/Index'
 import { DNA } from 'react-loader-spinner'
const AllUsers = ()=>{
  const [allUsers,setAllUsers] = useState()
    const [lodding,setLodding] = useState(false)
  // https://backend-production-d480.up.railway.app/api/showuser
    const alluserFetch = async ()=>{
       setLodding(true)
    await fetch(`${DomainUrl.url}showuser`,{
        method:'GET',
        credentials:'include'
      })
     .catch((error)=> console.log(error))
     .then((res)=> res.json())
     .then((data)=> {
      setAllUsers(data)
      setLodding(false)
     }) 
    }
    useEffect(()=>{
      alluserFetch()
    },[])
    
  return(
   <>
    {
      lodding ? (
        <div className="flex justify-center " >
           <DNA
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  />
          </div>
        ):(
           
       <div className="w-full flex flex-col gap-1 p-2">
    
         <div className="h-10 text-xs text-slate-500 w-full flex justify-between border-slate-900 mb-2 border-b-2">
        <div className="flex text-xs text-slate-500 w-8 h-8  justify-center items-center"><b>Sr.N</b></div>
        <div className="flex text-xs text-slate-500 w-28 h-8  justify-center items-center"><b> User Name</b></div>
        <div className="flex text-xs text-slate-500 w-40 h-8  justify-center items-center"><b>User Email</b></div>
        
        <div className="flex text-xs text-slate-500 w-8 h-8  justify-center items-center"><b>Roll</b></div>
         
       </div>
        {
          allUsers?.map((iteam,index)=>{
             return  <div className="h-10 text-xs text-slate-500 w-full flex justify-between border-slate-900 ">
        <div className="flex text-xs text-slate-500 w-8 h-8  justify-center items-center"><b>{index+1}</b></div>
        <div className="flex text-xs text-slate-500 h-8  justify-center items-center"><b>{iteam.name}</b></div>
        <div className=" overflow-x-scroll pl-2 flex text-xs text-slate-500 h-8  justify-center items-center"><b>{iteam.email}</b></div>
        
        <div className="flex text-xs text-slate-500 w-8 h-8  justify-center items-center"><b>{iteam?.roll ? iteam?.roll : "none"}</b></div>
         
       </div>
          })
        }
      </div>
          
          )
    }
   </>
  )
}
export default AllUsers