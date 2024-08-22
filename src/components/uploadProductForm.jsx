
const UploadProductForm = (props)=>{
   const products = props.products
   const productValue = props.productValue
  
  return(
    
     <div className='AddProductForm'>
        <div className='closeForm' onClick={()=> { 
        props.updateForm.setUpdateForm(false)
        props.setFormBox(false)  }}>✕</div>
        <h3>{props.formHeader ? "UpdateProduct" :"AddProduct"}</h3>
        <form onSubmit={props.submitHandler}>
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
            props.categProduct.map((iteam,index)=>{
              return <option key={index} value={iteam.categry}>{iteam.categry}</option>
                     
            })
          }
         </select>
         </div>
          <div className="flex items-center gap-2">
           <div className="w-28">
            <label htmlFor="file-name">
            <img src={props.image} className="w-full border"  alt="imag"/>
           </label>
           <input type="file" onChange={props.imageHandler}  id="file-name" hidden />  
           </div>
           <div  className='flex flex-1  '>
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
      
    )
}

export default  UploadProductForm