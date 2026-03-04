import "./MenuPage.css";
import { useState } from "react";
import React from "react";
import flanImage from "../assets/Flan.jpg";
import VietnameseSoyRice from "../assets/Vietnamese-Soy-Rice.jpg";
import BunBoHue from "../assets/BunBoHue.jpg";
import MangoStickyRice from "../assets/MangoStickyRice.jpg";
import NavBar from "../NavBar/NavBar";

export default function MenuPage({ cart, addToCart, goToCheckout }) {
  const [flanQty, setFlanQty] = useState(1);
  const [vietnamesesoyriceQty, setVietnamesesoyriceQty] = useState(1);
  const [bunbohueQty, setBunbohueQty] = useState(1);
  const [mangostickyriceQty, setMangostickyriceQty] = useState(1);



  const cartCount = cart.reduce((sum, x) => sum + x.qty, 0);
  const cartTotalCents = cart.reduce((sum, x) => sum + x.priceCents * x.qty, 0);

  const menuItems = [
    {id: "flan", name: "Flan", priceCents: 399},
    {id: "vietnamesesoyrice", name: "Vietnamese Soy Rice", priceCents: 799},
    {id: "bunbohue", name: "Bun Bo Hue", priceCents: 999},
    {id: "mangostickyrice", name: "Mango Sticky Rice", priceCents: 1199},
  ]

  return (
    <main className="MenuPage">
      <NavBar />
      <div id="MenuItemsListContainer">
        <h1>Select an Item</h1>
      <section id="MenuItemsList">
        <div className="MenuItem">
          <button className="MenuItemButton">   
            <img src={flanImage} width='100px' height='75px' alt='Flan' />
            <h1>
            FLAN
            </h1>
          </button>
          <div>
            <select value={flanQty} onChange={(e) => setFlanQty(Number(e.target.value))}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            <button onClick={() => addToCart(menuItems[0], flanQty)}>Add to Cart</button>
          </div>
        </div>
        <div className="MenuItem">
          <button className="MenuItemButton">
            <img src={VietnameseSoyRice} width='100px' height='75px' alt='Vietnamese Soy Rice' />
            <h1>
              Vietnamese SOY RICE 
            </h1>
          </button>
          <div>
            <select value={vietnamesesoyriceQty} onChange={(e) => setVietnamesesoyriceQty(Number(e.target.value))}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            <button onClick={() => addToCart(menuItems[1], vietnamesesoyriceQty)}>Add to Cart</button>
          </div>
        </div>
        <div className="MenuItem">
          <button className="MenuItemButton">
            <img src={BunBoHue} width='100px' height='75px'alt='Bun Bo Hue' />
            <h1>
            BUN BO HUE
            </h1>
          </button>
          <div>
          <select value={bunbohueQty} onChange={(e) => setBunbohueQty(Number(e.target.value))}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            <button onClick={() => addToCart(menuItems[2], bunbohueQty)}>Add to Cart</button>
          </div>
        </div>
        <div className="MenuItem">
          <button className="MenuItemButton">
            <img src={MangoStickyRice} width='100px' height='75px' alt='Mango Sticky Rice' />
            <h1>
              MANGO STICKY RICE 
            </h1>
          </button>
          <div>
          <select value={mangostickyriceQty} onChange={(e) => setMangostickyriceQty(Number(e.target.value))}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            <button onClick={() => addToCart(menuItems[3], mangostickyriceQty)}>Add to Cart</button>
          </div>
        </div>
      </section>`
              {/* TEMP DEBUG: remove later */}
  <div style={{ padding: 12, background: "#f5f5f5", marginBottom: 12 }}>
    Cart items: {cartCount} | Total: ${(cartTotalCents / 100).toFixed(2)}
  </div>
  <button disabled={cart.length === 0} onClick={goToCheckout}>
  Checkout
</button>

      </div>
    </main>
  )
}