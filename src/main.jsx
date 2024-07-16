import React from 'react'
import {RouterProvider} from 'react-router-dom'
import ReactDOM from 'react-dom/client' 
import router from './route/index.jsx'
import './index.css' 
import { ContestProvider } from './api/ContestContext';
import {Provider} from 'react-redux' 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  
   <ContestProvider> 
     <RouterProvider router={router} />  
   </ContestProvider> 
  </React.StrictMode>
)
