import React, { useState, useRef } from "react";
import {
  X,
  CheckCircle2,
  CreditCard,
  QrCode,
  Banknote,
  Building,
  ArrowRight
} from "lucide-react";
import { useCart } from "../context/CartContext";
import confetti from "canvas-confetti";

export default function CheckoutModal() {
  const {
    cart,
    finalTotal,
    subtotal,
    discountAmount,
    shippingFee,
    gstAmount,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    showToast
  } = useCart();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [formData, setFormData] = useState({
    fullName: "Aarav Sharma",
    phone: "9876543210",
    email: "aarav.sharma@example.com",
    address: "Flat 402, Green Glen Apartments, Outer Ring Road, Bellandur",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560103",
    paymentMethod: "upi",
    upiId: "aarav@oksbi"
  });

  const [orderSummary, setOrderSummary] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  if (!isCheckoutOpen) return null;

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsCheckoutOpen(false);
      setStep(1);
    }, 240);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextToPayment = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      showToast("Please fill in all shipping fields", "error");
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Create confirmed order details
      const orderId = `ARV-${Math.floor(100000 + Math.random() * 900000)}`;
      const placedOrder = {
        id: orderId,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }),
        items: [...cart],
        customer: { ...formData },
        totals: {
          subtotal,
          discountAmount,
          shippingFee,
          gstAmount,
          finalTotal
        }
      };

      setOrderSummary(placedOrder);
      setIsSubmitting(false);
      setStep(3);
      clearCart();

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#b85d38", "#d97706", "#2d4a22", "#d4a373"]
        });
      } catch (e) {
        console.error(e);
      }
    }, 1200);
  };

  return (
    <div
      className={`modal-backdrop ${isClosing ? "is-closing" : ""}`}
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === backdropRef.current && step !== 3) closeModal();
      }}
    >
      <div className="checkout-modal-container" ref={modalRef} data-lenis-prevent>
        <div className="checkout-modal-header">
          <div className="checkout-header-titles">
            <h2 className="checkout-title">
              {step === 3 ? "Order Confirmed!" : "Arvon Studio Checkout"}
            </h2>
            <p className="checkout-subtitle">
              {step === 1 && "Step 1 of 2: Shipping & Delivery Address"}
              {step === 2 && "Step 2 of 2: Select Payment Method"}
              {step === 3 && "Thank you for supporting hand-thrown ceramics"}
            </p>
          </div>
          <button
            className="modal-close-icon"
            onClick={closeModal}
            aria-label="Close checkout"
          >
            <X size={20} />
          </button>
        </div>

        {/* STEP 1: Shipping Address Form */}
        {step === 1 && (
          <form className="checkout-form-grid" onSubmit={handleNextToPayment}>
            <div className="form-row-duo">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Contact Phone (+91) *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address (for order tracking &amp; invoice) *</label>
              <input
                type="email"
                name="email"
                required
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Delivery Street Address / Apartment *</label>
              <input
                type="text"
                name="address"
                required
                placeholder="Flat / House No., Building Name, Street"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-row-trio">
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>State *</label>
                <input
                  type="text"
                  name="state"
                  required
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>PIN Code *</label>
                <input
                  type="text"
                  name="pincode"
                  required
                  placeholder="6 digits"
                  value={formData.pincode}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Quick mini total preview */}
            <div className="checkout-mini-summary">
              <span>Delivery total for {cart.reduce((t, i) => t + i.quantity, 0)} items:</span>
              <strong>₹{finalTotal.toLocaleString("en-IN")}</strong>
            </div>

            <div className="checkout-actions-bar">
              <button type="button" className="btn-cancel" onClick={closeModal}>
                Back to Tote
              </button>
              <button type="submit" className="btn-primary-terracotta">
                Continue to Payment
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Payment Method */}
        {step === 2 && (
          <form className="payment-selection-step" onSubmit={handlePlaceOrder}>
            <div className="payment-options-list">
              {/* UPI Option */}
              <label
                className={`payment-option-card ${
                  formData.paymentMethod === "upi" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === "upi"}
                  onChange={handleInputChange}
                />
                <div className="option-icon-box">
                  <QrCode size={22} />
                </div>
                <div className="option-details">
                  <strong>Instant UPI (Google Pay, PhonePe, Paytm, BHIM)</strong>
                  <span>Pay seamlessly with 0% transaction fees</span>
                  {formData.paymentMethod === "upi" && (
                    <div className="upi-input-box" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        name="upiId"
                        placeholder="Enter UPI ID (e.g. name@okaxis)"
                        value={formData.upiId}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                </div>
              </label>

              {/* Cards Option */}
              <label
                className={`payment-option-card ${
                  formData.paymentMethod === "card" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleInputChange}
                />
                <div className="option-icon-box">
                  <CreditCard size={22} />
                </div>
                <div className="option-details">
                  <strong>Credit / Debit Card</strong>
                  <span>Visa, MasterCard, RuPay &amp; American Express</span>
                </div>
              </label>

              {/* Netbanking Option */}
              <label
                className={`payment-option-card ${
                  formData.paymentMethod === "netbanking" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={formData.paymentMethod === "netbanking"}
                  onChange={handleInputChange}
                />
                <div className="option-icon-box">
                  <Building size={22} />
                </div>
                <div className="option-details">
                  <strong>Indian Net Banking</strong>
                  <span>HDFC, ICICI, SBI, Axis, Kotak and all major banks</span>
                </div>
              </label>

              {/* COD Option */}
              <label
                className={`payment-option-card ${
                  formData.paymentMethod === "cod" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleInputChange}
                />
                <div className="option-icon-box">
                  <Banknote size={22} />
                </div>
                <div className="option-details">
                  <strong>Cash on Delivery (COD)</strong>
                  <span>Pay upon safe arrival at your doorstep</span>
                </div>
              </label>
            </div>

            {/* Order breakdown */}
            <div className="checkout-review-card">
              <div className="summary-line">
                <span>Shipping to:</span>
                <strong>{formData.city}, {formData.pincode}</strong>
              </div>
              <div className="summary-line">
                <span>Total Payable:</span>
                <strong className="review-total-price">
                  ₹{finalTotal.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>

            <div className="checkout-actions-bar">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setStep(1)}
              >
                Back to Address
              </button>
              <button
                type="submit"
                className="btn-primary-terracotta"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>Confirm &amp; Place Order</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Order Confirmation Receipt */}
        {step === 3 && orderSummary && (
          <div className="order-confirmation-screen">
            <div className="confirmation-badge-circle">
              <CheckCircle2 size={46} color="#2d7a3f" />
            </div>

            <h3 className="order-success-title">Thank you, {orderSummary.customer.fullName}!</h3>
            <p className="order-success-sub">
              Your order <strong className="order-id-badge">{orderSummary.id}</strong> has been
              received at our pottery studio.
            </p>

            <div className="confirmation-details-box">
              <div className="confirm-row">
                <div className="confirm-col">
                  <span className="confirm-label">Order Date</span>
                  <span className="confirm-val">{orderSummary.date}</span>
                </div>
                <div className="confirm-col">
                  <span className="confirm-label">Payment Method</span>
                  <span className="confirm-val uppercase">
                    {orderSummary.customer.paymentMethod}
                  </span>
                </div>
                <div className="confirm-col">
                  <span className="confirm-label">Estimated Dispatch</span>
                  <span className="confirm-val">Within 48 hours</span>
                </div>
              </div>

              <div className="confirm-shipping-info">
                <span className="confirm-label">Insured Delivery Destination</span>
                <p>
                  {orderSummary.customer.fullName} • {orderSummary.customer.phone}
                  <br />
                  {orderSummary.customer.address}, {orderSummary.customer.city},{" "}
                  {orderSummary.customer.state} — {orderSummary.customer.pincode}
                </p>
              </div>

              {/* Items ordered list */}
              <div className="confirm-items-list">
                <span className="confirm-label">Handcrafted Pieces ({orderSummary.items.length})</span>
                {orderSummary.items.map((item) => (
                  <div key={item.id} className="confirm-item-row">
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <strong>₹{(item.price * item.quantity).toLocaleString("en-IN")}</strong>
                  </div>
                ))}
              </div>

              <div className="confirm-total-row">
                <span>Final Amount Paid / Due on Delivery</span>
                <span className="confirm-final-sum">
                  ₹{orderSummary.totals.finalTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="confirmation-actions">
              <button
                className="btn-primary-terracotta"
                onClick={closeModal}
              >
                Return to Pottery Studio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
