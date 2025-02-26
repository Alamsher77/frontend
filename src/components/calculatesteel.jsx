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
    console.log(updatedInputs)
  };
  
const handleInputChangecount = (id, newValue) => {
    const updatedInputs = getlengthofdata?.map((input) =>
      input.id === id ? { ...input, count: parseFloat(newValue) || ""} : input
    );
    setgetlengthofdata(updatedInputs);
    console.log(updatedInputs)
  };
 
  // Function to add the Steel value and input
  const handleAddSteel = () => {
    if(!steelValue){
      alert("please enter the steel value !!")
      return false
    }
    setLengthInputs((prev)=>[...prev,{id:lengthInputs.length + 1,value:"",steel:steelValue,count:""}])
    localStorage.setItem("steelofvalue", JSON.stringify([...lengthInputs ,{id:lengthInputs.length + 1,value:"",steel:steelValue,count:""}]))
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
    setLengthInputs(getdataoflocalstorage)
    setgetlengthofdata(getdataoflocalstorage)
  }
  },[steelValue])
  
  const totalsteelofkg = ()=>{
    let countinkg = 0
    getlengthofdata?.map((item)=>{
      if(!item?.count || !item?.value){
        alert("please add any number of count")
        return false
      }
     const gettotalcount = Number(item?.steel) * Number(item?.steel) / 162 * item?.value * item?.count;
     countinkg += gettotalcount
     console.log(item)
    })
    set_total_steel_in_kg(countinkg)
  
    
  }
  
  const removesteelhandler =(id)=>{
      const newsplice = [...getlengthofdata]
    
   const filterremove = newsplice.filter((item)=>item?.id !== id)
    setgetlengthofdata(filterremove)
     localStorage.setItem("steelofvalue", JSON.stringify(filterremove))
  }
  return (
    <div className="flex gap-2 flex-col" style={{ padding: '20px' }}>
      {/* Main Button */}
      
        <div className="border p-2 flex justify-center text-xl text-slate-500 mb-3">
         <strong>Total : {total_steel_in_kg.toFixed(3)} kg</strong>
        </div>
      <button className="border hover:bg-pink-500 hover:text-white px-2" onClick={()=>setShowPopup(true)}>Add Steel</button>
      
      
      {
        getlengthofdata?.map((item,index)=>{
          
          return(
          <div className="border relative border-pink-300 p-2" key={index}>
          <button onClick={()=>removesteelhandler(item?.id)} className="absolute flex justify-center items-center border w-6 h-6 border-l-2 text-red-500 border-b-2 right-0 top-0 border-pink-300" >
          <IoCloseSharp/>
          </button>
          <p>THIS STEEL {item?.steel} MM</p>
          <div className="flex justify-between items-center">
          <div className="p-2 w-32 border ">
             <input
            value={item?.value}
            onChange={(e) => handleInputChange(item?.id, e.target.value)}
          className="px-2 w-full border outline-none"
            type="number"
            placeholder="Enter The Number In Meter "
          />
            <input
            value={item?.count}
            onChange={(e) => handleInputChangecount(item?.id, e.target.value)}
          className="px-2 w-full border  outline-none"
            type="number"
            placeholder="Enter The Steel Count"
          />
          </div>
          <div className="text-pink-500">
           <span>{(Number(item?.steel) * Number(item?.steel) / 162 * item?.value * item?.count).toFixed(2)} kg</span>
          </div>
          </div>
          </div>
          )
        })
      }
      
       {
         getlengthofdata.length !== 0 &&(
           <button onClick={totalsteelofkg} className="border hover:bg-pink-500 px-2 hover:text-white" >Calculate</button>
         )
       }

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