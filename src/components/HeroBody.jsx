import React, { useState, useEffect } from "react";
import "./HeroBody.css";
import shoe2 from "../assets/img/shoe2.png";

function HeroBody() {
  const [firstLine, setFirstLine] = useState("LEADERS OF THE");
  const [secondLine, setSecondLine] = useState("PACK");

  useEffect(() => {
    const titles = [
      ["LEADERS OF THE", "PACK"],
      ["DOMINATE THE", "GAME"],
      ["RULE THE", "WORLD"],
    ];

    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % titles.length;
      setFirstLine(titles[currentIndex][0]);
      setSecondLine(titles[currentIndex][1]);
    }, 8000); // Change text every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero__background"></div>
      <div className="hero__content">
        <h1 className="hero__title">
          <span>{firstLine}</span>
          <br />
          <span>{secondLine}</span>
        </h1>
        <button className="hero__button">Shop Now</button>
      </div>
      <div className="hero__image">
        <img src={shoe2} alt="Featured Shoe" className="shoe-image" />
      </div>
    </section>
  );
}

export default HeroBody;