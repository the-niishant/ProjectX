import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import { LenisProvider } from "./components/LenisProvider";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { SearchModal } from "./components/SearchModal";
import { QuickViewModal } from "./components/QuickViewModal";
import { Toast } from "./components/Toast";
import { ScrollToTop } from "./components/ScrollToTop";
import { AppErrorBoundary } from "./components/AppErrorBoundary";
import { PageTransition } from "./components/PageTransition";

// Pages
import { Home } from "./pages/Home";
import { Collections } from "./pages/Collections";
import { CollectionDetail } from "./pages/CollectionDetail";
import { ProductDetail } from "./pages/ProductDetail";
import { WishlistPage } from "./pages/WishlistPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { HeritagePage } from "./pages/HeritagePage";
import { JournalPage } from "./pages/JournalPage";
import { ArticlePage } from "./pages/ArticlePage";
import { NotFoundPage } from "./pages/NotFoundPage";

import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <LenisProvider>
          <ScrollToTop />
          <div className="site-app-wrapper">
            <Header />
            <main className="main-content-flow">
              <AppErrorBoundary>
                <PageTransition>
                  <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/collections" element={<Collections />} />
                  <Route path="/collections/:slug" element={<CollectionDetail />} />
                  <Route path="/products/:slug" element={<ProductDetail />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/heritage" element={<HeritagePage />} />
                  <Route path="/journal" element={<JournalPage />} />
                  <Route path="/journal/:slug" element={<ArticlePage />} />
                  <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </PageTransition>
              </AppErrorBoundary>
            </main>
            <Footer />

            {/* Global Flyouts and Overlays */}
            <CartDrawer />
            <SearchModal />
            <QuickViewModal />
            <Toast />
          </div>
        </LenisProvider>
      </StoreProvider>
    </BrowserRouter>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
