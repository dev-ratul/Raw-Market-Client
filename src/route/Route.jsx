import {
  createBrowserRouter,
} from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home/Home";
import Login from "../Shared/Login/Login";
import Register from "../Shared/Register/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import AddProduct from "../Dashboard/AddProduct/AddProduct";
import MyProduct from "../Dashboard/MyProduct/MyProduct";
import UpdateProduct from "../Dashboard/MyProduct/UpdateProduct";
import AddAdvertisement from "../Dashboard/Advertisement/AddAdvertisement/AddAdvertisement";
import PrivateRoute from "./PrivateRoute";
import MyAdvertisement from "../Dashboard/Advertisement/MyAdvertisement";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children:[
        {
            index: true,
            Component: Home
        },
        {
            path: '/login',
            Component: Login
        },
        {
            path: '/register',
            Component: Register
        }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
      {
        path: 'add-product',
        Component: AddProduct
      },
      {
        path: 'my-product',
        Component: MyProduct
      },
      {
        path: 'update-product/:id',
        Component: UpdateProduct
      },
      {
        path: 'add-advertisement',
        Component: AddAdvertisement
      },
      {
        path: 'my-advertisement',
        Component: MyAdvertisement
      }
    ]
  }
]);