import React from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useState, useEffect } from 'react';
import OrderEach from './orderEach';

function AdminFront() {
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
  return (
    <div className='flex-grow-1' style={{color:'black'}}>
      <div className='container'>
        <h1 className='text-center my-4'>Manage Orders</h1>
        {data.map((element) => {
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