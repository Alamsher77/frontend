import {NavLink,useNavigate} from "react-router-dom";
import {useState,useContext,useEffect} from "react"
import { MdShoppingCart } from "react-icons/md"; 
import{ toast } from 'react-hot-toast';
  import DomainUrl from '../Configuration/Index'
import {ContestContext} from '../api/ContestContext'
import './header.css'
import logo from '../asetes/logo4.png'
export const Headers = ()=> {
   const navigate = useNavigate();
  const {setIsPopUp,allProductsCategry, coutCartData,userDetails,setUserDetails} = useContext(ContestContext) 
 
 const [toggleMenu,setToggleMenu] = useState('')
 const [usersPopupIteams,setUsersPopupIteams] = useState(false)
 const usersTogglePopup = ()=>{
  if(usersPopupIteams){
    setUsersPopupIteams(false)
  }else{
    setUsersPopupIteams(true)
  }
}
 const menuhandler=()=>{
      const sidbarContainer = document.querySelector('.sidbar-container');
     if(toggleMenu == ''){ 
     sidbarContainer.classList.add('active')
     setToggleMenu('close') 
    setIsPopUp(true)
     }else{
     sidbarContainer.classList.remove('active') 
     setToggleMenu('')
    setIsPopUp(false)
     setUsersPopupIteams(false)
     }  
  } 
  
 const logoutHandler = async ()=>{
  try{ 
     const response = await fetch(`${DomainUrl.url}logout`,{
        method:"GET",
        credentials:"include",
      }) 
     const data = await response.json()
     if(!data?.success){ 
      console.log(data?.message)
      return false
     }
      
    toast.success(data.message)
    setToggleMenu("") 
    usersTogglePopup()
    menuhandler() 
    setUserDetails(null)
   navigate("/login") 
  }catch(error){
    toast.error(error.message)
  }
   } 
   
   
     

  return(
    <>  
    <div className={`header ${toggleMenu}`}> 
      <div className='navebars-background' onClick={menuhandler}></div>
      
      <div className="menu md:hidden" onClick={menuhandler}>
       <div className="menu-iteam"></div>
       <div className="menu-iteam"></div>
       <div className="menu-iteam"></div>
       </div>
       
       <NavLink  className="w-32 overflow-hidden  ml-14 rounded" to="/" onClick={()=> 
       document.body.removeAttribute('class','close')}>
       <div className="text-white uppercase " ><span className="text-pink-400 font-bold " >Easy</span> <span className="text-sm text-pink-300" >Shope</span></div>
      </NavLink>  
      
        {
      userDetails && (
      <NavLink to='cart' className="text-3xl relative -left-1 flex justify-center items-center w-8 h-8" >
        <sapn className="text-white absolute" > <MdShoppingCart/>  </sapn>
      <div className="bg-red-600 -top-1 left-2 absolute rounded-full text-white w-5 h-5 p-1 flex items-center justify-center">
        <p className="text-sm">{coutCartData}</p>
      </div>
      </NavLink>
      )
    }
      
      </div> 
      <div className="sidbar-container">  
      <div className="close-sid-width " onClick={menuhandler}></div>
        
        {/*navigation*/}
          <div className="user-info">
        {
          userDetails ? (
          <>
            <div className="cursor-pointer user-image bg-slate-200"   onClick={usersTogglePopup}>{userDetails?.profilePic ? (
              <img src={userDetails?.profilePic?.img} alt="image" />):(
                <h1 className="font-bold text-4xl text-slate-500">{userDetails?.name.charAt(0)}</h1>
              )
            }</div>
            <div className="user-information">
                
                <p> <b>{userDetails?.name}</b> <br /><span>{userDetails?.email}</span></p>
            </div>
          </>
          ):(
          <NavLink to="login" className="border  px-3 py-1 text-slate-500 rounded" onClick={menuhandler} >Login now</NavLink>  
           
          )
        } 
        </div>
   
   
  <div className="bg-slate-200 w-full px-3 py-2 flex gap-1 flex-col">
           
          <NavLink onClick={menuhandler} className={({isActive})=> isActive ? 'rounded  text-white hover:bg-slate-800  cursor-pointer bg-slate-800  flex flex-col items-center py-2':'rounded  text-white hover:bg-slate-800  cursor-pointer bg-slate-500 flex flex-col items-center py-2'} to="/myOrderProducts"  >My Orders</NavLink> 
            
          <NavLink onClick={menuhandler} className={({isActive})=> isActive ? 'rounded  text-white hover:bg-slate-800  cursor-pointer bg-slate-800 flex flex-col items-center py-2':'rounded  text-white hover:bg-slate-800  cursor-pointer bg-slate-500 flex flex-col items-center py-2'} to="about"  >Contact</NavLink> 
          
           <NavLink onClick={menuhandler} className={({isActive})=> isActive ? 'rounded  text-white hover:bg-slate-800  cursor-pointer bg-slate-800 flex flex-col items-center py-2':'rounded  text-white hover:bg-slate-800  cursor-pointer bg-slate-500 flex flex-col items-center py-2'} to="Ordersuccessfullpage"  >Calculate</NavLink> 
          
          
 
        </div>
         
        {
      //userinfo popup iteams
        usersPopupIteams && (
        <div className="absolute flex flex-col gap-1 justify-center items-center  p-2 top-20 left-2 bg-white shadow-indigo-500/50 ">
        <div className="border border-yellow-600 px-3 py-1 text-yellow-500 rounded"><NavLink to="adminPanel/addproduct" onClick={usersTogglePopup,menuhandler } >Admin Panel</NavLink></div>
          <div className="border border-yellow-600 px-3 py-1 text-yellow-500 rounded"><NavLink to="UserDetails" onClick={usersTogglePopup,menuhandler } >Profile</NavLink></div>
        <div className="border border-red-600 text-red-500 hover:text-red-600 hover:bg-red-200  px-3 rounded"> <button  onClick={logoutHandler} >Log Out</button></div>
        </div>
      )
        }
         
        </div> 
        
         
    
    < />
  )
}
