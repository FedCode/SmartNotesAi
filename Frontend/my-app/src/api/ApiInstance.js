import axios from 'axios';

const apiInstance  = axios.create({
    baseURL:"https://smartnotesai-7ifv.onrender.com//api",
      headers: { 
        'Content-Type': 'application/json'
     }
})

apiInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

  return config;  
})

export default apiInstance;