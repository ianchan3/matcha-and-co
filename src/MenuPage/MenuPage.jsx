import "./MenuPage.css";
import { useState } from "react";
import flanImage from "../assets/Flan.jpg";
import VietnameseSoyRice from "../assets/Vietnamese-Soy-Rice.jpg";
import BunBoHue from "../assets/BunBoHue.jpg";
import MangoStickyRice from "../assets/MangoStickyRice.jpg";

export default function MenuPage({ cart, addToCart }) {
  const [flanQty, setFlanQty] = useState(1);
  const [vietnamesesoyriceQty, setVietnamesesoyriceQty] = useState(1);
  const [bunbohue, setBunbohueQty] = useState(1);
  const [mangostickyrice, setMangostickyrice] = useState(1);


  const menuItems = [
    {id: "flan", name: "flan", priceCents: 399, image: flanImage},
    {id: "vietnamesesoyrice", name: "vietnamesesoyrice", priceCents: 799, image: VietnameseSoyRice},
    {id: "bunbohue", name: "bunbohue", priceCents: 999, image: BunBoHue},
    {id: "mangostickyrice", name: "mangostickyrice", priceCents: 1199, image: MangoStickyRice},
  ]

  return (
    <main className="MenuPage">
      <div id="MenuPageHeader">
        <h1>OUR BEAUTIFUL MENU!!</h1>
      </div>
      <section id="MenuItemsList">
        <div className="MenuItem">
          <h1>
          FLAN
          </h1>
          <img src={flanImage} width='250px' height='200px' alt='Flan' />
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
          <h1>
            Vietnamese SOY RICE 
          </h1>
          <img src={VietnameseSoyRice} width='250px' height='200px' alt='Vietnamese Soy Rice' />
          <div>
            <select value={vietnamesesoyriceQty} onChange={(e) => setVietnamesesoyriceQty(Number(e.target.value))}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            <button disabled onClick={() => addToCart()}>Add to Cart</button>
          </div>
        </div>
        <div className="MenuItem">
          <h1>
          BUN BO HUE
          </h1>
          <img src={BunBoHue} width='250px' height='200px'alt='Bun Bo Hue' />
          <div>
            <select>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            <button disabled onClick={() => addToCart()}>Add to Cart</button>
          </div>
        </div>
        <div className="MenuItem">
          <h1>
            MANGO STICKY RICE 
          </h1>
          <img src={MangoStickyRice} width='250px' height='200px' alt='Mango Sticky Rice' />
          <div>
            <select>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            <button disabled onClick={() => addToCart()}>Add to Cart</button>
          </div>
        </div>
      </section>
    </main>
  )
}