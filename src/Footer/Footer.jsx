import "./Footer.css"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <section className="Footer">
      <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet"></link>

      <div id="BrandNameColumn">
        <div id="BrandName">✦ Matcha & Co.</div>
      </div>

      <div id="SocialMediaColumn">
        <p>Follow Us</p>
        <div className="icons">
          <a href="https://www.facebook.com" target="_blank" className="icon icon--facebook">
            <i className="ri-facebook-line"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" className="icon icon--instagram">
            <i className="ri-instagram-line"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" className="icon icon--twitter">
            <i className="ri-twitter-line"></i>
          </a>
          <a href="https://www.linkedin.com" target="_blank" className="icon icon--linkedin">
            <i className="ri-linkedin-line"></i>
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