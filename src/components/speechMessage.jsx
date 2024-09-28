 import{ toast } from 'react-hot-toast';
 import {useState} from 'react'
  const utterance = new SpeechSynthesisUtterance();
  const SpeechMessage = async(message) => { 
   try{ 
   utterance.lang = 'hi-IN';
      utterance.text = message
      window.speechSynthesis.speak(utterance);
   }catch(error){
    console.log(error.message)
   }
   }
  export default SpeechMessage