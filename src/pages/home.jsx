import LatestProduct from '../components/latestProduct'
import HomeBanner from '../components/homeBanner'
import ProductIteam from '../components/productIteam/productIteam'
import {ContestContext} from '../api/ContestContext'
import {useState,useContext,useEffect} from "react"
import {Link,useNavigate} from "react-router-dom";
import RandomProduct from '../components/randomProducts'
import Conformation from '../components/conformation'
import LoddingCardComponent from '../components/loddingCardComponent'
const Home = ()=>{
  const loddingArry = [1,2,3,4,5,6,7,8,9,10]
  const {lodding,allProduct,allProductsCategry, coutCartData,userDetails} = useContext(ContestContext) 
 
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
      <LatestProduct /> 
      {
       allProductsCategry.map((catitem,index)=>{ 
        const filtercatagryProduct = allProduct?.filter((fillitem)=>{
          return catitem.categry == fillitem.categry
        })
  
         return( 
           <>
    <div className="p-2 " key={index}>
     <h1 className="font-bold text-pink-400 uppercase">{filtercatagryProduct.length == 0 ? null :catitem?.categry}</h1>
    </div>
    <div   className="select-none mx-1 flex gap-1 overflow-x-auto"> 
     {
      lodding ? (
     loddingArry.map((lodd,index)=>{
        return <LoddingCardComponent />
      })
     ):(
      filtercatagryProduct.length == 0 ? null:( 
    filtercatagryProduct.map((iteam,index)=>{
        return <ProductIteam key={index} name={iteam.name} image={iteam.image} newPrice={iteam.newPrice} oldPrice={iteam.oldPrice} id={iteam._id}/>
      }) 
      )
      )
     }
     
    </div>
     </>
           )
       })
      }
     <RandomProduct />
     </>
    )
}
export default Home