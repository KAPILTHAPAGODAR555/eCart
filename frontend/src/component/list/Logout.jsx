import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Cookie from 'js-cookie';
function Logout() {
    let navigate = useNavigate();
    useEffect(()=> {
 let token = Cookie.get('token');
    if(token){
        Cookie.remove('token');
       
    }
    window.location.reload();
     navigate("/");
    })
    return(
        <div className='flex-grow-1'>

        </div>
    )
   
}

export default Logout