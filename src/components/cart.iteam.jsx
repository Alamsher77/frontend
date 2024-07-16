import DomainUrl from '../Configuration/Index'

// src/components/Cart.js 
import './Cart.css';
import{ toast } from 'react-hot-toast';
import {useState,useContext,useEffect} from "react"
import {ContestContext} from '../api/ContestContext'
import { Grid} from 'react-loader-spinner'
import {Link} from 'react-router-dom'
const CartIteam = (props) => {
const product = props.product.productId 
  const { coutCartFetchApi} = useContext(ContestContext) 
  const [lodding,setLodding] = useState(false)
const cartIteamDeleteHandler = async (id)=>{
     setLodding(true)
    const response = await fetch(`${DomainUrl.url}cartDelete`,{
        method:"POST",
        credentials:"include",
       headers:{
        Accept:'application/json',
        "Content-type":"application/json",
      },
        body:JSON.stringify({id})
      })
     .catch((error)=> console.log(error))
     const data = await response.json()
     if(data.success){
      toast.success(data.message)
      props.cartProductViewFetch()
      coutCartFetchApi()
      setLodding(false)
     }
}




 
  return (
   <div className="h-24 shadow-lg m-1 gap-1 flex items-center ">
        {
          lodding ? <Grid
  visible={true}
  height="50"
  width="50"
  color="gray"
  ariaLabel="grid-loading"
  radius="12.5"
  wrapperStyle={{}}
  wrapperClass="grid-wrapper"
  />:  <Link to={`/product/${product._id}`} className="h-12 w-20 relative bg-red-200 flex justify-center items-center"> <img src={product?.image} className="w-full absolute x-0 y-0 object-cover h-full" alt="" /></Link>
        }
      <div className="flex justify-between p-1 w-full   items-center ">
        <h2 className="w-20  text-nowrap text-ellipsis overflow-hidden">{product?.name}</h2>
        <p>₹{product?.newPrice}</p>
        <button className="p-2 hover:text-white   " onClick={()=> cartIteamDeleteHandler(props?.product._id)}>Remove</button>

      </div>
    </div>
  );
};

export default CartIteam;
