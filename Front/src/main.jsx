import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, Routes } from "react-router-dom";
import "./index.css";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import TrackingDetails from "./pages/TrackingDetails/TrackingDetails";
import TrackingView from "./pages/TrackingView/TrackingView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "home",
    element: <Home />,
    children: [
      {
        path: "product-detail/:code",
        element: <ProductDetail />
      }
    ]
  },
  {
    path: "home",
    element: <Home />,
    children: [
      {
        path: "tracking-detail/:code",
        element: <TrackingDetails />
      }
    ]
  },
  {
    path: "home",
    element: <Home />,
    children: [
      {
        path: "tracking-view/:code",
        element: <TrackingView />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);