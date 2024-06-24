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
import CartPage from "./shop/CartPage.jsx";
import Contact from "./home/Contact.jsx";
import Dashboard from "./components/DashBoard/index.jsx";
import ManageAccount from "./components/DashBoard/Admin/ManageAccount.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
      {
        path: "/shop/:productId",
        element: <SingleProduct />,
      },
      {
        path: "/cart-page",
        element: <CartPage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/Dashboard",
    children: [
      {
        // admin
        path: "admin",
        element: <Dashboard role={"ADMIN"} />,
        children: [
          {
            path: "account",
            element: <ManageAccount />,
          },
          // {
          //   path: "product",
          //   element: <ManageProduct />,
          // },
          // {
          //   path: "category",
          //   element: <ManageCategory />,
          // },
        ],
      },
      // admin
      //////////////////////////////
      // Assessor
      {
        path: "assessor",
        element: <Dashboard role={"ASSESSOR"} />,
        children: [{}],
        // Assessor
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
