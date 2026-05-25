import { useState, useEffect } from 'react'
import React from "react";
import { Navigate } from "react-router-dom"
import MenuPage from "./MenuPage/MenuPage";
import SuccessPage from "./SuccessPage/SuccessPage";
import ContactPage from "./ContactPage/ContactPage";
import { Toaster, toast} from 'sonner'
import './App.css'
import { Routes, Route } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4242";
const isUAT = apiUrl.includes("uat");

function App() {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  function addToCart(item, qty) {
    const qtyNum = Number(qty) || 1;

    //prev is the most up-to-date previous cart array
    setCart((prev) => {
      const existingItem = prev.find((x) => x.id === item.id);

      if (existingItem) {
        return prev.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + qtyNum } : x
        );
      }
      return [...prev, { ...item, qty: qtyNum }];
    });
    toast.success(`Added ${item.name} to cart`);
  }


  function removeFromCart(indexToRemove) {
    const itemName = cart[indexToRemove]?.name;
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
    if (itemName) toast(`Removed ${itemName}`);
  }

  function decreaseCartQty(indexToRemove) {
    setCart((prevCart) => prevCart.map((item, index) =>
      index === indexToRemove ? { ...item, qty: item.qty - 1 } : item
    )
    );
  }

  function increaseCartQty(indexToRemove) {
    setCart((prevCart) => prevCart.map((item, index) =>
      index === indexToRemove ? { ...item, qty: item.qty + 1 } : item
    )
    );
  }

  function removeWholeCart() {
    setCart([]);
    toast('Cart cleared');
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  async function goToCheckout() {
    setIsCheckingOut(true);
    try {
      const res = await fetch(`${apiUrl}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart, origin: window.location.origin,
        }),
      });

      console.log("fetch returned", res.status);
      const data = await res.json();
      console.log("json parsed", data);

      if (!res.ok) {
        toast.error(data.error || 'Checkout failed');
        setIsCheckingOut(false);
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("checkout error:", err);
      toast.error('Checkout failed — please try again.');
      setIsCheckingOut(false);
    }
  }

  return (
    <>

      {isUAT && (
        <div style={{
          background: "orange",
          padding: "6px",
          margin: "0 30% 0 30%",
          textAlign: "center",
          fontWeight: "bold"
        }}>
          ⚠️ UAT Environment
        </div>
      )}
      <main className='App'>
        <Toaster position="bottom-center" richColors />
        <Routes id="routes">
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/menu" element={<MenuPage cart={cart} addToCart={addToCart} goToCheckout={goToCheckout} removeFromCart={removeFromCart} decreaseCartQty={decreaseCartQty} increaseCartQty={increaseCartQty} removeWholeCart={removeWholeCart} isCheckingOut={isCheckingOut} />} />
          <Route path="/success" element={<SuccessPage removeWholeCart={removeWholeCart}/>} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/menu" replace />} />
        </Routes>
      </main>
    </>
  )
}

export default App
