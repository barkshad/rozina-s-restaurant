import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Trash2, Plus, Minus, CreditCard, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';

const CheckoutPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setLoading(true);
    try {
      // Save order to Firestore
      const orderData = {
        items: cart,
        total: cartTotal,
        status: 'Pending',
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, 'orders'), orderData);
      
      // Clear cart
      clearCart();
      
      // Redirect to Lipana
      window.location.href = 'https://lipana.dev/pay/rozinas-restaurant-nakuru';
    } catch (error) {
      console.error('Error processing order:', error);
      toast.error('Failed to process order. Please try again.');
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-rozina-cream px-4">
        <div className="bg-white p-8 rounded-full shadow-lg mb-6">
          <ShoppingBag className="h-12 w-12 text-rozina-maroon/40" />
        </div>
        <h2 className="text-4xl font-serif font-medium text-rozina-maroon mb-4">Your Cart is Empty</h2>
        <p className="text-rozina-charcoal/60 mb-8 font-sans font-light">Looks like you haven't added any delicious items yet.</p>
        <Link
          to="/menu"
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-sm font-bold tracking-widest uppercase rounded-none text-white bg-rozina-maroon hover:bg-rozina-maroon/90 shadow-lg transition-all"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rozina-cream py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-medium text-rozina-maroon mb-12 text-center">
          Your Order
        </h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Cart Items List */}
          <section className="lg:col-span-7 bg-white p-6 md:p-8 shadow-sm border border-stone-100 mb-8 lg:mb-0">
            <ul className="divide-y divide-stone-100">
              {cart.map((item) => (
                <motion.li 
                  layout
                  key={item.id} 
                  className="flex py-6 sm:py-8"
                >
                  <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-stone-100 overflow-hidden">
                    <img
                      src={item.imageUrl || 'https://via.placeholder.com/150'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="ml-6 flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-serif font-medium text-rozina-charcoal">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-rozina-charcoal/50 font-sans">{item.category}</p>
                      </div>
                      <p className="text-lg font-serif font-bold text-rozina-maroon">KES {item.price.toLocaleString()}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-stone-200 rounded-none">
                        <button
                          type="button"
                          className="p-2 text-stone-400 hover:text-rozina-maroon transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-4 text-rozina-charcoal font-sans font-medium text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          className="p-2 text-stone-400 hover:text-rozina-maroon transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="text-sm font-medium text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" /> <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </section>

          {/* Order Summary - Receipt Style */}
          <section className="lg:col-span-5 sticky top-24">
            <div className="bg-white p-8 shadow-xl border-t-4 border-rozina-gold relative overflow-hidden">
              {/* Receipt Pattern Top */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIj48cGF0aCBkPSJNMCAwaDZ2NkgwVjB6bTYgNmg2djZINlY2eiIgZmlsbD0iI2Y1ZjVmNCIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-50"></div>
              
              <h2 className="text-xl font-serif font-bold text-rozina-charcoal mb-6 text-center uppercase tracking-widest border-b border-dashed border-stone-300 pb-4">
                Bill Summary
              </h2>

              <dl className="space-y-4 font-sans text-sm">
                <div className="flex items-center justify-between text-rozina-charcoal/70">
                  <dt>Subtotal</dt>
                  <dd>KES {cartTotal.toLocaleString()}</dd>
                </div>
                <div className="flex items-center justify-between text-rozina-charcoal/70">
                  <dt>Service Charge</dt>
                  <dd>KES 0</dd>
                </div>
                <div className="border-t border-dashed border-stone-300 pt-4 flex items-center justify-between">
                  <dt className="text-lg font-serif font-bold text-rozina-maroon">Total</dt>
                  <dd className="text-lg font-serif font-bold text-rozina-maroon">KES {cartTotal.toLocaleString()}</dd>
                </div>
              </dl>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-rozina-gold text-rozina-maroon font-bold uppercase tracking-widest py-4 hover:bg-white hover:text-rozina-maroon border border-transparent hover:border-rozina-gold transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  {loading ? (
                    'Processing...'
                  ) : (
                    <>
                      Pay via M-Pesa <CreditCard className="h-5 w-5" />
                    </>
                  )}
                </button>
                <p className="mt-4 text-[10px] text-center text-stone-400 uppercase tracking-wide">
                  Secure payment processing via Lipana
                </p>
              </div>
              
              {/* Receipt Pattern Bottom */}
              <div className="absolute bottom-0 left-0 w-full h-2 bg-[radial-gradient(circle,transparent_50%,#ffffff_50%)] bg-[length:16px_16px] rotate-180 transform translate-y-1"></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
