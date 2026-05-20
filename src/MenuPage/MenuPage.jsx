import "./MenuPage.css";
import { useState } from "react";
import React from "react";
import MatchaLatte from "../assets/Matcha_Latte.webp";
import BlueberryMatcha from "../assets/BlueberryMatcha.jpg";
import StrawberryMatcha from "../assets/StrawberryMatchaLatte.jpg";
import BananaMatcha from "../assets/BananaMatcha.jpeg";
import MangoMatcha from "../assets/MangoMatcha.jpg";
import CoconutMatcha from "../assets/CoconutMatcha.jpg";
import NavBar from "../NavBar/NavBar";

export default function MenuPage({
  cart, addToCart, goToCheckout, removeFromCart, decreaseCartQty, increaseCartQty,
  removeWholeCart
}) {

  const [activeItemId, setActiveItemId] = useState(null);
  const [modalQty, setModalQty] = useState(1)



  const cartCount = cart.reduce((sum, x) => sum + x.qty, 0);
  const cartTotalCents = cart.reduce((sum, x) => sum + x.priceCents * x.qty, 0);

  const menuItems = [
    { id: "matcha", name: "Matcha Latte", priceCents: 799, photo: MatchaLatte },
    { id: "blueberrymatcha", name: "Blueberry Matcha", priceCents: 999, photo: BlueberryMatcha },
    { id: "strawberrymatcha", name: "Strawberry Matcha", priceCents: 999, photo: StrawberryMatcha },
    { id: "bananamatcha", name: "Banana Matcha", priceCents: 999, photo: BananaMatcha },
    { id: "mangomatcha", name: "Mango Matcha", priceCents: 999, photo: MangoMatcha },
    { id: "coconutmatcha", name: "Coconut Matcha", priceCents: 999, photo: CoconutMatcha },
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
              <img
                src={activeItem.photo}
                alt={activeItem.name}
                className="ModalImage"
              />

              <h2>{activeItem.name}</h2>
              <p>${(activeItem.priceCents / 100).toFixed(2)}</p>
              <div className="QtyRow">
                <button onClick={decreaseQty}>-</button>
                <div className="QtyValue">{modalQty} Qty - {activeItem.name}</div>
                <button onClick={increaseQty}>+</button>
              </div>
              <button
                className="AddToCartButton"
                onClick={() => {
                  addToCart(activeItem, modalQty);
                  closeModal();
                }}
              >
                Add {modalQty} to Cart
              </button>
            </div>
          </div>
        )}
        <section id="MenuItemsList">

          {menuItems.map((item) => (
            <div className="MenuItem" key={item.id}>
              <button className="MenuItemButton" onClick={() => openModal(item.id)}>
                <img src={item.photo} width='100px' height='75px' alt={item.id} />
                <div className="MenuItemText">
                  <h2>{item.name}</h2>
                  <p>${(item.priceCents / 100).toFixed(2)}</p>
                </div>
              </button>

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
              {item.name} &nbsp; | &nbsp; Qty: {item.qty} x ${(item.priceCents / 100).toFixed(2)} = &nbsp; Price: {((item.priceCents * item.qty) / 100).toFixed(2)}
              &nbsp; <button onClick={() => decreaseCartQty(index)}>-</button>&nbsp;
              &nbsp; <button onClick={() => increaseCartQty(index)}>+</button>
              &nbsp; <button onClick={() => removeFromCart(index)}>Remove</button>
            </div>
          ))
        )}
        <div style={{ padding: 12, background: "#f5f5f5", marginBottom: 12 }}>
          Cart items: {cartCount} | Total: ${(cartTotalCents / 100).toFixed(2)}
          &nbsp;<button onClick={removeWholeCart}>Remove All</button>
        </div>
        <button disabled={cart.length === 0} onClick={goToCheckout}>
          Checkout
        </button>

      </div>
    </main>
  )
}