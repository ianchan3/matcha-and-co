import "./OrdersPage.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4242";

export default function OrdersPage({ addToCart }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  function reorder(items) {
    items.forEach((item) => {
      addToCart({...item, id: item.name}, item.qty)
    })
    navigate("/menu")
  }

  useEffect(() => {
    fetch(`${apiUrl}/orders`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => { setOrders(data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <main className="OrdersPage">
      <NavBar />
      <div className="OrdersContainer">
        <h1>{t('orders.heading')}</h1>
        <p className="OrdersSubtitle">{t('orders.subtitle')}</p>

        {loading ? (
          <p className="OrdersLoading">{t('orders.loading')}</p>
        ) : error ? (
          <p className="OrdersError">{t('orders.error')}</p>
        ) : orders.length === 0 ? (
          <p className="OrdersEmpty">{t('orders.empty')}</p>
        ) : (
          <div className="OrdersList">
            {orders.map((order) => (
              <div className="OrderCard" key={order._id}>
                <div className="OrderCardHeader">
                  <span className="OrderReceipt">{t('orders.receipt')}{order.receiptNumber ?? order.stripeSessionId.slice(-8)}</span>
                  <span className="OrderDate">{new Date(order.createdAt).toLocaleDateString()}</span>
                  <span className={`OrderStatus OrderStatus--${order.status}`}>{order.status}</span>
                </div>
                <ul className="OrderItems">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.qty}× {item.name} — ${((item.priceCents * item.qty) / 100).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <div className="OrderTotal">
                  <span>{t('orders.total')}</span>
                  <span>${(order.amountTotalCents / 100).toFixed(2)}</span>
                </div>
                <button className="ReorderBtn" onClick={() => reorder(order.items)}>
                  {t('orders.reorder')}
                </button>
              </div>
            ))}
          </div>
        )}
        <Link to="/menu" className="OrdersBackBtn">{t('orders.back')}</Link>
      </div>
      <Footer />
    </main>
  );
}