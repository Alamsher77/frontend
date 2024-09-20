import './App.css'  
import {Toaster} from 'react-hot-toast';

import {Headers} from './components/header'
import Footer from "./components/footer"
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
