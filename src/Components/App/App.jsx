import React, { useContext, useEffect } from 'react';
import Layout from '../Layout/Layout';
import Home from '../Home/Home';
import Categories from '../Categories/Categories';
import Products from '../Products/Products';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Cart from '../Cart/Cart';
import Payinfo from '../Payinfo/Payinfo';


import {RouterProvider, createBrowserRouter, createHashRouter} from 'react-router-dom';
import { userContext } from '../../UserContext';
import ProtectedRoutes from '../ProtectedRoutes/ProtectedRoutes';
import ProductDetails from '../ProductDetails/ProductDetails';
import CartContextProvider from '../../CartContext';
import  { Toaster } from 'react-hot-toast';
import { Offline, Online } from "react-detect-offline";
import OrderContextProvider from '../../OrderContext';
import AllOrders from '../AllOrders/AllOrders';
import PayCash from '../PayCash/PayCash';
import SpecificGate from '../Categories/SpecificGate';
import WishList from '../WishList/WishList';
import Notfound from '../Notfound/Notfound';
import WishContextProvider from '../../Wish';





export default function App() {

  const {setUserToken , setUserName} = useContext(userContext);

  useEffect(()=>{

    if(localStorage.getItem('userToken') && localStorage.getItem('userName') !== null){
      setUserToken(localStorage.getItem('userToken'));
      setUserName(localStorage.getItem('userName'));
    }

  },[])


  const routes = createHashRouter([
    {path:'/' , element:<Layout/>, children:[

      {index:true, element:<ProtectedRoutes> <Home/> </ProtectedRoutes>},
      {path:'/categories', element: <ProtectedRoutes> <Categories/> </ProtectedRoutes>},
      {path:'/specificgate/:id', element: <ProtectedRoutes> <SpecificGate/> </ProtectedRoutes>},
      {path:'/products', element: <ProtectedRoutes> <Products/> </ProtectedRoutes>},
      {path:'/productdetails/:id', element: <ProtectedRoutes> <ProductDetails/> </ProtectedRoutes>},
      {path:'/cart', element: <ProtectedRoutes> <Cart/> </ProtectedRoutes>},
      {path:'/wishlist', element: <ProtectedRoutes> <WishList/> </ProtectedRoutes>},
      {path:'/Payinfo', element: <ProtectedRoutes> <Payinfo/> </ProtectedRoutes>},
      {path:'/Paycash', element: <ProtectedRoutes> <PayCash/> </ProtectedRoutes>},
      {path:'/allorders', element: <ProtectedRoutes> <AllOrders/> </ProtectedRoutes>}, 
      {path:'*', element: <ProtectedRoutes> <Notfound/> </ProtectedRoutes>}, 
         
      {path:'/login', element:<Login/>},
      {path:'/register', element:<Register/>},
    ]}
  ])

  
  return (
    <>
    <CartContextProvider>
      <WishContextProvider>
        <OrderContextProvider>
            <RouterProvider router={routes} >
              <Layout />
            </RouterProvider>
          </OrderContextProvider>
        </WishContextProvider>
      </CartContextProvider>
    
    <Toaster/>
    <div >
    
    <Offline>
      <div className='position-fixed top-50 end-0 bg-white z-3 p-2 me-2 shadow  text-capitalize'>

     <i className='fas fa-wifi fs-4 p-1 text-warning'></i> you are offline 
      </div>
      </Offline>
  </div>
    </>
  )
}
