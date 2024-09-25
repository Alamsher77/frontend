import Sidebar from '../components/sidebar.jsx'
import {Outlet,Link,useNavigate} from "react-router-dom";
import {useState,useContext} from "react"
import {ContestContext} from '../api/ContestContext'
import NoContent from '../components/noContent'
const AdminPanel = ()=>{
    const {userDetails} = useContext(ContestContext)
    const navigate = useNavigate()
  return(
     <> 
     {
         userDetails?.roll == 'admin' ? (
        <>
           <Sidebar /> 
          <Outlet/> 
          </>
        ) : (
             <div className="text-center ">
          <NoContent message="can`t access this page" />
          <button onClick={()=>{
          navigate('/')
            
          }} className="cursor-pointer px-3 py-1 border border-green-500 transition ease-in-out delay-200 rounded hover:bg-green-500 hover:text-white">Home</button>
          </div>
       
          )
     }
     </>
    )
}
export default AdminPanel