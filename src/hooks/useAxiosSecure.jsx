
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000/`
});

const useAxiosSecure = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // ✅ Request interceptor (corrected)
  axiosSecure.interceptors.request.use(
    (config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // ✅ Response interceptor
  axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;
      if (status === 401) {
        logout().then(() => {
          navigate("/sign-in");
        });
      } else if (status === 403) {
        navigate("/forbidden");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
