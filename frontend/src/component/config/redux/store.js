import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import  authReducer  from "./reducer.js";


export const store = configureStore({
    reducer: {
        auth: authReducer
    },
})

