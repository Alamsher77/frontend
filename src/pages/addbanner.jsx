import { IoCloseCircle,IoRemoveCircleSharp,IoAddCircleSharp} from "react-icons/io5";
import {useState,useEffect,useContext} from 'react'
import logoupload from '../asetes/upload.jpg'
import UploadImage from '../helpers/uploadsImage'
import{ toast } from 'react-hot-toast';
import DomainUrl from '../Configuration/Index'
import {ContestContext} from '../api/ContestContext'
import DeleteImageCloudnary from '../helpers/deleteImageCloudnary'
const AddBanner = ()=>{
  const {allbanners,lodding,setallbanners,fetchbanner} = useContext(ContestContext)
  const [banneropen,setbanneropen] = useState(false)
  const [bannerimage,setbannerimage] = useState(null)
  const imagehandler = async(e)=>{
    try{
      const file = e.target.files[0]
      const uploadsimageresponse = await UploadImage(file)
      const obj = {img:uploadsimageresponse.url,public_id:uploadsimageresponse.public_id}
       await localStorage.setItem('banner',JSON.stringify(obj)) 
        setbannerimage(obj)
    }catch(error){
      toast.error(error.message)
    }
    
  }
  // addbanner
  const submithandler = async()=>{
    try{
     const response = await DeleteImageCloudnary(bannerimage,'addbanner')
   
    if(!response.success){
      toast.error(response.message)
      return false
    }
    toast.success(response.message)
    localStorage.removeItem('banner')
    setbannerimage(null)
    setbanneropen(false)
    fetchbanner()
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }
  
   
  useEffect(()=>{ 
    const localgetimage = JSON.parse(localStorage.getItem('banner'))
      if(localgetimage){
        setbannerimage(localgetimage)
      }
  },[]) 
  return(
        <div className="select-none p-2 w-full max-w-full min-w-full ">
         <div className="w-full   flex justify-between">
           <h1 className="capitalize py-1 text-purple-700  font-[600]">add banner</h1>
           <div onClick={()=>setbanneropen(true) } className="uppercase px-3 rounded py-1 border transition delay-200 ease-in-out cursor-pointer border-purple-400 text-purple-700 hover:text-white hover:bg-purple-500">+ add</div>
        </div>
        {
          banneropen &&(
            <div className="flex pb-4 gap-2 flex-col   items-center rounded relative min-h-[200px] max-w-[250px] min-w-[250px] border border-purple-400 mt-4 m-auto">
            <div onClick={()=>setbanneropen(false)} className="absolute  text-red-400 hover:text-red-500 transition cursor-pointer ease-in-out delay-200 text-3xl right-0  w-8 h-8"><IoCloseCircle /></div>
            
            <h1 className='rounded w-full py-2 text-slate-500 uppercase font-[600] bg-purple-200 text-center'>banner form</h1>
             <div className="w-28">
               <label htmlFor="file-name">
               <img src={logoupload} className="w-full border"  alt="imag"/>
                </label>
                <input type="file" onChange={imagehandler}  id="file-name" hidden />  
              </div>
               
               {bannerimage ?(
                <div className="p-2 border w-56 h-28">
                <img className="w-full h-full object-contain" src={bannerimage?.img} />
                </div>
               ):(
                <div className="text-red-500">
                 <p>Please uploads image *</p>
                </div>
                 )
               }
               
              <div className={`${bannerimage ? 'border hover:bg-purple-200 text-purple-700  border-purple-400':'border  text-gray-400  border-gray-400'} text-xl font-bold  rounded  `}>
               <button 
               disabled={bannerimage ? false :true}
               onClick={submithandler}  className="px-6 py-1 uppercase">upload</button>
              </div>
        </div>
          )
        }
        
        <div className="min-w-full gap-2  items-center flex-col flex  mt-4 max-w-full  ">
          
          {
            lodding ?(
            [1,2,3,4,6].map((item,index)=>{
             return  <div key={index} className="w-[330px] h-[150px] animate-pulse  bg-slate-200"></div>
            })
            ):( allbanners?.map((item,index)=>{ 
              return(
                <div key={index} className="border border-purple-500 min-w-[330px] h-[150px] min-h-[150px] max-h-[150px]  max-w-[330px]">
            <img className="h-full object-contain w-full" src={item?.bannerimage?.img} />
          </div>
              )
            }))
          }
          
        </div>
        </div>
    )
}
export default AddBanner