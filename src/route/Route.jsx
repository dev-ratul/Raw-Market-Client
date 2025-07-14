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
    element: <DashboardLayout></DashboardLayout>,
    children:[
      {
        path: 'add-product',
        Component: AddProduct
      },
      {
        path: 'my-product',
        Component: MyProduct
      }
    ]
  }
]);