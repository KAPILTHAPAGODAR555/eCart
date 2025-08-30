import React from 'react'
import Product from './Product'
// import data from './data'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Nav from '../Nav';
import OrderTracker from './OrderTracker';
function Front() {
  const [data , setData] = useState([]);
   
  useEffect(()=> {
    const fetchData = async() => {
      try {
         let res = await axios.get('http://localhost:8000/allProduct'  , {withCredentials : true});
    let {data} = res;
    console.log(data);
    setData(data);
      } catch (error) {
       console.log(error); 
      }
    }
    fetchData();
  }, [])
  return (
    <div className='container flex-grow-1'>
      <Nav />
      <h1 className='text-center' style={{fontFamily: 'Roboto'}}>eCart</h1>
     <div className='row'>
       {data.map((element , index) => {
        return(
          <div className='col-12 col-md-6 col-lg-4 mt-4 mb-4'>
            <Product element={element} key={index} cart={false} />
          </div>
        )
       })}
     </div>
    </div>
  )
}

export default Front