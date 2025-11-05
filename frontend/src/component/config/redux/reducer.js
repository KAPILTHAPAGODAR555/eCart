import { createSlice } from "@reduxjs/toolkit";
import { getAllProduct, login, register, showCart } from "./action";
import Cookie from 'js-cookie';
import { act } from "react";
const token  = Cookie.get('token');
const initialState = {
    user: null,
    isLogin: token ? true: false,
    message: "",
    isLoading: false,
    isError: false,
    items: [],
    itemsStatus: false,
     cartItems: [],
     cartItemsStatus: false,
     cartCount: 0,
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        reset: (state) => initialState,
        emptyMessage: (state) => state.message = ""
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending , (state) => {
            state.isLoading = true,
            state.message = "loading",
            state.isLogin = true
        })
        .addCase(login.rejected , (state) => {
            state.message = "Authentication failed",
            state.isError = true,
            state.isLoading = false,
            state.isLogin= false
            console.log("jello");
        })
        .addCase(login.fulfilled , (state , action) => {
            state.message = action.payload.message,
            state.isLoading = false,
            state.isError = false,
            state.isLogin = action.payload.success
           
        })
        .addCase(register.rejected , (state , action) => {
            state.isError = true,
            state.isLoading = false,
            state.isLogin = false,
            state.message = action.payload.message
        })
        .addCase(register.pending , (state) => {
            state.message = "Loading....",
            state.isLoading = true,
            state.isError = false,
            state.isLogin = false
        })
        .addCase(register.fulfilled , (state , action) => {
            state.message = action.payload.message,
            state.isError = false,
            state.isLogin = action.payload.success,
            state.isLoading = false
        })
        .addCase(getAllProduct.pending , (state) => {
            state.itemsStatus = false,
            state.message = "Loading...",
            state.isError = false
        })
        .addCase(getAllProduct.rejected , (state , action) => {
            state.itemsStatus = false,
            state.isError = true,
            state.message = action.payload.message
        })
        .addCase(getAllProduct.fulfilled ,(state , action) => {
            state.items = action.payload.items,
            state.itemsStatus = true
        })
        .addCase(showCart.rejected , (state , action) => {
            state.cartItemsStatus = action.payload.status
        })
        .addCase(showCart.fulfilled , (state , action) => {
            state.cartItems = action.payload.info,
            state.cartItemsStatus = action.payload.status,
            state.cartCount = action.payload.info.length
        })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer