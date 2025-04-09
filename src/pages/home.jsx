import LatestProduct from '../components/latestProduct'
import HomeBanner from '../components/homeBanner'
import ProductIteam from '../components/productIteam/productIteam'
import {ContestContext} from '../api/ContestContext'
import {useState,useContext,useEffect} from "react"
import {Link,useNavigate} from "react-router-dom";
import RandomProduct from '../components/randomProducts'
import Conformation from '../components/conformation'
import LoddingCardComponent from '../components/loddingCardComponent'
import DomainUrl from '../Configuration/Index'
const Home = ()=>{
  const loddingArry = [1,2,3,4,5,6,7,8,9,10]
  const {lodding,allProduct,allProductsCategry,coutCartData,userDetails} = useContext(ContestContext) 
  
  const getlocaldata = JSON.parse(localStorage.getItem('viewProduct'))
 
  return(
     <>
      
        <div style={{ scrollbarWidth: "none"}} className="overflow-x-auto no-scrollbar mx-3 my-2">
       <div className="flex gap-1 ">
          {
         lodding ?(
          loddingArry.map((item,index)=>{
            return (
              <div key={index} className="animate-pulse  bg-slate-300 rounded flex py-2   flex-col gap-1 items-center min-w-[110px]">
            <div className="h-12 w-12  object-contain"></div>
          </div>
            )
          })
         ):
        allProductsCategry?.map((item,index)=>{
          return (
            <Link key={index} className="rounded flex border py-2 border-slate-500 flex-col gap-1 items-center min-w-[110px]"  to={`categryIteams/${item?.categry}`}>
           <img className="h-12 w-12 bg-white object-contain" src={item?.catelogo?.img} alt='image'/> 
           <p className="">{item?.categry}</p> 
            </Link>
             
          )
        })
      }
       </div>
      </div>
       <HomeBanner />
       
       
       { /*view product list of data */}
       {
        getlocaldata &&
       <div className="p-2">
         <h1 className="font-bold uppercase text-pink-400 ">View Product</h1>
         <div style={{scrollbarWidth:"none"}} className="flex gap-1  overflow-x-auto">
           {
             getlocaldata.map((iteam,index)=>{ 
               return(
              <ProductIteam key={index} name={iteam.name} image={iteam.image} newPrice={iteam.newPrice} oldPrice={iteam.oldPrice} id={iteam?.id}/>
               )
             })
           }
         </div>
         
       </div>
       }
      <LatestProduct /> 
     
     <RandomProduct />
     </>
    )
}
export default Home