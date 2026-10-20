import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const CART_STORAGE_KEY = "arvon_artisan_cart_v1";
const WISHLIST_STORAGE_KEY = "arvon_artisan_wishlist_v1";

export function CartProvider({ children }) {
  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [toast, setToast] = useState(null);

  // Server health state (checks user's Express server at localhost:5000)
  const [serverStatus, setServerStatus] = useState("checking");

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error("Cart save error", e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error("Wishlist save error", e);
    }
  }, [wishlist]);

  // Ping backend health
  useEffect(() => {
    let isMounted = true;
    const checkServer = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/health", {
          signal: AbortSignal.timeout(3000)
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setServerStatus(data.ok ? "online" : "offline");
        } else {
          if (isMounted) setServerStatus("offline");
        }
      } catch {
        if (isMounted) setServerStatus("offline");
      }
    };
    checkServer();
    const interval = setInterval(checkServer, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`Added "${product.title}" to your tote`);
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    const item = cart.find((i) => i.id === productId);
    setCart((prev) => prev.filter((i) => i.id !== productId));
    if (item) {
      showToast(`Removed "${item.title}" from tote`, "info");
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from wishlist`, "info");
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved "${product.title}" to wishlist`);
        return [...prev, product];
      }
    });
  };

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === "ARVON10") {
      setDiscountPercent(10);
      setAppliedPromo("ARVON10 (10% OFF)");
      showToast("Code ARVON10 applied! 10% discount added.");
      return { success: true, message: "10% off applied!" };
    } else if (clean === "CLAY15") {
      setDiscountPercent(15);
      setAppliedPromo("CLAY15 (15% OFF)");
      showToast("Code CLAY15 applied! 15% discount added.");
      return { success: true, message: "15% off applied!" };
    } else {
      showToast("Invalid promo code. Try ARVON10", "error");
      return { success: false, message: "Invalid code" };
    }
  };

  const removePromo = () => {
    setDiscountPercent(0);
    setAppliedPromo(null);
    setPromoCode("");
    showToast("Promo code removed", "info");
  };

  // Calculations
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const freeShippingThreshold = 1499;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 99;
  const gstAmount = Math.round((subtotal - discountAmount) * 0.05); // 5% GST on ceramics
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee + gstAmount);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItemCount,
        subtotal,
        discountAmount,
        discountPercent,
        appliedPromo,
        promoCode,
        setPromoCode,
        applyPromo,
        removePromo,
        freeShippingThreshold,
        shippingFee,
        gstAmount,
        finalTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        quickViewProduct,
        setQuickViewProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        toast,
        showToast,
        serverStatus
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
