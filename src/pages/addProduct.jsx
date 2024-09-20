import {useState,useEffect, useContext} from 'react'
import logo5 from '../asetes/upload.jpg'
import {ContestContext} from '../api/ContestContext'
import DomainUrl from '../Configuration/Index'
import UploadImage from '../helpers/uploadsImage'
import{ toast } from 'react-hot-toast';
import UploadProductForm from '../components/uploadProductForm'
import DeleteImageCloudnary from '../helpers/deleteImageCloudnary'
import NoContent from '../components/noContent'
import LoddingCardComponent from '../components/loddingCardComponent'
 import SpeechMessage from '../components/speechMessage'
const AddProduct = ()=>{

  const [formBox,setFormBox] = useState(false)
  const [formHeader,setFormHeader] = useState(false)
  const [updateForm,setUpdateForm] = useState(false)
  const [productId,setProductId] = useState('')
  const [products,setProducts] = useState({
    name:'',
    oldPrice:'',
    newPrice:'',
    image:[],
    categry:'',
    productInfo:'',
  })
  const [image,setImage] = useState('')
  const {allProduct,fetchApi,lodding,allProductsCategry}= useContext(ContestContext)
 
  const imageHandler = async(e)=>{
 try{
      const uploadsimage = e.target.files[0] 
    const uploadsimageresponse = await UploadImage(uploadsimage)
    const obj = {img:uploadsimageresponse.url,public_id:uploadsimageresponse.public_id}
  setProducts((preve)=>{
     return{
       ...preve,
       image:[...preve.image,obj]
     }
  })
  toast.success('uploded')
  SpeechMessage("image uploded")
 
 }catch(error){
   toast.error(error?.message)
   SpeechMessage(error?.message)
 }
    
  }
  
  
  const productValue = async(e)=>{
    setProducts({...products,[e.target.name]:e.target.value})
    try{
    await  localStorage.setItem('products',JSON.stringify({...products})) 
    }catch(error){
      toast.error(error?.message)
      SpeechMessage(error?.message)
    }
  
     
  }
  useEffect(()=>{
      const getproduct = JSON.parse(localStorage.getItem('products')) 
      if(getproduct){
        setProducts({
     name:getproduct?.name,
    oldPrice:getproduct?.oldPrice,
    newPrice:getproduct?.newPrice,
    image:getproduct?.image,
    categry:getproduct?.categry,
    productInfo:getproduct?.productInfo,
     }) 
      }
      
     console.log(getproduct)
  },[])
  const submitHandler = async (e)=>{
    e.preventDefault()   
    try{
     await fetch(`${DomainUrl?.url}addproduct`,{
      method:'POST',
      headers:{
        Accept:'application/json',
        "Content-type":"application/json",
      },
      body:JSON.stringify(products),
    })
    .then((res)=> res.json()).then((data)=> { 
      if(!data?.success){
        toast.error(data?.message)
        SpeechMessage(data?.message)
      } 
      if(data?.success){
        toast.success(data?.message)
        fetchApi()
        localStorage?.removeItem('products')
        setProducts({
    name:'',
    oldPrice:'',
    newPrice:'',
    image:'',
    categry:'',
    productInfo:'',
  })
   SpeechMessage(data?.message)
      }
      
    })
      
    
    
      
    }catch(error){
     toast.error(error?.message)
     SpeechMessage(error?.message)
    }
  
     
  }
  
  const productEdite =async (e)=>{
    try{
      const response = await fetch(`${DomainUrl.url}findByIdProduct/${e}`)
      const data = await response.json()
    
     if(!data.success){
       toast.error(data.message)
       SpeechMessage(data?.message)
     }
     if(data.success){
       toast.success(data.message)
       SpeechMessage(data?.message)
        await setProducts({
     name:data?.data?.name,
    oldPrice:data?.data?.oldPrice,
    newPrice:data?.data?.newPrice,
    image:data?.data?.image,
    categry:data?.data?.categry,
    productInfo:data?.data?.productInfo,
     }) 
     setProductId(e)
     setUpdateForm(true)
     }
    }catch(error){
      toast.error(error?.message)
      SpeechMessage(error?.message)
    }
  }
  
  const updateHandler = async(e)=>{
    e.preventDefault() 
    if(!productId){
      toast.error('Update Iteams not found')
      SpeechMessage("Update Iteams not found")
      return false
    }
  try{
     const response = await fetch(`${DomainUrl.url}updateProduct/${productId}`,{
      method:'POST',
      headers:{
        Accept:'application/json',
        "Content-type":"application/json",
      },
      body:JSON.stringify(products),
    })
    const data = await response.json() 
    if(!data.success){
      toast.error(data.message)
      SpeechMessage(data?.message)
      return false
    }
     if(data.success){
       toast.success(data.message)
         fetchApi()
        localStorage.removeItem('products')
        setProducts({
    name:'',
    oldPrice:'',
    newPrice:'',
    image:'',
    categry:'',
    productInfo:'',
  })
  SpeechMessage(data?.message)
     }
  
  }catch(error){
   toast.error(error.message)
   SpeechMessage(error?.message)
  }
  }
  const productDelete = async (id,img)=>{
  try{
    
  
  const confirm = window.confirm('are you sure you want to delete this')
    
    if(!confirm){
      return false
    }
    
    
  const resposedeleteimage = await  DeleteImageCloudnary(img || "dbeb3x4dh",'deleteCloudnaryImageMulltiple') 
 
  if(!resposedeleteimage?.success){
    toast.error(resposedeleteimage.message) 
    SpeechMessage(resposedeleteimage?.message)
    return false
 } 
  toast.success(resposedeleteimage?.message) 
  SpeechMessage(resposedeleteimage?.message)
  //  alert('product deleted ---'+ id) 
    const response = await fetch(`${DomainUrl.url}imageDelete`,{
       method:'DELETE',
       headers:{
         Accept:'application/json',
         "Content-type":"application/json",
       },
       body:JSON.stringify({_id:id}),
     })
    const data = await response.json()
    if(!data.success){
      toast.error(data.message)
      SpeechMessage(data?.message)
      return false
    }
     fetchApi()
    toast.success(data.message)
    SpeechMessage(data?.message)
  }catch(error){
    toast.error(error.message)
    SpeechMessage(error?.message)
  }
  }
  
 
  
  return(
     <> 
      <div className="addProduct">
        <h5>AddProducts</h5>
        <div className="additeam" onClick={()=> {
        setFormHeader(false) 
        setFormBox(true)}}>Add</div> <div className="additeam" onClick={()=> {
        setUpdateForm(true)
        setFormHeader(true)
        }}>Update</div>
      </div>
      
       {
         formBox && (
             <UploadProductForm fetchApi={fetchApi} formHeader={formHeader} imageHandler={imageHandler} productValue={productValue} products={products} image={logo5} setProducts={setProducts} submitHandler={submitHandler} categProduct={allProductsCategry} updateForm={{setUpdateForm,updateForm}} setFormBox={setFormBox}/>
           )
            
       }
       {
             updateForm && (
             <UploadProductForm formHeader={formHeader} imageHandler={imageHandler} productValue={productValue} products={products} image={logo5} submitHandler={updateHandler} categProduct={allProductsCategry} updateForm={{setUpdateForm,updateForm}}  setFormBox={setFormBox}/>
           )
           
           
       } 
       
       {
         lodding ?(
           <div className=" w-full justify-center flex flex-wrap overflow-hidden">
           {[0,1,2,3,4,5,2,34,5,2,5,2].map(()=> <LoddingCardComponent />)}
           </div> 
           ):(
             allProduct.length == 0 ? (
               <NoContent message='no products' />
               ):(
                  <div className="showProduct">
                {allProduct.map((iteam,index)=>{ 
                return(
                   <div className="productIteam" keys={index}>
                    <div className="productDelete"onClick={()=>{productDelete(iteam?._id,iteam?.image)}}>✕</div>
                    <img src={iteam?.image[0]?.img} alt="image" />
                    <div className="productUpdata" onClick={()=>{productEdite(iteam?._id)}}>🖍</div>
                   </div>
                )})}
                   </div>
                 ))} 
     </>
    )
}
export default AddProduct