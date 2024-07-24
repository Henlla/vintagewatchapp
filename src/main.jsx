import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "swiper/css";

// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// fonts and icons
import "././assets/css/icofont.min.css";
import "././assets/css/animate.css";
import "././assets/css/style.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home/Home.jsx";
import Blog from "./blog/Blog.jsx";
import Shop from "./shop/Shop.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { AuthProvider } from "./utilis/AuthProvider.jsx";
import SingleProduct from "./shop/SingleProduct.jsx";
import Contact from "./home/Contact.jsx";
import Evaluation from "./shop/Evaluation.jsx";
import Dashboard from "./components/DashBoard/index.jsx";
import ManageAccount from "./components/DashBoard/Admin/ManageAccount.jsx";
import ManageEvaluate from "./components/DashBoard/Appraiser/ManageEvaluate.jsx";
import ProtectedRoute from "./utilis/ProtectedRoute.jsx";
import UnAuthorize from "./home/UnAuthorize.jsx";
import ManageCategory from "./components/DashBoard/Admin/ManageCategory.jsx";
import CheckoutPage from "./shop/CheckoutPage.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import ManageOrder from "./components/DashBoard/Admin/ManageOrder.jsx";
import CheckoutResponsePage from "./shop/CheckoutResponsePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/blog",
        element: <Blog />
      },
      {
        path: "/shop",
        element: <Shop />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/sign-up",
        element: <Signup />
      },
      {
        path: "/shop/:productId",
        element: <SingleProduct />
      },
      {
        path: "/check-out/:timepieceId",
        element: <ProtectedRoute role={["USERS"]}><CheckoutPage /></ProtectedRoute>
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/evaluation",
        element: <ProtectedRoute role={["USERS"]}><Evaluation /></ProtectedRoute>
      },

      {
        path: "/profile",
        element: <ProtectedRoute role={["USERS"]}><ProfilePage /></ProtectedRoute>
      }
    ],
  },
  {
    path: "/unauthorize",
    element: <UnAuthorize />
  },
  {
    path: "/payment_response",
    element: <ProtectedRoute role={["USERS"]}><CheckoutResponsePage /></ProtectedRoute>
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute role={["ADMIN", "APPRAISER"]}><Dashboard /></ProtectedRoute>,
    children: [
      {
        path: "account_manage",
        element: <ProtectedRoute role={["ADMIN"]}><ManageAccount /></ProtectedRoute>,
      },
      {
        path: "evaluate_manage",
        element: <ProtectedRoute role={["APPRAISER"]}><ManageEvaluate /></ProtectedRoute>,
      },
      {
        path: "category_manage",
        element: <ProtectedRoute role={["ADMIN"]}><ManageCategory /></ProtectedRoute>
      },
      {
        path: "order_manage",
        element: <ProtectedRoute role={["ADMIN"]}><ManageOrder /></ProtectedRoute>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
