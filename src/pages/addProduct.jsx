import {useState,useEffect, useContext} from 'react'
import logo5 from '../asetes/upload.jpg'
import {ContestContext} from '../api/ContestContext'
import DomainUrl from '../Configuration/Index'
import UploadImage from '../helpers/uploadsImage'
import{ toast } from 'react-hot-toast';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import UploadProductForm from '../components/uploadProductForm'
import DeleteImageCloudnary from '../helpers/deleteImageCloudnary'
import NoContent from '../components/noContent'
import LoddingCardComponent from '../components/loddingCardComponent'
import SpeechMessage from '../components/speechMessage' 
import ProductDisplay from '../components/productdisplay'
const AddProduct = ()=>{

  const [formBox,setFormBox] = useState(false)
  const [formHeader,setFormHeader] = useState(false)
  const [updateForm,setUpdateForm] = useState(false)
  const [productId,setProductId] = useState('')
  const [products,setProducts] = useState({ 
      categry:'',
      name:'',
      productInfo:[],
      productdiscription:'',
      oldPrice:'',
      newPrice:'',
      similarName:'',
      image:[],
      size:[],
      sizable:'',
      keyfeuter:'',
      stock:'',
  })
  const [image,setImage] = useState('')
  const [addproductlodding,setaddproductlodding] = useState(false)
  const [updateproductlodding,setupdateproductlodding] = useState(false)
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
 }
    
  } 
  
  const productValue = async(e)=>{
    setProducts({...products,[e.target.name]:e.target.value}) 
    try{
    await  localStorage.setItem('products',JSON.stringify({...products})) 
    }catch(error){
      toast.error(error?.message) 
    }
  
     
  }
  
  useEffect(()=>{
      const getproduct = JSON.parse(localStorage.getItem('products')) 
       
      if(getproduct){
        setProducts({
        categry:getproduct?.categry,
        name:getproduct?.name,
        oldPrice:getproduct?.oldPrice,
        newPrice:getproduct?.newPrice,
        productInfo:getproduct?.productInfo,
        similarName:getproduct?.similarName,
        image:getproduct?.image,
        stock:getproduct?.stock, 
        size:getproduct?.size,
        sizable:getproduct?.sizable,
        keyfeuter:getproduct?.keyfeuter,
        productdiscription:getproduct?.productdiscription
    }) 
      }
       
  },[])
  
  const submitHandler = async (e)=>{
    e.preventDefault()   
    try{
      setaddproductlodding(true)
   const response =   await fetch(`${DomainUrl?.url}addproduct`,{
      method:'POST',
      headers:{
        Accept:'application/json',
        "Content-type":"application/json",
      },
      body:JSON.stringify(products),
    }) 
  const data = await response.json()  
      setaddproductlodding(false)
     if(!data?.success){
        toast.error(data?.message) 
        return false
      } 
       toast.success(data?.message)
        fetchApi()
        localStorage?.removeItem('products')
        setProducts({  name:'',similarName:'',stock:'',sizable:'',keyfeuter:'',oldPrice:'',newPrice:'',size:[],image:[],categry:'', productInfo:[],productdiscription:''})
    }catch(error){
      setaddproductlodding(false)
     toast.error(error?.message) 
    }
  
     
  }
  
  const productEdite =async (e)=>{
    try{
      const response = await fetch(`${DomainUrl.url}findByIdProduct/${e}`)
      const data = await response.json()
    
     if(!data.success){
       toast.error(data.message)
       return false
     }
       toast.success(data.message)
        await setProducts({
     name:data?.data?.name,
    oldPrice:data?.data?.oldPrice,
    newPrice:data?.data?.newPrice,
    image:data?.data?.image,
    categry:data?.data?.categry,
    similarName:data?.data?.similarName,
    stock:data?.data?.stock,
    size:data?.data?.size,
    sizable:data?.data?.sizable,
    keyfeuter:data?.data?.keyfeuter,
    productInfo:data?.data?.productInfo,
    productdiscription:data?.data?.productdiscription,
     }) 
     setProductId(e)
     setUpdateForm(true)
     setFormHeader(true)
    }catch(error){
      toast.error(error?.message) 
    }
  }
  
  const updateHandler = async(e)=>{
    e.preventDefault() 
    if(!productId){
      toast.error('please select whitch product edite')
      return false
    }
  try{
    setupdateproductlodding(true)
     const response = await fetch(`${DomainUrl.url}updateProduct/${productId}`,{
      method:'POST',
      headers:{
        Accept:'application/json',
        "Content-type":"application/json",
      },
      body:JSON.stringify(products),
    })
    const data = await response.json() 
    setupdateproductlodding(false)
    if(!data.success){
      toast.error(data.message) 
      return false
    }
     toast.success(data.message)
       fetchApi()
        localStorage.removeItem('products')
        setProducts({sizable:"",keyfeuter:'',size:[],stock:"",name:'',similarName:'',oldPrice:'',newPrice:'',image:[],categry:'',productInfo:[],productdiscription:''})
 
  }catch(error){
    setupdateproductlodding()
   toast.error(error.message) 
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
    return false
 } 
  toast.success(resposedeleteimage?.message)
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
  
  const [productpreview,setproductpreview] = useState(true)
  
  return(
     <> 
     <div className="flex px-2"><button onClick={()=>setproductpreview(!productpreview)} className="p-2 text-slate-700  my-2 px-12 cursor-pointer uppercase font-bold  bg-yellow-200 hover:text-white hover:bg-yellow-500">{!productpreview ? "close preview" :"open preview"}</button></div>
     {
       productpreview && 
      <div className="flex flex-col items-center ">
        <h5 className="p-2 text-slate-700 my-2 px-12 uppercase font-bold bg-yellow-300">AddProducts</h5>
        
         <div className="flex mb-2 justify-center gap-2">
         
             <div 
        className="px-8 font-bold hover:bg-green-600 hover:text-white cursor-pointer py-1 bg-green-100 text-green-700"
        onClick={()=> { 
        setUpdateForm(false)
        setFormHeader(false)
        setFormBox(true)
          
        }}>Add</div>
        
        <div className="px-8 font-bold cursor-pointer hover:bg-green-600 hover:text-white py-1 bg-green-100 text-green-700" onClick={()=> {
        setUpdateForm(true)
        setFormHeader(true)
        setFormBox(false)
        }}>Update</div>
         </div>
      </div>
     }
     
     {
         productpreview &&
         formBox && (
             <UploadProductForm submitproductlodding={addproductlodding} fetchApi={fetchApi} formHeader={formHeader} imageHandler={imageHandler} productValue={productValue} products={products} image={logo5} setProducts={setProducts} submitHandler={submitHandler} categProduct={allProductsCategry} updateForm={setUpdateForm} setFormBox={setFormBox}/>
           )
            
       }
       
     {
         productpreview &&
         updateForm && (
             <UploadProductForm submitproductlodding={updateproductlodding} formHeader={formHeader} imageHandler={imageHandler} productValue={productValue} products={products} image={logo5} submitHandler={updateHandler} setProducts={setProducts} categProduct={allProductsCategry} updateForm={setUpdateForm}  setFormBox={setFormBox}/>
           ) 
       }
       
     {
         !productpreview ? null : 
         lodding ?(
           <div className=" w-full justify-center flex flex-wrap overflow-hidden">
           {[0,1,2,3,4,5,2,34,5,2,5,2].map(()=> <LoddingCardComponent />)}
           </div> 
           ):(
             allProduct.length == 0 ? (
               <NoContent message='no products' />
               ):(
                  <div className="flex justify-center flex-wrap gap-1 min-h-40 w-full ">
                {
                
                allProduct.map((iteam,index)=>{ 
                return(
                  <div key={index} className="group border shadow-md  relative min-w-[115px] max-w-[115px] max-h-[130px] min-h-[130px] bg-white" >
                  <div className="text-white px-1 absolute top-0 right-[40%] border bg-black">{iteam.stock}</div>
                   <div className="group-hover:block transitoin delay-150 ease-in-out hidden cursor-pointer p-1 border text-red-500 hover:bg-red-500 hover:text-white  bg-white border-red-600 absolute"onClick={()=>{productDelete(iteam?._id,iteam?.image)}}><MdDeleteForever /></div>
                    <div className="group-hover:block hover:text-white hover:bg-green-600  cursor-pointer hidden top-0 border-green-600 border bg-white p-1 text-green-500 right-0 absolute" onClick={()=>{productEdite(iteam?._id)}}><FaRegEdit /></div>
                    <img className="object-contain h-full w-full" SRC={iteam?.image[0]?.img} alt="image" />
                 
                  </div>
                )})
                  
                }
                   </div>
                 ))} 
    
    {
     ! productpreview &&
      <ProductDisplay visible={true} result={products} />
    }           
     
     </>
    )
}
export default AddProduct