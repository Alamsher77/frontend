
const LoddingCardComponent = ()=>{
  return(
     <div  className='animate-pulse p-1 m-2 shadow-3xl'>
     <div className=" h-40 bg-gray-400">
       <span className="w-full h-full "></span>
     </div>
      <div className="break-all mt-1  bg-gray-100">
        <p className="bg-gray-400 p-3"> </p>
       <p className="p-3 w-20 bg-gray-400 mt-1"> </p>
       <div className="flex gap-1">
       <span className="bg-gray-400 p-2 mt-1 w-16"></span> <span className="w-16 mt-1 bg-gray-400"></span>
     </div>
      </div>
     </div>
    )
}
export default LoddingCardComponent