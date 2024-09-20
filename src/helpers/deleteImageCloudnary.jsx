import DomainUrl from '../Configuration/Index'

const DeleteImageCloudnary = async(publicid,path)=>{
 const response = await fetch(`${DomainUrl.url}${path}`,{
    method: 'POST', 
        headers: {
          Accept: 'application/json',
          "Content-type": "application/json",
        },
        body: JSON.stringify({publicid}),
  })
  
  return response.json()
}
export default DeleteImageCloudnary