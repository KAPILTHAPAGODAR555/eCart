import React from 'react'
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

function LeftSection({description , img , heading}) {
  return (
    <div className='container mt-5 p-2'>
        <Typography variant='h4' className='text-center mb-5 mt-3 fw-bold' style={{fontFamily:'Monsterrat'}}>{heading}</Typography>
        <div className='row'>
            <div className='col-12 col-md-12 col-lg-4 text-center' >
                <img src={img} className='img-fluid' style={{borderRadius: '10px' , width: '100%' , height: '100%'}}></img>
            </div>
            <div className='col-12 col-md-12 col-lg-1'></div>
            <div className='col-12 col-md-12 col-lg-7 mt-3 text-center d-flex flex-column align-items-center justify-content-center'>
                <Typography variant='h5' className='text-muted pt-3' style={{lineHeight: '1.2'}}>{description}</Typography>
                <Button variant='outlined' className='mt-3 mb-3 p-2 w-50'>Read More</Button>
            </div>
        </div>


    </div>
  )
}

export default LeftSection