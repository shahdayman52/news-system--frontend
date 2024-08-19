//component/apiclient
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3002", //elbackend server 3002
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config)=>{
    const token = localStorage.getItem("token");
    if(token){
      config.headers.Authorization=`Bearer ${token}`;
    }
    // console.log("Request Config:", config);
    return config;
  },
  (error)=>{
    return Promise.reject(error);
  }
);

export default apiClient;


// {
//     "email":"user9@gmail.com",
//     "password":"P@ss1239_"
// }
//user1010@gmail.com

// pass: P@ss11503