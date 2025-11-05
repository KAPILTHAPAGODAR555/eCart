import { useEffect, useState } from 'react'
import Product from './component/list/Product'
import Front from './component/list/Front'
import Nav from './component/Nav'
import Footer from './component/Footer'
import { Route , Routes, BrowserRouter , Outlet } from 'react-router'

import ShowPage from './component/list/ShowPage.jsx'
import Order from './component/list/Order.jsx'
import Contact from './component/list/Contact.jsx'
import About from './component/list/About.jsx'
import Signup from './component/list/Signup.jsx'
import Login from './component/list/Login.jsx'
import axios from 'axios'
import Cart from './component/list/Cart.jsx'
import Logout from './component/list/Logout.jsx'
import ProtectedRoute from './component/ProtectedRoute.jsx'
import Buy from './component/list/Buy.jsx'
import PageNotFound from './component/list/PageNotFound.jsx'
import AdminFront from './component/admin/AdminFront.jsx'


function App() {
  const [user , isUser] = useState({
        status: false,
        id: 0
    });
    const [ccart , setCart] = useState([]);
  // useEffect(()=> {
  //   const checkUser = async()=> {
  //     let res= await axios.get( `http://localhost:8000/user/login`, {withCredentials: true});
  //     let {status , user} = res.data;
  //   //   console.log(id);
  //   if(status){
  //      isUser({status:status , id:user._id});
  //     setCart(user.cart.length);
  //   }else{
  //     isUser({status: false , id: 0});
  //   }
     
  //   }
  //   checkUser();
  //   if(user.status){
  //     window.location.reload();
  //   }
  // },[])
  
  return (
    <BrowserRouter>
    <div className='d-flex flex-column' style={{minHeight: '100vh'}} >
      
     {/* <Nav len = {ccart} status={user.status}/> */}
     <Outlet />
     <Routes>
     <Route path='/' element= {<Front   len = {ccart}/>} />
     <Route path = '/show'  element = {<ShowPage />} />
     <Route path='/contact' element= {<Contact />} />
     <Route path='/about'   element= {<About />} />
     <Route path='/signup'  element={<Signup />} />
     <Route path='/login'   element={<Login />} />
     <Route path='/show/:id'element={<ShowPage  />} />
     <Route path='/cart'    element={<ProtectedRoute><Cart user={user.status} id = {user.id}/></ProtectedRoute>} />
     <Route path='/logout'  element={<Logout />} />
     <Route path='/buy/:id' element={<Buy />} />
     <Route path = '/order' element={<Order />} /> 
     <Route path = '/admin' element={<AdminFront />} /> 
     <Route path = '/*' element={<PageNotFound />} />
      </Routes>
    <Footer />
    </div>
    {/* <Signup /> */}
    </BrowserRouter>
    
   
   
  
 
  )
}

export default App
