import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>

            <Route path="/" element={<ProductList />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}