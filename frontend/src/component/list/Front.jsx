import React from 'react'
import Product from './Product'
// import data from './data'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Nav from '../Nav';
import {useSelector , useDispatch} from 'react-redux'
import OrderTracker from './OrderTracker';
import { getAllProduct } from '../config/redux/action';
function Front() {
   const {items , itemsStatus} = useSelector(state => state.auth)
   const  dispatch = useDispatch();
  useEffect(()=> {
     dispatch(getAllProduct())
  }, [])
  return (
    <div className='container flex-grow-1'>
      <Nav />
      <h1 className='text-center' style={{fontFamily: 'Roboto'}}>eCart</h1>
     <div className='row'>
       {itemsStatus && items.map((element , index) => {
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