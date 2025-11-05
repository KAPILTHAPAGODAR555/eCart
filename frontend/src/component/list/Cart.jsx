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


const token  = Cookie.get('token');
const configHeaders = {
    headers: {
        'Authorization' : `Bearer ${token ? token : ''}`
    }
}

function Cart() {
   const [user , isUser] = useState({
        status: false,
        id: 0
    });

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartItems , cartItemsStatus} = useSelector(state => state.auth);
    // console.log(user , id);
    let [data , isData] = useState([]);
    let [cartArr , setCartArr] = useState([]);
    // if(cartItemsStatus)setCartArr(cartItems)
    useEffect(()=> {
  dispatch(showCart());
    },[])
    let sum = 0;
    
    const totalCount = async(qty , name , price, send) => {
  const existingItemIndex = cartArr.findIndex(item => item.name === name);
  if (existingItemIndex > -1) {
    const updatedCartArr = cartArr.map((item, index) => {
      if (index === existingItemIndex) {
        return { ...item, qty: qty };
      }
      return item;
    });
   
   if(send){ await axios.put(`http://localhost:8000/cart/update` , {cart: updatedCartArr} , configHeaders,  {withCredentials: true});}
  
    
    setCartArr(updatedCartArr);
  } else {
    const newCartArr = [...cartArr, { name, qty,  price }];
     if(send){ await axios.put(`http://localhost:8000/cart/update` , {cart : newCartArr} , configHeaders ,  {withCredentials: true});}
    setCartArr(newCartArr);
  }
   
      console.log(qty+1, name, price);
  }
  console.log(cartArr);
  return (
    // data.length == 0  || !user.status?  <div className='container flex-grow-1 mb-5'>
      !cartItemsStatus ?  <div className='container flex-grow-1 mb-5'>
    <Nav />
    <div className='d-flex flex-column align-items-center justify-content-center mt-5'>
    <h1 style={{color: 'darkgray' , fontFamily:'Monsterrat'}} className='m-2'>Empty Cart</h1>
    <ShoppingCartIcon style={{color : 'orange' , width:'5rem' , height:'5rem'}}  className='m-2'/>
    <Link to ='/' style={{textDecoration: 'none'}}>
     <p className = 'fs-3 fw-600 text-center m-2' style={{fontFamily: 'monsterrat' , color:'#053265ff'}}>Continue Shopping</p>
    </Link>
    </div>
    </div> :
    <div className='container flex-grow-1 mb-5'>
    <Nav />

      <h1 className='text-center fs-1 pb-3 fw-700 border-bottom' style={{fontFamily:'Monsterrat' , textDecorationLine:'underline', textDecorationColor:'lightgrey', textUnderlineOffset:'5px'}}>Cart</h1>
      <div className='row'>
      <div className='col-12 col-md-12 col-lg-8'>

       {cartItemsStatus && cartItems.map((element , index) => {
        
        return(
          <div className='col-12 col-md-12 col-lg-12 m-2'>

            <CartProduct element={element} key={index} cart = {true} func={totalCount} />
          </div>
        )
       })}
       
     </div>
     
     <div className='col-12 col-md-12 col-lg-4'>
      {/* // <h4 className='text-center m-3'>Summary</h4> */}
      <div className='container '>
        <div className='d-flex flex-column align-items-center justify-content-center mt-2'>
        <Link className='btn btn-primary w-50' to={`/buy`}>Checkout</Link>
        <Link to='/' style={{textDecoration: 'none'}}>
        <p className = 'fs-5 fw-600' style={{fontFamily: 'monsterrat' , color:'#053265ff'}}>or Continue Shopping</p>
        </Link>
        </div>
        {/*
      {cartItemsStatus && cartItems.map((element) => {
           sum += (element.qty) * (element.price);
          let qty = element.qty;
         return qty == 0 ?  ('') : (
          <div className='row'>
            <div className='d-flex align-items-center justify-content-between'>
              <p className='fs-5 fw-bold' style={{fontFamily: 'monsterrat', color:'#3e85efff'}}><strong>{element.product.name}</strong></p>
              <p className='fs-4 fw-500' style={{fontFamily: 'monsterrat' , color:'#2D3748'}}>₹{element.product.price}</p>
            </div>
            <div className='d-flex align-items-center justify-content-between'>
              <p className='fs-5' style={{fontFamily: 'monsterrat' , color:'#38A169'}}><strong>Total Quantity: </strong></p>
             <p className = 'fs-5 fw-bold' style={{fontFamily: 'monsterrat' , color:'#38A169'}}>{element.qty + 1}</p>
            </div>
          </div>
          
         
       
        )
      
      })}
      <div className='d-flex align-items-center justify-content-between'>
        <p className='fs-3' style={{fontFamily: 'monsterrat' ,  color:'#1A202C'}}><strong>Total : </strong></p>
        <p className = 'fs-3 fw-bold' style={{fontFamily: 'monsterrat' , color:'#053265ff'}}>₹{sum}</p>
      </div>
     {sum > 0 && <div className='d-flex flex-column align-items-center justify-content-center mt-2'>
        <Link className='btn btn-primary w-50' to={`/buy/${user.id}`}>Checkout</Link>
        <Link to='/' style={{textDecoration: 'none'}}>
        <p className = 'fs-5 fw-600' style={{fontFamily: 'monsterrat' , color:'#053265ff'}}>or Continue Shopping</p>
        </Link>
        </div>
} */}

    
       </div>
     </div>
     </div>
    </div>
  )
}

export default Cart