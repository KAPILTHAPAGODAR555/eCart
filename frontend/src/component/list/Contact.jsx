import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import { ToastContainer } from 'react-toastify';
import Nav from '../Nav';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { contactInfo } from '../config/redux/action';
import { handleError, handleSuccess } from '../../util/util';

function Contact() {
  const handleFormError = (info) => {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let phoneRegex = /^\d{7,15}$/;
    let codeRegex = /^\+?\d{1,4}$/;
    if (info.username == "") return { message: "Please enter the username", success: false };
    else if (!regex.test(info.email)) return { message: "Please enter the valid email", success: false };
    else if (!phoneRegex.test(info.phone)) return { message: "Please enter the valid phone", success: false };
    else if (!codeRegex.test(info.countryCode)) return { message: "Please enter the valid coutry code", success: false };
    else if (info.describe == "") return { message: "Please provide the issue description", success: false };
    return { message: "done", success: true };
  }
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    username: "",
    email: "",
    phone: "",
    countryCode: "",
    issue: "No Default Selection",
    describe: ""
  })

  const onHandle = async (e) => {
    e.preventDefault();
    let { message, success } = handleFormError(info);
    if (!success) {
      handleError(message);
      return;
    }


    try {
      let currentResult = unwrapResult(await dispatch(contactInfo(info)));
      handleSuccess(currentResult.message);
    } catch (error) {
      handleError(error.message);
      return;
    }
    setInfo({
      username: "",
      email: "",
      phone: "",
      countryCode: "",
      issue: "No Default Selection",
      describe: ""
    })
  }
  return (
    <div className='flex-grow-1 container p-3'>
      <Nav />
      <Typography variant='h2' className='text-center mt-3'>Report Issue</Typography>
      <Typography variant='h5' className='text-center mb-4 mt-1'>Please fill out the form below we will get back to you with in 24 hours</Typography>
      <form>
        <div className='row p-3'>
          <div class="form-group col-12 col-md-6 col-lg-6 mb-3">
            <label for="exampleFormControlInput1"><Typography variant='h6'>Name</Typography></label>
            <input type="text" class="form-control p-2" id="exampleFormControlInput1" placeholder="e.g rayan" value={info.username} onChange={(e) => setInfo({ ...info, username: e.target.value })} />
          </div>
          <div class="form-group col-12 col-md-6 col-lg-6 mb-3">
            <label for="exampleFormControlInput1"><Typography variant='h6'>Email address</Typography></label>
            <input type="email" class="form-control p-2" id="exampleFormControlInput1" placeholder="e.g rayan@google.com" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} />
          </div>
        </div>
        <div className='row p-3'>
          <div class="form-group col-12 col-md-6 col-lg-6 mb-3">
            <label for="exampleFormControlInput1"><Typography variant='h6'>Phone No.</Typography></label>
            <input type="text" class="form-control p-2" id="exampleFormControlInput1" placeholder="e.g 1239764" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} />
          </div>
          <div class="form-group col-12 col-md-6 col-lg-6 mb-3">
            <label for="exampleFormControlInput1"><Typography variant='h6'>Country Code</Typography></label>
            <input type="email" class="form-control p-2" id="exampleFormControlInput1" placeholder="e.g +91 for india" value={info.countryCode} onChange={(e) => setInfo({ ...info, countryCode: e.target.value })} />
          </div>
        </div>
        <div class="form-group mb-3 p-3">
          <label for="exampleFormControlSelect1"><Typography variant='h6'>Issue</Typography></label>
          <select class="form-control p-2" id="exampleFormControlSelect1" value={info.issue} onChange={(e) => setInfo({ ...info, issue: e.target.value })}>
            <option>Too Many Options</option>
            <option>Wrong Control</option>
            <option>Poor Mobile & Accessibility</option>
            <option>Unhelpful Order</option>
            <option selected>No Default Selection</option>
          </select>
        </div>

        <div class="form-group mb-3 p-3 d-flex flex-column">
          <label for="exampleFormControlTextarea1"><Typography variant='h6'>Describe Your issue</Typography></label>
          <textarea class="form-control p-2" id="exampleFormControlTextarea1" rows="3" value={info.describe} onChange={(e) => setInfo({ ...info, describe: e.target.value })}></textarea>
          <button className='btn btn-primary mt-5 w-50 align-self-center p-3' type='submit' onClick={onHandle}>Submit Issue</button>
        </div>

      </form>
      <ToastContainer />
    </div>

  )
}

export default Contact