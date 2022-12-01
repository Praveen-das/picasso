import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
  redirect,
} from "react-router-dom";

import "./App.css";
import HomePage from "./Pages/HomePage";
import ShoppingPage from "./Pages/ShoppingPage";
import ProfilePage from "./Pages/ProfilePage";
import SellerPage from "./Pages/SellerPage";
import ProductPage from "./Pages/ProductPage";
import CheckoutPage from "./Pages/CheckoutPage";
import Alert from "./Components/Alert/Alert";
import Login from "./Components/Login/Login";
import React, { useState } from "react";
import Private from "./PrivateRoute/PrivateRoute";
import LoginPrompt from "./PrivateRoute/LoginPrompt";
import useUserData from "./Hooks/useUserData";

function App() {
  const { currentUser } = useUserData()

  const auth = async () => {
    if (currentUser.data) return redirect("/")
  };

  const privateRoute = async () => {
    if (currentUser.data === null) return redirect("/login")
  };
  
  const routes = createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<HomePage />} />
      <Route path="/shop" element={<Outlet />}>
        <Route index element={<ShoppingPage />} />
        <Route path="/shop/product" element={<ProductPage />} />
      </Route>
      <Route path="/search/:query" element={<ShoppingPage />} />
      <Route path="/category/:category" element={<ShoppingPage />} />
      <Route path="/search/:query" element={<ShoppingPage />} />
      <Route path="/category/:category" element={<ShoppingPage />} />

      {/* //--------------------- private routes ---------------------*/}
      <Route path="/login" element={<LoginPrompt />} loader={auth} />

      <Route path="/checkout" element={<CheckoutPage />} loader={privateRoute} />
      <Route path="/checkout" element={<CheckoutPage />} loader={privateRoute} />
      <Route path="/sell" element={<SellerPage />} loader={privateRoute} />
      <Route path="/my-profile" element={<ProfilePage />} loader={privateRoute} />
    </Route>
  );

  const router = createBrowserRouter(routes);

  return (
    <>
      <Alert />
      {
        !currentUser.isLoading &&
        <RouterProvider router={router} />
      }
    </>
  );
}
export default App;
