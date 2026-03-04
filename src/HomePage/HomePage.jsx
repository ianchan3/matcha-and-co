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
      <section id="Description">
        <div>
          Hello
        </div>
      </section>
    </main>
  )
}