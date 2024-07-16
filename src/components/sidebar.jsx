import {Link} from "react-router-dom";
 const Sidebar = ()=> {

  return( 
    <div className='sidebar'>
     <ul> 
          <Link to='addproduct'><li>addproduct</li></Link> 
          <Link to='allUsers'><li>allusers</li></Link> 
          <Link to='addcategry'><li>addcategry</li></Link> 
     </ul>
    </div>  
  )
}
export default Sidebar