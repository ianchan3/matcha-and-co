import './NavBar.css';
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <main className="NavBar">
      <div id='matcha'>My Matcha Town</div>
      <nav>
      <li><Link to ="/" className="logo">Home Page</Link></li>
      <li><Link to ="/menu" className='logo'>Menu Page</Link></li>
      <li><Link to ="/contact" className='logo'>Contact Us Page</Link></li>
      </nav>
    </main>
  );
}
