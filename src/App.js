import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
  redirect,
} from "react-router-dom";

import { Suspense, lazy, useEffect, useRef, useState } from "react";
import "./App.css";

import { MUIContext } from './Context/MUIContext';

import LoadingScreen from "./Components/MUIComponents/LoadingScreen";
import Header from "./Components/Header/Header"
import Footer from './Components/Footer/Footer'
import { getCurrentUser } from "./lib/user.api";
// import Test from "./Test/Test";
const ChatEngin = lazy(() => import("./Components/ChatEngin/ChatEngin"))

const LoginPage = lazy(() => import("./Pages/LoginPage"));
const CategoriesPage = lazy(() => import("./Pages/CategoriesPage"));
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
  const { pathname } = new URL(request.url)

  if (pathname === '/login' && currentUser) return redirect("/")
  if (!currentUser && pathname !== '/login') {
    return redirect("/login")
  }
}

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    {/* //--------------------- public routes ---------------------*/}
    <Route index element={<HomePage />} />
    <Route path="/shop" element={<Outlet />}>
      <Route index element={<ShoppingPage />} />
      <Route path="/shop/product/:product_id" element={<ProductPage />} />
    </Route>
    <Route path="/categories" element={<Outlet />} >
      <Route index element={<CategoriesPage />} />
    </Route>
    <Route path="/results" element={<ShoppingPage />} />
    <Route path="/store/:id" element={<StorePage />} />

    {/* //--------------------- private routes ---------------------*/}
    <Route path="/login" element={<LoginPage />} loader={privateRoute} />

    <Route path="/chat" element={<ChatPage />} loader={privateRoute} />
    <Route path="/checkout" element={<CheckoutPage />} loader={privateRoute} />
    <Route path="/cart" element={<ShoppingCartPage />} loader={privateRoute} />
    <Route path="/admin" element={<SellerPage />} loader={privateRoute} />
    <Route path="/profile" element={<ProfilePage />} loader={privateRoute} />
    <Route path="/test" element={<Test />} />
  </Route>
)

const router = createBrowserRouter(routes);

function App() {
  return (
    <MUIContext>
      <RouterProvider router={router} />
    </MUIContext>
  )
}

function Layout() {

  return (
    <div id='App'>
      <Header />
      <Suspense fallback={<LoadingScreen />}>
        <Alert />
        <ChatEngin />
        <Outlet />
      </Suspense >
      <Footer />
    </div >
  )
}

export default App;

function Test() {
  const rendered = useRef(0)
  const [count, setCount] = useState(0)
  const [delay, setDelay] = useState(1000)

  useEffect(() => {
    let time = setInterval(() => {
      setCount(pre => pre + 1)
    }, delay)

    rendered.current += 1
    return () => {
      clearInterval(time)
    }
  }, [delay])

  return (
    <div>
      <label>{rendered.current}</label>
      <button onClick={() => setDelay(pre => pre * 0.5)}>decrease delay</button>
      <button onClick={() => setDelay(pre => pre * 2)}>increase delay</button>

      <div id="counter" style={{ fontSize: 40 }}>
        {count}
      </div>

    </div>
  )
}
