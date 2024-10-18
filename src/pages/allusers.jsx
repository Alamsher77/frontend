import {useState,useEffect,useContext} from 'react'
 import DomainUrl from '../Configuration/Index'
 import { FaRegWindowClose } from "react-icons/fa";
  import{ toast } from 'react-hot-toast';
 import { FaEdit } from "react-icons/fa";
 import {ContestContext} from '../api/ContestContext'
   import SpeechMessage from '../components/speechMessage'
const AllUsers = ()=>{
  const {setIsPopUp}= useContext(ContestContext)
  const [allUsers,setAllUsers] = useState()
  const [rollpopup,setrollpopup] = useState(false)
  const [lodding,setLodding] = useState(false)
  const [curentuser,setcurentuser] = useState('')
  const [roll,setroll] = useState('')
  // https://backend-production-d480.up.railway.app/api/showuser
    const alluserFetch = async ()=>{
      try{
         setLodding(true)
    const response = await fetch(`${DomainUrl.url}showuser`,{
        method:'GET',
        credentials:'include'
      })
      const data = await response.json()
       setAllUsers(data)
      setLodding(false)
      }catch(error){
        console.log(error?.message)
        SpeechMessage(error?.message)
      }
    }
    useEffect(()=>{
      alluserFetch()
    },[])
    
  const userrollchangehandler = async ()=>{ 
     try{
       const response = await fetch(`${DomainUrl.url}userRollUpdate`,{
        method:'POST',
        credentials:'include',
       headers:{ 
        "Content-type":"application/json",
      },
       body:JSON.stringify({curentuser,roll}),
      })
      
      const data = await response.json() 
      if(!data.success){
        console.log(data?.message)
        SpeechMessage(data?.message)
      }
      if(data.success){
        toast.success(data?.message)
        SpeechMessage(data?.message)
        alluserFetch()
        setrollpopup(false)
        setIsPopUp(false)
      }
     }catch(error){
       console.log(error?.message)
       SpeechMessage(error?.message)
     }
    }
    
    
  return(
   <>
    {
      lodding ? (
        <div className="p-5 flex flex-col animate-pulse gap-3">
         {
         Array.from({length:8},(index)=>{
        return  <div key={index} className="bg-slate-300 h-8 p-2" ></div>
        })
         }
        </div>
        ):(
           
       <div className="select-none relative w-full flex flex-col  gap-1 mt-2">
    
         <div className="p-1 bg-slate-600 text-white text-[12px] w-full flex justify-between  mb-2 border-b-2">
        <div className="flex   justify-center items-center"><b>Sr.N</b></div>
        <div className="flex   justify-center items-center"><b> User Name</b></div>
        <div className="flex   justify-center items-center"><b>User Email</b></div>
        
        <div className="flex  justify-center items-center">
        <b>Roll</b>
        
        </div>
         
       </div>
        {
          allUsers?.map((iteam,index)=>{
             return (
             
    <div className="shadow p-2 text-[10px] justify-between items-center text-slate-500 w-full flex  border-slate-900 group">
        <div className=" flex text-slate-500 px-1  justify-center items-center"><b>{index+1}</b></div>
        <div className="flex text-slate-500 px-1 justify-center items-center"><b>{iteam.name}</b></div>
        <div className="  flex  text-slate-500  px-1 justify-center items-center"><b>{iteam.email}</b></div>
        
        <div className="flex relative text-slate-500 px-1 justify-center items-center">
        <b>{iteam?.roll ? iteam?.roll : 'none'}</b>
        <div onClick={()=>{
          setcurentuser(iteam._id)
          setIsPopUp(true)
          setrollpopup(true)
        }} className="absolute bg-green-600 text-sm text-slate-300 p-2 border rounded-full   cursor-pointer hidden group-hover:block"><FaEdit /></div>
        </div>
         
       </div>
              
             )
          })
        }
        
    {rollpopup &&(
      <div className="flex flex-col gap-3 items-center justify-center p-2 pt-8 fixed top-[30%] left-[25%] min-w-[200px]   border bg-slate-300">
           <div onClick={()=>{
           setrollpopup(false) 
           setIsPopUp(false)
             
           }} className="absolute top-0 right-0  w-8 h-8 border text-white bg-red-500 border-red-700 rounded text-xl overflow-scroll flex items-center justify-center"><FaRegWindowClose /></div>
      <h1 className="text-center font-bold text-slate-700">Change Your Roll</h1>
      <select value={roll} onChange={(e)=>setroll(e.target.value)}  className="text-center"> 
       <option>admin</option>
       <option>user</option>
      </select>
    <button onClick={()=>userrollchangehandler()} className="px-5 border border-green-600 rounded hover:bg-green-600 hover:text-white">Update</button>
    </div>
    )}
      </div>
          
          )
    }
    
   </>
  )
}
export default AllUsers