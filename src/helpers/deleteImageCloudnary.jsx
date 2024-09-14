import DomainUrl from '../Configuration/Index'

const DeleteImageCloudnary = async(publicid)=>{
 const response = await fetch(`${DomainUrl.url}deleteCloudnaryImage`,{
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