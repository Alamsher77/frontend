import {useState,useEffect, useContext} from 'react'
import logo5 from '../asetes/upload.jpg'
import {ContestContext} from '../api/ContestContext'
import DomainUrl from '../Configuration/Index'
import UploadImage from '../helpers/uploadsImage'
import{ toast } from 'react-hot-toast';
import UploadProductForm from '../components/uploadProductForm'
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
  const {allProduct,fetchApi,allProductsCategry}= useContext(ContestContext)
  
 
  const imageHandler = async(e)=>{
 try{
      const uploadsimage = e.target.files[0]
    const uploadsimageresponse = await UploadImage(uploadsimage)
    
  setProducts((preve)=>{
     return{
       ...preve,
       image:[...preve.image,uploadsimageresponse.url]
     }
  })
 }catch(error){
   alert(error)
 }
    
  }
  
  
  const productValue = async(e)=>{
    setProducts({...products,[e.target.name]:e.target.value})
    try{
    await  localStorage.setItem('products',JSON.stringify({...products})) 
    }catch(error){
      alert(error)
    }
  
     
  }
  useEffect(()=>{
      const getproduct = JSON.parse(localStorage.getItem('products')) 
      if(getproduct){
        setProducts({
     name:getproduct.name,
    oldPrice:getproduct.oldPrice,
    newPrice:getproduct.newPrice,
    image:getproduct.image,
    categry:getproduct.categry,
    productInfo:getproduct.productInfo,
     }) 
      }
      
     console.log(getproduct)
  },[])
  const submitHandler = async (e)=>{
    e.preventDefault()   
    try{
     await fetch(`${DomainUrl.url}addproduct`,{
      method:'POST',
      headers:{
        Accept:'application/json',
        "Content-type":"application/json",
      },
      body:JSON.stringify(products),
    })
    .then((res)=> res.json()).then((data)=> { 
      if(!data.success){
        toast.error(data.message)
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
      }
      
    })
      
    
    
      
    }catch(error){
     toast.error(error)
    }
  
     
  }
  
  const productEdite =async (e)=>{
    try{
      const response = await fetch(`${DomainUrl.url}findByIdProduct/${e}`)
      const data = await response.json()
     await setProducts({
     name:data.data.name,
    oldPrice:data.data.oldPrice,
    newPrice:data.data.newPrice,
    image:data.data.image,
    categry:data.data.categry,
    productInfo:data.data.productInfo,
     }) 
     setProductId(e)
     setUpdateForm(true)
     if(!data.success){
       toast.error(data.message)
     }
     if(data.success){
       toast.success(data.message)
     }
    }catch(error){
      alert(error)
    }
  }
  
  const updateHandler = async(e)=>{
    e.preventDefault() 
    if(!productId){
      toast.error('Update Iteams to found')
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
      return false
    }
     if(data.success){
       toast.success(data.message)
     }
  
  }catch(error){
    alert(error)
  }
  }
  const productDelete = async (id)=>{
    
    const confirm = window.confirm('are you sure you want to delete this')
    
    if(!confirm){
      return false
    }
    
  //  alert('product deleted ---'+ id)
     await fetch(`${DomainUrl.url}imageDelete`,{
       method:'DELETE',
       headers:{
         Accept:'application/json',
         "Content-type":"application/json",
       },
       body:JSON.stringify({_id:id}),
     }).then((res)=> res.json()).then((data)=>{
       if(data.success){
         console.log(data.message)
         fetchApi()
       }
     })
    
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
             <UploadProductForm formHeader={formHeader} imageHandler={imageHandler} productValue={productValue} products={products} image={logo5} submitHandler={submitHandler} categProduct={allProductsCategry} updateForm={{setUpdateForm,updateForm}} setFormBox={setFormBox}/>
           )
            
       }
       {
             updateForm && (
             <UploadProductForm formHeader={formHeader} imageHandler={imageHandler} productValue={productValue} products={products} image={logo5} submitHandler={updateHandler} categProduct={allProductsCategry} updateForm={{setUpdateForm,updateForm}}  setFormBox={setFormBox}/>
           )
           
           
       }
      
      <div className="showProduct">
      {
      allProduct.length == 0 ? <div >no product</div> : allProduct.map((iteam,index)=>{
          return <div className="productIteam" key={index}>
          <div className="productDelete"onClick={()=>{productDelete(iteam._id)}}>✕</div>
        <img src={iteam.image[0]} alt="image" />
        <div className="productUpdata" onClick={()=>{productEdite(iteam._id)}}>🖍</div>
        </div>
        })
      
       
      }
      </div>
     </>
    )
}
export default AddProduct