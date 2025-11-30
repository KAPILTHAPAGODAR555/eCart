import React from 'react'
import { useEffect } from 'react';
import OrderEach from './orderEach';
import { useDispatch, useSelector } from 'react-redux';
import { showOrders } from '../config/redux/action';
function AdminFront() {
  const { orders, ordersStatus, ordersLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showOrders());
  }, [])
  return (
    <div className='flex-grow-1' style={{ color: 'black' }}>
      <div className='container'>
        <h1 className='text-center my-4'>Manage Orders</h1>
        {ordersStatus && orders.map((element) => {
          return (
            <div>
              {element.tracking_history.map((order) => {
                return (
                  <div>
                    <OrderEach order={order} orderId={element._id} />
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


export default AdminFront