
import ProductIteam from '../components/productIteam/productIteam'
import {useState,useEffect, useContext} from 'react'
import {ContestContext} from '../api/ContestContext'
 import { DNA } from 'react-loader-spinner'
const Home = ()=>{
   const {allProduct,lodding}= useContext(ContestContext)
  
  return(
     <>
     <div className="grid grid-cols-2 md:grid-cols-5 ">
     {
       allProduct.length == 0 && lodding ? (
         <div className="flex justify-center " >
           <DNA
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  />
          </div>
       ):(
       {
       allProduct.map((iteam,index)=>{
         return <ProductIteam key={index} name={iteam.name} image={iteam.image} newPrice={iteam.newPrice} oldPrice={iteam.oldPrice} id={iteam._id}/>
       })
       }
       )
       }
     </div>
     </>
    )
}
export default Home