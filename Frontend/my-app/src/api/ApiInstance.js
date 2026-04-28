import axios from 'axios';

const apiInstance  = axios.create({
    baseURL:"https://smartnotesai-7ifv.onrender.com/api",
    //   headers: { 
    //     'Content-Type': 'application/json'
    //  },
     withCredentials: true
})

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance;