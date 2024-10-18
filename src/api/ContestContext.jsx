// src/ContestContext.js
import React, { createContext, useState, useEffect } from 'react';
import DomainUrl from '../Configuration/Index'
import{ toast } from 'react-hot-toast';
 import SpeechMessage from '../components/speechMessage'
 export const ContestContext = createContext(null); 

export  const ContestProvider =  ({ children }) => {
  // fetch api state
  const [allProduct, setAllProducts] = useState([]);
  const [lodding,setLodding] = useState(false)
  const [allProductsCategry, setAllProductsCategry] = useState([]);
  const[userDetails,setUserDetails] = useState(null) 
  const[coutCartData,setCoutCartData] = useState(0) 
  const [latestProduct,setLatestProduct] = useState([])
  const [randomProduct,setRandomProduct] = useState([])
  const [isPopUp,setIsPopUp] = useState(false)
  const [allbanners,setallbanners] = useState([])
  const [appnameicon,setappnameicon] = useState()

   const appnameandicon = async ()=>{ 
       const response = await fetch(`${DomainUrl.url}getappnameandicon`)
       const data = await response.json() 
    
         setappnameicon({name:data[0].name,icon:data[0].icon,_id:data[0]._id})

   }
   
  // api funciton
const categryapi = async ()=>{
    setLodding(true)
    const response =  await fetch(`${DomainUrl.url}showproductcategry`) 
     const data = await response.json()
     if(!data?.success){
       console.log(data?.message)
       return false
     } 
       setLodding(false)
      setAllProductsCategry(data.data)
}
const fetchApi = async ()=>{
     setLodding(true) 
   const response =  await fetch(`${DomainUrl.url}showProduct`)
  const data = await response.json()  
    setAllProducts(data)
   setLodding(false)
  }
const userFechApi = async ()=>{
        setLodding(true)
    const response = await fetch(`${DomainUrl.url}usergetinfo`,{
        method:"GET",
        credentials:"include"
      })
    const data = await response.json() 
    if(!data?.success){
      console.log(data?.message)
      return false
    }
    setLodding(false)
    setUserDetails(data.data)
    console.log(data)
  }
const coutCartFetchApi = async ()=>{
   const response = await fetch(`${DomainUrl.url}countCartProduct`,{
        method:"GET",
        credentials:"include"
      })
      const data = await response.json()
     if(!data.success){ 
      console.log(data?.message)
      return false
     }
      setCoutCartData(data.data)
}
const LatestProductApi = async ()=>{
      setLodding(true) 
  const response =  await fetch(`${DomainUrl.url}latestProduct`)
  const data = await response.json()
   setLodding(false)  
   setLatestProduct(data) 
}

const randomProductApi = async ()=>{
     setLodding(true) 
   const response = await fetch(`${DomainUrl.url}randomProduct`)
   const data = await response.json()
    setLodding(false) 
    setRandomProduct(data)
}
  const fetchbanner = async()=>{
   setLodding(true)
      const response = await fetch(`${DomainUrl.url}showallbanners`)
     const data = await response.json()
    setLodding(false)
    setallbanners(data)  
  }
 useEffect(()=>{ 
  fetchApi()
  categryapi()   
  userFechApi()
  coutCartFetchApi()
  LatestProductApi()
  randomProductApi() 
  fetchbanner()
  appnameandicon()
  if(isPopUp){
    document.body.style.overflow = 'hidden'
  }else{
    document.body.style.overflow = ''
  }
  return ()=>{
    document.body.style.overflow = ''
  }
  },[isPopUp]) 
 
// contextvalue
const contextValue = {appnameandicon,appnameicon,setallbanners,allbanners,fetchbanner,setIsPopUp,latestProduct,userFechApi,lodding,coutCartFetchApi,coutCartData,setUserDetails,userDetails,randomProduct, allProduct, allProductsCategry,fetchApi,categryapi}
  return (
    <ContestContext.Provider value={contextValue}>
      {children}
    </ContestContext.Provider>
  );
};
 