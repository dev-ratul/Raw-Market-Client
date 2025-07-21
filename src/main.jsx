import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { router } from "./route/Route.jsx";

import { RouterProvider } from "react-router";
import Authprovider from "./Context/AuthProvider/Authprovider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // এই লাইনটা আবশ্যক

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Authprovider>
        <>
          <RouterProvider router={router} />
          <ToastContainer position="top-right" autoClose={3000} />
        </>
      </Authprovider>
    </QueryClientProvider>
  </StrictMode>
);
