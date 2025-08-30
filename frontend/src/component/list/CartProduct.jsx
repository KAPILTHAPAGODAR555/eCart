import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import './list.css'
import { useMediaQuery } from '@mui/material';
import axios from 'axios';
function CartProduct({element , id , func}) {

  let [count , setCount] = useState(element.qty);
  const isPhone = useMediaQuery('(max-width: 1000px)');
  const handleError = (error) => {
          toast.error(error , {
              position: 'bottom-left'
          })
      }
      const handleSuccess = (message) => {
          toast.success(message , {
              position: 'bottom-left'
          })
      }
  const incrCount = (name , price , id)=> {
    count = count+1;
    setCount(count);
    func(count , name , price , id , true);
  }
  const decrCount = (name , price , id)=> {
    if(count == 0){
      handleError("You have to select at least 1 or none")
      return;
    }
    count  = count -1;
    setCount(count);
    func(count , name , price , id , true);
  }
  const handleDeleteProduct = async() => {
        try { 
          let res = await axios.delete(`http://localhost:8000/cart/show/${element._id}/${id}` , {withCredentials: true});
          let {status , message} = res.data;
          console.log(res);
          if(status){
            handleSuccess(message);
            setTimeout(()=>{
              window.location.reload();
            },3000)
            return;
          }else{
            handleError(message);
          }
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
                      <p className='fs-2 fw-500' style={{fontFamily: 'monsterrat' , color:'#3161aaff'}}>{element.product.name}</p>
                      <p className='fs-3 fw-500' style={{fontFamily: 'monsterrat' , color:'#2D3748'}}>₹{element.product.price}</p>
                    </div>
                    <div className='d-flex justify-content-between align-items-center flex-wrap'>
                    <div className='d-flex justify-content-between align-items-center flex-wrap mb-2'>
                      <button className='py-2 px-3 fs-4 fw-700' disabled={count == 0 ? true : false} onClick={()=> {decrCount(element.product.name , element.product.price , element._id)}} style={{color:'#153360ff' ,cursor:'pointer' , border: '2px solid #38A169' , borderTopLeftRadius: '10px', borderBottomLeftRadius:'10px'}}>{'<<'}</button>
                      <div className=' py-2 px-3 fs-4 fw-700' style={{border: '1px solid #38A169'  , color:'#153360ff'}}>{count}</div>
                      <button className=' py-2 px-3 fs-4 fw-700' onClick={()=> {incrCount(element.product.name , element.product.price , element._id)}} style={{color: '#153360ff' , cursor: 'pointer', border: '2px solid #38A169' , borderTopRightRadius: '10px', borderBottomRightRadius:'10px'}}>{'>>'}</button>
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