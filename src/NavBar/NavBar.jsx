import './NavBar.css';
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <main className="NavBar">
      <nav>
      <Link to ="/" className="logo"><h1>IC</h1></Link>
      </nav>
    </main>
  );
}
