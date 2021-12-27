import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Dashboard from './Pages/Admin/Dashboard';
import HomePage from "./Pages/HomePage";
import Products from './Pages/Products';
import SellerProducts from './Pages/Admin/SellerProducts';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/seller' element={<Dashboard/>}/>
          <Route path='/seller/products' element={<SellerProducts/>}/>
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
