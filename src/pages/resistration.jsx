import './resis.css'
import {useState,useContext} from 'react' 
import{ toast } from 'react-hot-toast';
import {useNavigate,Link} from "react-router-dom";
import {ContestContext} from '../api/ContestContext'
import DomainUrl from '../Configuration/Index'
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import LoddingButton from '../components/loddingbutton'
const  Resistration = ()=> {
  const {userFechApi,lodding,userDetails,setUserDetails} = useContext(ContestContext) 
  const navigate = useNavigate()
  const [userData,setUserData] = useState({
    name:'',
    email:'',
    phone:'',
    password:'',
    conformpassword:'',
  })
  const [resistrationlodding,setresistrationlodding] = useState(false)
  const [showpassword,setshowpassword] = useState(false)
  const changeHandler = (e)=>{
    setUserData({...userData,[e.target.name]:e.target.value})
  }
  
  const submitHandler = async (e)=>{
    e.preventDefault()
     try { 
        setresistrationlodding(true)
      const response = await fetch(`${DomainUrl.url}singup`, {
        method: 'POST',
         credentials:'include',
        headers: {
          Accept: 'application/json',
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      })
      const data = await response?.json()
      setresistrationlodding(false)
        if (!data?.success) {
          toast.error(data?.message)  
          return false
        }

        toast.success(data?.message) 
        navigate('/login')
    }catch(error) {
   setresistrationlodding(false)
    toast.error(error.message) 
    }
  }
  return (
      lodding ? <div className="w-full text-red-500 font-bold flex justify-center items-center h-[65vh]"> <span className="w-8 h-8 border animate-spin  border-x-4 mr-3 border-x-red-500 rounded-full" />lodding...</div> : userDetails ? navigate('/') :
     <div className="resistration-container">
        <div className="resistraion-items">
            <div className="container">
                <h3>resistration</h3>
                <form className="items" onSubmit={submitHandler}>
                    <div className="fields">
                        <label for="name">name *</label>
                        <input value={userData?.name} onChange={changeHandler} required type="text" placeholder="name" name="name" />
                    </div>
                    <div className="fields">
                        <label for="email">email *</label>
                        <input value={userData?.email} onChange={changeHandler} required type="email" placeholder="email" name="email" />
                    </div>

                    <div className=" fields">
                        <label for="phone">phone number *</label>
                        <input required value={userData?.phone} onChange={changeHandler} type="number" placeholder="phone number" name="phone" />
                    </div>

                    <div className="fields">
                        <label for="password">password *</label>
                        <input required value={userData?.password} onChange={changeHandler} type="password" placeholder="password" name="password" />
                    </div>
                      
                      <div className="fields">
                       <label for="password"> conform password *</label>
                        <div className="shopassinput">
                        <input value={userData?.conformpassword}  onChange={changeHandler} required type={showpassword ? 'text' :'password'} placeholder="conform password" name="conformpassword" />
                        <div onClick={()=> showpassword ? setshowpassword(false) : setshowpassword(true)} className="pass">{ showpassword ? <BiSolidShow /> :<BiSolidHide />}</div>
                     </div>
                      </div>

                    <div className="terms">
                        <input required type="checkbox"  />
                        <p>Termes && Condition Apply</p>
                    </div>

                    <div className="formbutton">
                        <button type="submit">{resistrationlodding ? <LoddingButton /> : 'submit'}</button>
                    </div>
                     <div className="flex w-full justify-center">
                     <Link to="/login" className="cursor-pointer text-yellow-800" >Already Resisterd</Link>
                    </div>
                     
                </form>
            </div>
        </div>

    </div>
    )
}

export default Resistration