import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router'
import { getUserInfo } from '../config/redux/action';
function UserProfile() {
    let router = useNavigate();
    let dispatch = useDispatch();
    const { userInfo, userInfoStatus } = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(getUserInfo());
    }, [])

    return (
        <div className='flex-grow-1'>
            {userInfoStatus && <div className='container'>
                <div className='row mt-5'>
                    <div className="col-1"></div>
                    <div className='col-3 text-end'>
                        <div className="img">
                            <img src="/p-3.jpeg" className='rounded-pill' alt="" />
                        </div>
                    </div>
                    <div className="col-4 m-auto mt-5">
                        <div className='d-flex align-items-center justify-content-start mt-3 mb-3'>
                            <div className='head' style={{ fontFamily: 'Roboto' }}>
                                <h1>{userInfo.userInfo.username}</h1>
                                <p style={{color: 'grey'}} className='ms-2 fs-5'>{userInfo.userInfo.email}</p>
                            </div>
                        </div>
                        <div className="buttonContainer d-flex align-items-center justify-content-center gap-4 mt-5">
                            <button className='btn border-primary w-50 px-5 py-3 ms-3'
                                onClick={() => router('/contact')}
                            >Contact</button>
                            <button
                                onClick={() => router('/order')}
                                className='btn border-primary w-50 px-5 py-3 ms-3'>Order</button>
                            <button
                                onClick={() => router('/')}
                                className='btn border-primary w-50 px-5 py-3 ms-3'>Home</button>
                        </div>
                    </div>
                    <div className="col-3"></div>
                </div>
                <h1 className='text-center mb-5 mt-5' style={{ fontFamily: 'Roboto' }}>My Reviews</h1>
                <div className="reviewContainer mt-5 d-flex align-items-center justify-content-center flex-wrap gap-5" style={{ fontFamily: 'Monsterrat' }}>
                    {userInfo.userInfo.reviews.length > 0 && userInfo.userInfo.reviews.map((element) => {
                        const date = new Date(element.createdAt);
                        return (
                            <div className={`col-12 col-md-4 col-lg-5 border rounded mt-4 p-2`}>
                                    <p class="starability-result" data-rating={element.rating}></p>
                                    <p className='mx-2 fs-4'>{element.comment}</p>
                                    <div className='d-flex align-item-center justify-content-start'>
                                    <p className='fw-bold ms-2'>{date.toLocaleDateString('en-us')}</p>
                                    </div>
                                </div>  
                        )
                    })}
                </div>
            </div>
            }
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