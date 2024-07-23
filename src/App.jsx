import './App.css'  
import{ Toaster } from 'react-hot-toast';
 import 'react-toastify/dist/ReactToastify.css';
import {Headers} from './components/header'
import Footer from "./components/footer"
// import {Footer} from './components/footer'
// import {Admin} from './admin/admin'
import {Outlet} from "react-router-dom";
import CategryIteams from './pages/categryIteams'
 
function App() {
   
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
