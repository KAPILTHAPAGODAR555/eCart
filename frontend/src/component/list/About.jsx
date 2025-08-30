import React from 'react'
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import pic from './pic.jpg'
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import root from './root.png'
import values from './values.png'
import product from './product.png'
import connect from './connect.png'
import Nav from '../Nav';
function About() {
  return (
    <div className='container flex-grow-1 p-2'>
      <Nav />
        <Typography variant='h2' className='text-center mb-5' style={{fontFamily:'Monsterrat'}}>Bringing plant with a Touch of Punjab</Typography>
       <LeftSection img={root} heading="Our Roots and Inspiration" description="We are a passionate team of plant lovers and tech enthusiasts based 
        in the heart of Jalandhar, Punjab. Our journey began with a simple idea: to make the joy of plant..."/>
        <RightSection img={values} heading = "Our Values and Commitment" description = "At eCart, we believe in the power of a single plant to transform a space and uplift a spirit. Our core values are quality, accessibility, and community.We are committed to sourcing only the healthiest...."/>
        <LeftSection img={product} heading="Our Products and Expertise" description="We’re not just a marketplace; we're your partner in gardening. Our app offers a carefully curated selection of plants, from low-maintenance succulents and air-purifying indoor plants to vibrant flowering varieties..."/>
        <RightSection img={connect} heading="Our Connection to Jalandhar and Punjab" description="Being based in Jalandhar, Punjab, is an integral part of our story. We are proud to operate from a region known for its strong agricultural roots and entrepreneurial spirit. We draw inspiration from the fertile land and dedicated farmers of Punjab..." />
        <div className='row mt-5 p-2'>
            <Typography variant='h2' style={{fontFamily:'Monsterrat'}} className='text-center'>Join Our Community</Typography>
            <Typography variant='h5' className='text-muted pt-3 text-center mt-3 mb-3' style={{lineHeight: '1.2'}}>We invite you to download the eCart app and start your own plant journey. Join a growing community of plant enthusiasts and discover the perfect addition to your home or office. We're here to help you every step of the way!</Typography>
        </div>
    </div>
  )
}

export default About