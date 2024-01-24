import axios from "axios";

export const AuthApi = axios.create({
    headers:{
        'Authorization':localStorage.getItem('token')
    }
})