import { configureStore } from "@reduxjs/toolkit";
import  authReducer  from "./reducer.js";


export const store = configureStore({
    reducer: {
        auth: authReducer
    },
})

