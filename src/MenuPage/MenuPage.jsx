import "./MenuPage.css";
import { useState } from "react";
import React from "react";
import flanImage from "../assets/Flan.jpg";
import VietnameseSoyRice from "../assets/Vietnamese-Soy-Rice.jpg";
import BunBoHue from "../assets/BunBoHue.jpg";
import MangoStickyRice from "../assets/MangoStickyRice.jpg";
import NavBar from "../NavBar/NavBar";

export default function MenuPage({ cart, addToCart, goToCheckout, removeFromCart }) {

  const [activeItemId, setActiveItemId] = useState(null);
  const [quantities, setQuantities] = useState({})
  const [modalQty, setModalQty] = useState(1)



  const cartCount = cart.reduce((sum, x) => sum + x.qty, 0);
  const cartTotalCents = cart.reduce((sum, x) => sum + x.priceCents * x.qty, 0);

  const menuItems = [
    { id: "flan", name: "Flan", priceCents: 399, photo: flanImage },
    { id: "vietnamesesoyrice", name: "Vietnamese Soy Rice", priceCents: 799, photo: VietnameseSoyRice },
    { id: "bunbohue", name: "Bun Bo Hue", priceCents: 999, photo: BunBoHue },
    { id: "mangostickyrice", name: "Mango Sticky Rice", priceCents: 1199, photo: MangoStickyRice },
  ]

  //making sure that activeItemId actually matches an item in the menuItems array
  const activeItem = menuItems.find((x) => x.id === activeItemId);

  function openModal(itemId) {
    setActiveItemId(itemId);
    setModalQty(1);
  }

  function closeModal() {
    setActiveItemId(null);
    setModalQty(1);
  }

  function decreaseQty() {
    setModalQty((previousQty) => Math.max(1, previousQty - 1));
  }

  function increaseQty() {
    setModalQty((previousQty) => previousQty + 1);
  }


  return (
    <main className="MenuPage">
      <NavBar />
      <div id="MenuItemsListContainer">
        <h1>Select an Item</h1>
        {activeItem && (
          <div className="ModalOverlay" onClick={closeModal}>
            <div className="Modal" onClick={(e) => e.stopPropagation()}>
              <button className="ModalClose" onClick={closeModal} aria-label="Close">
                ✕
              </button>
              <h2>Modal is open</h2>
              <p>activeItemId: <b>{activeItem.id}</b></p>
              <h2>{activeItem.name}</h2>
              <p>${(activeItem.priceCents / 100).toFixed(2)}</p>
              <div className="QtyRow">
                <button onClick={decreaseQty}>-</button>
                <div className="QtyValue">{modalQty} Qty - {activeItem.name}</div>
                <button onClick={increaseQty}>+</button>
              </div>
            </div>
          </div>
        )}
        <section id="MenuItemsList">

          {menuItems.map((item) => (
            <div className="MenuItem" key={item.id}>
              <button className="MenuItemButton" onClick={() => openModal(item.id)}>
                <img src={item.photo} width='100px' height='75px' alt={item.id} />
                <div className="MenuItemText">
                  <h1>{item.name.toUpperCase()}</h1>
                  <p>${(item.priceCents / 100).toFixed(2)}</p>
                </div>
              </button>
              <div>
                <select value={quantities[item.id] || 1}
                  onChange={(e) =>
                    setQuantities({
                      ...quantities,
                      [item.id]: Number(e.target.value),
                    }
                    )
                  }
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
                <button onClick={() => addToCart(item, quantities[item.id] || 1)}>Add to Cart</button>
              </div>
            </div>


          ))}
        </section>
        {/* TEMP DEBUG: remove later */}
        <h3>Cart</h3>

        {cart.length === 0 ? (
          <div>Your cart is empty</div>
        ) : (
          cart.map((item, index) => (
            <div key={index}>
              {item.name} — Qty: {item.qty} — $
              {((item.priceCents * item.qty) / 100).toFixed(2)}
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </div>
          ))
        )}
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