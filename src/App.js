import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
  redirect,
} from "react-router-dom";

import React from "react";
import HomePage from "./Pages/HomePage";
import ShoppingPage from "./Pages/ShoppingPage";
import ProfilePage from "./Pages/ProfilePage";
import SellerPage from "./Pages/SellerPage";
import ProductPage from "./Pages/ProductPage";
import ShoppingCartPage from "./Pages/ShoppingCartPage";
import CheckoutPage from './Pages/checkoutPage'

import Alert from "./Components/Alert/Alert";
import useCurrentUser from "./Hooks/useCurrentUser";
import Login from "./Components/Login/Login";

import "./App.css";
import Footer from "./Components/Footer/Footer";
import LoadingScreen from "./Components/MUIComponents/LoadingScreen";
import StorePage from "./Pages/StorePage";
import ChatPage from "./Pages/ChatPage";
import ChatEngin from "./Components/ChatEngin/ChatEngin";
import Header from "./Components/Header/Header";

function App() {
  const { currentUser } = useCurrentUser()

  if (currentUser.isLoading) return <LoadingScreen />

  const auth = () => currentUser.data !== null && redirect("/")
  const privateRoute = () => currentUser.data === null && redirect("/login")

  const routes = createRoutesFromElements(
    <Route path="/" element={<Global />}>
      {/* //--------------------- public routes ---------------------*/}
      <Route index element={<HomePage />} />
      <Route path="/shop" element={<Outlet />}>
        <Route index element={<ShoppingPage />} />
        <Route path="/shop/product/:product_id" element={<ProductPage />} />
      </Route>
      <Route path="/search" element={<ShoppingPage />} />
      <Route path="/category/:category" element={<ShoppingPage />} />
      <Route path="/store/:id" element={<StorePage />} />

      {/* //--------------------- private routes ---------------------*/}
      <Route path="/login" element={<Login />} loader={auth} />

      <Route path="/chat" element={<ChatPage />} loader={privateRoute} />
      <Route path="/checkout" element={<CheckoutPage />} loader={privateRoute} />
      <Route path="/cart" element={<ShoppingCartPage />} loader={privateRoute} />
      <Route path="/sell" element={<SellerPage />} loader={privateRoute} />
      <Route path="/my-profile" element={<ProfilePage />} loader={privateRoute} />
    </Route>
  );

  const router = createBrowserRouter(routes);

  return (

    <>
      <Alert />
      <div id='App'>
        <RouterProvider router={router} />
        <Footer />
      </div>
    </>
  );
}

function Global() {
  const { currentUser } = useCurrentUser()

  return (
    <>
      <ChatEngin currentUser={currentUser} />
      <Outlet />
    </>
  )
}

export default App;

