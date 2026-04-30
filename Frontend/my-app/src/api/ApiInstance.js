import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || "https://smartnotesai-7ifv.onrender.com/api";

const apiInstance  = axios.create({
    baseURL:baseURL,
    //   headers: { 
    //     'Content-Type': 'application/json'
    //  },
     withCredentials: true,
     headers: {
    'Content-Type': 'application/json',
  }
    
})

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Session expired or unauthorized");
      // You can trigger a global logout state here if needed
    }
    return Promise.reject(error);
  }
);

export default apiInstance;