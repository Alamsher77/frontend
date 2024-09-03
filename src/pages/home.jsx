import LatestProduct from '../components/latestProduct'
import HomeBanner from '../components/homeBanner'
import {ContestContext} from '../api/ContestContext'
import {useState,useContext,useEffect} from "react"
import {Link,useNavigate} from "react-router-dom";
import RandomProduct from '../components/randomProducts'
const Home = ()=>{
   const {userFechApi,allProductsCategry, coutCartData,userDetails,setUserDetails} = useContext(ContestContext) 
 

 
  return(
     <>
      <div style={{ scrollbarWidth: "none"}} className="overflow-x-auto no-scrollbar mx-3 my-1">
       <div className="flex gap-1 ">
          {
        allProductsCategry?.map((item)=>{
          return (
            <Link className="rounded flex border py-2 border-slate-500 flex-col gap-1 items-center min-w-[110px]"  to={`categryIteams/${item?.categry}`}>
           <img className="h-12 w-12 bg-white object-contain" src={item?.catelogo} alt='image'/> 
           <p className="">{item?.categry}</p> 
            </Link>
             
          )
        })
      }
       </div>
      </div>
       <HomeBanner />
      <LatestProduct />
      <RandomProduct />
     </>
    )
}
export default Home