const url = `https://api.cloudinary.com/v1_1/dw6kism8o/upload`

const UploadImage = async (image)=>{ 
 const formData = new FormData()
  formData.append('file',image)
 formData.append('upload_preset','shopes')
 
 const dataRersponse = await fetch(url,{
   method:'POST',
   body: formData
 })
 return dataRersponse.json()
}
export default UploadImage