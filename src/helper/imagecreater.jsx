
const Imagecreater = async (image)=>{
  const reader = new FileReader()
 
  const data = await new Promise((resolve,reject)=>{
    reader.onloadend =()=>{
      resolve(reader.result)
    }
    reader.onerror = error => reject(error)
  })
   reader.readAsDataURL(image)
  return data
}
export default Imagecreater