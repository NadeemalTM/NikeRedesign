import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <section className="hero">
            <h1>Welcome to Nike</h1>
            <p>Scroll down to see navbar animation</p>
          </section>
          {/* Add more sections to enable scrolling */}
          <section className="content">
            <div className="placeholder"></div>
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App;