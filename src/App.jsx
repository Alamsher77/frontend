import './App.css'  
import {Toaster} from 'react-hot-toast';
import {useContext} from 'react'
import {Headers} from './components/header'
import Footer from "./components/footer"
import {Outlet} from "react-router-dom";
import CategryIteams from './pages/categryIteams'
import {ContestContext} from './api/ContestContext'
function App() {
  
  const {appnameicon} = useContext(ContestContext)
  const link = document.querySelector('link')
  const title = document.querySelector('title')
  link.type = 'image/png'
  link.href = appnameicon?.icon?.img
  title.innerText = appnameicon?.name || 'Easy Shope'
 
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
