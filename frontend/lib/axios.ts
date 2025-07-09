import axios from "axios";

// 👉 Pull the token from localStorage *once per request*.
const instance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// ----- Request interceptor: add Authorization header -----
// instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   const token = typeof window !== "undefined"
//     ? localStorage.getItem("access_token")
//     : null;

//   if (token) {
//     config.headers = config.headers || {};
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

export default instance;
