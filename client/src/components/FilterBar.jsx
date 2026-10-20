import React from "react";
import { Search, SlidersHorizontal, ArrowUpDown, X, Check } from "lucide-react";
import { CATEGORIES } from "../data/products";

export default function FilterBar({
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  onlyInStock,
  setOnlyInStock,
  totalResults
}) {
  const hasActiveFilters =
    selectedCategory !== "All Pieces" || searchTerm !== "" || onlyInStock || sortBy !== "default";

  const clearAllFilters = () => {
    setSelectedCategory("All Pieces");
    setSearchTerm("");
    setOnlyInStock(false);
    setSortBy("default");
  };

  return (
    <div className="filter-bar-container" id="catalog-section">
      <div className="filter-top-row">
        {/* Category Pills */}
        <div className="category-pills-scroll">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-pill-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort & In-stock Controls */}
        <div className="filter-controls-right">
          {/* In-Stock Toggle */}
          <label className="instock-checkbox-label">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
            />
            <span className="checkbox-custom">
              {onlyInStock && <Check size={12} strokeWidth={3} />}
            </span>
            <span className="checkbox-text">In Stock Only</span>
          </label>

          {/* Sort Dropdown */}
          <div className="sort-select-wrapper">
            <ArrowUpDown size={14} className="sort-icon" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">Featured Collection</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter status row */}
      <div className="filter-status-row">
        <div className="results-count-text">
          Showing <strong>{totalResults}</strong> handcrafted{" "}
          {totalResults === 1 ? "piece" : "pieces"}
          {selectedCategory !== "All Pieces" && (
            <span> in <em>{selectedCategory}</em></span>
          )}
          {searchTerm && (
            <span> matching <em>"{searchTerm}"</em></span>
          )}
        </div>

        {hasActiveFilters && (
          <button className="reset-filters-btn" onClick={clearAllFilters}>
            <X size={14} />
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}
