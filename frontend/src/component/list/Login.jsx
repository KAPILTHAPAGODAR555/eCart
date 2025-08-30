import axios from 'axios';
import React, { use, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { Link , useNavigate } from 'react-router'
function Login() {
  const navigate = useNavigate();
  const handleFormError = (info)=> {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
   
     if(!regex.test(info.email))return {message : "Please enter the valid email" , success: false} ;
    else if(info.password == "")return {message: "Please enter the password that have at least 8 characters, at least one lowercase letter, at least one uppercase letter, and at least one number", success: false};
    return {message: "done" , success: true};
  }
  const [info , setInfo] = useState({
    email : "",
    password: ""
  })
   const handleError = (err)=> {
  toast.error(err , {
    position : 'bottom-left'
  })
 }
 const handleSuccess = (message)=> {
  toast.success(message , {
    position : 'bottom-left'
  })
 }
  const handleClick = async(e) => {
    e.preventDefault();
    let {message , success} = handleFormError(info);
    if(!success){
      handleError(message);
      return;
    }
    try {
      let res = await axios.post('http://localhost:8000/user/login' , info , {withCredentials : true});
      let {message , success} = res.data;
      if(success){
        handleSuccess(message)
        setTimeout(()=> {
           navigate("/");
        }, 3000);
       
      }else{
        handleError(message)
        return;
      }
      console.log(message);
     
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className='container p-5'>
        
        <div className='row p-4'>
            <div className='col-12 col-md-12 col-lg-6'>
                <h1 className='text-center mt-3' style={{fontFamily: 'montserrat'}}>Login Page</h1>
            <form>
                <div class="form-group mb-3">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" class = "form-control" value={info.email} id = "exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=> setInfo({...info , email: e.target.value})} placeholder="Enter email" />
                  <small id="emailHelp" class = "form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group mb-3">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" value={info.password} onChange={(e) => setInfo({...info , password : e.target.value})} class="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className='d-flex flex-column  align-items-center justify-content-center'>
                    <button type="submit" class="btn btn-primary w-50 mb-1" onClick={handleClick}>Submit</button>
                    <p>Don't have a account <Link to="/signup">Signup</Link></p>
                </div>
            </form>
            </div>
            <div className='col-12 col-md-12 col-lg-6'>
                <img src='signup.png' style={{width: '100%'  , height: '100%' , borderRadius: '10px'}}></img>
            </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Login