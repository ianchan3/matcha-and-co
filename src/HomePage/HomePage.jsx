import "./HomePage.css";
import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export default function HomePage() {
//   window.onscroll = () => scrollProgress();

// function scrollProgress() {
//   const currentState = document.body.scrollTop || document.documentElement.scrollTop;

//   const pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

//   const scrollPercentage = (currentState / pageHeight ) * 100;

//   const progressBar = document.querySelector(".progress");

//   progressBar.style.visibility = "visible";
//   progressBar.style.width = scrollPercentage + "%";
// }
{/* <div className="scroll-indicator">
  <div className="progress"></div>
</div> */}

  return (
    <main className="HomePage">
      <NavBar />
      <section id="Welcome" className="Welcome">
        <h1 id="greeting">
          Flan Restaurant
        </h1>
      </section>
      <section id="Description">
        <div>
          <h1>
          Welcome to the Menu Page! Scroll to discover our delicious menu
          </h1>
          <h1 id="mongmai">More about our beautiful chef: Mong Mai</h1>
        </div>
      </section>
    </main>
  )
}