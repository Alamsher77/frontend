import {NavLink} from "react-router-dom";
import {useState} from 'react'
 const Sidebar = ()=> {
 
  return( 
    <div className='sidebar'>
     <ul> 
          <NavLink className={({isActive})=>isActive ?'bg-green-500':''} to='addproduct'><li>addproduct</li></NavLink> 
          <NavLink className={({isActive})=>isActive ?'bg-green-500':''} to='allUsers'><li>allusers</li></NavLink> 
          <NavLink className={({isActive})=>isActive ?'bg-green-500':''} to='addcategry'><li>addcategry</li></NavLink> 
          <NavLink className={({isActive})=>isActive ?'bg-green-500':''} to='AllUsersOrderProduct'><li>Orders</li></NavLink> 
           
     </ul>
    </div>  
  )
}
export default Sidebar