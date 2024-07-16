import {Link } from "react-router-dom";
import {useState,useContext,useEffect} from "react"
import { MdShoppingCart } from "react-icons/md"; 
import{ toast } from 'react-hot-toast';
  import DomainUrl from '../Configuration/Index'
import {ContestContext} from '../api/ContestContext'
export const Headers = ()=> {
  const { coutCartData,userDetails,setUserDetails} = useContext(ContestContext) 
 
  const [toggleMenu,setToggleMenu] = useState('') 
  const menuhandler=()=>{
    if(toggleMenu == ''){
      setToggleMenu('close') 
      document.body.setAttribute('class','close')
    }else{
      setToggleMenu('')
      document.body.removeAttribute('class','close')
    }
  }
   
   const logoutHandler = async ()=>{
  
     const response = await fetch(`${DomainUrl.url}logout`,{
        method:"GET",
        credentials:"include",
      })
     .catch((error)=> console.log(error))
     const data = await response.json()
     if(data.success){ 
    toast.success(data.message)
    setToggleMenu("")  
    window.location.replace("/signup")
     }
  
   }
 
  return(
    <>
    <div className={`header ${toggleMenu}`}> 
     <div className="menu" onClick={menuhandler}>
      <div className="menu-iteam"></div>
      <div className="menu-iteam"></div>
      <div className="menu-iteam"></div>
      </div>
      
      <div className="brand">
       <Link to="/" onClick={()=> 
    document.body.removeAttribute('class','close')}> <span>Shopes</span></Link>  
      </div>
      
      <div className="navContainer"> 
      
      <div className="navebars-background" onClick={menuhandler}></div>
      <div className="navebars">
        <Link to="adminPanel/addproduct" onClick={()=>{
        setToggleMenu('')
          
    document.body.removeAttribute('class','close')
        }}> Admin</Link>
         <Link to="/"  onClick={()=>{
        
         setToggleMenu('') 
    document.body.removeAttribute('class','close')
         }}> Home</Link> 
      {
        userDetails ?(
           <Link to="signup" onClick={()=>{
           setToggleMenu('') 
           logoutHandler()
    document.body.removeAttribute('class','close')}} >Logout</Link>  
        ):(
            <Link to="signup" onClick={()=>{setToggleMenu('') 
    document.body.removeAttribute('class','close')}} > SignUp</Link>  
        )
      }
      </div>
       
    {
      userDetails ? (
      <>
           <div className="users " onClick={()=>{
    document.body.removeAttribute('class','close')}}>{userDetails?.name.charAt(0)}</div>
        
        <div className="text-3xl relative -left-1 flex justify-center items-center w-8 h-8" >
        <sapn className="text-white absolute" ><Link to='cart' onClick={()=> 
    document.body.removeAttribute('class','close')}> <MdShoppingCart/></Link></sapn>
      <div className="bg-red-600 -top-1 left-2 absolute rounded-full text-white w-5 h-5 p-1 flex items-center justify-center">
        <p className="text-sm">{coutCartData}</p>
      </div>
      </div>
      </>
      ):(
       <>
       </>
      )
    }
     
      </div>
    </div> 
    < />
  )
}