import { useState } from 'react'
import React from "react";
import { Navigate } from "react-router-dom"
import HomePage from "./HomePage/HomePage";
import MenuPage from "./MenuPage/MenuPage";
import SuccessPage from "./SuccessPage/SuccessPage";
import ContactPage from "./ContactPage/ContactPage";
const API_URL = import.meta.env.VITE_API_URL;
import './App.css'
import { Routes, Route } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL || "";
const isUAT = apiUrl.includes("uat");

function App() {

  {isUAT && (
    <div style={{
      background: "orange",
      padding: "6px",
      textAlign: "center",
      fontWeight: "bold"
    }}>
      ⚠️ UAT Environment
    </div>
  )}

  const [cart, setCart] = useState([]);

  function addToCart(item, qty) {
    const qtyNum = Number(qty) || 1;

    //prev is the most up-to-date previous cart array
    setCart((prev) => {
        const existingItem = prev.find((x) => x.id === item.id);

        if (existingItem) {
          return prev.map((x) =>
            x.id === item.id ? { ...x, qty: x.qty + qtyNum} : x
          );
        }
        return [...prev, {...item, qty: qtyNum}];
    });
  }

  async function goToCheckout() {
  
    try {
      const res = await fetch(`${API_URL}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });
  
  
      console.log("fetch returned", res.status);
      const data = await res.json();
      console.log("json parsed", data);
  
      if (!res.ok) {
        alert(data.error || "Checkout failed");
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      clearTimeout(timeoutId);
      console.error("checkout error:", err);
      alert("Fetch failed or timed out (check console).");
    }
  }

  return (
    <>
      <main className='App'>
      <Routes id="routes">
        <Route path="/" element={<HomePage/>}/>
        <Route path="/menu" element={<MenuPage cart={cart} addToCart={addToCart} goToCheckout={goToCheckout}/>}/>
        <Route path="/success" element={<SuccessPage />}/>
        <Route path="/contact" element={<ContactPage />}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </main>
    </>
  )
}

export default App
