import React, { useState, useRef } from "react";
import {
  X,
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Heart,
  ChevronRight
} from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductDetailModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    setIsCheckoutOpen
  } = useCart();

  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  const activeImage = selectedImage || (quickViewProduct ? quickViewProduct.image : "");

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setSelectedImage(null);
      setQuantity(1);
      setQuickViewProduct(null);
    }, 240);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    closeModal();
    setTimeout(() => {
      setIsCheckoutOpen(true);
    }, 260);
  };

  const images = product.additionalImages && product.additionalImages.length > 0
    ? product.additionalImages
    : [product.image];

  return (
    <div
      className={`modal-backdrop ${isClosing ? "is-closing" : ""}`}
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) closeModal();
      }}
    >
      <div className="product-modal-container" ref={modalRef} data-lenis-prevent>
        <button
          className="modal-close-icon"
          onClick={closeModal}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="modal-content-grid">
          {/* Left Column: Image Gallery */}
          <div className="modal-gallery-col">
            <div className="modal-main-image-frame">
              <img
                src={activeImage || product.image}
                alt={product.title}
                className="modal-main-img"
                onError={(e) => {
                  e.currentTarget.src = "/images/dune-mug.svg";
                }}
              />
              {product.badge && (
                <span className="modal-badge-pill">{product.badge}</span>
              )}
            </div>

            {/* Thumbnail row */}
            {images.length > 1 && (
              <div className="modal-thumbnails-strip">
                {images.map((imgUrl, index) => (
                  <button
                    key={index}
                    className={`thumb-btn ${activeImage === imgUrl ? "active" : ""}`}
                    onClick={() => setSelectedImage(imgUrl)}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.title} view ${index + 1}`}
                      onError={(e) => {
                        e.currentTarget.src = "/images/dune-mug.svg";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Studio Artisan Tag */}
            <div className="artisan-signature-box">
              <Sparkles size={16} className="artisan-icon" />
              <div>
                <strong>Artisan Provenance</strong>
                <p>Thrown by {product.artisan || "Arvon Studio Kiln"}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Purchasing */}
          <div className="modal-details-col">
            <div className="modal-meta-header">
              <span className="modal-category-crumb">
                Arvon Collection <ChevronRight size={13} /> {product.category}
              </span>
              <button
                className={`modal-wishlist-toggle ${isWishlisted ? "active" : ""}`}
                onClick={() => toggleWishlist(product)}
                title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
              >
                <Heart
                  size={17}
                  fill={isWishlisted ? "#c85a32" : "none"}
                  color={isWishlisted ? "#c85a32" : "currentColor"}
                />
                <span>{isWishlisted ? "Saved" : "Save Piece"}</span>
              </button>
            </div>

            <h2 className="modal-product-title">{product.title}</h2>
            <p className="modal-product-subtitle">{product.subtitle}</p>

            {/* Ratings & Batch info */}
            <div className="modal-ratings-strip">
              <div className="rating-stars-group">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    fill={i < Math.floor(product.rating) ? "#d97706" : "none"}
                    color="#d97706"
                  />
                ))}
                <span className="rating-numeric">{product.rating}</span>
                <span className="reviews-link">({product.reviewCount} studio reviews)</span>
              </div>

              <div className="stock-status-pill">
                <span className="stock-dot"></span>
                <span>Only {product.stockCount || 5} left in kiln batch</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="modal-price-box">
              <span className="modal-current-price">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span className="modal-original-price">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              {product.originalPrice && (
                <span className="modal-savings-badge">
                  Save ₹{(product.originalPrice - product.price).toLocaleString("en-IN")}
                </span>
              )}
              <span className="tax-inclusive-tag">(Inclusive of all taxes)</span>
            </div>

            {/* Narrative description */}
            <p className="modal-description-paragraph">{product.description}</p>

            {/* Handcrafted Specifications Table */}
            {product.specs && (
              <div className="modal-specs-table">
                <h4 className="specs-title">Atelier Specifications</h4>
                <div className="specs-grid">
                  {product.specs.capacity && (
                    <div className="spec-row">
                      <span className="spec-label">Capacity</span>
                      <span className="spec-val">{product.specs.capacity}</span>
                    </div>
                  )}
                  {product.specs.dimensions && (
                    <div className="spec-row">
                      <span className="spec-label">Dimensions</span>
                      <span className="spec-val">{product.specs.dimensions}</span>
                    </div>
                  )}
                  {product.specs.clay && (
                    <div className="spec-row">
                      <span className="spec-label">Clay Composition</span>
                      <span className="spec-val">{product.specs.clay}</span>
                    </div>
                  )}
                  {product.specs.finish && (
                    <div className="spec-row">
                      <span className="spec-label">Glaze &amp; Finish</span>
                      <span className="spec-val">{product.specs.finish}</span>
                    </div>
                  )}
                  {product.specs.care && (
                    <div className="spec-row">
                      <span className="spec-label">Studio Care</span>
                      <span className="spec-val">{product.specs.care}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quantity Stepper & CTAs */}
            <div className="modal-purchase-controls">
              <div className="quantity-stepper">
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="step-count">{quantity}</span>
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= (product.stockCount || 10)}
                >
                  +
                </button>
              </div>

              <button
                className="modal-add-tote-btn"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                <span>Add to Tote • ₹{(product.price * quantity).toLocaleString("en-IN")}</span>
              </button>

              <button
                className="modal-buy-now-btn"
                onClick={handleBuyNow}
              >
                Instant Order
              </button>
            </div>

            {/* Reassurance perks */}
            <div className="modal-reassurance-row">
              <div className="reassurance-item">
                <Truck size={16} />
                <span>Zero-breakage insured shipping</span>
              </div>
              <div className="reassurance-item">
                <ShieldCheck size={16} />
                <span>Lead-free food safe certified</span>
              </div>
              <div className="reassurance-item">
                <RotateCcw size={16} />
                <span>7-day studio exchange guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
