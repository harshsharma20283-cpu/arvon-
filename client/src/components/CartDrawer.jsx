import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  CheckCircle2,
  Truck
} from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const {
    cart,
    cartItemCount,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    discountPercent,
    appliedPromo,
    applyPromo,
    removePromo,
    freeShippingThreshold,
    shippingFee,
    gstAmount,
    finalTotal,
    setIsCheckoutOpen
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const drawerRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const closeDrawer = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsCartOpen(false);
    }, 270);
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    if (!res.success) {
      setPromoError("Try code 'ARVON10' for 10% off");
    } else {
      setPromoError("");
      setPromoInput("");
    }
  };

  const handleCheckoutClick = () => {
    closeDrawer();
    setTimeout(() => {
      setIsCheckoutOpen(true);
    }, 280);
  };

  const progressPercent = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );
  const amountNeeded = freeShippingThreshold - subtotal;

  return (
    <div
      className={`drawer-backdrop ${isClosing ? "is-closing" : ""}`}
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === backdropRef.current) closeDrawer();
      }}
    >
      <div className="cart-drawer-panel" ref={drawerRef} data-lenis-prevent>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <ShoppingBag size={20} className="drawer-bag-icon" />
            <h2 className="drawer-title">Your Studio Tote</h2>
            <span className="drawer-count-badge">({cartItemCount} items)</span>
          </div>
          <button
            className="drawer-close-btn"
            onClick={closeDrawer}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="free-shipping-bar-container">
          <div className="shipping-bar-header">
            <Truck size={15} />
            {amountNeeded > 0 ? (
              <span>
                Add <strong>₹{amountNeeded.toLocaleString("en-IN")}</strong> more for{" "}
                <span className="highlight-green">FREE Insured Shipping</span>
              </span>
            ) : (
              <span className="unlocked-text">
                <CheckCircle2 size={14} style={{ display: "inline", marginRight: "4px" }} />
                You unlocked <strong>FREE Insured Shipping</strong>!
              </span>
            )}
          </div>
          <div className="shipping-progress-track">
            <div
              className="shipping-progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Items List or Empty State */}
        {cart.length === 0 ? (
          <div className="cart-empty-state">
            <div className="empty-cart-circle">
              <ShoppingBag size={44} strokeWidth={1.3} />
            </div>
            <h3>Your tote is empty</h3>
            <p>Our kilns fire in limited quantities. Discover our handmade stoneware mugs and decor pieces.</p>
            <button
              className="btn-primary-terracotta"
              onClick={closeDrawer}
            >
              Discover Ceramic Pieces
            </button>
          </div>
        ) : (
          <div className="cart-items-scroll-list" data-lenis-prevent>
            {cart.map((item) => (
              <div className="cart-item-card" key={item.id}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-thumbnail"
                  onError={(e) => {
                    e.currentTarget.src = "/images/dune-mug.svg";
                  }}
                />

                <div className="cart-item-content">
                  <div className="cart-item-top">
                    <h4 className="cart-item-name">{item.title}</h4>
                    <button
                      className="cart-item-remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <p className="cart-item-category">{item.category}</p>

                  <div className="cart-item-bottom">
                    <div className="cart-stepper">
                      <button
                        className="stepper-mini-btn"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="stepper-mini-qty">{item.quantity}</span>
                      <button
                        className="stepper-mini-btn"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <div className="cart-item-price-col">
                      <span className="cart-item-total">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                      {item.quantity > 1 && (
                        <span className="cart-unit-price">
                          (₹{item.price} each)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Drawer Footer with Calculations & Checkout */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            {/* Promo Code Form */}
            <div className="promo-code-container">
              {appliedPromo ? (
                <div className="promo-applied-pill">
                  <div className="promo-info">
                    <Tag size={14} />
                    <span>Applied: <strong>{appliedPromo}</strong></span>
                  </div>
                  <button className="remove-promo-btn" onClick={removePromo}>
                    Remove
                  </button>
                </div>
              ) : (
                <form className="promo-form" onSubmit={handleApplyPromo}>
                  <div className="promo-input-wrapper">
                    <Tag size={15} className="promo-icon" />
                    <input
                      type="text"
                      placeholder="Promo code (try ARVON10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="apply-promo-btn">
                    Apply
                  </button>
                </form>
              )}
              {promoError && <p className="promo-error-msg">{promoError}</p>}
            </div>

            {/* Calculations breakdown */}
            <div className="order-summary-box">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              {discountAmount > 0 && (
                <div className="summary-line discount-line">
                  <span>Studio Discount ({discountPercent}%)</span>
                  <span>−₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="summary-line">
                <span>Insured Studio Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="free-shipping-text">FREE</strong>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="summary-line">
                <span>Ceramics GST (5%)</span>
                <span>₹{gstAmount.toLocaleString("en-IN")}</span>
              </div>

              <div className="summary-line total-line">
                <div>
                  <strong>Estimated Total</strong>
                  <span className="taxes-note">Inclusive of GST &amp; Transit Cover</span>
                </div>
                <strong className="final-total-amount">
                  ₹{finalTotal.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              className="checkout-proceed-btn"
              onClick={handleCheckoutClick}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <p className="checkout-security-note">
              🔒 256-bit encrypted checkout • Zero breakages guaranteed
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
