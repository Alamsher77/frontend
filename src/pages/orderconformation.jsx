import React, { useState,useEffect,useContext } from 'react'; 
import { useLocation,useNavigate} from 'react-router-dom'
import {ContestContext} from '../api/ContestContext'
import {toast} from 'react-hot-toast'
import DomainUrl from '../Configuration/Index'
const OrderConformation = ()=> {
   const { userDetails,coutCartFetchApi }= useContext(ContestContext)
  const navigate = useNavigate()
  const {state}  = useLocation() 
  // if not get state from url then redurect to home screen
 const [changesUserValue,setChangesUserValue] = useState()
  const [address, setAddress] = useState(null);
    useEffect(()=>{
     !state && navigate('/') 
    userDetails && setAddress(`${changesUserValue?.currentAddress} , ${changesUserValue?.deleverAddress} , ${changesUserValue?.block},${changesUserValue?.city} , ${changesUserValue?.state} , ${changesUserValue?.country}`)
   },[changesUserValue])
   
   useEffect(()=>{
      userDetails && setChangesUserValue(userDetails)
   },[userDetails])
  const [editMode, setEditMode] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

 
 const grandTotal = state?.reduce((prev,next)=>{
   return  prev + Number(next?.productId?.newPrice * next?.quantity) 
 },0)
 
// address functionaliti
  const [userValue,setUserValue] = useState()
   const changeHandler = (e)=>{ 
   setUserValue({...userValue,[e.target.name]:e.target.value})
 } 
 
 const [userchangeslodding,setuserchangslodding] = useState(false)
 
   const handleAddressUpdate = async() => {
  try {
        
      setuserchangslodding(true)
     const response = await fetch(`${DomainUrl.url}userUpdate`, {
        method: 'POST',
         credentials:'include',
        headers: {
          Accept: 'application/json',
          "Content-type": "application/json",
        },
        body: JSON.stringify(userValue),
      })
      const data = await response.json()
      if(data?.success){
        toast.success(data?.message)
        setuserchangslodding(false)
        setEditMode(false)
         setChangesUserValue((prev)=>({...prev,...userValue})) 
      }else{
        setuserchangslodding(false)
        toast.error(data?.message)
      }
        } catch (e) {
          setuserchangslodding(false)
    toast.error(e.message)
  }
    
  };
 
 const [placeOrderLodding,setPlaceOrderLodding] = useState(false)
 const placeOrderHandler = async ()=>{
 try {
     setPlaceOrderLodding(true)
    const response = await fetch(`${DomainUrl.url}cheqoutAndPayment`,{
      method: 'POST',
       credentials:'include',
        headers: {
          Accept: 'application/json',
          "Content-type": "application/json",
        },
        body: JSON.stringify({paymentMethod,data:state && state}),
    })
  
  const data = await response.json()
  setPlaceOrderLodding(false)
   if(!data?.success){
     toast.error(data?.message)
     return false
   }
  toast.success(data?.message)
  
  coutCartFetchApi()
 } catch (e) {
   setPlaceOrderLodding(false)
   toast.error(e.message)
 }
 }
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

      {/* Address Section */}
      <div>
        <div className="p-4 space-y-3">
          <h3 className="text-lg font-semibold">Shipping Address</h3>
          {editMode ? (
            <div  className="select-none shadow shadow-gray-600 bg-pink-100  gap-2 flex flex-col items-center w-full  p-2">
       
     
        
          <div className="mb-2"> 
           <h1 className="mb-1">CurrentAddress *</h1>
          <input name="currentAddress" onChange={changeHandler}    className="rounded font-bold bg-gray-700 text-white border-4 outline-none border-pink-300 border px-4 py-1" typ="text" placeholder="currentAddress" />
          </div> 
          
          <div className="mb-2"> 
           <h1 className="mb-1">DeleverAddress</h1>
          <input name="deleverAddress" onChange={changeHandler}     className="rounded font-bold bg-gray-700 text-white border-4 outline-none border-pink-300 border px-4 py-1" typ="text" placeholder="deleverAddress" />
          </div> 
          
           <div className="mb-2"> 
           <h1 className="mb-1">Block</h1>
          <input name="block" onChange={changeHandler}   className="rounded font-bold bg-gray-700 text-white border-4 outline-none border-pink-300 border px-4 py-1" typ="text"  placeholder="block" />
          </div> 
          
           <div className="mb-2"> 
           <h1 className="mb-1">City</h1>
          <input name="city" onChange={changeHandler}  className="rounded font-bold bg-gray-700 text-white border-4 outline-none border-pink-300 border px-4 py-1" typ="text"   placeholder="city" />
          </div> 
          
           <div className="mb-2"> 
           <h1 className="mb-1">State</h1>
          <input name="state" onChange={changeHandler}   className="rounded font-bold bg-gray-700 text-white border-4 outline-none border-pink-300 border px-4 py-1" typ="text"   placeholder="state" />
          </div> 
          
           <div className="mb-2"> 
           <h1 className="mb-1">country</h1>
          <input name="country" onChange={changeHandler}    className="rounded font-bold bg-gray-700 text-white border-4 outline-none border-pink-300 border px-4 py-1" typ="text"  placeholder="country" />
          </div> 
       </div>
          ) : (
            <p>{address}</p>
          )}
        { editMode ? <button className="border border-pink-300 px-4 bg-pink-100 text-gray-500 uppercase" disabled={userchangeslodding} onClick={handleAddressUpdate}>{userchangeslodding ? "Lodding....":"Save Address"}</button> : <button className="border border-pink-300 px-4 bg-pink-100 text-gray-500 uppercase" onClick={()=> setEditMode(true)}>{userDetails?.currentAddress ? "Add Address" : "Change Address"}</button>}
        </div>
      </div>

      {/* Product Section */}
         <h3 className="text-lg font-semibold">Ordered Product</h3>
    {  
     state && 
      state.map((iteam,index)=>{ 
        return( 
        <div key={index} className="p-4 space-y-4"> 
          <div className="flex gap-4">
            <img src={iteam?.productId?.image[0]?.img} alt={iteam?.productId?.name} className="w-24 h-24 rounded border" />
            <div className="space-y-1">
              <p className="font-medium">{iteam?.productId?.name}</p>
             {iteam?.size &&  <p>Size: {iteam?.size}</p>}
              <p>Quantity: {iteam?.quantity}</p>
              <p>Price: ₹{iteam?.productId?.newPrice} </p> 
              <p>Total: ₹{iteam?.productId?.newPrice * iteam?.quantity} </p> 
            </div>
          </div>
            
        </div> 
        )
      })
    }

      {/* Payment Method */}
      <p className=" text-blue-500 font-bold">Grand Total: ₹{grandTotal}</p>
      <div>
        <div className="p-4 space-y-3">
          <h3 className="text-lg font-semibold">Payment Method</h3>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="COD" 
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
            <label className="flex text-gray-500 items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="Online"
                disabled 
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Pay Online
            </label>
          </div>
        </div>
      </div>

      <button onClick={placeOrderHandler} disabled={placeOrderLodding} className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-2 rounded">
       {placeOrderLodding ? 'Lodding....':' Place Order'}
      </button>
    </div>
  );
}


export default OrderConformation