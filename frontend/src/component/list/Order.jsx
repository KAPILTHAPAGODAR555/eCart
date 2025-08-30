import React from 'react'
import axios from 'axios'
import { ToastContainer ,toast } from 'react-toastify'
import { useEffect  , useState } from 'react'
import { useNavigate } from 'react-router'
import Nav from '../Nav'
import OrderTracker from './OrderTracker'

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
   const [user , isUser] = useState({
        status: false,
        id: 0
    });

    let navigate = useNavigate();
    // console.log(user , id);
    let [data , isData] = useState([]);
    let [cartArr , setCartArr] = useState([]);
    useEffect(()=> {
       const checkUser = async()=> {
      let res= await axios.get( `http://localhost:8000/user/login`, {withCredentials: true});
      let {status , user} = res.data;
    //   console.log(id);
    console.log(status , user._id)
    if(status){
      isUser({status:status , id:user._id});
        try {
            let res = await axios.get(`http://localhost:8000/order/show/${user._id}/` , {withCredentials: true});
            let {status , info} = res.data;
            if(status){
                console.log(info);
                isData(info);
            }else{
                console.log(info);
                // handleError("Due to some reason not added");
            }
        } catch (error) {
            console.log(error);
            // handleError(error);
        }
    }
  }
    checkUser();
    },[])
    let count = 1;
  return (
    <div className='flex-grow-1'>
      <Nav />
      <div className='container'>
        <h1 className='text-center my-4' style={{color:'#1976d2'}}>My Orders</h1>
{data.map((element) => {
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