import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import pic from './pic.jpg'
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from '@mui/material';
import { useEffect , useState } from 'react';
import './list.css'
import { configHeaders } from '../config/client';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { AddToCart } from '../config/redux/action';
import { handleError, handleSuccess } from '../../util/util';

function Product({element , cart}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth); 
    const handleCart = async() => {
        try {           
            await dispatch(AddToCart({id : element._id}));
        } catch (error) {
                console.log(error);
                return;
        }
    }
   
  return (
    <Card sx={{ maxWidth: 500 , minHeight: 500, display: 'flex' , flexDirection: 'column' , }}>
      <CardMedia
        sx={{ height: 250 }}
        image={element.imageUrl}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div" sx={{color: '#003366'}}>
          {element.name.substring(0 , 20)}
        </Typography>
        <Typography variant="h6"  sx={{ color: '#006699' , fontFamily:'Monsterrat'  , fontWeight:'700' , height:'8rem'} }>
          {element.description}
        </Typography>
        <div className='d-flex align-items-center justify-content-between mt-2'>
          <h3  style={{color: '#4A4A4A'}}>₹{element.price}<h6 className='fs-5 text-muted mx-3 d-inline' style={{textDecoration: 'line-through'}}>{element.originalPrice == element.price ? '' : '₹'+element.originalPrice}</h6>
          </h3>
         {element.discount != 0 &&  <h6 className='text-success mx-1 fs-6 d-inline bg-success text-white p-2' style={{borderRadius:'5px'}}>{element.discount}% off</h6>}
        </div>
        {/* <Typography variant="h6" sx={{ color: 'text.primary' , marginTop: '1rem'}}>
          ₹{element.price}
        </Typography> */}
      </CardContent>
      <CardActions className='d-flex align-items-center justify-content-center'>
        <Link to = {`buy/${element._id}`}  className='btn p-2 buy w-25 '>Buy</Link>
        {!cart && <button  className='btn p-2 cart w-25' onClick={handleCart}>+cart</button>}
        <Link to={`/show/${element._id}`}>
        <button  className='btn p-2 w-100 details'>View Details</button>
        </Link>
      </CardActions>
      <ToastContainer />
    </Card>
  )
}

export default Product