import { IoIosCloseCircleOutline } from "react-icons/io";
import {useState} from 'react'
  const Conformation = ({children,onCancel,onClose,onconform,isvisible})=>{ 
 
  return (
     <div className={`fixed  ${isvisible ? "visible" : "hidden"} flex delay-150 transition ease-in-out flex-col select-none items-center pt-2 rounded-tl-2xl overflow-hidden px-2 rounded-tr-2xl   bottom-0 z-[2000] pb-4 bg-white w-full`}> 
     <div onClick={onClose} className="absolute cursor-pointer text-red-500 right-2 top-1 text-3xl"><IoIosCloseCircleOutline /></div>
     <h1 className="text-center text-green-500 font-bold text-2xl">Conformation</h1>
     {children}
     <div className="flex pt-2 w-full justify-evenly">
      <button onClick={onconform} className="px-6 rounded-xl  font-bold py-2 bg-green-600 text-white">Ok</button>
      <button onClick={onCancel} className="px-6 rounded-xl  hover:bg-red-500  font-bold py-2 bg-red-600 text-white">Cancel</button>
     </div>
     </div>
    )
}
export default Conformation