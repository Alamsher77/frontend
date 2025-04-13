import { MdDelete } from "react-icons/md";
import{ toast } from 'react-hot-toast'; 
import {useState} from 'react'
import DeleteImageCloudnary from '../helpers/deleteImageCloudnary'
import SpeechMessage from './speechMessage'
import LoddingButton from './loddingbutton'
const UploadProductForm = ({submitproductlodding,setFormBox,updateForm,categProduct,products,submitHandler,image,setProducts,productValue,fetchApi,formHeader,imageHandler})=>{ 
  
  const removeImage = async(e,img)=>{
    try{ 
       const resposedeleteimage = await  DeleteImageCloudnary(img || "dbeb3x4dh",'deleteCloudnaryImage')
        if(!resposedeleteimage?.success){
          toast.error(resposedeleteimage?.message) 
          return false
        } 
        toast.success(resposedeleteimage?.message) 
       products.image.splice(e,1) 
       localStorage.setItem('products',JSON.stringify({...products})) 
        setProducts({...products})
       toast.success('update')
    }catch(error){
      toast.error(error?.message) 
    }
  }
  const [showsizebutton,setshowsizebutton] = useState(false)
  const [productsize,setprosize] = useState('') 
  const productsizehandlar = ()=>{
     try {
       if(!productsize) return false
          setProducts((prev)=>({...prev,size:[...prev.size,productsize]}))
           localStorage.setItem('products',JSON.stringify({...products})) 
           setprosize('')
           
           setshowsizebutton(false)
     } catch (e) {
       toast.error(e.message)
     }
        
  }
  
  // productDescripsionHandler functions
  const [discriptiontext,stetdiscriptiontext] = useState('')
  const [productdescriptiondata,setproductdescriptiondata] = useState({
    name:'',
    list:[]
  })
  const [showproductdescriptionbutton,setshowproductdescriptionbutton] = useState(false)
  const productDescripsionHandler = ()=>{
   
  try {
      if(productdescriptiondata?.list == [] || productdescriptiondata?.name == ''){
        toast.error('please type any text')
        return false 
      }
      
      setProducts((prev)=>({...prev,productInfo:[...prev.productInfo,productdescriptiondata]}))
      
    localStorage.setItem('products',JSON.stringify({...products}))
    
    setproductdescriptiondata({ name:'',
    list:[]})
    
    toast.success('product list added')
    setshowproductdescriptionbutton(false)
  } catch (e) {
    toast.error(e.message)
  }
   
  }
   const productDescripsionsetvaluehandler = ()=>{
          if(discriptiontext){
            setproductdescriptiondata((prev)=>({...prev,list:[...prev.list,discriptiontext]}))
           stetdiscriptiontext('')
          }
          
  }
  
  console.log(products)
  return(
    
     <div className='AddProductForm'>
        <div className='closeForm' onClick={()=> { 
         updateForm(false)
         setFormBox(false)  }}>✕</div>
        <h3>{ formHeader ? "UpdateProduct" :"AddProduct"}</h3>
        <form onSubmit={ submitHandler}>
         
         <div className="inputfields">
          <label>Product Name</label>
          <input type="text" value={products.name} onChange={productValue} name='name' placeholder="ProductName"/>
         </div>
          <div className="inputfields">
          <label>OldPrice</label>
          <input type="number"  value={products.oldPrice} onChange={productValue} name='oldPrice' placeholder="OldPrice"/>
         </div>
          <div className="inputfields">
          <label>NewPrice</label>
          <input type="number"  value={products.newPrice} onChange={productValue} name='newPrice' placeholder="NewPrice"/>
         </div>
         
         <div className="inputfields">
          <label>Similar Name</label>
          <input type="text" value={products.similarName} onChange={productValue} name='similarName' placeholder="similarname"/>
         </div>
         
         
         
         <div className="inputfields">
         <label>product sizale</label>
         <select value={products.sizable} onChange={productValue} name="sizable">
           <option>select product sizable</option>
           <option value="false">false</option>
           <option value="true">true</option>
         </select>
         </div>
         
         {
           products.sizable == 'true' ? (
              <div className="inputfields">
          <label>Add size</label>
          <input type="text" onFocus={()=>setshowsizebutton(true)} value={productsize} onChange={(e)=>setprosize(e.target.value)} name='size' placeholder="add size"/>
          
          {
            showsizebutton && (
             <div className="p-1 cursor-pointer select-none text-center w-20 text-white rounded mt-1 bg-green-500">
           <span onClick={productsizehandlar}>add size</span>
          </div>
            )
          }
         </div>
           ):null
            
         }
         {
           !products?.size ? null:
           <div className="flex gap-2 ">
           {
           products?.size?.map((iteam,index)=>{
             return <div className="border font-bold text-white px-4 py-2 bg-red-500" onClick={()=>{
               products.size.splice(index,1)
              setProducts({...products})
             }} key={index}>{iteam}</div>
           })
           }
           </div>
         }
         <div className="inputfields">
         <label>Stock</label>
          <input type="number"  value={products.stock} onChange={productValue} name='stock' placeholder="ProductName"/>
         </div>
         
         <div className="inputfields">
         <label>Categry</label>
         <select value={products.categry} onChange={productValue} name="categry">
         <option>select a categy</option>
           {
             categProduct.map((iteam,index)=>{
              return <option key={index} value={iteam.categry}>{iteam.categry}</option>
                     
            })
          }
         </select>
         </div>
        
        
          <div className="flex flex-col items-center gap-2">
           <div className="w-28">
            <label htmlFor="file-name">
            <img src={ image} className="w-full border"  alt="imag"/>
           </label>
           <input type="file" onChange={ imageHandler}  id="file-name" hidden />  
           </div>
           <div  className='flex flex-1  '>
            {
               products?.image?.length == 0 ?(
                <div className="text-red-500"> * please upload image</div>
               ):(
                <div className="w-full flex gap-1 p-2 flex-wrap">
                 {
                
                   products?.image?.map((iteams,index)=>{
                    return(
                     <div className='border p-2 relative group'  key={index}>
                      <img  className="w-20 h-16 object-contain " src={iteams?.img}/>
                      <div onClick={()=>removeImage(index,iteams)} className='absolute text-xl text-red-500 cursor-pointer border border-red-600 rounded-full p-0.5 hidden right-0 bottom-0   group-hover:block transition-all'><MdDelete /></div>
                     </div>
                    )
                     
                   })
                 }
                </div>
               )
            }
           </div>
         </div>
          <div className="textarea">
          <label>Description</label>
          <textarea type="text"  value={products?.productdiscription} onChange={productValue}    name='productdiscription' placeholder="type heare...." />
            <div className="inputfields">
         <label>add keyfeuter discription</label>
         
         <select value={products.keyfeuter} onChange={productValue} name="keyfeuter"> 
           <option value={false}>false</option>
           <option value={true}>true</option>
         </select>
         </div>
         { 
         products?.keyfeuter == 'true' &&(
         <>
          <div className="inputfields"> 
          <input type="text"  value={productdescriptiondata.name} onChange={(e)=>setproductdescriptiondata({...productdescriptiondata,name:e.target.value})}   placeholder="type a discriptioni name"/>
         </div>
       
         <div>
          {
     
            products?.productInfo?.map((iteams,index)=>{
            
              return(
              <div key={index}>
               <p onClick={()=>{
               products?.productInfo?.splice(index,1)
              setProducts({...products})
              localStorage.setItem('products',JSON.stringify({...products}))
             }} >{iteams?.name}</p>
               <ul style={{ listStyleType: "disc",
  paddingLeft: "30px"}} >
               {iteams?.list?.map((iteams,index)=> {return (<li key={index} >{iteams}</li> )})}
               </ul>
                </div>
              )
            })
            
          }
         </div>
         
          <textarea type="text" onFocus={()=>setshowproductdescriptionbutton(true)} value={discriptiontext} onChange={(e)=>stetdiscriptiontext(e.target.value)}    name='productInfo' placeholder="type heare...." />
          </>
          )
         }
          {
               products?.keyfeuter == 'true' &&
            showproductdescriptionbutton &&(
              <div className="mt-2"> <span onClick={productDescripsionsetvaluehandler} className="px-2 py-1 cursor-pointer border-green-600 rounded hover:text-white hover:bg-green-500 border">add data</span> <span onClick={productDescripsionHandler} className="px-2 py-1 cursor-pointer border-green-600 rounded hover:text-white hover:bg-green-500 border">add records</span></div>
              )
          }
          
         </div>
         
         <div className="button" >
         <button type="submit">{submitproductlodding ? <LoddingButton />: formHeader ? 'update' : 'add'}</button>
         </div>
        </form>
      </div>
      
    )
}

export default  UploadProductForm