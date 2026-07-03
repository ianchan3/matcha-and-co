import "./ContactPage.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    orderNumber: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const { t } = useTranslation();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4242"}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", phone: "", orderNumber: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="ContactPage">
      <NavBar />
      <div className="ContactContainer">

        <div className="ContactForm">
          <p className="SectionEyebrow">{t('contact.eyebrow')}</p>
          <h2 className="SectionHeading">{t('contact.heading')}</h2>
          <p className="ContactSubtitle">{t('contact.subtitle')}</p>

          <form onSubmit={handleSubmit}>
            <div className="FormRow">
              <div className="FormGroup">
                <label>{t('contact.name')} <span className="Required">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t('contact.name')}
                  required
                />
              </div>
              <div className="FormGroup">
                <label>{t('contact.email')} <span className="Required">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="FormRow">
              <div className="FormGroup">
                <label>{t('contact.phone')} <span className="Optional">{t('contact.optional')}</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(555) 000-0000"
                />
              </div>
              <div className="FormGroup">
                <label>{t('contact.order_number')} <span className="Optional">{t('contact.optional')}</span></label>
                <input
                  type="text"
                  name="orderNumber"
                  value={form.orderNumber}
                  onChange={handleChange}
                  placeholder="e.g. CS-1234"
                />
              </div>
            </div>

            <div className="FormGroup">
              <label>{t('contact.message')} <span className="Required">*</span></label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t('contact.message')}
                rows={5}
                required
              />
            </div>

            <button className="SubmitBtn" type="submit" disabled={status === "loading"}>
              {status === "loading" ? t('contact.sending') : t('contact.send')}
            </button>

            {status === "success" && <p className="FormSuccess">{t('contact.success')}</p>}
            {status === "error" && <p className="FormError">{t('contact.error')}</p>}
          </form>
        </div>

        <div className="ContactInfo">
          <div className="InfoBlock">
            <h3>{t('contact.location')}</h3>
            <p>123 Matcha Lane<br />San Francisco, CA 94102</p>
          </div>
          <div className="InfoBlock">
            <h3>{t('contact.hours')}</h3>
            <p>{t('contact.hours_weekday')}</p>
            <p>{t('contact.hours_weekend')}</p>
          </div>
          <div className="InfoBlock">
            <h3>{t('contact.phone_label')}</h3>
            <p>(555) 123-4567</p>
          </div>
          <div className="InfoBlock">
            <h3>{t('contact.email_label')}</h3>
            <p>hello@matchaandco.com</p>
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}