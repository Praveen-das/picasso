import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from "./Pages/HomePage";
import ShoppingPage from './Pages/ShoppingPage';
import ProfilePage from './Pages/ProfilePage';
import SellerPage from './Pages/SellerPage';
import ProductPage from './Pages/ProductPage';
import CheckoutPage from './Pages/CheckoutPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShoppingPage />} />
          <Route path='/sell' element={<SellerPage />} />
          <Route path='/my-profile' element={<ProfilePage />} />
          <Route path='/shop/product' element={<ProductPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/search/:query' element={<ShoppingPage />} />
          <Route path='/category/:category' element={<ShoppingPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
