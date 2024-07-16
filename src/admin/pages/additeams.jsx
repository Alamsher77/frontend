import {useState,useEffect} from 'react'
import logo5 from '../asetes/upload.jpg'
export const Additeams = ()=>{
  const [formBox,setFormBox] = useState('hide')
  const [products,setProducts] = useState({
    name:'',
    oldPrice:'',
    newPrice:'',
    image:'',
    productInfo:'',
  })
  const [image,setImage] = useState(false)
  const [allProduct,setAllProduct] = useState([])
  
 
  const imageHandler = (e)=>{
    setImage(e.target.files[0])
  
  }
  
  const productValue = (e)=>{
    setProducts({...products,[e.target.name]:e.target.value})
  }
  
  const showProduct = async ()=>{
    let responseData
     await fetch('http://localhost:4000/api/showProduct')
     .catch((error)=> alert("can't fetch"))
     .then((res)=> res.json())
     .then((data)=>  responseData = data)
     setAllProduct(responseData) 
     return responseData
  }
  
  useEffect(()=>{
    showProduct()
  },[])
  
  console.log(allProduct)
  const submitHandler = async (e)=>{
    e.preventDefault()
     let responseData ;
     let formData = new FormData();
     formData.append('product',image)
    
    try{
      // image fetch
      await fetch('http://localhost:4000/api/uploadImage',{
       method:'POST',
       headers:{
         Accept:'application/json',
       },
       body:formData,
     })
     .catch((error)=> alert('fetch error'))
     .then((res)=> res.json()).then((data)=> responseData = data)
     if(responseData.success){
       products.image = responseData.image_url
       
    await fetch('http://localhost:4000/api/addproduct',{
       method:'POST',
       headers:{
         Accept:'application/json',
         "Content-type":"application/json",
       },
       body:JSON.stringify(products),
     })
     .then((res)=> res.json()).then((data)=> {
       
       if(!data.success){
         alert(data.message)
       }
       
       if(data.success){
         alert("product added")
       }
       showProduct()
     })
      
      
     }
     
     
    
      
    }catch(error){
      console.log(error)
    }
  
     
  }
  
  const productEdite = ()=>{
    alert('product edited')
  }
  const productDelete = async (id)=>{
    
    const confirm = window.confirm('are you sure you want to delete this')
    
    if(!confirm){
      return false
    }
    
  //  alert('product deleted ---'+ id)
     await fetch('http://localhost:4000/api/imageDelete',{
       method:'DELETE',
       headers:{
         Accept:'application/json',
         "Content-type":"application/json",
       },
       body:JSON.stringify({_id:id}),
     }).then((res)=> res.json()).then((data)=>{
       if(data.success){
         alert(data.message)
       }
     })
     showProduct()
  }
  return(
     <>
    
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
          <div className="inputfle">
           <label htmlFor="file-name">
            <img src={image ? URL.createObjectURL(image): logo5}  alt="imag"/>
           </label>
           <input type="file" onChange={imageHandler}  id="file-name" hidden />  
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
      
      
      <div className="addProduct">
        <h5>AddProducts</h5>
        <div className="additeam" onClick={()=> {setFormBox('')}}>Add</div>
      </div>
      
      <div className="showProduct">
      {
      allProduct.length == 0 ? <div >no product</div> : allProduct.map((iteam,index)=>{
          return <div className="productIteam" key={index}>
          <div className="productDelete"onClick={()=>{productDelete(iteam._id)}}>✕</div>
        <img src={iteam.image} alt="image" />
        <div className="productUpdata" onClick={productEdite}>🖍</div>
        </div>
        })
      
       
      }
      </div>
     </>
    )
}