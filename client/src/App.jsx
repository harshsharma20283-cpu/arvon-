import React, { useState, useMemo, useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import FilterBar from "./components/FilterBar";
import ProductCard from "./components/ProductCard";
import ProductDetailModal from "./components/ProductDetailModal";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Philosophy from "./components/Philosophy";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import { PRODUCTS } from "./data/products";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All Pieces");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const gridRef = useRef(null);

  // Initialize Lenis smooth scrolling for 3D Apple glass experience
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (selectedCategory !== "All Pieces") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Search term
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.artisan && item.artisan.toLowerCase().includes(q))
      );
    }

    // In stock filter
    if (onlyInStock) {
      result = result.filter((item) => item.inStock);
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, searchTerm, sortBy, onlyInStock]);

  const handleExploreClick = () => {
    const el = document.getElementById("catalog-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="arvon-app">
      {/* Navigation */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Hero Entrance */}
      <HeroBanner onExploreClick={handleExploreClick} />

      {/* Main Catalog Section */}
      <main className="catalog-main-container">
        {/* Filter controls */}
        <FilterBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onlyInStock={onlyInStock}
          setOnlyInStock={setOnlyInStock}
          totalResults={filteredProducts.length}
        />

        {/* Product Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="catalog-no-results">
            <h3>No ceramic pieces found</h3>
            <p>
              We couldn't find any pieces matching your current search or filters.
            </p>
            <button
              className="btn-primary-terracotta"
              onClick={() => {
                setSelectedCategory("All Pieces");
                setSearchTerm("");
                setOnlyInStock(false);
                setSortBy("default");
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="products-grid" ref={gridRef}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Pottery Philosophy & Kiln Section */}
      <Philosophy />

      {/* Modals, Drawers & Notifications */}
      <ProductDetailModal />
      <CartDrawer />
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
      <CheckoutModal />
      <Toast />

      {/* Footer */}
      <Footer onCategoryClick={(cat) => {
        setSelectedCategory(cat);
        handleExploreClick();
      }} />
    </div>
  );
}
