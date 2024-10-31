import './App.css'  
import {Toaster} from 'react-hot-toast';
import {useContext} from 'react'
import logo3 from './asetes/logo3.webp'
import {Headers} from './components/header'
import Footer from "./components/footer"
import {Outlet} from "react-router-dom";
import CategryIteams from './pages/categryIteams'
import {ContestContext} from './api/ContestContext'
function App() {
  
  const {appnameicon,applogoandiconlodding} = useContext(ContestContext)
  const link = document.querySelector('link')
  const title = document.querySelector('title')
  if(applogoandiconlodding){
    return <div className="flex justify-center w-full h-[90vh] items-center">
    <div className="flex items-center "> <span className="w-8 animate-spin border mr-3 border-red-500 h-8"></span> Lodding....</div>
    </div>
  }else{
  link.type = 'image/png' 
  link.href = appnameicon?.icon?.img || logo3
  title.innerText = appnameicon?.name || 'Easy Shope'
  }
 
  return (
    <>
      <Headers />
    <div className="pt-12 ">
      <Outlet/> 
    </div>
      <Footer/>
      <Toaster
       position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default App
