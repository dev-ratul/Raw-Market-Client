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
import ShowPriceTrendLayout from "../Dashboard/ShowPriceTrendLayout/ShowPriceTrendLayout/ShowPriceTrendLayout";
import AllUsers from "../Dashboard/AdminDashboard/AllUsers/AllUsers";
import AllAdvertisements from "../Dashboard/AdminDashboard/AllAdvertisements/AllAdvertisements";
import AdminAllProducts from "../Dashboard/AdminDashboard/AllProducts/AdminAllProducts";
import AllProducts from "../Pages/AllProducts/AllProducts";
import ViewDetails from "../Pages/AllProducts/ViewDetails";
import { path } from "framer-motion/client";
import PotataTrends from "../Dashboard/ShowPriceTrendLayout/PotataTrends/PotataTrends";
import OnionTrends from "../Dashboard/ShowPriceTrendLayout/OnionTrends/OnionTrends";
import OrkaTrends from "../Dashboard/ShowPriceTrendLayout/OkraTrends/OrkaTrends";
import ManageWatchlist from "../Dashboard/ManageWatchlist/ManageWatchlist";
import Payment from "../Dashboard/Payment/Payment";


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
        },
        {
          path: 'all-products',
          Component: AllProducts
        },
        {
          path: '/all-products/:id',
          element: <PrivateRoute><ViewDetails></ViewDetails></PrivateRoute>
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
      },
      {
        path: 'show-price-trend-layout',
        Component: ShowPriceTrendLayout,
        children:[
          {
            path: 'show-price-trend-layout/potata',
            Component: PotataTrends
          },
          {
            path: 'show-price-trend-layout/onion',
            Component: OnionTrends
          },
          {
            path: 'show-price-trend-layout/orka',
            Component: OrkaTrends
          },
          
        ]
      },
      {
        path: 'all-users',
        Component: AllUsers
      },
      {
        path: 'all-products',
        Component: AdminAllProducts
      },
      {
        path: 'all-advertisements',
        Component: AllAdvertisements
      },
      {
        path: '/dashboard/manage-watchlist',
        Component: ManageWatchlist
      },
      {
        path: 'payment/:id',
        Component: Payment
      }
    ]
  }
]);