import React, { useEffect, useState } from 'react'
import pic from './pic.jpg'
import Typography from '@mui/material/Typography';
import { getPaginationItemUtilityClass, useMediaQuery } from '@mui/material';
import { green } from '@mui/material/colors';
import './list.css'
import {  useParams } from 'react-router';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import root from './root.png'
import { useNavigate, Link } from 'react-router';
import Nav from '../Nav';
function ShowPage() {
    let totalRating = 0;
    let ratingCount = 0;
    const isMedium = useMediaQuery('(max-width:990px)');
    const isPhone = useMediaQuery('(max-width: 1000px)')
    let {id} = useParams();
    const [user , isUser] = useState({
        status: false,
        id: 0
    });
  useEffect(()=> {
    const checkUser = async()=> {
      let res= await axios.get( `http://localhost:8000/user/login`, {withCredentials: true});
      let {status , user} = res.data;
    //   console.log(id);
      isUser({status:status , id:user._id});
    }
    checkUser();
  },[])
    let [info , setInfo] = useState({
        "id":0,
"category": "Fruit",
"createdAt": "2025-07-22T06:53:07.435Z",
"description": "Ripe Robusta bananas, a great source of instant energy and potassium.",
"imageUrl": "",
"name": "Robusta Banana",
"price": 6,
"stock": 500,
"unit": "piece",
"discount" : "",
"originalPrice": 0,
"originPlace": "",
"reviews":[]
    });
    let [review , setReview] = useState({
        comment: "",
        rating: "1"
    })
    useEffect(()=> {
        const fetchData = async() => {
            let res = await axios.get(`http://localhost:8000/product/show/${id}` , info , {withCredentials : true})
            let {data , success} = res.data;
            // console.log(data);
            setInfo(data);
        }
        fetchData();
    } , []);
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
    let navigate = useNavigate();
    // submit the review
    const handleReview = async(e)=> {
        e.preventDefault();
        if(review.comment == ""){
            handleError("Please give some feedback comment");
            return;
        }
        let res = await axios.post(`http://localhost:8000/product/review/${id}` , review , {withCredentials: true});
        let {message , success} = res.data;
        if(!success){
            handleSuccess(message)
           setTimeout(()=> {
                 setReview({comment: "", rating: "1" })
                window.location.reload();
            }, 3000)
        }else{
            handleError(message);
             return;
        }
        console.log(review);
    }
    // handle the review delete
    const handleDeleteReview = async(reviewId)=> {
        console.log("review id : " + reviewId , " product id: " + id);
        let res = await axios.delete(`http://localhost:8000/product/${id}/review/${reviewId}/delete/` , {withCredentials: true})
        let {message , success} = res.data;
        console.log(message , success)
        if(success){
            handleSuccess(message)
            setTimeout(()=> {
                window.location.reload();
            }, 3000)
           
        }else{
            handleError(message);
             return;
        }
    
    }
    const handleCart = async() => {
        if(user.id == 0){
            navigate("/signup");
        }
        try {
            let res = await axios.get(`http://localhost:8000/cart/product/${id}/add/${user.id}/` , {withCredentials: true});
            let {status , message} = res.data;
            if(status){
                handleSuccess(message);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }else{
                handleError(message);
            }
        } catch (error) {
                handleError(error);
        }
    }
    info.reviews.map((element, index)=> {
                        totalRating += element.rating;
                        ratingCount++;
    })
    return (
        <div className={`${isPhone ? 'container-fluid' : 'container'} flex-grow-1`}>
             <Nav />
            <h1 className='text-center fs-1 pb-3 fw-700 border-bottom' style={{fontFamily:'Monsterrat' , textDecorationLine:'underline', textDecorationColor:'lightgrey', textUnderlineOffset:'5px'}}>Plants</h1>
            <div className='row' >
                <div className='col-12 col-md-12 col-lg-4 mt-2' style={{maxWidth: '80vw' , maxHeight:'80vh',  position : isMedium ? 'initial' : 'sticky' , left:'1rem' , top:'5rem', margin: isMedium ? 'auto':''}}>
                    <img src={'/'+info.imageUrl} className='img-fluid p-2' style={{height: isPhone ? '' : '40rem ' , marginTop: isPhone ? '':'3rem' , borderRadius:'20px'}}></img>
                </div>
                <div className='col-lg-1'></div>
                <div className={`col-12 col-md-12 col-lg-7 oveflow-auto mt-2`} style={{minHeight: '100vh' , paddingTop: isMedium ? '2rem' : '0rem'}}>
                    <div className='d-flex flex-column'>
                    <h1 className='fw-bold' style={{fontFamily:'Monsterrat' , color:'#003366'}}>{info.name}</h1>
                    <h3 className='mx-3' style={{fontFamily:'Monsterrat' , color:'#006699'}}>{isPhone ?info?.description.substring(0 , 35)+'...' :info.description}</h3>
                    <div className='d-flex align-items-center justify-content-between mx-2'>
                        <h1  style={{color: '#4A4A4A'}}>₹{info.price}<h4 className='fs-5 text-muted mx-3 d-inline' style={{textDecoration: 'line-through'}}>₹{info.originalPrice}</h4>
                        </h1>
                        <h5 className='text-success mx-1 fs-5 d-inline bg-success text-white p-2' style={{borderRadius:'10px'}}>{info.discount}% off</h5>
                    </div>
                    <p class="starability-result" data-rating={Math.ceil(totalRating/ratingCount)}></p>
                    {/* <p> {totalRating} { ratingCount}</p> */}
                    <div className='w-100'
      style={{display: 'flex', alignItems:'center', justifyContent:'center', padding: '0.3rem' }}
      >
       <Link className='btn w-100 pt-3  m-1  mt-2 fs-4 fw-bold buy' style={{width: '100%' , height: '4rem'}} to={`http://localhost:5173/buy/${info._id}`}>Buy</Link>
       <button className='btn w-100 m-1 mt-2 fs-4 fw-bold cart' style={{width: '100%' , height: '4rem'}} onClick={handleCart}>+Cart</button>
      </div>
                    <div className='about-items mt-5 m-2'>
                        <h2><i class="fa-solid fa-seedling mx-2" style={{color: 'green'}}></i>Why You'll Love It</h2>
                        <ul style={{listStyle: 'none'}}>
                            <li className='fs-6 mt-3' style={{fontFamily:'Roboto'}}><h6><i class="fa-solid fa-indian-rupee-sign mx-2" style={{color:"#FF9800"}}></i>Price: ₹{info.price} per {info.unit}</h6></li>
                            <li className='fs-6 mt-3' style={{fontFamily:'Roboto'}}><h6><i class="fa-solid fa-tractor mx-2" style={{color:"#8BC34A"}}></i> Origin: Sourced from local farms in {info.originPlace}</h6></li>
                            <li className='fs-6 mt-3' style={{fontFamily:'Roboto'}}><h6><i class="fa-solid fa-seedling mx-2" style={{color:"#4CAF50"}}></i>Quality: Fresh, juicy, and hand-selected</h6></li>
                            <li className='fs-6 mt-3' style={{fontFamily:'Roboto'}}><h6><i class="fa-solid fa-box-open mx-2" style={{color:"#03A9F4"}}></i>Availability: {info.stock} left!!</h6></li>
                            <li className='fs-6 mt-3' style={{fontFamily:'Roboto'}}><h6><i class="fa-solid fa-basket-shopping mx-2" style={{color:"#9C27B0"}}></i>Category: Fresh {info.category}</h6></li>
                        </ul>
                    </div>
                    {user.status && <div className='rating-view mt-5'>
                        <h2 className='text-center'>Rate & Review</h2>
                        <form>
                            <div class="form-group">
                                <fieldset class="starability-heartbeat">
                                    {/* <legend for="rating" className={`${isPhone ? 'fs-6' : 'fs-3'}`}>Rate this product</legend> */}
  {/* <input type="radio" id="no-rate" class="input-no-rate" name="rating" value={review.rating} checked onChange={(e) => setReview({...review , rating: e.target.value})} aria-label="No rating." /> */}
                                    <input type="radio" id="first-rate1" name="rating" value="1" checked={review.rating == "1"} onChange={(e)=> setReview({...review , rating: e.target.value})} />
                                    <label for="first-rate1" title="Terrible">1 star</label>
                                    <input type="radio" id="first-rate2" name="rating" value="2" checked={review.rating == "2"} onChange={(e)=> setReview({...review , rating: e.target.value})} />
                                    <label for="first-rate2" title="Not good">2 stars</label>
                                    <input type="radio" id="first-rate3" name="rating" value="3" checked={review.rating == "3"} onChange={(e)=> setReview({...review , rating: e.target.value})} />
                                    <label for="first-rate3" title="Average">3 stars</label>
                                    <input type="radio" id="first-rate4" name="rating" value="4" checked={review.rating == "4"} onChange={(e)=> setReview({...review , rating: e.target.value})} />
                                    <label for="first-rate4" title="Very good">4 stars</label>
                                    <input type="radio" id="first-rate5" name="rating" value="5" checked={review.rating == "5"} onChange={(e)=> setReview({...review , rating: e.target.value})} />
                                    <label for="first-rate5" title="Amazing">5 stars</label>
                                </fieldset>

                            </div>
                            <div class="form-group">
                              <label for="comment-textarea" className={`${isPhone ? 'fs-6' : 'fs-3'}`}>Add Your Comment</label>
                              <textarea class="form-control" id="comment-textarea" cols="4" rows='8'  value={review.comment} onChange={(e)=> setReview({...review, comment: e.target.value})}></textarea>
                            </div>
                            <button className='btn btn-primary mt-3 fw-bold' onClick={handleReview}>Submit Review</button>
                        </form>
                    </div>}
                    <div className='row mt-3 p-3'>
                    {info.reviews.map((element, index)=> {
                        totalRating += element.rating;
                        ratingCount++;
                        return(
                            
                                <div className={`col-12 col-md-4 col-lg-5 border rounded ${isPhone ? 'ms-1 m-3' :'ms-4'} mt-2 p-2`}>
                                    <p className='fs-4 fw-700 mx-2' style={{fontFamily: 'monsterrat'}}>{element.author[0].username}</p>
                                    <p class="starability-result" data-rating={element.rating}></p>
                                    <p className='mx-2'>{element.comment}</p>
                                    <div className='d-flex align-item-center justify-content-evenly'>
                                   <span class="badge text-bg-light pt-2" style={{margin: '0 !important'}}><i className='fa-solid fa-check rounded bg-secondary text-white p-1 mx-1'></i>Verified Purchase</span>
                                   {element.author[0]._id === user.id &&  <span className='badge text-bg-light pt-2 text-danger fs-6 del-rev' style={{cursor: 'pointer'}} onClick={()=> handleDeleteReview(element._id)}>Delete</span>}
                                    </div>
                                </div>   
                           
                        )
                    })}
                     </div>
                    </div>
                </div>
                
            </div>
            <ToastContainer />
        </div>
    )
}

export default ShowPage

/*
category: "Fruit"
createdAt: "2025-07-22T06:53:07.435Z"
description: "Ripe Robusta bananas, a great source of instant energy and potassium."
imageUrl: "https://example.com/images/bananas.jpg"
name: "Robusta Banana"
price: 6
stock: 500
unit: "piece"
*/