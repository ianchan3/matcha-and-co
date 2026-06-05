import "./Footer.css"
import { Link } from "react-router-dom"
import { FaFacebook, FaInstagram, FaGoogle, FaYelp } from "react-icons/fa"

export default function Footer() {
  return (
    <section className="Footer">
      <div id="BrandNameColumn">
        <div id="BrandName">✦ Matcha & Co.</div>
      </div>

      <div id="SocialMediaColumn">
        <p>Follow Us</p>
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
        <p>Questions or Concerns?</p>
        <p>
          <Link to="/contact">Visit our Contact page</Link>
        </p>
        <p>© 2026 Matcha & Co. All rights reserved.</p>
      </div>
    </section>
  )
}