import axios from "axios";

const axiosInstanse= axios.create({
    baseURL: 'https://raw-market-server.vercel.app/'
})

const useAxios=()=>{
    return axiosInstanse;
}

export default useAxios;