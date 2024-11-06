import { FaRegCheckCircle } from "react-icons/fa";
import { GiFallingStar } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa";
const OrderSuccess = ()=>{
  return (
     <div className="w-fll flex  flex-col items-center h-[70vh]">
      <div className="w-40 relative text-green-500 h-40 mt-10  text-9xl"><FaRegCheckCircle className="absolute " /> <FaRegCircle className=" bg-white absolute z-[32]" /></div>
      <div><GiFallingStar /></div>
     </div>
    )
}
export default OrderSuccess