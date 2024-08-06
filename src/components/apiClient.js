//component/apiclient
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3002", //elbackend server 3002
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;


// {
//     "email":"user9@gmail.com",
//     "password":"P@ss1239_"
// }
//user1010@gmail.com

// pass: P@ss11503