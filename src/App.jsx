import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/home";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes onChange={() => console.log('Route changed')}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
