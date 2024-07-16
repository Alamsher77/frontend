import {Link} from "react-router-dom";
 const Sidebar = ()=> {

  return(
   
    <div className='sidebar'>
     <ul>
          <Link to='/addProduct'><li>categrays</li></Link> 
     </ul>
    </div>  
  )
}
export default