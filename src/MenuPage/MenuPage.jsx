import "./MenuPage.css";
import flanImage from "../assets/Flan.jpg";
import VietnameseStickyRice from "../assets/Vietnamese-Sticky-Rice.jpg";


export default function MenuPage() {

  return (
    <main className="MenuPage">
      <div>
        <h1>MENU PAGE!!!</h1>
      </div>
      <div>
        <h1>
        FLAN
        </h1>
        <img src={flanImage} width='200px' alt='Flan'>
        </img>
      </div>
      <div>
        <h1>
          SASUAGE STICKY RICE 
        </h1>
        <img src={VietnameseStickyRice} width='200px' alt='Flan'>
        </img>
      </div>
    </main>
  )
}