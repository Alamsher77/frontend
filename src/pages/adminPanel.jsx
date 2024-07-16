import Sidebar from '../components/sidebar.jsx'
import {Outlet,Link} from "react-router-dom";
import {useState,useContext} from "react" 
  import { toast} from 'react-toastify';
import {ContestContext} from '../api/ContestContext'
const AdminPanel = ()=>{
    const {userDetails} = useContext(ContestContext)
    console.log(userDetails)
    
  return(
     <> 
     {
         userDetails?.roll == 'admin' ? (
        <>
           <Sidebar /> 
          <Outlet/> 
          </>
        ) : (
           <h1> You are not admin</h1>
          )
     }
     </>
    )
}
export default AdminPanel