import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
  redirect,
} from "react-router-dom";

import React, { Suspense, lazy } from "react";
import "./App.css";

import { MUIContext } from './Context/MUIContext';

import useCurrentUser from "./Hooks/useCurrentUser"
import LoadingScreen from "./Components/MUIComponents/LoadingScreen"
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage";

const CheckoutPage = lazy(() => import('./Pages/CheckoutPages'))
const ChatEngin = lazy(() => import("./Components/ChatEngin/ChatEngin"))
const ProfilePage = lazy(() => import("./Pages/ProfilePage"))
const ShoppingPage = lazy(() => import("./Pages/ShoppingPage"))
const SellerPage = lazy(() => import("./Pages/SellerPage"))
const ProductPage = lazy(() => import("./Pages/ProductPage"))
const ShoppingCartPage = lazy(() => import("./Pages/ShoppingCartPage"))
const StorePage = lazy(() => import("./Pages/StorePage"))
const ChatPage = lazy(() => import("./Pages/ChatPage"))
const Login = lazy(() => import("./Components/Login/Login"))
const Alert = lazy(() => import("./Components/Alert/Alert"))

function App() {
  const { currentUser } = useCurrentUser()

  const privateRoute = async ({ request }) => {
    const { pathname } = new URL(request.url)

    if (pathname === '/login' && currentUser.data !== null) return redirect("/")
    if (currentUser.data === null && pathname !== '/login') return redirect("/login")
  }

  const routes = createRoutesFromElements(
    <Route path="/" element={<Layout />}>
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
      <Route path="/login" element={<Login />} loader={privateRoute} />

      <Route path="/chat" element={<ChatPage />} loader={privateRoute} />
      <Route path="/checkout" element={<CheckoutPage />} loader={privateRoute} />
      <Route path="/cart" element={<ShoppingCartPage />} loader={privateRoute} />
      <Route path="/sell" element={<SellerPage />} loader={privateRoute} />
      <Route path="/profile" element={<ProfilePage />} loader={privateRoute} />
    </Route>
  );

  const router = createBrowserRouter(routes);


  return <RouterProvider router={router} />
}

function Layout() {
  const { currentUser } = useCurrentUser()

  return (
    <>
      <MUIContext>
        <Header />
        <Suspense fallback={<LoadingScreen />}>
          <Alert />
          {/* <ChatEngin currentUser={currentUser} /> */}
          <Outlet />
        </Suspense>
        {/* <Footer /> */}
      </MUIContext>
    </>
  )
}

export default App;

