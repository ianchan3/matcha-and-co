import "./MenuPage.css";
import { useState } from "react";
import React from "react";
import MatchaLatte from "../assets/Matcha_Latte.webp";
import BlueberryMatcha from "../assets/BlueberryMatcha.jpg";
import StrawberryMatcha from "../assets/StrawberryMatchaLatte.jpg";
import BananaMatcha from "../assets/BananaMatcha.jpeg";
import MangoMatcha from "../assets/MangoMatcha.jpg";
import CoconutMatcha from "../assets/CoconutMatcha.jpg";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import LoadingDrink from "../LoadingDrink/LoadingDrink";

export default function MenuPage({
  cart, addToCart, goToCheckout, removeFromCart, decreaseCartQty, increaseCartQty,
  removeWholeCart, isCheckingOut
}) {

  const [activeItemId, setActiveItemId] = useState(null);
  const [modalQty, setModalQty] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);



  const cartCount = cart.reduce((sum, x) => sum + x.qty, 0);
  const cartTotalCents = cart.reduce((sum, x) => sum + x.priceCents * x.qty, 0);

  const menuItems = [
    { id: "matcha", name: "Matcha Latte", priceCents: 799, photo: MatchaLatte, description: "Ceremonial grade matcha with steamed oat milk." },
    { id: "blueberrymatcha", name: "Blueberry Matcha", priceCents: 999, photo: BlueberryMatcha, description: "Vibrant wild blueberry swirled with house matcha." },
    { id: "strawberrymatcha", name: "Strawberry Matcha", priceCents: 999, photo: StrawberryMatcha, description: "Fresh strawberry purée layered over smooth matcha." },
    { id: "bananamatcha", name: "Banana Matcha", priceCents: 999, photo: BananaMatcha, description: "Creamy banana blended with earthy ceremonial matcha." },
    { id: "mangomatcha", name: "Mango Matcha", priceCents: 999, photo: MangoMatcha, description: "Tropical mango and matcha — sweet meets earthy." },
    { id: "coconutmatcha", name: "Coconut Matcha", priceCents: 999, photo: CoconutMatcha, description: "Toasted coconut milk with a double shot of matcha." },
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
      {isCheckingOut && <LoadingDrink />}
      <NavBar cartCount={cartCount} onCartOpen={() => 
        setIsCartOpen(true)
      }/>
      <div id="MenuItemsListContainer">
        <h1>Our Menu</h1>
        <p className="MenuSubtitle">Handcrafted drinks made fresh to order.</p>
        {activeItem && (
          <div className="ModalOverlay" onClick={closeModal}>
            <div className="Modal" onClick={(e) => e.stopPropagation()}>
              <button className="ModalClose" onClick={closeModal} aria-label="Close">
                ✕
              </button>
              <div id="menuInfo">
                <img
                  src={activeItem.photo}
                  alt={activeItem.name}
                  className="ModalImage"
                />

                <h2>{activeItem.name}</h2>
                <p>${(activeItem.priceCents / 100).toFixed(2)}</p>
              </div>
              <div className="QtyRow">
                <button onClick={decreaseQty}>-</button>
                <div className="QtyValue">{modalQty}</div>
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
                <img src={item.photo} alt={item.name} className="MenuItemPhoto" />
                <div className="MenuItemText">
                  <h2>{item.name}</h2>
                  <p className="MenuItemDescription">{item.description}</p>
                  <span className="MenuItemPrice">${(item.priceCents / 100).toFixed(2)}</span>
                </div>
              </button>
            </div>
          ))}
        </section>

        {isCartOpen && (
          <div className="CartDrawerOverlay" onClick={() => setIsCartOpen(false)} />
        )}


        <div className={`CartDrawer ${isCartOpen ? 'CartDrawerOpen' : ''}`}>
          <div className="CartDrawerHeader">
            <h3>Your Cart</h3>
            <button className="CartDrawerClose" onClick={() => setIsCartOpen(false)}>✕</button>
          </div>

          <div className="CartDrawerItems">
            {cart.length === 0 ? (
              <p className="CartEmpty">Your cart is empty</p>
            ) : (
              cart.map((item, index) => (
                <div className="CartRow" key={index}>
                  <span className="CartItemName">{item.name}</span>
                  <div className="CartQtyControls">
                    <button
                      className="CartQtyBtn"
                      onClick={() => decreaseCartQty(index)}
                      disabled={item.qty <= 1}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >−</button>
                    <span className="CartQtyNum">{item.qty}</span>
                    <button
                      className="CartQtyBtn"
                      onClick={() => increaseCartQty(index)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >+</button>
                  </div>
                  <span className="CartItemPrice">
                    ${((item.priceCents * item.qty) / 100).toFixed(2)}
                  </span>
                  <button
                    className="CartRemoveBtn"
                    onClick={() => removeFromCart(index)}
                    aria-label={`Remove ${item.name}`}
                  >✕</button>
                </div>
              ))
            )}
          </div>

          <div className="CartDrawerFooter">
            <div className="CartTotal">
              <span>Total ({cartCount} item{cartCount !== 1 ? 's' : ''})</span>
              <span className="CartTotalPrice">${(cartTotalCents / 100).toFixed(2)}</span>
            </div>
            <button
              className="CheckoutBtn"
              disabled={cart.length === 0}
              onClick={goToCheckout}
            >
              Checkout
            </button>
            {cart.length > 0 && (
              <button className="CartClearBtn" onClick={removeWholeCart}>
                Clear cart
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}