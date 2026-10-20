import React, { useState } from "react";
import {
  ShoppingBag,
  Search,
  Heart,
  X,
  Server,
  Sparkles,
  Menu,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  onOpenWishlist
}) {
  const {
    cartItemCount,
    setIsCartOpen,
    wishlist,
    serverStatus
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const categories = [
    "All Pieces",
    "Mugs & Cups",
    "Vases & Vessels",
    "Bowls & Tableware",
    "Home Decor & Accents"
  ];

  return (
    <header className="navbar-wrapper">
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <span className="announcement-pill">Kiln Drop 04</span>
          <span>
            Complimentary insured shipping on all studio orders above ₹1,499 • Use code <strong>PEBBLE10</strong> for 10% off
          </span>
          <span className="announcement-badge">
            <Sparkles size={13} style={{ display: "inline", marginRight: "4px" }} />
            Artisan Handcrafted
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="main-navbar">
        <div className="nav-container">
          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Brand Logo */}
          <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); setSelectedCategory("All Pieces"); }}>
            <span className="brand-mark">P</span>
            <div className="brand-text-group">
              <span className="brand-name">PEBBLE</span>
              <span className="brand-sub">Studio Ceramics • India</span>
            </div>
          </a>

          {/* Desktop Categories */}
          <div className="desktop-nav-links">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`nav-link-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  const el = document.getElementById("catalog-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right Action Icons */}
          <div className="nav-actions">
            {/* Express Server Health Indicator */}
            <div
              className={`server-health-badge ${
                serverStatus === "online" ? "online" : "offline"
              }`}
              title={
                serverStatus === "online"
                  ? "Express Server & MongoDB Atlas: Connected on :5000"
                  : "Express Server on :5000 is inactive (frontend running in client-first mode)"
              }
            >
              <span className="status-dot"></span>
              <Server size={14} className="server-icon" />
              <span className="server-text">
                {serverStatus === "online" ? "API Live" : "API Offline"}
              </span>
            </div>

            {/* Search Toggle / Input */}
            <div className="search-box-wrapper">
              {showSearchInput ? (
                <div className="inline-search-box">
                  <Search size={16} className="search-icon-inside" />
                  <input
                    type="text"
                    placeholder="Search mugs, vases, clay..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                    className="inline-search-input"
                  />
                  <button
                    className="clear-search-btn"
                    onClick={() => {
                      setSearchTerm("");
                      setShowSearchInput(false);
                    }}
                  >
                    <X size={15} />
                  </button>
                </div>
              ) : (
                <button
                  className="icon-action-btn"
                  onClick={() => setShowSearchInput(true)}
                  aria-label="Search"
                  title="Search handcrafted items"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              className="icon-action-btn wishlist-btn"
              onClick={onOpenWishlist}
              title="Saved Pieces"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="action-badge-count">{wishlist.length}</span>
              )}
            </button>

            {/* Cart Button */}
            <button
              className="icon-action-btn cart-btn-primary"
              onClick={() => setIsCartOpen(true)}
              title="View Tote"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              <span className="cart-btn-label">Tote</span>
              {cartItemCount > 0 && (
                <span className="cart-badge-count">{cartItemCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown-menu">
            <div className="mobile-search-bar">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search mugs, vases, bowls..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")}>
                  <X size={16} />
                </button>
              )}
            </div>
            <div className="mobile-categories-list">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`mobile-cat-item ${
                    selectedCategory === cat ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setMobileMenuOpen(false);
                    const el = document.getElementById("catalog-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
