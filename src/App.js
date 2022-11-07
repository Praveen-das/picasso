import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
  Navigate,
  useNavigate,
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
import PrivateRoute from "./PrivateRoute/PrivateRoute";

function App() {
  const [model, setModel] = useState(true);

  const routes = createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<HomePage />} />
      <Route path="/shop" element={<Outlet />}>
        <Route index element={<ShoppingPage />} />
        <Route path="/shop/product" element={<ProductPage />} />
      </Route>
      <Route path="/search/:query" element={<ShoppingPage />} />
      <Route path="/category/:category" element={<ShoppingPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      {/* <Route path="/shop" element={<ShoppingPage />} />
      <Route path="/shop/product" element={<ProductPage />} /> */}
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/search/:query" element={<ShoppingPage />} />
      <Route path="/category/:category" element={<ShoppingPage />} />
      <PrivateRoute path="/sell" element={<SellerPage />} />
      <PrivateRoute path="/my-profile" element={<ProfilePage />} />
      {/* protected routes */}
      
      {/* protected routes */}
    </Route>
  );
  const router = createBrowserRouter(routes);

  return (
    <>
      <Alert />
      <RouterProvider router={router} />
    </>
  );
}
export default App;

const Void = () => {
  return <>asdasdasdad</>;
};
