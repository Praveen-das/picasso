import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
  redirect,
  ScrollRestoration,
  useParams,
} from "react-router-dom";

import { Suspense, lazy, useEffect } from "react";
import "./App.css";

import { MUIContext } from './Context/MUIContext';

import LoadingScreen from "./Components/MUIComponents/LoadingScreen";
import Header from "./Components/Header/Header"
import Footer from './Components/Footer/Footer'
import { getCurrentUser } from "./lib/user.api";
import { Test } from "./Test";
import SellerRegistrationPage from "./Pages/SellerRegistrationPage";

// import Test from "./Test/Test";
const ChatEngin = lazy(() => import("./Components/ChatEngin/ChatEngin"))

const LoginPage = lazy(() => import("./Pages/LoginPage"));
const CollectionsPage = lazy(() => import("./Pages/CollectionsPage"));
const HomePage = lazy(() => import("./Pages/HomePage"))
const ProductPage = lazy(() => import("./Pages/ProductPage"))
const CheckoutPage = lazy(() => import('./Pages/CheckoutPages'))
const ProfilePage = lazy(() => import("./Pages/ProfilePage"))
const ShoppingPage = lazy(() => import("./Pages/ShoppingPage"))
const SellerPage = lazy(() => import("./Pages/SellerPage"))
const ShoppingCartPage = lazy(() => import("./Pages/ShoppingCartPage"))
const StorePage = lazy(() => import("./Pages/StorePage"))
const ChatPage = lazy(() => import("./Pages/ChatPage"))
const Alert = lazy(() => import("./Components/Alert/Alert"))

const privateRoute = async ({ request }) => {
  const currentUser = await getCurrentUser()
  // const { pathname } = new URL(request.url)

  // if (pathname === '/login' && currentUser) return redirect("/")
  // if (!currentUser && pathname !== '/login') {
  //   // return redirect("/login")
  // }
}

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    {/* //--------------------- public routes ---------------------*/}
    <Route index element={<HomePage />} />
    <Route path="/shop" element={<Outlet />}>
      <Route index element={<ShoppingPage />} />
      <Route path="/shop/product/:product_id" element={<ProductPage />} />
    </Route>
    <Route path="/results" element={<ShoppingPage />} />
    <Route path="/collections" element={<Outlet />} >
      <Route index element={<CollectionsPage />} />
    </Route>
    <Route path="/artists/profile/:id" element={<StorePage />} />

    {/* //--------------------- private routes ---------------------*/}
    <Route path="/login" element={<LoginPage />} loader={privateRoute} />

    <Route path="/chat" element={<ChatPage />}
      loader={privateRoute}
    />
    <Route path="/checkout" element={<CheckoutPage />} loader={privateRoute} />
    <Route path="/cart" element={<ShoppingCartPage />} loader={privateRoute} />
    {/* <Route path="/sell" element={<SellerPage />} loader={privateRoute} /> */}
    <Route path="/sell" element={<SellerRegistrationPage />} loader={privateRoute} />
    <Route path="/profile" element={<ProfilePage />} loader={privateRoute} />
    <Route path="/test" element={<Test />} />
  </Route>
)

const router = createBrowserRouter(routes);

function App() {

  return (
    <MUIContext>
      <RouterProvider router={router} />
    </MUIContext >
  )
}

function Layout() {

  return (
    <div id='App'>
      <Header />
      <div>
        <ScrollRestoration />
        <Suspense fallback={<LoadingScreen />}>
          <Alert />
          <ChatEngin />
          <Outlet />
        </Suspense >
      </div>
      <Footer />
    </div >
  )
}

export default App;
