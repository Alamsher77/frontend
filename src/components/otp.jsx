import {useState} from 'react'
import PostAndGetApi from '../helpers/postsendapi'
import {toast} from 'react-hot-toast'
import LoddingButton from './loddingbutton'
const Otp = ({email,setcreatepssword})=>{
   const [otp, setOtp] = useState(new Array(6).fill(""));
   const [verifyotplodding,setverifyotplodding] = useState(false)

  // Handle OTP input
  const handleChange = (element, index) => { 
    const value = element.value; 
    if(value.length <= 1){
      if (/[^0-9]/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus the next input field
    if (value && element.nextSibling) {
       element.nextSibling.focus();
    }
    }
  };

  // Handle Backspace
  const handleKeyDown = (element, index, event) => {
    if (event.key === "Backspace" && !element.value && element.previousSibling) {
      element.previousSibling.focus();
    }
  };

  // Handle OTP submission
  const handleSubmit =  async() => {
   const reciveotp = otp.join("")
   try {
     setverifyotplodding(true)
  const data = await PostAndGetApi({data:{reciveotp,email},method:'POST',path:'verifyforgatepassword'})
  setverifyotplodding(false)
  if(!data?.success){
    toast.error(data?.message)
    return false
  }
  toast.success(data?.message)
  setcreatepssword(true)
  localStorage.setItem('changepassword',JSON.stringify({email,changepassword:true}))
   } catch (e) {
     setverifyotplodding(false)
     toast.error(e.message)
   }
  };
  return (
     <div className=" flex gap-1 p-4 flex-col items-center border w-[300px]">
     <p>Please check your email otp send to <strong>{email}</strong></p>
      <div>
      <h3>Enter OTP:</h3>
      <div style={{ display: "flex", justifyContent: "space-between", width: "200px" }}>
        {otp.map((data, index) => (
          <input
            key={index}
            type="Number"
            maxLength="1"
            value={data}
            className="border text-blue-500 rounded border-blue-500 outline-none"
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e.target, index, e)}
            style={{
              width: "30px",
              height: "40px",
              fontSize: "20px",
              textAlign: "center", 
            }}
          />
        ))}
      </div>
      <br />
      <button className="border-blue-500 all delay-150 transition rounded hover:bg-blue-500 hover:text-white border text-sm text-blue-500 p-1 px-2" onClick={handleSubmit}>{verifyotplodding ? <LoddingButton /> : 'Verify Otp'}</button>
    </div>
     </div>
    )
}
export default Otp