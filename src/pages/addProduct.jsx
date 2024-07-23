import {useState,useEffect, useContext} from 'react'
import logo5 from '../asetes/upload.jpg'
import {ContestContext} from '../api/ContestContext'
import DomainUrl from '../Configuration/Index'
import UploadImage from '../helpers/uploadsImage'
import{ toast } from 'react-hot-toast';
const AddProduct = ()=>{
  
  const [formBox,setFormBox] = useState('hide')
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
   console.log(error)
 }
    
  }
  
  
  const productValue = (e)=>{
    setProducts({...products,[e.target.name]:e.target.value})
  }
  
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
  
  const productEdite = ()=>{
    toast.success('product edited')
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
        <div className="additeam" onClick={()=> {setFormBox('')}}>Add</div>
      </div>
      
      
      <div className={`AddProductForm  ${formBox}`}>
        <div className='closeForm' onClick={()=> setFormBox('hide')}>✕</div>
        <h3>Add-Products</h3>
        <form onSubmit={submitHandler}>
         <div className="inputfields">
          <lable>Product Name</lable>
          <input type="text" value={products.name} onChange={productValue} name='name' placeholder="ProductName"/>
         </div>
          <div className="inputfields">
          <lable>OldPrice</lable>
          <input type="number"  value={products.oldPrice} onChange={productValue} name='oldPrice' placeholder="OldPrice"/>
         </div>
          <div className="inputfields">
          <lable>NewPrice</lable>
          <input type="number"  value={products.newPrice} onChange={productValue} name='newPrice' placeholder="NewPrice"/>
         </div>
         <div className="inputfields">
         <select value={products.categry} onChange={productValue} name="categry">
          <option>...Select Categry...</option>
           
          {
            allProductsCategry.map((iteam,index)=>{
              return <option key={index} value={iteam.categry}>{iteam.categry}</option>
                     
            })
          }
         </select>
         </div>
          <div className="flex items-center gap-2">
           <div className="w-28">
            <label htmlFor="file-name">
            <img src={logo5} className="w-full border"  alt="imag"/>
           </label>
           <input type="file" onChange={imageHandler}  id="file-name" hidden />  
           </div>
           <div onClick={imageHandler} className='flex flex-1  '>
            {
               products.image.length == 0 ?(
                <div className="text-red-500"> * please upload image</div>
               ):(
                <div className="w-full flex gap-1 p-2 flex-wrap">
                 {
                
                   products.image.map((iteams,index)=>{
                    return <img key={index} className="w-12 h-12" src={iteams}/>
                     
                   })
                 }
                </div>
               )
            }
           </div>
         </div>
          <div className="textarea">
          <lable>Description</lable>
          <textarea type="text"  value={products.productInfo} onChange={productValue} name='productInfo' placeholder="type heare...." />
         </div>
         <div className="button" >
         <button type="submit">submit</button>
         </div>
        </form>
      </div>
      
      
      
      <div className="showProduct">
      {
      allProduct.length == 0 ? <div >no product</div> : allProduct.map((iteam,index)=>{
          return <div className="productIteam" key={index}>
          <div className="productDelete"onClick={()=>{productDelete(iteam._id)}}>✕</div>
        <img src={iteam.image[0]} alt="image" />
        <div className="productUpdata" onClick={productEdite}>🖍</div>
        </div>
        })
      
       
      }
      </div>
     </>
    )
}
export default AddProduct