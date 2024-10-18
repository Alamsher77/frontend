import logo5 from '../asetes/upload.jpg'
import {useState,useContext,useEffect} from 'react'
import {ContestContext} from '../api/ContestContext'
import LoddingButton from '../components/loddingbutton'
import{ toast } from 'react-hot-toast';
import DomainUrl from '../Configuration/Index'
import DeleteImageCloudnary from '../helpers/deleteImageCloudnary'
import PostAndGetApi from '../helpers/postsendapi'
import UploadImage from '../helpers/uploadsImage' 
 const Settings = ()=>{
    const {appnameandicon,appnameicon} = useContext(ContestContext)
  const [chnageData,setChangeData] = useState({
    name:'',
    icon:'',
  })
  const [submitlodding,setsubmitlodding] = useState(false)
  const [isupdata,seisupdata] = useState(false) 
   const [ischange,setischange] = useState(true) 
  
  const  submitHandler = async ()=>{
  try {
    
     setsubmitlodding(true)
  
   const data = await PostAndGetApi({path:'changeAppNameAndIcon',method:'POST',data:chnageData})
   setsubmitlodding(false)
     if(!data.success){
       toast.error(data?.message)
       return false
     }
     toast.success(data?.message)
  } catch (e) {
    toast.error(e.message)
  }
  }
  
  const updateHandler = async ()=>{
   try {
     
     setsubmitlodding(true)
      const data = await PostAndGetApi({path:'updateAppNameAndIcon',method:'POST',data:chnageData})
   setsubmitlodding(false)
     if(!data.success){
       toast.error(data?.message)
       return false
     }
     toast.success(data?.message)
     appnameandicon()
     localStorage.removeItem("iconandname")
   } catch (e) {
     toast.error(e.message)
   }
  }
 const imageHandler = async(e)=>{
   try{
    const uploadsimage = e.target.files[0]
    
     const imagedeleteresponse = await DeleteImageCloudnary(chnageData?.icon,'deleteCloudnaryImage')
     if(!imagedeleteresponse?.success){
       toast.error(imagedeleteresponse.message)
       return false
     }
     toast.success(imagedeleteresponse?.message)
     
    const uploadsimageresponse = await UploadImage(uploadsimage) 
    toast.success('image uploded') 
    setChangeData({
    ...chnageData,icon:{public_id:uploadsimageresponse?.public_id,img:uploadsimageresponse?.url}
  })
 await localStorage.setItem('iconandname',JSON.stringify(chnageData))
  console.log({...chnageData})
   }catch(error){
    toast.error(error?.message) 
    console.log(error.message)
   }
   
  }
  
 
   
 useEffect(()=>{
   
     const iconnamelsdata = JSON.parse(localStorage.getItem('iconandname'))
  
   if(iconnamelsdata){
     setChangeData({name:iconnamelsdata?.name,icon:iconnamelsdata?.icon})
   }
    if(!iconnamelsdata){
       setChangeData({name:appnameicon?.name,icon:appnameicon?.icon,_id:appnameicon?._id})
     seisupdata(false)
    }
  
 },[appnameicon])
 
 let appname = document.querySelector("title")
 appname.innerText = chnageData.name
  
  return (
     
       <div className="w-full p-2 bg-slate-100 h-auto">
       <h1 className="text-center text-sm text-slate-600 underline mt-3 "><strong>Add and Change The</strong> `App Name And Icon` !</h1>
       
       <div className="flex flex-col items-center"  >
        <lable className="uppercase text-blue-700 text-sm font-bold" >App Name : </lable>
            <div className="flex justify-center items-center gap-2">
              <input className="outline-none h-8 text-blue-700 bg-slate-100 border text-sm border-blue-700 rounded px-2 py-1" value={chnageData.name} onChange={(e)=>{
                 setChangeData({...chnageData,name:e.target.value})
                   localStorage.setItem('iconandname',JSON.stringify({...chnageData}))
              }}  type="text" disabled={isupdata ? false : true} />
       <label className="w-12 h-12 overflow-hidden mt-3" htmlFor="file-name">
             <img src={!chnageData.icon ? logo5 : chnageData?.icon?.img} className="w-full h-full object-cover  border"  alt="imag"/>
        </label>  
            </div>
            <input type="file" onChange={imageHandler}  id="file-name" hidden /> 
           </div> 
           <div className="flex  justify-center"><button className="px-5 items-center py-1 flex rounded text-white  bg-blue-400" onClick={ischange ? isupdata ?  ()=> updateHandler() : ()=>{
             
             setsubmitlodding(true)
             setTimeout(()=>{
             setsubmitlodding(false) 
             seisupdata(true)
               
             } ,2000);
             
           } : submitHandler} >{submitlodding ? <LoddingButton /> : ischange ? isupdata ? 'update' : 'Change' :'add'}</button></div>
            
           
       </div>
    )
}
export default Settings