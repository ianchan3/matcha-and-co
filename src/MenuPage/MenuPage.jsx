import "./MenuPage.css";
import flanImage from "../assets/Flan.jpg";
import VietnameseStickyRice from "../assets/Vietnamese-Sticky-Rice.jpg";
import BunBoHue from "../assets/BunBoHue.jpg";
import MangoStickyRice from "../assets/MangoStickyRice.jpg";

export default function MenuPage() {

  return (
    <main className="MenuPage">
      <div id="MenuPageHeader">
        <h1>MENU PAGE!!!</h1>
      </div>
      <section id="MenuItemsList">
        <div className="MenuItem">
          <h1>
          FLAN
          </h1>
          <img src={flanImage} width='250px' height='200px' alt='Flan'>
          </img>
          <div>
            <select>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            <button onClick={() => console.log("hi")}>Add to Cart</button>
          </div>
        </div>
        <div className="MenuItem">
          <h1>
            STICKY RICE 
          </h1>
          <img src={VietnameseStickyRice} width='250px' height='200px' alt='Vietnamese Sticky Rice'>
          </img>
          <div>
            <select>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          <button onClick={() => console.log("hi")}>Add to Cart</button>
          </div>
        </div>
        <div className="MenuItem">
          <h1>
          FLAN
          </h1>
          <img src={BunBoHue} width='250px' height='200px'alt='Bun Bo Hue'>
          </img>
          <div>
            <select>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          <button onClick={() => console.log("hi")}>Add to Cart</button>
          </div>
        </div>
        <div className="MenuItem">
          <h1>
            MANGO STICKY RICE 
          </h1>
          <img src={MangoStickyRice} width='250px' height='200px' alt='Mango Sticky Rice'>
          </img>
          <div>
            <select>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            <button onClick={() => console.log("hi")}>Add to Cart</button>
          </div>
        </div>
      </section>
    </main>
  )
}