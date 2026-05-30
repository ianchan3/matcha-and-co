import NavBar from "../NavBar/NavBar"
import "../HomePage/HomePage.css"
import { useNavigate } from "react-router-dom";


export default function HomePage() {

  const navigate = useNavigate();

  return (
    <div className="HomePage">
      <NavBar />
      <div className="HomePageContainer">
        <section className="Introduction">
          <div>

          <img
            src="https://images.pexels.com/photos/5976079/pexels-photo-5976079.jpeg"
            alt="Person whisking matcha"
          />
          </div>
          <div>
            <p className="IntroEyebrow">✦</p>
            <h1 className="IntroHeading">Matcha, Crafted<br />with Intention</h1>
            <p className="IntroSubtitle">Premium matcha drinks made fresh to order — every cup a moment of calm.</p>
            <button className="IntroCTA" onClick={() => navigate("/menu")}>Order Now</button>
          </div>
        </section>
        <section className="AboutUs">
          <div className="AboutUsText">
            <p className="SectionEyebrow">Our Story</p>
            <h2 className="SectionHeading">More Than a Drink</h2>
            <p>Matcha & Co. was born from a love of two traditions — the quiet ritual of Japanese matcha and the warmth of Vietnamese café culture.</p>
          </div>
          <div className="AboutUsImage">
            <img
              src="https://images.pexels.com/photos/14430999/pexels-photo-14430999.jpeg"
              alt="Hot Matcha Latte"
            />
          </div>
        </section>
        <section className="Footer">
          <div>Footer</div>
        </section>
      </div>

    </div>
  )
}