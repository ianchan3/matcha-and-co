import "./SuccessPage.css";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4242";

export default function SuccessPage({ removeWholeCart }) {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");


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
            <p className="SuccessLoadingText">Loading your order…</p>
          </>
        ) : (
          <>
            <h1 className="SuccessTitle">Payment was Successful!</h1>
            <p className="SuccessSubtitle">Thanks for your order. We're getting it ready.</p>

            {error ? (
              <p className="SuccessError">Could not load order details — but your payment went through.</p>
            ) : (
              <>
                <p className="SuccessRef">Order Confirmation #: <strong>#{orderData.orderRef}</strong></p>
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
                  <span>Total</span>
                  <span>${(orderData.amountTotalCents / 100).toFixed(2)}</span>
                </div>
              </>
            )}

            <Link to="/menu" className="SuccessBackBtn">Back to menu</Link>
          </>
        )}
      </div>
    </main>
  );
}