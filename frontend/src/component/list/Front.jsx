import React from 'react'
import Product from './Product'
import { useEffect } from 'react';
import Nav from '../Nav';
import {useSelector , useDispatch} from 'react-redux'
import { getAllProduct } from '../config/redux/action';
import CircularLoader from '../../util/Loader';
function Front() {
   const {items , itemsStatus , frontLoading} = useSelector(state => state.auth)
   const  dispatch = useDispatch();
  useEffect(()=> {
     dispatch(getAllProduct())
  }, [])
  return (
    !frontLoading ?
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
    </div> : <div className='container flex-grow-1' style={{display: 'flex', alignItems:'center' , justifyContent: 'center', marginTop:'15rem'}}>
                <CircularLoader />
            </div>
  )
}

export default Front