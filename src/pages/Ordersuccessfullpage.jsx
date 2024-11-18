import { FaRegCheckCircle } from "react-icons/fa";
// import { GiFallingStar } from "react-icons/gi";
// import { FaRegCircle } from "react-icons/fa";
// const OrderSuccess = ()=>{
//   return (
//     <div className="w-fll flex  flex-col items-center h-[70vh]">
//       <div className="w-40 relative text-green-500 h-40 mt-10  text-9xl"><FaRegCheckCircle className="absolute " /> <FaRegCircle className=" bg-white absolute z-[32]" /></div>
//       <div><GiFallingStar /></div>
//     </div>
//     )
// }

import {useState} from 'react';

const OrderSuccess = () => {
  const [totalValue, setTotalValue] = useState("");
  const [dividedValue, setDividedValue] = useState("");
  const [totalCount,setTotalCount] = useState(""); // Example total count
  const [divideBy,setDivideBy] = useState(""); 
  const getvalue = totalCount / divideBy
  // Divide value
  const dividedValues = totalCount || divideBy ? Array.from({ length:divideBy }, (_, index) => (index + 1) * getvalue) :null

  return (
    <div className="flex flex-col w-full mt-20 justify-center items-center" >
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 rounded-lg shadow-lg w-80">
      <div className="w-full">
        <label htmlFor="totalValue" className="block text-gray-700 font-medium mb-2">
          Total Value
        </label>
        <input
          type="number"
          id="totalValue"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={totalValue}
          onChange={(e) => setTotalValue(e.target.value)}
          placeholder="Enter total value"
        />
      </div>

      <div className="w-full">
        <label htmlFor="dividedValue" className="block text-gray-700 font-medium mb-2">
          Divided Value
        </label>
        <input
          type="number"
          id="dividedValue"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={dividedValue}
          onChange={(e) => setDividedValue(e.target.value)}
          placeholder="Enter divided value"
        />
      </div>
      <div className="w-full">
        <button onClick={()=>{
          setTotalCount(totalValue)
          setDivideBy(dividedValue)
        }} className="border shadow px-3 text-gray-500 py-1" >calculate</button>
      </div>
    </div>
      <h1>Total Count: {totalCount}</h1>
      <h2>Divided Values: {divideBy}</h2>
      <ul>
        {dividedValues &&(
        dividedValues.map((value, index) => (
          <li key={index}> {index + 1}: {Math.floor(value)}</li>
        ))
        )}
      </ul>
    </div>
  );
};

export default OrderSuccess