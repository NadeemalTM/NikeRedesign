import React from "react";
import Header from "./components/Header";
import HeroBody from "./components/HeroBody";
import HomeBody from "./components/HomeBody";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <HeroBody />
        <HomeBody />
      </main>
    </>
  );
}

export default App;