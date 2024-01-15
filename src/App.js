import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
  redirect,
  ScrollRestoration,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom";

import { Suspense, lazy } from "react";
import "./App.css";

import { MUIContext } from './Context/MUIContext';

import LoadingScreen from "./Components/MUIComponents/LoadingScreen";
import Header from "./Components/Header/Header"
import Footer from './Components/Footer/Footer'
import { Test } from "./Test";
import SellerRegistrationPage from "./Pages/SellerRegistrationPage";
import SellerRegistrationSuccess from "./Components/Seller/SellerRegistrationSuccess";
import AuthContext, { useAuthContext } from "./Context/AuthContext";
import PurchaseSuccess from "./Components/Checkout/PurchaseSuccess";

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

const router = createBrowserRouter(
  createRoutesFromElements(
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
      <Route element={<AuthRoutes />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/purchase/success" element={<PurchaseSuccess />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route element={<AdminRoutes />}>
          <Route path="/dashboard" element={<SellerPage />} />
          <Route path="/seller/registration" element={<SellerRegistrationPage />} />
          <Route path="/seller/onboarding" element={<SellerRegistrationSuccess />} />
        </Route>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/test" element={<Test />} />
      </Route>
    </Route>
  ));

function App() {
  return (
    <MUIContext>
      <AuthContext>
        <RouterProvider router={router} />
      </AuthContext>
    </MUIContext >
  )
}

function AuthRoutes() {
  const { data: user } = useAuthContext()
  const currentPath = useLocation().pathname

  const isAuthenticated = Boolean(user)

  const paths = ['/login']

  return (
    <>
      {
        !isAuthenticated ?
          currentPath === '/login' ? <Outlet /> :
            <Navigate to='/login' replace /> :
          paths.includes(currentPath) ? <Navigate to='/' replace /> :
            <Outlet />
      }
    </>
  )
}

function AdminRoutes() {
  const { data: user } = useAuthContext()
  const location = useLocation()
  const paths = ['/seller/registration', '/seller/onboarding']

  const currentPath = location.pathname
  const previousPath = location.state?.previousPath || '/'

  const samePath = currentPath === previousPath

  const isAdmin = Boolean(user?.role === 'seller')
  const isConnected = Boolean(user?.linked_account?.status === 'active')

  if (samePath)
    return <Outlet />

  if (!isAdmin)
    return <Navigate to='/seller/registration' replace state={{ previousPath: currentPath }} />

  if (!isConnected)
    return <Navigate to='/seller/onboarding' replace state={{ previousPath: currentPath }} />

  if (paths.includes(currentPath))
    return <Navigate to="/dashboard" />

  return <Outlet />
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
