import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import Layout from '@/components/Layout';
import LoadingSpinner from '@/components/LoadingSpinner';
import ScrollToTop from '@/components/ScrollToTop';

// Lazy load pages for better performance
const HomePage = lazy(() => import('@/pages/HomePage'));
const MenuPage = lazy(() => import('@/pages/MenuPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));

export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </CartProvider>
  );
}
