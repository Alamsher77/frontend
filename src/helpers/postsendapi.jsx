import DomainUrl from '../Configuration/Index'

const PostAndGetApi = async({method,path,data})=>{ 
 const response = await fetch(`${DomainUrl.url}${path}`,{
    method: method, 
        headers: {
          Accept: 'application/json',
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
  })
  
  return response.json()
}

export default PostAndGetApi