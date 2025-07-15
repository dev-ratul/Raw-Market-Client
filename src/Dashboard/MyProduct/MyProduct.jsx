import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";

const MyProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myProduct = [], isPending} = useQuery({
    queryKey: ["/my-product", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?email=${user.email}`);
      return res.data;
    },
  });

  if(isPending){
    return <Loading></Loading>
  }

  console.log(myProduct)


  return (
    <div>
        d
    </div>
  )
};

export default MyProduct;
