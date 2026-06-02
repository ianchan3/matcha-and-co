import "./ContactPage.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    orderNumber: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

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
          <p className="SectionEyebrow">Get in Touch</p>
          <h2 className="SectionHeading">Contact Us</h2>
          <p className="ContactSubtitle">Have a question or concern? We'd love to hear from you.</p>

          <form onSubmit={handleSubmit}>
            <div className="FormRow">
              <div className="FormGroup">
                <label>Name <span className="Required">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="FormGroup">
                <label>Email <span className="Required">*</span></label>
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
                <label>Phone <span className="Optional">(optional)</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(555) 000-0000"
                />
              </div>
              <div className="FormGroup">
                <label>Order Number <span className="Optional">(optional)</span></label>
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
              <label>Message <span className="Required">*</span></label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="How can we help?"
                rows={5}
                required
              />
            </div>

            <button className="SubmitBtn" type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && <p className="FormSuccess">✅ Message sent! We'll get back to you soon.</p>}
            {status === "error" && <p className="FormError">❌ Something went wrong. Please try again.</p>}
          </form>
        </div>

        <div className="ContactInfo">
          <div className="InfoBlock">
            <h3>📍 Location</h3>
            <p>123 Matcha Lane<br />San Francisco, CA 94102</p>
          </div>
          <div className="InfoBlock">
            <h3>🕐 Hours</h3>
            <p>Monday – Friday: 8am – 6pm</p>
            <p>Saturday – Sunday: 9am – 5pm</p>
          </div>
          <div className="InfoBlock">
            <h3>📞 Phone</h3>
            <p>(555) 123-4567</p>
          </div>
          <div className="InfoBlock">
            <h3>✉️ Email</h3>
            <p>hello@matchaandco.com</p>
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}