import {useState,useEffect} from 'react'
import PostAndGetApi from '../helpers/postsendapi'
import LoddingButton from '../components/loddingbutton'
import {useNavigate} from "react-router-dom";
import{ toast } from 'react-hot-toast';
import Otp from '../components/otp'
const ForgetePassword = ()=>{
  const navigate = useNavigate()
  const [isfocuse,setisfocuse] = useState(false)
  const [email,setemail] = useState('')
  const [otptime,setotptime] = useState(0)
  const [sendotp,setsendotp] = useState(false)
  const [createpassword,setcreatepssword] = useState(false)
  const [sendotplodding,setsendotplodding] = useState(false)
  const [otpcomponent,setotpcomponent] = useState(false)

const getlocalstoragevalue = JSON.parse(localStorage.getItem('changepassword'))
   
  const sendOtp = async (e)=>{
    e.preventDefault()
    try {
      setsendotplodding(true)
      const data = await PostAndGetApi({path:'emailsender',data:{email},method:'POST'})
      setsendotplodding(false)
      if(!data?.success){
        toast.error(data?.message)
        return false
      }
      toast.success(data.message) 
      setotptime(60) 
      setsendotp(true)
      setotpcomponent(true)
    } catch (e) {
      toast.error(e.message)
      setsendotplodding(false)
    }
  }
  
  useEffect(()=>{
  if(setotptime){
      if(otptime > 0 ){
      const itntervel = setInterval(()=>{
        setotptime((prevtime)=> prevtime - 1)
      },1000)
      return ()=> clearInterval(itntervel);
    }else{
      setsendotp(false)
    }
  }
  },[otptime])
  
// crate password funciton
const [placeholder,setplaceholder] = useState({
  placeholderpassword:true,
  placeholderconformpassword:false
})

const [passwordchangelodding,setpasswordchanglodding] = useState(false)

  const [newpssword,setnewpssword] = useState({
    password:'',
    conformpassword:'',
  })
   
const newpasswordchangehandler = async (e)=>{
  e.preventDefault()
  try {
    setpasswordchanglodding(true)
     const data = await PostAndGetApi({path:'changepassword',data:{newpssword,email:getlocalstoragevalue ? getlocalstoragevalue?.email :''},method:'POST'})
     setpasswordchanglodding(false)
     if(!data?.success){
       toast.error(data.message)
       return false
     }
     toast.success(data.message)
     navigate("/login")
     localStorage.removeItem('changepassword')
  } catch (e) {
    setpasswordchanglodding(false)
    toast.error(e.message)
  }
}

useEffect(()=>{
  if(getlocalstoragevalue){
   setcreatepssword(getlocalstoragevalue.changepassword)
  }
},[])
  return (
     <div className="w-full mt-4 gap-4 flex-col   flex justify-center items-center">   
          {
         createpassword ? (
           <form  onSubmit={newpasswordchangehandler} className="relative flex gap-4 p-4 flex-col items-center border w-[300px] ">
          <div className="flex gap-6 flex-col">
              <h1 className="capitalize font-bold ">create new password</h1>
             <div className="relative  w-full">
            
              {
                placeholder?.placeholderpassword &&(
                 <span className="absolute bg-white text-[16px] px-1 text-blue-500 left-[7px] -top-[12px]">Password</span>
                )
              }
                
                <input 
       onChange={(e)=> setnewpssword({...newpssword,password:e.target.value})}
       value={newpssword?.password}
       required
       onBlur={()=> setplaceholder({placeholderpassword:false})}
       onFocus={()=> setplaceholder({placeholderpassword:true})}
       className="transition border all ease-in-out delay-150 placeholder:text-blue-500 focus:ring-2 text-blue-500 outline-none px-3 py-1.5 text-[16px]" 
       type="password" placeholder={placeholder?.placeholderpassword ? "":"Password"}/>
             </div>
       
          <div className="relative  w-full">
            
              {
                placeholder?.placeholderconformpassword &&(
                 <span className="absolute bg-white text-[16px] px-1 text-blue-500 left-[7px] -top-[12px]">Conform password</span>
                )
              }
       <input 
       onChange={(e)=> setnewpssword({...newpssword,conformpassword:e.target.value})}
       value={newpssword?.conformpassword}
       required
       onBlur={()=> setplaceholder({placeholderconformpassword:false})}
       onFocus={()=> setplaceholder({placeholderconformpassword:true})}
       className="transition border all ease-in-out delay-150 placeholder:text-blue-500 focus:ring-2 text-blue-500 outline-none px-3 py-1.5 text-[16px]" 
       type="text" placeholder={placeholder?.placeholderconformpassword ? "":"Conform password"}/>
       
       <div className="w-full flex justify-end mt-4">
        <button    className="transition delay-150 ease-in-out outline-none hover:bg-blue-500 hover:text-white text-blue-500 capitalize text-[16px] border-[1px] mr-2 px-2 py-1 rounded border-blue-500" >{passwordchangelodding ? <LoddingButton /> :'change'}</button>
       </div>
          
         </div>
        </div>
        </form> 
         ):(
         <>
        <form onSubmit={sendOtp} className="relative flex gap-4 p-4 flex-col items-center border w-[300px] ">
         <h1 className="capitalize font-bold ">forgote password</h1>
          <div className="relative w-full">
              {
         isfocuse && (
          <span className="absolute bg-white text-[16px] px-1 text-blue-500 -top-[13px] left-[7px]">Enter email</span>
         )
       }
       <input 
       onChange={(e)=> setemail(e.target.value)}
       value={email}
       required
       onBlur={()=> setisfocuse(false)}
       onFocus={()=> setisfocuse(true)}
       className="transition border all ease-in-out delay-150 placeholder:text-blue-500 focus:ring-2 text-blue-500 outline-none px-3 py-1.5 text-[16px]" 
       type="email" placeholder={isfocuse ? "":"Enter email"}/>
       
          </div>
       <div className="w-full flex justify-end ">
        <button disabled={sendotp ? true :false} type="submit" className="transition delay-150 ease-in-out outline-none hover:bg-blue-500 hover:text-white text-blue-500 capitalize text-[16px] border-[1px] mr-2 px-2 py-1 rounded border-blue-500" >{sendotp ? `${otptime}s` : sendotplodding ? <LoddingButton /> :'send otp'}</button>
       </div>  
      </form>
       
      {  otpcomponent && (
         <Otp setcreatepssword={setcreatepssword} email={email} />
        )
      }
      </>
       )}
            
     </div>
    )
}
export default ForgetePassword