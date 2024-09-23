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

 
  // api funciton
const categryapi = async ()=>{
    try{
      setLodding(true)
    const response =  await fetch(`${DomainUrl.url}showproductcategry`) 
     const data = await response.json()
     if(!data?.success){
       toast.error(data?.message)
       return false
     } 
       setLodding(false)
      setAllProductsCategry(data.data)
    }catch(error){
      toast?.error(error?.message)
      SpeechMessage(error?.message)
    }
}
const fetchApi = async ()=>{
   try{
      setLodding(true) 
   const response =  await fetch(`${DomainUrl.url}showProduct`)
  const data = await response.json()  
    setAllProducts(data)
   setLodding(false)
   }catch(error){
    // toast?.error(error?.message)
    // SpeechMessage(error?.message)
    console.log('product error '+error)
   }
  }
const userFechApi = async ()=>{
    try{
        setLodding(true)
     const response = await fetch(`${DomainUrl.url}usergetinfo`,{
        method:"GET",
        credentials:"include"
      })
     const data = await response.json()
     setLodding(false)
     if(!data?.success){
       toast?.error(data?.message)
       return false
     }
     setUserDetails(data.data)
    }catch(error){
      toast.error(error?.message)
      SpeechMessage(error?.message)
    }
  }
const coutCartFetchApi = async ()=>{
    try{
      const response = await fetch(`${DomainUrl.url}countCartProduct`,{
        method:"GET",
        credentials:"include"
      })
      const data = await response.json()
     if(!data.success){ 
      toast.error(data?.message)
      return false
     }
      setCoutCartData(data.data)
    }catch(error){
      toast.error(error?.message)
    }
}
const LatestProductApi = async ()=>{
   try{
     setLodding(true) 
  const response =  await fetch(`${DomainUrl.url}latestProduct`)
  const data = await response.json()
   setLodding(false)  
   setLatestProduct(data) 
   }catch(error){
     toast?.error(error?.message)
   }
}

const randomProductApi = async ()=>{
  try{
       setLodding(true) 
   const response = await fetch(`${DomainUrl.url}randomProduct`)
   const data = await response.json()
    setLodding(false) 
    setRandomProduct(data)
   
  }catch(error){
    toast.error(error?.message)
  }
} 
 useEffect(()=>{ 
  fetchApi()
  categryapi()   
  userFechApi()
  coutCartFetchApi()
  LatestProductApi()
  randomProductApi() 
  
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
const contextValue = {setIsPopUp,latestProduct,userFechApi,lodding,coutCartFetchApi,coutCartData,setUserDetails,userDetails,randomProduct, allProduct, allProductsCategry,fetchApi,categryapi}
  return (
    <ContestContext.Provider value={contextValue}>
      {children}
    </ContestContext.Provider>
  );
};
 