import {createAsyncThunk} from '@reduxjs/toolkit'
import {client} from '../client.js'
import Cookie from 'js-cookie';
import { useDispatch } from 'react-redux';
import { handleSuccess } from '../../../util/util.js';




export const login = createAsyncThunk(
"user/login" , 
async (user , thunkApi) => {
    try {
        const response = await client.post('/user/login' , {
            email: user.email,
            password: user.password
        } , {withCredentials : true});
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue({message: error.response.data});
    }
}
)

export const register = createAsyncThunk(
    "user/register",
    async(user, thunkApi) => {
        try {
            const response = await client.post('/user/signup' , {
                email :user.email,
                password: user.password,
                info: {
                username: user.username,
                phone : user.phone,
                countryCode : user.countryCode,
                }
            } , {withCredentials : true});
            return thunkApi.fulfillWithValue(response.data);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
)

export const contactInfo = createAsyncThunk(
    "user/contact" , 
    async (info , thunkApi) => {
        try {
            const response = await client.post("/user/contact" , info , {withCredentials: true});
            return thunkApi.fulfillWithValue(response.data);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
)

export const getAllProduct = createAsyncThunk(
    "user/getAllProduct" , 
    async(_ , thunkApi)=> {
 try {
    const response = await client.get('/allProduct'  , {withCredentials : true});
    
    return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
     return thunkApi.rejectWithValue(error.response.data);   
    }
    }    
)


export const showCart = createAsyncThunk(
    "user/showCart",
    async(_ , thunkApi) => {
        const token  = Cookie.get('token');
const configHeaders = {
    headers: {
        'Authorization' : `Bearer ${token ? token : ''}`
    }
}
        try {

            let res = await client.get(`/cart/show`, configHeaders ,  {withCredentials: true});
            return thunkApi.fulfillWithValue(res.data);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
          
    }
)

export const AddToCart = createAsyncThunk(
    "user/AddToCart",
    async(element, thunkApi) => {
        const token  = Cookie.get('token');
const configHeaders = {
    headers: {
        'Authorization' : `Bearer ${token ? token : ''}`
    }
}
        try {
            console.log(token)
            const response = await client.get(`/cart/product/${element.id}/user/add` , configHeaders ,  {withCredentials: true});
                thunkApi.dispatch(showCart());
            return thunkApi.fulfillWithValue(response.data);
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error.response.message);
        }
    }
)

export const incrCountCart = createAsyncThunk(
    "user/incrCount" , 

    async(updatedCartArr , thunkApi) => {
        const token  = Cookie.get('token');
const configHeaders = {
    headers: {
        'Authorization' : `Bearer ${token ? token : ''}`
    }
}
        try {
            console.log("hello");
            const response =  await client.put(`/cart/update` , {cart: updatedCartArr} , configHeaders,  {withCredentials: true});
           
            return thunkApi.fulfillWithValue(response.data);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const deleteCartProduct = createAsyncThunk(
    "user/deleteCartProduct",
    async (element, thunkApi) => {
        const token  = Cookie.get('token');
const configHeaders = {
    headers: {
        'Authorization' : `Bearer ${token ? token : ''}`
    }
}
        try{
          let res = await client.delete(`/cart/delete/${element.id}` , configHeaders ,  {withCredentials: true});
          thunkApi.dispatch(showCart());
            return thunkApi.fulfillWithValue(res.data);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const showProduct = createAsyncThunk(
    "user/deleteCartProduct",
    async (element, thunkApi) => {
         const token  = Cookie.get('token');
const configHeaders = {
    headers: {
        'Authorization' : `Bearer ${token ? token : ''}`
    }
}
     
    try{
       
        let res = await client.get(`/product/show/${element.id}` ,  configHeaders , {withCredentials : true});
       
        return thunkApi.fulfillWithValue(res.data);

    }catch (error) {
        return thunkApi.rejectWithValue(error.response.data);

    }
}
)

export const addReview = createAsyncThunk(
    "user/addReview", 
    async(element , thunkApi) => {
           const token  = Cookie.get('token');
const configHeaders = {
    headers: {
        'Authorization' : `Bearer ${token ? token : ''}`
    }
}

try {
        let res = await client.post(`/product/review/${element.id}`,  {
            info: element.review
        }, configHeaders ,  {withCredentials: true});
        // console.log(res);
        thunkApi.dispatch(showProduct({id: element.id}));
        return thunkApi.fulfillWithValue(res.data);
    
} catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
}

    }
)

export const deleteReview = createAsyncThunk(
    "user/deleteReview",
    async (element , thunkApi) => {
          const token  = Cookie.get('token');
const configHeaders = {
    headers: {
        'Authorization' : `Bearer ${token ? token : ''}`
    }
}
try {
        let res = await client.delete(`/product/${element.id}/review/${element.reviewId}/delete/` , configHeaders ,  {withCredentials: true})
        thunkApi.dispatch(showProduct({id: element.id}));
        return thunkApi.fulfillWithValue(res.data);
} catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
}
        
    }
)