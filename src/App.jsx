import { useState } from 'react'
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

  return (
    <>
      <main className='App'>
  {/* TEMP DEBUG: remove later */}
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
