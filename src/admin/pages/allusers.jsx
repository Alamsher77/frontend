import React ,{useState,useEffect} from 'react'  
import Userlistlodding from '../components/userlistlodding'
export const Allusers = ()=>{
  const [userData ,setUserData] = useState([])
  
   
  useEffect(()=>{
  fetch('http://localhost:4000/api/showuser')
  .then((response) => response.json())
  .then((data) => { setUserData(data)})
  },[]) 
  
  return(
     <> 
     
      <div className='allusers'>
        <h4>users information</h4>
        <div className="container">
          <div className="iteam"><div className='total'>total users</div><div>452342</div></div>
          <div className="iteam">434</div>
          <div className="iteam">3453</div>
          <div className="iteam">4353</div>
          <div className="iteam">345</div>
        </div>
      </div>
     </>
    )
}