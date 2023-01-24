import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
  redirect,
} from "react-router-dom";

import React, { useEffect } from "react";
import HomePage from "./Pages/HomePage";
import ShoppingPage from "./Pages/ShoppingPage";
import ProfilePage from "./Pages/ProfilePage";
import SellerPage from "./Pages/SellerPage";
import ProductPage from "./Pages/ProductPage";
import ShoppingCartPage from "./Pages/ShoppingCartPage";
import CheckoutPage from './Pages/checkoutPage'

import Alert from "./Components/Alert/Alert";
import useUserData from "./Hooks/useUserData";
import Login from "./Components/Login/Login";

import "./App.css";
import Footer from "./Components/Footer/Footer";
import LoadingScreen from "./Components/MUIComponents/LoadingScreen";
import StorePage from "./Pages/StorePage";
import ChatPage from "./Pages/ChatPage";
import socket from './lib/ws'
import { useStore } from "./Context/Store";

function App() {
  const { currentUser } = useUserData()

  // useEffect(() => {
  //   if (currentUser.isLoading) return
  //   if (currentUser.isFetching) return

  //   socket.emit('connect_room', currentUser.data?.id || 'praveen')
  //   socket.on('receivers', receivers => {
  //     client.setQueriesData(['receivers'], receivers)
  //   })
  //   console.log('app');
  // }, [currentUser, client])
  // let [users, setUsers] = useState([])

  if (currentUser.isLoading) return <LoadingScreen />

  const auth = () => currentUser.data !== null && redirect("/")
  const privateRoute = () => currentUser.data === null && redirect("/login")

  const routes = createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      {/* //--------------------- public routes ---------------------*/}
      <Route index element={<HomePage />} />
      <Route path="/shop" element={<Outlet />}>
        <Route index element={<ShoppingPage />} />
        <Route path="/shop/product/:product_id" element={<ProductPage />} />
      </Route>
      <Route path="/search" element={<ShoppingPage />} />
      <Route path="/category/:category" element={<ShoppingPage />} />
      <Route path="/store/:id" element={<StorePage />} />
      <Route path="/chat" element={<ChatPage />} />

      {/* //--------------------- private routes ---------------------*/}
      <Route path="/login" element={<Login />} loader={auth} />

      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/cart" element={<ShoppingCartPage />} />
      <Route path="/sell" element={<SellerPage />} loader={privateRoute} />
      <Route path="/my-profile" element={<ProfilePage />} loader={privateRoute} />
    </Route>
  );

  const router = createBrowserRouter(routes);

  return (
    <>
      <Messenger />
      <Alert />
      <div id='App'>
        <RouterProvider router={router} />
      </div>
      <Footer />
    </>
  );
}

function Messenger() {
  const { currentUser } = useUserData()

  const setOnlineUsers = useStore(state => state.setOnlineUsers)
  const addUser = useStore(state => state.addOnlineUser)
  const removeUser = useStore(state => state.removeDisconnectedUser)
  const setMessage = useStore(state => state.setMessage)

  useEffect(() => {
    if (currentUser.isLoading) return
    if (currentUser.isFetching) return

    //-----------------extablish connection-----------------//
    let user_id = currentUser.data?.id || localStorage.getItem('user_id')
    let username = currentUser.data?.displayName || 'unknown user'
    let photo = currentUser.data?.photo || ''

    if (!user_id) {
      user_id = Math.floor(Math.random() * 9999999).toString()
      localStorage.setItem('user_id', user_id)
    }

    socket.auth = { user: { username, photo, user_id } }
    socket.user_id = user_id
    socket.connect()

    //-----------------listen for connected users-----------------//
    socket.on('users', connectedUsers => setOnlineUsers(connectedUsers))
    socket.on("user connected", (user) => addUser(user));

    //-----------------listen for disconnected users-----------------//
    socket.on("user disconnected", (user) => removeUser(user));

    //-----------------listen for messages-----------------//
    socket.on('receive', chat => {
      let receiver = chat.user_id
      if (chat.user_id === socket.user_id) {
        receiver = chat.to
        chat.self = true
      }
      setMessage(chat, receiver)
    })

    return () => {
      socket.off('connect')
      socket.off('users')
      socket.off('user connected')
      socket.off('receive')
      socket.off('disconnect')
      socket.disconnect()
    }
  }, [currentUser])

  return <></>
}

export default App;
