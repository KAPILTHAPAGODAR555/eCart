import React, { useState } from 'react'
import { ToastContainer} from 'react-toastify';
import './list.css'
import { handleError } from '../../util/util';
import { useDispatch } from 'react-redux';
import { deleteCartProduct, incrCountCart, showCart } from '../config/redux/action';
function CartProduct({ element }) {
  const dispatch = useDispatch();
  let [count, setCount] = useState(element.qty);
  const incrCount = () => {
    count = count + 1;
    setCount(count);
  }
  const decrCount = () => {
    if (count == 0) {
      handleError("You have to select at least 1 or none")
      return;
    }
    count = count - 1;
    setCount(count);
  }
  const handleDeleteProduct = async () => {
    try {
      await dispatch(deleteCartProduct({ id: element._id }));
    } catch (error) {
      handleError(error);
    }
  }
  return (
    <div className='container mb-3'>
      <div className='row'>
        <div className='row'>
          <div className='col-12 col-md-12 col-lg-4 text-center mt-2'>
            <img src={element.product.imageUrl} className='w-75 rounded'></img>
          </div>
          <div className='col-12 col-md-12 col-lg-8'>
            <div className='d-flex justify-content-between align-items-center flex-wrap'>
              <p className='fs-2 fw-500' style={{ fontFamily: 'monsterrat', color: '#3161aaff' }}>{element.product.name}</p>
              <p className='fs-3 fw-500' style={{ fontFamily: 'monsterrat', color: '#2D3748' }}>₹{element.product.price}</p>
            </div>
            <div className='d-flex justify-content-between align-items-center flex-wrap'>
              <div className='d-flex justify-content-between align-items-center flex-wrap mb-2'>
                <button className='py-2 px-3 fs-4 fw-700' disabled={count == 0 ? true : false} onClick={() => {
                  decrCount()
                  dispatch(incrCountCart({ name: element.product.name, price: element.product.price, qty: count, id: element._id }))
                  dispatch(showCart());
                }} style={{ color: '#153360ff', cursor: 'pointer', border: '1px solid grey', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>{'-'}</button>
                <div className=' py-2 px-3 fs-4 fw-700' style={{ border: '1px solid grey', color: 'black' }}>{count}</div>
                <button className=' py-2 px-3 fs-4 fw-700' onClick={() => {
                  incrCount()
                  dispatch(incrCountCart({ name: element.product.name, price: element.product.price, qty: count, id: element._id }))
                  dispatch(showCart());
                }
                } style={{ color: '#153360ff', cursor: 'pointer', border: '1px solid grey', borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>{'+'}</button>
              </div>
              <button className='btn remove-btn mb-2' onClick={handleDeleteProduct}>Remove</button>
            </div>
          </div>

        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default CartProduct