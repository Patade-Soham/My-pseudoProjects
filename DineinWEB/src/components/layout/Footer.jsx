import { Facebook, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>Midnight Bites</h3>
          <p>
            Luxury fine dining, crafted for nights that deserve atmosphere,
            artistry, and unforgettable flavors.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/reservations">Reservations</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <p>11 Ember Lane, Neo District, Mumbai</p>
          <p>+91 90000 22222</p>
          <p>hello@midnightbites.com</p>
          <div className="social-row" aria-label="Social links">
            <a href="#" aria-label="Instagram">
              <Instagram size={17} />
            </a>
            <a href="#" aria-label="Facebook">
              <Facebook size={17} />
            </a>
            <a href="#" aria-label="Email">
              <Mail size={17} />
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>Copyright {new Date().getFullYear()} Midnight Bites</span>
      </div>
    </footer>
  );
}
