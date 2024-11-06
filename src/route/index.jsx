import {createBrowserRouter,Navigate} from 'react-router-dom'
import App from '../App'
import Home from '../pages/home'
import AdminPanel from '../pages/adminPanel'
import AddProduct from '../pages/addProduct'
import AllUsers from '../pages/allusers'
import NoPage from '../pages/noPages'
import Resistration from '../pages/resistration'
import Login from '../pages/login'
import AddCategry from '../pages/addCategry'
import Product from '../pages/product'
import Cart from '../pages/cart'
import CategryIteams from '../pages/categryIteams'
import UserDetails from '../pages/userDetails'
import MyOrder from '../pages/myOrder'
import About from '../pages/about'
import AddBanner from '../pages/addbanner'
import Settings from '../pages/settings'
import ForgetePassword from '../pages/forgetePassword'
import OrderSuccess from '../pages/Ordersuccessfullpage'
import AllUsersOrderProduct from '../pages/allusersOrderProducts'
const router = createBrowserRouter([
  { 
    path: "/", 
    element: <App />,
    children: [
      {
        path:'Ordersuccessfullpage',
        element:<OrderSuccess />
      },
      {
         path : "",
         element: <Home />
       }, 
      {
         path:"UserDetails",
         element:<UserDetails />,
       },
      {
         path:"categryIteams",
         element:<CategryIteams/>,
         children:[
           {
            path:":categryId",
           element:<CategryIteams/>
           }
          ]
       },
      {
    path:"signup",
    element:<Resistration/>,
    },
      {
        path:'login',
        element:<Login />
      },
      {
        path:"forgetePassword",
        element:<ForgetePassword />
      },
      {
        path:'product',
        element:<Product/>,
        children:[
          {
            path:':productId',
            element:<Product/>
          } 
          ]
      },
      {
         path: "adminPanel",
         element :<AdminPanel />,
         children :[
            {
              path :"addproduct",
              element : <AddProduct />
            },
            {
            path : "allUsers",
            element : <AllUsers />
            },
            {
              path:"addcategry",
              element:<AddCategry/>
            },
            {
              path:"AllUsersOrderProduct",
              element:<AllUsersOrderProduct/>
            },
            {
              path:'addbanner',
              element:<AddBanner />
            },
            {
              path:'settings',
              element:<Settings />
            },
           ],
           
       },
      {
         path:"cart",
         element:<Cart/>
       },
      {
         path:"myOrderProducts",
         element:<MyOrder />
       },
       {
         path:'about',
         element:<About />
       },
       ]
  },
  {
    path :"*",
    element:<NoPage />
  }
]);
export default router
