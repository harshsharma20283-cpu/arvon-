import React, { useRef, useEffect, useState } from "react";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function WishlistDrawer({ isOpen, onClose }) {
  const { wishlist, toggleWishlist, addToCart, setQuickViewProduct } = useCart();
  const drawerRef = useRef(null);
  const backdropRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const closeDrawer = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 270);
  };

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    toggleWishlist(product);
  };

  return (
    <div
      className={`drawer-backdrop ${isClosing ? "is-closing" : ""}`}
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === backdropRef.current) closeDrawer();
      }}
    >
      <div className="cart-drawer-panel" ref={drawerRef} data-lenis-prevent>
        <div className="drawer-header">
          <div className="drawer-title-group">
            <Heart size={20} className="wishlist-bag-icon" />
            <h2 className="drawer-title">Saved Pieces</h2>
            <span className="drawer-count-badge">({wishlist.length})</span>
          </div>
          <button className="drawer-close-btn" onClick={closeDrawer} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {wishlist.length === 0 ? (
          <div className="cart-empty-state">
            <div className="empty-cart-circle">
              <Heart size={44} strokeWidth={1.3} />
            </div>
            <h3>No saved pieces yet</h3>
            <p>Save pieces you love to revisit as our limited studio kilns fire new batches.</p>
            <button className="btn-primary-terracotta" onClick={closeDrawer}>
              Explore Ceramic Collection
            </button>
          </div>
        ) : (
          <div className="cart-items-scroll-list" data-lenis-prevent>
            {wishlist.map((item) => (
              <div className="cart-item-card" key={item.id}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-thumbnail"
                  onError={(e) => {
                    e.currentTarget.src = "/images/dune-mug.svg";
                  }}
                  onClick={() => {
                    closeDrawer();
                    setQuickViewProduct(item);
                  }}
                  style={{ cursor: "pointer" }}
                />

                <div className="cart-item-content">
                  <div className="cart-item-top">
                    <h4
                      className="cart-item-name"
                      onClick={() => {
                        closeDrawer();
                        setQuickViewProduct(item);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {item.title}
                    </h4>
                    <button
                      className="cart-item-remove-btn"
                      onClick={() => toggleWishlist(item)}
                      title="Remove from saved"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <p className="cart-item-category">{item.category}</p>

                  <div className="cart-item-bottom">
                    <span className="cart-item-total">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>

                    <button
                      className="wishlist-move-tote-btn"
                      onClick={() => handleMoveToCart(item)}
                    >
                      <ShoppingBag size={14} />
                      <span>Move to Tote</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
