import React from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useState, useEffect } from 'react';
import OrderEach from './orderEach';
import { useDispatch, useSelector } from 'react-redux';
import { showOrders } from '../config/redux/action';
function AdminFront() {
    let navigate = useNavigate();
    // console.log(user , id);
    // let [data , isData] = useState([]);
    // let [cartArr , setCartArr] = useState([]);
    //  let navigate = useNavigate();
    const {orders , ordersStatus, ordersLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(showOrders());
    },[])
  return (
    <div className='flex-grow-1' style={{color:'black'}}>
      <div className='container'>
        <h1 className='text-center my-4'>Manage Orders</h1>
        {ordersStatus && orders.map((element) => {
let DateString = element.createdAt.toString();
  return(
     <div>
      {/*  <p>{element.address}</p>
      <p>{DateString.split('T')[0].split('-').reverse().join('-')}</p>
       <p>{element.status}</p>
      <p>₹{element.total}</p>
      <p>{element.mode}</p> */}
{element.tracking_history.map((order)=> {
  return(
    <div>
<OrderEach order={order} orderId={element._id}/>
</div>
  ) 
 })
    
       
}
      </div>
    
  )
})}
      </div>
    </div>
  )
}

/*
{data.map((element) => {
let DateString = element.createdAt.toString();
  return(
<tr>
      <th scope="row">{element._id.substring(10)}</th>
       <p>{element.address}</p>
      <p>{DateString.split('T')[0].split('-').reverse().join('-')}</p>
      <p>{element.status}</p>
      <p>₹{element.total}</p>
      <p>{element.mode}</p>
    </tr>
  )
})}
*/

export default AdminFront