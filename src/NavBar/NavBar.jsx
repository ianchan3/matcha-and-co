import './NavBar.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'


export default function NavBar({ cartCount, onCartOpen }) {

  const { user } = useContext(AuthContext)
  return (
    <header className="NavBar">
      <div className="NavBrand">
        <span className="NavLogo">✦</span>
        <Link to='/' className="NavName">Matcha & Co.</Link>
      </div>
      <div className='NavOptions'>
        <Link to='/menu'>Our Menu</Link>
        <Link to="/contact">Contact</Link>
        {user ? (
          <div className="NavUser">
            <img src={user.photo} alt={user.displayName} className="NavUserPhoto" />
            <a href="http://localhost:4242/auth/logout">Logout</a>
          </div>
        ) : (
          <a href="http://localhost:4242/auth/google" className="SignInBtn">
            <FcGoogle size={20} />
            Sign in with Google
          </a>
        )}
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