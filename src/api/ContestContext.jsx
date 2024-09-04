// src/ContestContext.js
import React, { createContext, useState, useEffect } from 'react';
import DomainUrl from '../Configuration/Index'
  import { toast} from 'react-toastify'; 
export const ContestContext = createContext(null);


export const ContestProvider =  ({ children }) => {
  // fetch api state
  const [allProduct, setAllProducts] = useState([]);
  const [lodding,setLodding] = useState(false)
  const [allProductsCategry, setAllProductsCategry] = useState([]);
  const[userDetails,setUserDetails] = useState(null) 
  const[coutCartData,setCoutCartData] = useState(0) 
  const [latestProduct,setLatestProduct] = useState([])
  const [randomProduct,setRandomProduct] = useState([])

 
  // api funciton
const categryapi = async ()=>{
       // all categry api 
      setLodding(true)
    const response =  await fetch(`${DomainUrl.url}showproductcategry`)
     .catch((error)=> console.log(error))
      const data = await response.json()
       setLodding(false)
      setAllProductsCategry(data)
     
}
const fetchApi = async ()=>{
  setLodding(true)
         // allproduct api
    await fetch(`${DomainUrl.url}showProduct`)
     .catch((error)=> console.log(error))
     .then((res)=> res.json())
     .then((data)=> {
       setAllProducts(data)
       setLodding(false)
     }) 
  }
const userFechApi = async ()=>{
      setLodding(true)
      const response = await fetch(`${DomainUrl.url}usergetinfo`,{
        method:"GET",
        credentials:"include"
      })
     .catch((error)=> console.log(error))
     const data = await response.json()
     setLodding(false)
      if(data.success){
        setUserDetails(data.data)
      }
  }
const coutCartFetchApi = async ()=>{
      const response = await fetch(`${DomainUrl.url}countCartProduct`,{
        method:"GET",
        credentials:"include"
      })
     .catch((error)=> console.log(error))
     const data = await response.json()
     if(data.success){ 
      setCoutCartData(data.data)
     }
    
}
const LatestProductApi = async ()=>{
   setLodding(true)
         // allproduct api
    await fetch(`${DomainUrl.url}latestProduct`)
     .catch((error)=> console.log(error))
     .then((res)=> res.json())
     .then((data)=> {
       setLatestProduct(data)
       setLodding(false)
     }) 
}

const randomProductApi = async ()=>{
   setLodding(true)
         // allproduct api
    await fetch(`${DomainUrl.url}randomProduct`)
     .catch((error)=> console.log(error))
     .then((res)=> res.json())
     .then((data)=> {
       setRandomProduct(data)
       setLodding(false)
     }) 
}
 
  // api useEffect
 useEffect(  ()=>{ 
  fetchApi()
  categryapi()   
  userFechApi()
  coutCartFetchApi()
  LatestProductApi()
  randomProductApi() 
  },[])
  
 
 
// contextvalue
const contextValue = {latestProduct,userFechApi,lodding,coutCartFetchApi,coutCartData,setUserDetails,userDetails,randomProduct, allProduct, allProductsCategry,fetchApi,categryapi}
  return (
    <ContestContext.Provider value={contextValue}>
      {children}
    </ContestContext.Provider>
  );
};
