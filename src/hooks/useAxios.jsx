import axios from "axios";

const axiosInstanse= axios.create({
    baseURL: 'http://localhost:3000/'
})

const useAxios=()=>{
    return axiosInstanse;
}

export default useAxios;