import './NavBar.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'
import { useTranslation } from 'react-i18next';


export default function NavBar({ cartCount, onCartOpen }) {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4242'


  const { user } = useContext(AuthContext)
  const { t, i18n } = useTranslation();
  return (
    <header className="NavBar">
      <div className="NavBrand">
        <span className="NavLogo">✦</span>
        <Link to='/' className="NavName">Matcha & Co.</Link>
      </div>
      <div className='NavOptions'>
        <Link to='/menu'>{t('nav.menu')}</Link>
        <Link to="/contact">{t('nav.contact')}</Link>
        {user ? (
          <div className="NavUser">
            <img src={user.photo} alt={user.displayName} className="NavUserPhoto" />
            <a href={`${apiUrl}/auth/logout`}>Logout</a>
          </div>
        ) : (
          <a href={`${apiUrl}/auth/google`} className="SignInBtn">
            <FcGoogle size={20} />
            Sign in with Google
          </a>
        )}
        <div className="LangSwitcher">
          {['en', 'vi', 'zh'].map((lang) => (
            <button
              key={lang}
              className={`LangBtn ${i18n.language === lang ? 'LangBtnActive' : ''}`}
              onClick={() => i18n.changeLanguage(lang)}
            >
              {lang === 'en' ? 'English' : lang === 'vi' ? 'Tiếng Việt' : '中文'}
            </button>
          ))}
        </div>
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