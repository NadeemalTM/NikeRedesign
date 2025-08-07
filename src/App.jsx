import React from "react";
import Header from "./components/Header";
import HeroCarousel from "./components/HeroCarousel";
import "./App.css";

function App() {
  return (
    <div className="main-gray-bg">
      <Header />
      <HeroCarousel />
      {/* Add your main content here */}
    </div>
  );
}

export default App;
