import './NavBar.css';
import { Link } from 'react-router-dom';

export default function NavBar({ cartCount, onCartOpen }) {
  return (
    <header className="NavBar">
      <div className="NavBrand">
        <span className="NavLogo">✦</span>
        <Link to='/' className="NavName">Matcha & Co.</Link>
      </div>
      <div className='NavOptions'>
        <Link to='/menu'>Our Menu</Link>
      </div>
      <div className='NavCartSlot'>
      {onCartOpen && (
        <button className="CartToggleBtn" onClick={onCartOpen}>
          🛒 Cart
          {cartCount > 0 && <span className="CartBadge">{cartCount}</span>}
        </button>
      )}

      </div>
    </header>
  );
}