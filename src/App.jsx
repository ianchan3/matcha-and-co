import { useState } from 'react'
import React from "react";
import HomePage from "./HomePage/HomePage";
import MenuPage from "./MenuPage/MenuPage";
import './App.css'
import { Routes, Route } from "react-router-dom";

function App() {
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

  const cartCount = cart.reduce((sum, x) => sum + x.qty, 0);
  const cartTotalCents = cart.reduce((sum, x) => sum + x.priceCents * x.qty, 0);

  async function goToCheckout() {
    console.log("checkout clicked");
    console.log("about to fetch");
  
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
  
    try {
      const res = await fetch("http://127.0.0.1:4242/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
        signal: controller.signal,
      });
  
      clearTimeout(timeoutId);
  
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
  {/* TEMP DEBUG: remove later */}
  <button disabled={cart.length === 0} onClick={goToCheckout}>
  Checkout
</button>
  <div style={{ padding: 12, background: "#f5f5f5", marginBottom: 12 }}>
    Cart items: {cartCount} | Total: ${(cartTotalCents / 100).toFixed(2)}
  </div>
      <Routes id="routes">
        <Route path="/" element={<HomePage/>}/>
        <Route path="/menu" element={<MenuPage cart={cart} addToCart={addToCart}/>}/>
      </Routes>
      </main>
    </>
  )
}

export default App
