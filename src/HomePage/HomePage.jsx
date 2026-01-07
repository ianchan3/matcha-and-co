import "./HomePage.css";
import { Link } from "react-router-dom";

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
        </div>
        <div>
          <Link className='MenuSelector' to="/menu">Menu</Link>
        </div>
      </section>
    </main>
  )
}