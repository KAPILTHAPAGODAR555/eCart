import React from 'react'
import { Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router'
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react'
import { register } from '../config/redux/action';
import { handleError, handleSuccess } from '../../util/util';
function Signup() {
  const navigate = useNavigate();
  const handleFormError = (info) => {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let phoneRegex = /^\d{7,15}$/;
    let codeRegex = /^\+?\d{1,4}$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    if (info.username == "") return { message: "Please enter the username", success: false };
    else if (!regex.test(info.email)) return { message: "Please enter the valid email", success: false };
    else if (!phoneRegex.test(info.phone)) return { message: "Please enter the valid phone", success: false };
    else if (!codeRegex.test(info.countryCode)) return { message: "Please enter the valid coutry code", success: false };
    else if (!passwordRegex.test(info.password)) return { message: "Please enter the password that have at least 8 characters, at least one lowercase letter, at least one uppercase letter, and at least one number", success: false };
    else if (!info.check) return { message: "Please read the terms and conditions", success: false };
    return { message: "done", success: true };
  }
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    username: "",
    email: "",
    phone: "",
    countryCode: "",
    password: "",
    check: false
  });
  const clickHandle = async (e) => {
    e.preventDefault();
    let { message, success } = handleFormError(info);
    if (!success) {
      handleError(message);
      return;
    }
    try {
      const resultData = await dispatch(register(info));
      const currentData = unwrapResult(resultData);
      if (currentData.success) {
        handleSuccess(currentData.message);
        setInfo({
          username: "",
          email: "",
          phone: "",
          countryCode: "",
          password: "",
          check: false
        })
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }

    } catch (error) {
      handleError(error.message);
    }

  }
  return (
    <div className='container p-5 flex-grow-1'>
      <div className='row p-4'>
        <div className='col-12 col-md-12 col-lg-5'>
          <h1 className='text-center mt-3 mb-5' style={{ fontFamily: 'montserrat' }}>SigUp To eCart</h1>
          <form>
            <div className='row '>
              <div class="form-group col-12 col-md-6 col-lg-6 mb-3">
                <label for="exampleFormControlInput1"><Typography variant='h6'>Name</Typography></label>
                <input type="text" class="form-control p-2" id="exampleFormControlInput1" placeholder="e.g rayan" name='username' value={info.username} onChange={(e) => setInfo({ ...info, username: e.target.value })} />
              </div>
              <div class="form-group col-12 col-md-6 col-lg-6 mb-3">
                <label for="exampleFormControlInput1"><Typography variant='h6'>Email address</Typography></label>
                <input type="email" class="form-control p-2" id="exampleFormControlInput1" name='email' placeholder="e.g rayan@google.com" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} />
              </div>
            </div>
            <div className='row '>
              <div class="form-group col-12 col-md-6 col-lg-6 mb-3">
                <label for="exampleFormControlInput1"><Typography variant='h6'>Phone No.</Typography></label>
                <input type="text" class="form-control p-2" id="exampleFormControlInput1" name='phone' placeholder="e.g 1239764" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} />
              </div>
              <div class="form-group col-12 col-md-6 col-lg-6 mb-3">
                <label for="exampleFormControlInput1"><Typography variant='h6'>Country Code</Typography></label>
                <input type="email" class="form-control p-2" id="exampleFormControlInput1" name='countryCode' value={info.countryCode} placeholder="e.g +91 for india" onChange={(e) => setInfo({ ...info, countryCode: e.target.value })} />
              </div>
            </div>
            <div class="form-group mb-3">
              <label for="exampleInputPassword1"><Typography variant='h6'>Password</Typography> </label>
              <input type="password" class="form-control" id="exampleInputPassword1" value={info.password} name='password' placeholder="Password" onChange={(e) => setInfo({ ...info, password: e.target.value })} />
            </div>
            <div class="form-check mb-3">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" name='check' checked={info.check} onChange={(e) => setInfo({ ...info, check: e.target.checked })} />
              <label class="form-check-label" for="exampleCheck1"><Typography variant='h6'>I Agree <a href='#'>Terms & conditions</a></Typography></label>
            </div>
            <div className='d-flex flex-column  align-items-center justify-content-center'>
              <button type="submit" class="btn btn-primary w-50" onClick={clickHandle}>Submit</button>
              <p>Already have a account <Link to='/login'>Login</Link></p>
            </div>
          </form>
        </div>
        <div className='col-lg-1'></div>
        <div className='col-12 col-md-12 col-lg-6'>
          <img src='signup.png' style={{ width: '100%', height: '100%', borderRadius: '10px' }}></img>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Signup