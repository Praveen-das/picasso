import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
  ScrollRestoration,
  Navigate,
  useLocation,
} from "react-router-dom";

import { Suspense, lazy } from "react";
import "./App.css";

import { MUIContext } from './Context/MUIContext';

import LoadingScreen from "./Components/Ui/LoadingScreen";
import Header from "./Components/Layouts/Header/Header"
import Footer from './Components/Layouts/Footer/Footer'
import SellerRegistrationPage from "./Pages/SellerRegistrationPage";
import SellerOnbordingPage from "./Components/Seller/SellerOnbording/SellerOnbording";
import AuthContext, { useAuthContext } from "./Context/AuthContext";
import PurchaseSuccess from "./Components/Checkout/PurchaseSuccess";

const ChatEngin = lazy(() => import("./Components/Chat/ChatEngin"))
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
const Alert = lazy(() => import("./Components/Ui/Alert/Alert"))

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
          <Route path="/seller/registration" element={<SellerRegistrationPage />} />
          <Route path="/seller/onboarding" element={<SellerOnbordingPage />} />
          <Route path="/dashboard" element={<SellerPage />} />
        </Route>
        <Route path="/profile" element={<ProfilePage />} />
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
  const LOGIN_PATH = '/login'
  const HOME_PATH = '/'

  const isAuthenticated = Boolean(user)

  if (isAuthenticated) {
    if (currentPath === LOGIN_PATH)
      return <Navigate to={HOME_PATH} replace />
    return <Outlet />
  } else {
    if (currentPath === LOGIN_PATH)
      return <Outlet />
    return <Navigate to={LOGIN_PATH} replace />
  }
}

function AdminRoutes() {
  const { data: user } = useAuthContext()
  const location = useLocation()

  const currentPath = location.pathname
  const replaced = location.state?.replaced

  const isAdmin = Boolean(user?.role === 'seller')
  const isConnected = Boolean(user?.linked_account?.status === 'active')

  const props = {
    replace: true,
    state: { replaced: true }
  }

  if (!isAdmin && !replaced)
    return <Navigate to='/seller/registration' {...props} />

  if (!isConnected && !replaced)
    return <Navigate to='/seller/onboarding' {...props} />

  if (currentPath !== '/dashboard' && !replaced) {
    return <Navigate to="/dashboard" {...props} />
  }

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
