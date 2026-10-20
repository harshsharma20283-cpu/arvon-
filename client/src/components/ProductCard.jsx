import React from "react";
import { Star, Heart, Eye, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const {
    addToCart,
    setQuickViewProduct,
    wishlist,
    toggleWishlist
  } = useCart();

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <article
      className="product-card"
      onClick={() => setQuickViewProduct(product)}
    >
      {/* Image container */}
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="product-img"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/images/dune-mug.svg";
          }}
        />

        {/* Badge */}
        {product.badge && (
          <span className="product-badge-pill">{product.badge}</span>
        )}

        {/* Savings tag */}
        {discountPercent > 0 && (
          <span className="product-savings-tag">{discountPercent}% OFF</span>
        )}

        {/* Top actions: Wishlist & Quick View */}
        <div className="card-top-actions">
          <button
            className={`card-icon-btn ${isWishlisted ? "wishlisted" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            aria-label="Save to wishlist"
            title={isWishlisted ? "Remove from saved" : "Save piece"}
          >
            <Heart
              size={17}
              fill={isWishlisted ? "#c85a32" : "none"}
              color={isWishlisted ? "#c85a32" : "currentColor"}
            />
          </button>
        </div>

        {/* Hover Quick View Trigger */}
        <div className="card-quick-overlay">
          <button
            className="quick-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
          >
            <Eye size={16} />
            Quick Look
          </button>
        </div>
      </div>

      {/* Details body */}
      <div className="product-info-block">
        <div className="product-meta-row">
          <span className="product-category-tag">{product.category}</span>
          <div className="product-rating-box">
            <Star size={13} fill="#d97706" color="#d97706" />
            <span className="rating-score">{product.rating}</span>
            <span className="rating-reviews">({product.reviewCount})</span>
          </div>
        </div>

        <h3 className="product-title" title={product.title}>
          {product.title}
        </h3>
        <p className="product-subtitle">{product.subtitle}</p>

        {/* Pricing & Add to Cart button */}
        <div className="product-footer-row">
          <div className="price-stack">
            <span className="current-price">₹{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && (
              <span className="original-price">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to tote`}
            title="Add to tote"
          >
            <ShoppingBag size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}
