import {Link } from "react-router-dom";
const NoPage = ()=>{
  const style = {notPage:{
     position:"absolute",
     top:"50%",
     left:"50%",
     transform:"translate(-50%,-50%)", 
     fontSize:"30px",
     letterSpacing:"2px",
     fontWeight:"bold",
     color:"red"
  },
  link:{
    color:"gray",
    fontSize:"15px",
    letterSpacing:"-1px"
  }}
  return(
    <>
     <div style={style.notPage}>
        <span>404 Page Not Found</span>
        <br />
         <Link to="/" style={style.link}> GoToHome</Link>
     </div>
     
    </>
    )
}
export default NoPage