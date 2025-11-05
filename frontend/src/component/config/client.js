import axios from "axios";
import Cookie from 'js-cookie';

export const client = axios.create({
    baseURL: "http://localhost:8000/",
})

const token  = Cookie.get('token');
export const configHeaders = {
    headers: {
        'Authorization' : `Bearer ${token ? token : ''}`
    }
}
