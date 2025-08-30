import React from 'react'

function Footer() {
  return (
    <div className='container-fluid mt-3' style={{backgroundColor: '#212121'}}>
        <div className='row mt-5 mb-2 p-3' style={{borderBottom : '2px solid gray'}}>
            <div className='col-12 col-md-6 col-lg-3'>
                <ul style={{listStyle: 'none'}}>
                    <li className='mb-2' style={{color: 'grey'}}>About</li>
                    <li className='text-white'>Contact us</li>
                    <li className='text-white'>Career</li>
                    <li className='text-white'>About us</li>
                    <li className='text-white'>Press</li>
                    <li className='text-white'>Corporate Information</li>
                </ul>
            </div>
            <div className='col-12 col-md-6 col-lg-3'>
                <ul style={{listStyle: 'none'}}>
                    <li className='mb-2' style={{color: 'grey'}}>HELP</li>
                    <li className='text-white'>Payments</li>
                    <li className='text-white'>Shipping</li>
                    <li className='text-white'>Cancellation & Returns</li>
                    <li className='text-white'>FAQ</li>
                </ul>
            </div>
            <div className='col-12 col-md-6 col-lg-3'>
                <ul style={{listStyle: 'none'}}>
                    <li className='mb-2' style={{color: 'grey'}}>CONSUMER POLICY</li>
                    <li className='text-white'>Cancellation & Returns</li>
                    <li className='text-white'>Term Of Use</li>
                    <li className='text-white'>Security</li>
                    <li className='text-white'>Sitemap</li>
                    <li className='text-white'>Grievance Redressal</li>
                    <li className='text-white'>ERC Compliance</li>
                </ul>
            </div>
            <div className='col-12 col-md-6 col-lg-3'>
                <ul style={{listStyle: 'none'}}>
                    <li className='mb-2' style={{color: 'grey'}}>Mail us:</li>
                    <li className='text-white'>eCart Internet Private Limited,</li>
                    <li className='text-white'>Buildings Alyssa, Begonia &</li>
                    <li className='text-white'>Clove Embassy Tech Village</li>
                    <li className='text-white'>Outer Ring Road, Devarabeesanahalli Village,</li>
                    <li className='text-white'>Bengalurr, 550103</li>
                </ul>
            </div>
        </div>
        <div className='d-flex align-items-center justify-content-evenly mt-1 p-3 mb-1'>
            <span className='text-white'>Become a seller</span>
            <span className='text-white'>Advertise</span>
            <span className='text-white'>Gift Cards</span>
            <span className='text-white'>Help Center</span>
        </div>
    </div>
  )
}

export default Footer