import React, { useState } from 'react'
import { handleSuccess } from '../../util/util';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { trackOrders } from '../config/redux/action';
import { ToastContainer } from 'react-toastify';
function OrderEach({ order, orderId }) {
  let dispatch = useDispatch();
  let [info, setInfo] = useState({
    location: order.location,
    status: order.status,
    remarks: order.remarks
  });
  const onClickHandle = async (e) => {
    e.preventDefault();
    try {
      let result = unwrapResult(await dispatch(trackOrders({ info, orderId })));
      let { message, status } = result;
      console.log(status);
      if (status) {
        handleSuccess(message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <p><strong>Order Id</strong> : {orderId}</p>
      <form>
        <div class="form-row">
          <div class="form-group mb-3">
            <label for="inputEmail4">Location</label>
            <input type="text" class="form-control" id="inputEmail4" placeholder="" value={info.location} onChange={(e) => setInfo({ ...info, location: e.target.value })} />
          </div>
          <div class="form-group  mb-3">
            <label for="inputPassword4">Remarks</label>
            <input type="text" class="form-control" id="inputPassword4" placeholder="" value={info.remarks} onChange={(e) => setInfo({ ...info, remarks: e.target.value })} />
          </div>
        </div>

        <div class="form-group mb-3">
          <label for="inputState">Order Status</label>
          <select id="inputState" class="form-control" value={info.status} onChange={(e) => setInfo({ ...info, status: e.target.value })}>
            <option >Shipped</option>
            <option>Delivered</option>
            <option>Order Placed</option>
            <option>Out for Delivery</option>
          </select>
        </div>
        <div className='d-flex align-items-center justify-content-center'>
          <button className='btn btn-primary w-25' onClick={onClickHandle}>Save</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default OrderEach