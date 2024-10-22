import './resis.css'
import {useState,useEffect,useContext} from 'react'
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import {Link,useNavigate} from 'react-router-dom'
 import{ toast } from 'react-hot-toast'; 
import {ContestContext} from '../api/ContestContext'
import DomainUrl from '../Configuration/Index'
import LoddingButton from '../components/loddingbutton'

const  Login = ()=> {
  const navigate = useNavigate()
  const {userFechApi,lodding,userDetails,setUserDetails} = useContext(ContestContext) 
 const [userData,setUserData] = useState({
   email:"",
   password:"",
   conformpassword:"",
 }) 
 const [showpassword,setshowpassword] = useState(false)
  const [loginlodding,setloginlodding]  = useState(false)
  const chnageHandler = (e)=>{
   
    setUserData({...userData,[e.target.name]:e.target.value  })
  
  } 
  const  submitHandler = async(e) =>{
   e.preventDefault();
 try {
   setloginlodding(true)
   const response =  await fetch(`${DomainUrl.url}singin`,
        {
          method: 'POST',
          credentials:'include',
          headers: {
            Accept: 'application/json',
            "Content-type": "application/json",
          },
          body: JSON.stringify(userData),
        })  
   const data = await response?.json()
   setloginlodding(false)
     if (!data?.success) {
       toast.error(data.message) 
        return false
     }  
      toast?.success(data?.message)  
        navigate('/')
        userFechApi() 
  } catch (e) {
    setloginlodding(false)
    toast.error(e.message)
  }
  }
  
 
 
  return (
    lodding ? <div className="w-full text-red-500 font-bold flex justify-center items-center h-[65vh]"> <span className="w-8 h-8 border animate-spin  border-x-4 mr-3 border-x-red-500 rounded-full" />lodding...</div> : userDetails ? navigate('/') :
     <div className="resistration-container">
        <div style={{height:'550px'}} className="resistraion-items">
            <div className="container">
                <h3 >welcome back</h3>
                
                <form className="items" onSubmit={submitHandler}>
                     
                    <div className="fields">
                        <label for="email">email *</label>
                        <input value={userData.email} onChange={chnageHandler} required type="email" placeholder="email" name="email" />
                    </div>

                    
                    <div className="fields">
                        <label for="password">password *</label>
                        <input value={userData.password}  onChange={chnageHandler} required type="password" placeholder="password" name="password" /> 
                    </div>
                    <div className="fields" >
                        <label for="password"> conform password *</label>
                        <div className="shopassinput">
                        <input value={userData.conformpassword}  onChange={chnageHandler} required type={showpassword ? 'text' :'password'} placeholder="conform password" name="conformpassword" />
                        <div onClick={()=> showpassword ? setshowpassword(false) : setshowpassword(true)} className="pass">{ showpassword ? <BiSolidShow /> :<BiSolidHide />}</div>
                        </div>
                         
                    </div>

                    <div className="terms">
                        <input required type="checkbox"  />
                        <p>Termes && Condition Apply</p>
                    </div>
                     <div className="forgete">
                      <Link  to="/forgetePassword">forgete password</Link>
                     </div> 
                  
                    <div className="formbutton">
                        <button type="submit">{loginlodding ? <LoddingButton /> : 'submit'}</button>
                    </div>
                    
                    <div className="flex w-full justify-center">
                     <Link to="/signup" className="cursor-pointer text-yellow-800" >Create a Account</Link>
                    </div>
                      
                </form>
            </div>
        </div>

    </div>
    )
}

export default Login