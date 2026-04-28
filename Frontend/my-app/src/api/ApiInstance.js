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
    if (error.response && error.response.status === 401) {
      // If the 5-hour session expires, the server sends 401
      // Clear your local user state and redirect
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiInstance;