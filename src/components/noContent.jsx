
const NoContent = ({message})=>{
  return(
        <div className="flex justify-center flex-col items-center mt-6">
          <div className="min-h-[150px] rounded-3xl min-w-[150px] border border-2 border-gray-800 flex flex-col justify-center items-center">
            <div className="justify-center gap-2 items-center flex pt-4">
                <div className="w-14 rounded-full h-10 border border-2 border-gray-800 flex justify-center items-center">
                <div className=" w-[25px] h-[25px] bg-gray-800 rounded-full"></div>
               </div>
                 <div className="w-14 rounded-full h-10 border border-2 border-gray-800 flex justify-center items-center">
                <div className=" w-[25px] h-[25px] bg-gray-800 rounded-full"></div>
               </div>
            </div>
            <div className="p-2 w-20 h-10 bg-gray-800 mt-2 rounded-bl-full rounded-br-full">
            </div> 
          </div>
         <div className="p-2 text-gray-600 uppercase text-[18px] font-bold">
           <h1>{message}</h1>
         </div>
        </div>
    )
}
export default NoContent