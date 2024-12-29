import React, { useState,useEffect} from 'react';
import { IoCloseSharp,IoRemoveCircleSharp,IoAddCircleSharp } from "react-icons/io5";

function Calculatesteel() {
  const [showPopup, setShowPopup] = useState(false);
  const [steelValue, setSteelValue] = useState('');
  const [lengthInputs, setLengthInputs] = useState([]);
const [getlengthofdata,setgetlengthofdata] = useState([])
const [total_steel_in_kg,set_total_steel_in_kg] = useState(0)

  
  const handleInputChange = (id, newValue) => {
    const updatedInputs = getlengthofdata?.map((input) =>
      input.id === id ? { ...input, value: parseFloat(newValue) || ""} : input
    );
    setgetlengthofdata(updatedInputs);
  };
 
  // Function to add the Steel value and input
  const handleAddSteel = () => {
    if(!steelValue){
      alert("please enter the steel value !!")
      return false
    }
    setLengthInputs((prev)=>[...prev,{id:lengthInputs.length + 1,value:"",steel:steelValue}])
    localStorage.setItem("steelofvalue", JSON.stringify([...lengthInputs,{id:lengthInputs.length + 1,value:"",steel:steelValue}]))
    setSteelValue("")
    setShowPopup(false)
  };

  
  const closepopup = (e)=>{
    if(e.target.id == "popupcontainer"){
      setShowPopup(false)
    }
  }
  
  useEffect(()=>{
  
  const getdataoflocalstorage = JSON.parse(localStorage.getItem("steelofvalue")) 
  if(getdataoflocalstorage){
    setgetlengthofdata(getdataoflocalstorage)
  }
  },[lengthInputs])
  
  const totalsteelofkg = ()=>{
    let countinkg = 0
    getlengthofdata?.map((item)=>{
     const gettotalcount = Number(item?.steel) * Number(item?.steel) / 162 * item?.value
     countinkg += gettotalcount
     console.log(countinkg)
    })
    set_total_steel_in_kg(countinkg)
  }
  return (
    <div className="flex gap-2 flex-col" style={{ padding: '20px' }}>
      {/* Main Button */}
      
        <div className="border p-2 flex justify-center text-xl text-slate-500 mb-3">
         <strong>Total : {total_steel_in_kg.toFixed(3)} kg</strong>
        </div>
      <button className="border px-2" onClick={()=>setShowPopup(true)}>Add Steel</button>
      
      
      {
        getlengthofdata?.map((item,index)=>{
          
          return(
          <div className="border border-pink-300 p-2" key={index}>
          <p>THIS STEEL {item?.steel} MM</p>
            <input
            value={item?.value}
            onChange={(e) => handleInputChange(item?.id, e.target.value)}
          className="px-2 border outline-none"
            type="number"
            placeholder="Enter The Number In Meter "
          />
          </div>
          )
        })
      }
      
        <button onClick={totalsteelofkg} className="border px-2" >Calculate Total Kg Of Steel</button>

      {/* Popup */}
      {showPopup && (
      
        <div
        id="popupcontainer"
        onClick={closepopup}
          style={{
            position: 'fixed',
            top: '50%',
            width:"100%",
            height:'100%',
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0,0,0,0.4)',
          
          }}
        >
        <div  className="relative flex w-[200px] p-8 bg-[#fff] shadow flex-col gap-2">
         <button onClick={()=> setShowPopup(false)} className="right-0 top-0 absolute w-6 flex flex-col justify-center items-center h-6 font-bold text-white bg-red-400"><IoCloseSharp /></button>
          <h3>Add Steel</h3>
          <input
          className="px-2 border outline-none"
            type="number"
            value={steelValue}
            onChange={(e) => setSteelValue(e.target.value)}
            placeholder="Add Steel in mm"
          />
          <button className="px-2 border" onClick={handleAddSteel}>Add</button>

        </div>
        </div>
      )}

    </div>
  );
}


export default Calculatesteel