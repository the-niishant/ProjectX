import React, { createContext, useContext, useState, useEffect } from "react";
import { products } from "../data/products";
import { trackEvent } from "../utils/analytics";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  // Initialize bag from localStorage if available
  const [bag, setBag] = useState(() => {
    try {
      const saved = localStorage.getItem("ew_bag");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Initialize wishlist from localStorage if available
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("ew_wishlist");
      return saved ? JSON.parse(saved) : [1, 3]; // default 2 favorites for immediate rich experience
    } catch {
      return [1, 3];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  // Sync bag to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ew_bag", JSON.stringify(bag));
    } catch {}
  }, [bag]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ew_wishlist", JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message) => {
    setToast(message);
  };

  const dismissToast = () => {
    setToast(null);
  };

  // Bag operations
  const addToBag = (product, quantity = 1) => {
    setBag((prevBag) => {
      const existingIndex = prevBag.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevBag];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }
      return [...prevBag, { product, quantity }];
    });
    showToast(`${product.name} added to your bag`);
    trackEvent("add_to_cart", { productId: product.id, productName: product.name, quantity });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromBag(productId);
      return;
    }
    setBag((prevBag) =>
      prevBag.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromBag = (productId) => {
    setBag((prevBag) => {
      const removed = prevBag.find((i) => i.product.id === productId);
      if (removed) {
        showToast(`${removed.product.name} removed from bag`);
        trackEvent("remove_from_cart", { productId, productName: removed.product.name });
      }
      return prevBag.filter((item) => item.product.id !== productId);
    });
  };

  const clearBag = () => {
    setBag([]);
    setPromoCode("");
    setDiscountPercent(0);
  };

  // Wishlist operations
  const toggleWish = (productId) => {
    const product = products.find((p) => p.id === productId);
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        showToast(`${product ? product.name : "Piece"} removed from your wishlist`);
        trackEvent("remove_from_wishlist", { productId });
        return prevWishlist.filter((id) => id !== productId);
      } else {
        showToast(`${product ? product.name : "Piece"} saved to your wishlist`);
        trackEvent("add_to_wishlist", { productId });
        return [...prevWishlist, productId];
      }
    });
  };

  const isWished = (productId) => wishlist.includes(productId);

  // Calculations
  const bagSubtotal = bag.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const discountAmount = Math.round((bagSubtotal * discountPercent) / 100);
  const bagTotal = Math.max(0, bagSubtotal - discountAmount);
  const bagItemCount = bag.reduce((count, item) => count + item.quantity, 0);

  const shippingThreshold = 10000;
  const isShippingFree = bagTotal >= shippingThreshold || bagTotal === 0;
  const shippingRemaining = Math.max(0, shippingThreshold - bagTotal);

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      showToast("Enter a code to apply");
      return false;
    }
    if (clean === "WELCOME10" || clean === "ELITE10" || clean === "HERITAGE") {
      setPromoCode(clean);
      setDiscountPercent(10);
      showToast("Promo code applied: 10% savings unlocked");
      trackEvent("apply_promo", { code: clean, discountPercent: 10 });
      return true;
    } else if (clean === "FESTIVE15") {
      setPromoCode(clean);
      setDiscountPercent(15);
      showToast("Promo code applied: 15% festive savings unlocked");
      trackEvent("apply_promo", { code: clean, discountPercent: 15 });
      return true;
    } else {
      showToast("That code could not be applied. Check the code and try again.");
      return false;
    }
  };

  const removePromo = () => {
    setPromoCode("");
    setDiscountPercent(0);
    showToast("Promo code removed");
  };

  const money = (val) => `₹${Number(val || 0).toLocaleString("en-IN")}`;

  return (
    <StoreContext.Provider
      value={{
        bag,
        addToBag,
        updateQuantity,
        removeFromBag,
        clearBag,
        bagSubtotal,
        bagTotal,
        bagItemCount,
        discountAmount,
        discountPercent,
        promoCode,
        applyPromo,
        removePromo,
        shippingThreshold,
        isShippingFree,
        shippingRemaining,
        wishlist,
        toggleWish,
        isWished,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        quickViewProduct,
        setQuickViewProduct,
        toast,
        showToast,
        dismissToast,
        money
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
