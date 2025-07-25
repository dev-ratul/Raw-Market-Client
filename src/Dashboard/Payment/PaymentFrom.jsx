import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const PaymentFrom = () => {
  const [error, setError] = useState("");
  const stripe = useStripe();
  const element = useElements();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: product = [], isPending } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/product/${id}`);
      return res.data;
    },
  });

  const cost = product.pricePerUnit;
  const costInCents = cost * 100;

  if (isPending) return <Loading />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !element) return;

    const card = element.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      toast.error(error.message);
      return;
    } else {
      setError("");
    }

    // Create payment intent
    let clientSecret = "";
    try {
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: costInCents,
        id,
      });
      clientSecret = res.data.clientSecret;
    } catch (err) {
      toast.error("❌ Failed to create payment intent");
      return;
    }

    // Confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
      toast.error(result.error.message, "ra");
    } else {
      setError("");
      if (result.paymentIntent.status === "succeeded") {
        const paymentSuccessData = {
          productId: id,
          email: user.email,
          amount: parseInt(cost),
          transactionId: result.paymentIntent.id,
          paymentMethod: result.paymentIntent.payment_method_types[0],
          marketName: product.marketName,
          productName: product.itemName,
        };

        try {
          const paymentRes = await axiosSecure.post(
            "/confirm-payment",
            paymentSuccessData
          );
          //console.log(paymentRes.data);
          if (paymentRes.data.insertResult.insertedId) {
            toast.success("✅ Payment successful!");
          } else {
            toast.error("❌ Payment recorded failed on server.");
          }
        } catch (err) {
          toast.error("❌ Server error while confirming payment.");
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h2
          className="text-3xl font-bold text-white text-center mb-6 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Payment Portal
        </motion.h2>

        <div className="p-4 bg-white rounded-xl shadow-md">
          <CardElement className="text-black" />
        </div>

        <motion.button
          type="submit"
          disabled={!stripe}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl w-full shadow-lg transition-all duration-300"
        >
          Pay ${cost}
        </motion.button>

        {error && (
          <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
        )}
      </motion.form>
    </div>
  );
};

export default PaymentFrom;
