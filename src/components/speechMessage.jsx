 import{ toast } from 'react-hot-toast';
 import {useState} from 'react'
 import axios from "axios";
  const utterance = new SpeechSynthesisUtterance();
  const SpeechMessage = async(message) => { 
   try{ 
   utterance.lang = 'hi-IN';
      utterance.text = message
      window.speechSynthesis.speak(utterance);
   }catch(error){
     toast.error(error.message)
   }
   }
  export default SpeechMessage