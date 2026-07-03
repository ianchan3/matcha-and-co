import "./Footer.css"
import { Link } from "react-router-dom"
import { FaFacebook, FaInstagram, FaGoogle, FaYelp } from "react-icons/fa"
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <section className="Footer">
      <div id="BrandNameColumn">
        <div id="BrandName">✦ Matcha & Co.</div>
      </div>

      <div id="SocialMediaColumn">
        <p>{t('footer.follow')}</p>
        <div className="icons">
          <a href="https://www.facebook.com" target="_blank" className="icon icon--facebook">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com" target="_blank" className="icon icon--instagram">
            <FaInstagram />
          </a>
          <a href="https://www.google.com/maps" target="_blank" className="icon icon--google">
            <FaGoogle />
          </a>
          <a href="https://www.yelp.com" target="_blank" className="icon icon--yelp">
            <FaYelp />
          </a>
        </div>
      </div>

      <div id="QuestionsColumn">
        <p>{t('footer.questions')}</p>
        <p>
          <Link to="/contact">{t('footer.contact_link')}</Link>
        </p>
        <p>{t('footer.copyright')}</p>
      </div>
    </section>
  )
}