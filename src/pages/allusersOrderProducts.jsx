import {useState,useEffect,useRef} from 'react'
import{ toast } from 'react-hot-toast';
 import DomainUrl from '../Configuration/Index' 
import {NavLink,useNavigate} from "react-router-dom"; 
import OrderItems from '../components/orderItems'
const AllUsersOrderProduct = ()=>{ 
  const [allOrders,setAllOrders] = useState([])
  const [islodding,setIsLodding] = useState(false)
  const [tab,setTab] = useState('all')
  const userOrderProductApi = async()=>{
  try{
    setIsLodding(true)
    const response = await fetch(`${DomainUrl.url}allOrderProducts`,{
        method:"GET",
        credentials:"include"
      })
    const data = await response.json()
    setIsLodding(false)
    setAllOrders(data.data) 
  }catch(error){
    toast.error(error.message)
  }
} 
  useEffect(()=>{
    userOrderProductApi()
  },[])
  
  let filterOrderProduct
  if(tab == 'all'){ 
      filterOrderProduct = allOrders
  }else if(tab == 'Orders'){
    const filterProduct = allOrders.filter((e)=>{
      return e.orderType == "default"
    })
    filterOrderProduct = filterProduct
  }else if(tab == 'cancel'){
     const filterProduct = allOrders.filter((e)=>{
      return e.orderType == "cancel"
    })
    filterOrderProduct = filterProduct
  }else{
     const filterProduct = allOrders.filter((e)=>{
      return e.orderType == "done"
    })
    filterOrderProduct = filterProduct
  }
 const style = (color)=>{
   return `px-4 py-1 border border-${color}-500 text-${color}-500 hover:bg-${color}-500 hover:text-white rounded uppercase text-sm font-bold transition ease-in-out delay-150 duration-400`
 }
  return(
    <>
    <div style={{ scrollbarWidth: "none"}} className="w-screen border overflow-scroll border-b-2 mb-2 border-slate-500 gap-1 py-2 px-3 flex">
     <NavLink onClick={()=>setTab('all')}   className={style('green')}>All</NavLink> 
     <NavLink onClick={()=>setTab('Orders')}    className={style('pink')}>Orders</NavLink>
      <NavLink onClick={()=>setTab('cancel')}    className={style('red')}>cancel</NavLink> 
      <NavLink onClick={()=>setTab('complete')}    className={style('green')}>complete</NavLink> 
    </div>
     {tab == 'all' &&(
         <OrderItems islodding={islodding} userOrderProductApi={userOrderProductApi} allOrders={filterOrderProduct} />
       )}
       {tab == 'cancel' &&(
         <OrderItems islodding={islodding} userOrderProductApi={userOrderProductApi} allOrders={filterOrderProduct} />
       )}
         {tab == 'complete' &&(
         <OrderItems islodding={islodding} userOrderProductApi={userOrderProductApi} allOrders={filterOrderProduct} />
       )}
         {tab == 'Orders' &&(
         <OrderItems islodding={islodding} userOrderProductApi={userOrderProductApi} allOrders={filterOrderProduct} />
       )}
     </>
    )
  
}
export default AllUsersOrderProduct