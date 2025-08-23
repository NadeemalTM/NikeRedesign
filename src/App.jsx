import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar"; 
import { ToastProvider } from "./context/ToastContext"; 
import Toast from "./components/Toast"; 
import Footer from "./components/Footer";
import HomePage from "./pages/home";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import "./App.css";

function App() {
  return (
    <ToastProvider>
      <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
      <Toast /> {/* Add Toast component here */}
    </CartProvider>
    </ToastProvider>
  );
}

export default App;
