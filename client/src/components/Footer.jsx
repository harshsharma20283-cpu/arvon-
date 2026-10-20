import React, { useState } from "react";
import { ArrowRight, Check, Heart, Mail, MapPin, Phone } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Footer({ onCategoryClick }) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useCart();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      showToast("Thank you for joining our Studio Kiln newsletter!");
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="studio-footer">
      <div className="footer-top-container">
        {/* Col 1: Brand & Atelier */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            <span className="brand-mark">A</span>
            <span className="brand-name">ARVON</span>
          </div>
          <p className="footer-bio">
            Mindfully sculpted ceramics for daily rituals. Wheel-thrown stoneware,
            fluted earthenware vases, and organic tablewares crafted by master potters
            across India.
          </p>
          <div className="footer-contact-info">
            <div className="contact-line">
              <MapPin size={15} />
              <span>Studio Kiln 4, Auroville / Pondicherry &amp; Khurja</span>
            </div>
            <div className="contact-line">
              <Phone size={15} />
              <span>+91 98765 43210 (Mon–Sat 10am–6pm IST)</span>
            </div>
            <div className="contact-line">
              <Mail size={15} />
              <span>hello@arvonceramics.in</span>
            </div>
          </div>
        </div>

        {/* Col 2: Studio Catalog */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Studio Collections</h4>
          <ul className="footer-links-list">
            <li>
              <button onClick={() => onCategoryClick("Mugs & Cups")}>
                Handmade Ceramic Mugs
              </button>
            </li>
            <li>
              <button onClick={() => onCategoryClick("Mugs & Cups")}>
                Espresso Cups &amp; Saucers
              </button>
            </li>
            <li>
              <button onClick={() => onCategoryClick("Vases & Vessels")}>
                Fluted Sculptural Vases
              </button>
            </li>
            <li>
              <button onClick={() => onCategoryClick("Bowls & Tableware")}>
                Ramen &amp; Pasta Bowls
              </button>
            </li>
            <li>
              <button onClick={() => onCategoryClick("Home Decor & Accents")}>
                Aroma Diffusers &amp; Candleholders
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Care & Studio Notes */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Pottery Care &amp; Service</h4>
          <ul className="footer-links-list">
            <li>
              <a href="#philosophy-section">Ceramic Firing (1240°C)</a>
            </li>
            <li>
              <a href="#philosophy-section">Microwave &amp; Dishwasher Care</a>
            </li>
            <li>
              <a href="#philosophy-section">Zero-Plastic Honeycomb Packaging</a>
            </li>
            <li>
              <a href="#philosophy-section">7-Day Transit Breakage Guarantee</a>
            </li>
            <li>
              <a href="#philosophy-section">Studio Potter Fair Wages</a>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div className="footer-newsletter-col">
          <h4 className="footer-heading">Kiln Release Invitations</h4>
          <p className="newsletter-desc">
            Because all pieces are thrown in small studio batches, collections often sell out.
            Subscribe to receive private preview access 24 hours before public kiln drops.
          </p>

          {subscribed ? (
            <div className="newsletter-success">
              <Check size={16} />
              <span>You're on the kiln list!</span>
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" aria-label="Subscribe">
                <ArrowRight size={18} />
              </button>
            </form>
          )}

          <div className="promo-hint-footer">
            <span>Tip: Enter code <strong>ARVON10</strong> at checkout for 10% off.</span>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="bottom-bar-inner">
          <p className="copyright-text">
            © {new Date().getFullYear()} Arvon Ceramics Studio Private Limited. All rights reserved.
          </p>
          <div className="bottom-meta-links">
            <span>Prices displayed in Indian Rupees (INR ₹)</span>
            <span>•</span>
            <span>Crafted with pride in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
