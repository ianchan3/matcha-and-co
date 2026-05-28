import './NavBar.css';

export default function NavBar({ cartCount, onCartOpen}) {
  return (
    <header className="NavBar">
      <div className="NavBrand">
        <span className="NavLogo">✦</span>
        <span className="NavName">Matcha & Co.</span>
      </div>
        <span className="NavTagline">Small batch matcha, made with care.</span>
      {onCartOpen && (
        <button className="CartToggleBtn" onClick={onCartOpen}>
          🛒 Cart
          {cartCount > 0 && <span className="CartBadge">{cartCount}</span>}
        </button>
        )}
    </header>
  );
}