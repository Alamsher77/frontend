import { MdDelete } from "react-icons/md";
import{ toast } from 'react-hot-toast'; 
import DeleteImageCloudnary from '../helpers/deleteImageCloudnary'
import SpeechMessage from './speechMessage'
const UploadProductForm = (props)=>{ 
  const productValue = props.productValue
  const products = props.products
  const removeImage = async(e,img)=>{
    try{ 
       const resposedeleteimage = await  DeleteImageCloudnary(img || "dbeb3x4dh",'deleteCloudnaryImage')
        if(!resposedeleteimage?.success){
          console.log(resposedeleteimage?.message)
          SpeechMessage(resposedeleteimage?.message)
          return false
        } 
        toast.success(resposedeleteimage?.message)
        SpeechMessage(resposedeleteimage?.message)  
       products.image.splice(e,1) 
     localStorage.setItem('products',JSON.stringify({...products})) 
  props.setProducts({...products})
  toast.success('update')
    }catch(error){
      console.log(error?.message)
      SpeechMessage(error?.message)
    }
  }
  return(
    
     <div className='AddProductForm'>
        <div className='closeForm' onClick={()=> { 
        props.updateForm.setUpdateForm(false)
        props.setFormBox(false)  }}>✕</div>
        <h3>{props.formHeader ? "UpdateProduct" :"AddProduct"}</h3>
        <form onSubmit={props.submitHandler}>
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
         <select value={products.categry} onChange={productValue} name="categry">
          <option>...Select Categry...</option>
           
          {
            props.categProduct.map((iteam,index)=>{
              return <option key={index} value={iteam.categry}>{iteam.categry}</option>
                     
            })
          }
         </select>
         </div>
          <div className="flex flex-col items-center gap-2">
           <div className="w-28">
            <label htmlFor="file-name">
            <img src={props.image} className="w-full border"  alt="imag"/>
           </label>
           <input type="file" onChange={props.imageHandler}  id="file-name" hidden />  
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
          <textarea type="text"  value={products.productInfo} onChange={productValue} name='productInfo' placeholder="type heare...." />
         </div>
         <div className="button" >
         <button type="submit">submit</button>
         </div>
        </form>
      </div>
      
    )
}

export default  UploadProductForm