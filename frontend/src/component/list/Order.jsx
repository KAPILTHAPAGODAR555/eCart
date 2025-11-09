import React from 'react'
import axios from 'axios'
import { ToastContainer ,toast } from 'react-toastify'
import { useEffect  , useState } from 'react'
import { useNavigate } from 'react-router'
import Nav from '../Nav'
import OrderTracker from './OrderTracker'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { showOrders } from '../config/redux/action'
import CircularLoader from '../../util/Loader'

function Order() {
  let trackMap = {
    'Order Placed' : 0,
  'Shipped': 1,
  'Out for Delivery' : 2,
  'Delivered' : 3,
  }
  let colorMap = {
    'Shipped' : '#007BFF', 
    'Processing' : '#6C757D', 
    'Delivered' :'#28A745'
  }
    let navigate = useNavigate();
    const {orders , ordersStatus, ordersLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(showOrders());
    },[])
  return (
   !ordersLoading ?
    <div className='flex-grow-1'>
      <Nav />
      <div className='container'>
        <h1 className='text-center my-4' style={{color:'#1976d2'}}>My Orders</h1>
{ordersStatus && orders.map((element) => {
let DateString = element.createdAt.toString();
  return(
    <div className='container mb-4' style={{border: '2px solid blue' , borderRadius: '10px'}}>
    <div className='d-flex align-items-center justify-content-between flex-wrap mt-3' style={{borderBottom: '2px solid #17177f'}}>
       <p className='fs-5 mx-3 text-primary'>Order Id: <strong>{element._id.substring(10)}</strong></p>
       <p className='fs-5 mx-3 text-primary'>Date: <strong>{DateString.split('T')[0].split('-').reverse().join('-')}</strong></p>
    </div>
    <div className='d-flex align-items-center justify-content-evenly flex-wrap'>
     <div className='mt-3'>
      <p className = 'fs-5'  style={{fontFamily:'Roboto'}}>Address: <strong>{element.address}</strong></p>
      <p  className = 'fs-5' style={{fontFamily:'Roboto'}}>Status: <strong>{element.Currentstatus}</strong></p>
      </div>
      <div className='mt-3'>
        <p  className = 'fs-5' style={{fontFamily:'Roboto'}}>Total Amount: <strong style={{color: 'gray'}}>₹{element.total}</strong></p>
      <p  className = 'fs-5' style={{fontFamily:'Roboto'}}>Mode: <strong>{element.mode}</strong></p>
      </div>
    </div>
      {element.Currentstatus == 'Delivered' && <p className='fs-4 text-center' style={{fontFamily:'Roboto'}}>Order Deliver Successfully!!</p>}

    <OrderTracker val = {trackMap[element.Currentstatus]} />
  </div>
  )
})}
          
      </div>
    </div> : <div className='flex-grow-1' style={{display: 'flex', alignItems:'center' , justifyContent: 'center', marginTop:'15rem'}}>
                <CircularLoader />
            </div>
  )
}

/*
<table class="table p-4 m-4 mb-4 fs-5">
  <thead>
    <tr>
      <th scope="col">Order Id</th>
      <th scope="col">Address</th>
      <th scope="col">Date</th>
      <th scope="col">Status</th>
      <th scope="col">Total</th>
      <th scope="col">Payment</th>

    </tr>
  </thead>
  <tbody>
{data.map((element) => {
let DateString = element.createdAt.toString();
  return(
    <div>
<tr>
      <th scope="row">{element._id.substring(10)}</th>
       <td>{element.address}</td>
      <td>{DateString.split('T')[0].split('-').reverse().join('-')}</td>
      <td>{element.Currentstatus}</td>
      <td>₹{element.total}</td>
      <td>{element.mode}</td>
    </tr>
    <OrderTracker val = {trackMap[element.Currentstatus]} />
  </div>
  )
})}
  </tbody>
</table>
*/

export default Order