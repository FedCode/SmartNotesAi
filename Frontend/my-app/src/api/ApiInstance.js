import axios from 'axios';

const apiInstance  = axios.create({
    baseURL:"http://localhost:3360",
      headers: { 
        'Content-Type': 'application/json'
     }
})

apiInstance.interceptors.request((config)=>{
    const token = localStorage.getItem('token');

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
})

