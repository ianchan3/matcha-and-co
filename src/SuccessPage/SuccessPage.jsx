import "./SuccessPage.css";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { useTranslation } from 'react-i18next';

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4242";

export default function SuccessPage({ removeWholeCart }) {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { t } = useTranslation();

  useEffect(() => {
    removeWholeCart?.();
    fetch("/api/cart", { method: "GET" }).catch(() => {});

    if (!sessionId) {
      setLoading(false);
      setError("No session ID found.");
      return;
    }

    fetch(`${apiUrl}/checkout/session/${sessionId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then((data) => { setOrderData(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, [sessionId]);

  return (
    <main className="SuccessPage">
      <NavBar />
      <div className="SuccessCard">
        {loading ? (
          <>
            <div className="SuccessSpinner" aria-label="Loading order details" />
            <p className="SuccessLoadingText">{t('success.loading')}</p>
          </>
        ) : (
          <>
            <h1 className="SuccessTitle">{t('success.title')}</h1>
            <p className="SuccessSubtitle">{t('success.subtitle')}</p>

            {error ? (
              <p className="SuccessError">Could not load order details — but your payment went through.</p>
            ) : (
              <>
                <p className="SuccessRef">{t('success.receipt')} <strong>#{orderData.orderRef}</strong></p>
                <p className="SuccessPickup">{t('success.pickup')} — <strong>{orderData.customerName ?? 'your name'}</strong></p>
                <ul className="SuccessItemsList">
                  {orderData.items.map((item, i) => (
                    <li key={i} className="SuccessItem">
                      <span className="SuccessItemName">{item.qty}× {item.name}</span>
                      <span className="SuccessItemPrice">
                        ${((item.priceCents * item.qty) / 100).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="SuccessTotal">
                  <span>{t('success.total')}</span>
                  <span>${(orderData.amountTotalCents / 100).toFixed(2)}</span>
                </div>
              </>
            )}

            <Link to="/menu" className="SuccessBackBtn">{t('success.back')}</Link>
          </>
        )}
      </div>
    </main>
  );
}