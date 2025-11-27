import React from 'react'
import { useNavigate } from 'react-router'
function UserProfile() {
    let router = useNavigate();
  return (
    <div className='flex-grow-1'>
            <div className='container'>
                <div className='row'>
                    <div className="col-1"></div>
                    <div className='col-3 text-end'>
                            <div className="img">
                                <img src="/p-3.jpeg" className='rounded-pill' alt="" />
                            </div>
                    </div>
                    <div className="col-4 m-auto mt-5">
                        <div className='d-flex align-items-center justify-content-start mt-3 mb-5'>
                            <div className='head' style={{fontFamily:'Roboto'}}>
                                  <h1>Kapil Thapa</h1>
                            </div>
                        </div>
                        <div className="buttonContainer d-flex align-items-center justify-content-center gap-4 mt-4">
                            <button className='btn btn-primary w-50 p-4' 
                            onClick={ () => router('/contact')}
                            >Contact</button>
                            <button 
                             onClick={ () => router('/order')}
                            className='btn btn-primary w-50 p-4 ms-3'>Order</button>
                        </div>
                    </div>
                    <div className="col-3"></div>
                </div>
                <h1 className='text-center mb-5'  style={{fontFamily:'Roboto'}}>My Reviews</h1>
                <div className="reviewContainer mt-5 d-flex align-items-center justify-content-center flex-wrap gap-5" style={{fontFamily:'Monsterrat'}}>
                    <div className="reviewBox w-25 border mt-3 p-3">
                        <h1>Rating</h1>
                        <h1>Review</h1>
                    </div>
                    <div className="reviewBox w-25 border mt-3 p-3">
                        <h1>Rating</h1>
                        <h1>Review</h1>
                    </div>
                    <div className="reviewBox w-25 border mt-3 p-3">
                        <h1>Rating</h1>
                        <h1>Review</h1>
                    </div>
                    <div className="reviewBox w-25 border  mt-3 p-3">
                        <h1>Rating</h1>
                        <h1>Review</h1>
                    </div>
                    <div className="reviewBox w-25 border  mt-3 p-3">
                        <h1>Rating</h1>
                        <h1>Review</h1>
                    </div>
                </div>
            </div>
        </div>
       
  )
}

export default UserProfile

/*
 <div className="container">
            <div className="row">
                <div className="col-6">
                    <img src="/p-3.jpeg" className='rounded-pill'  alt="image" />
                </div>
                <div className="col-6 m-auto">
                    <h1>Kapil Thapa</h1>
                </div>
            </div>
        </div>
*/