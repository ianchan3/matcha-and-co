import NavBar from "../NavBar/NavBar"
import "../HomePage/HomePage.css"
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';



export default function HomePage() {

  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="HomePage">
      <NavBar />
      <div className="HomePageContainer">
        <section className="Introduction">
          <div className="IntroImage">
            <img
              src="https://images.pexels.com/photos/5976079/pexels-photo-5976079.jpeg"
              alt="Person whisking matcha"
            />
          </div>
          <div className="IntroText">
            <p className="IntroEyebrow">✦</p>
            <h1 className="IntroHeading">{t('home.heading')}</h1>
            <p className="IntroSubtitle">{t('home.subtitle')}</p>
            <button className="IntroCTA" onClick={() => navigate("/menu")}>{t('home.cta')}</button>
          </div>
        </section>
        <section className="AboutUs">
          <div className="AboutUsText">
            <p className="SectionEyebrow">{t('home.story_eyebrow')}</p>
            <h2 className="SectionHeading">{t('home.story_heading')}</h2>
            <p>{t('home.story_body')}</p>
          </div>
          <div className="AboutUsImage">
            <img
              src="https://images.pexels.com/photos/14430999/pexels-photo-14430999.jpeg"
              alt="Hot Matcha Latte"
            />
          </div>
        </section>
        <Footer />

      </div>

    </div>
  )
}