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
import { useTranslation } from 'react-i18next';

export default function MenuPage({
  cart, addToCart, goToCheckout, removeFromCart, decreaseCartQty, increaseCartQty,
  removeWholeCart, isCheckingOut
}) {

  const [activeItemId, setActiveItemId] = useState(null);
  const [modalQty, setModalQty] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { t } = useTranslation();

  const cartCount = cart.reduce((sum, x) => sum + x.qty, 0);
  const cartTotalCents = cart.reduce((sum, x) => sum + x.priceCents * x.qty, 0);

  const menuItems = [
    { id: "Matcha Latte", name: "Matcha Latte", priceCents: 799, photo: MatchaLatte, description: t("menu.items.matcha_desc")},
    { id: "Blueberry Matcha", name: "Blueberry Matcha", priceCents: 999, photo: BlueberryMatcha, description: t("menu.items.blueberry_desc") },
    { id: "Strawberry Matcha", name: "Strawberry Matcha", priceCents: 999, photo: StrawberryMatcha, description: t("menu.items.strawberry_desc") },
    { id: "Banana Matcha", name: "Banana Matcha", priceCents: 999, photo: BananaMatcha, description: t("menu.items.banana_desc") },
    { id: "Mango Matcha", name: "Mango Matcha", priceCents: 999, photo: MangoMatcha, description: t("menu.items.mango_desc") },
    { id: "Coconut Matcha", name: "Coconut Matcha", priceCents: 999, photo: CoconutMatcha, description: t("menu.items.coconut_desc") },
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
        <h1>{t('menu.heading')}</h1>
        <p className="MenuSubtitle">{t('menu.subtitle')}</p>
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
                {t('menu.add_to_cart', { qty: modalQty })}
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
            <h3>{t('menu.your_cart')}</h3>
            <button className="CartDrawerClose" onClick={() => setIsCartOpen(false)}>✕</button>
          </div>

          <div className="CartDrawerItems">
            {cart.length === 0 ? (
              <p className="CartEmpty">{t('menu.cart_empty')}</p>
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
              <span>{t(cartCount !== 1 ? 'menu.total_plural' : 'menu.total', { count: cartCount })}</span>
              <span className="CartTotalPrice">${(cartTotalCents / 100).toFixed(2)}</span>
            </div>
            <button
              className="CheckoutBtn"
              disabled={cart.length === 0}
              onClick={goToCheckout}
            >
              {t('menu.checkout')}
            </button>
            {cart.length > 0 && (
              <button className="CartClearBtn" onClick={removeWholeCart}>
                {t('menu.clear_cart')}
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}