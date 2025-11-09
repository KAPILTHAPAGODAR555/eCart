import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import Product from './Product';
import CartProduct from './CartProduct';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ToastContainer , toast } from 'react-toastify';
import Nav from '../Nav';
import Cookie from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { showCart } from '../config/redux/action';
import CircularLoader from '../../util/Loader';


const token  = Cookie.get('token');
const configHeaders = {
    headers: {
        'Authorization' : `Bearer ${token ? token : ''}`
    }
}

function Cart() {

    const dispatch = useDispatch();
    const {cartItems , cartItemsStatus} = useSelector(state => state.auth);
    useEffect(()=> {
  dispatch(showCart());
    },[])
  return (
    // data.length == 0  || !user.status?  <div className='container flex-grow-1 mb-5'>
    cartItemsStatus && cartItems.length > 0 ? 
    <div className='container flex-grow-1 mb-5'>
    <Nav />

      <h1 className='text-center fs-1 pb-3 fw-700 border-bottom' style={{fontFamily:'Monsterrat' , textDecorationLine:'underline', textDecorationColor:'lightgrey', textUnderlineOffset:'5px'}}>Cart</h1>
      <div className='row'>
      <div className='col-12 col-md-12 col-lg-12'>

       {cartItemsStatus && cartItems.map((element , index) => {
        
        return(
          <div className='col-12 col-md-12 col-lg-12 m-2'>

            <CartProduct element={element} key={index} cart = {true} />
          </div>
        )
       })}
       
     </div>
     
     <div className='col-12 col-md-12 col-lg-12 m-3' >
      {/* // <h4 className='text-center m-3'>Summary</h4> */}
      <div className='container '>
        <div className='d-flex flex-column align-items-center justify-content-center mt-2'>
        <Link className='btn btn-primary w-50' to={`/buy/cart`}>Checkout</Link>
        <Link to='/' style={{textDecoration: 'none'}}>
        <p className = 'fs-5 fw-600' style={{fontFamily: 'monsterrat' , color:'#053265ff'}}>or Continue Shopping</p>
        </Link>
        </div>
       </div>
     </div>
     </div>
    </div>
    :  <div className='container flex-grow-1 mb-5'>
    <Nav />
    <div className='d-flex flex-column align-items-center justify-content-center mt-5'>
    <h1 style={{color: 'darkgray' , fontFamily:'Monsterrat'}} className='m-2'>Empty Cart</h1>
    <ShoppingCartIcon style={{color : 'orange' , width:'5rem' , height:'5rem'}}  className='m-2'/>
    <Link to ='/' style={{textDecoration: 'none'}}>
     <p className = 'fs-3 fw-600 text-center m-2' style={{fontFamily: 'monsterrat' , color:'#053265ff'}}>Continue Shopping</p>
    </Link>
    </div> 
    </div>  
  )
}

export default Cart