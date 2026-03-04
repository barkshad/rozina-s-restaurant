import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Trash2, Plus, Minus, CreditCard, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

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
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="bg-stone-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <Trash2 className="h-10 w-10 text-stone-400" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-stone-800 mb-4">Your Cart is Empty</h2>
        <p className="text-stone-500 mb-8">Looks like you haven't added any delicious items yet.</p>
        <Link
          to="/menu"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rozina-maroon hover:bg-rozina-maroon/90 shadow-sm transition-all"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-serif font-bold text-rozina-maroon mb-8 border-b border-stone-200 pb-4">
        Checkout
      </h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <section className="lg:col-span-7">
          <ul className="divide-y divide-stone-200 border-t border-b border-stone-200">
            {cart.map((item) => (
              <li key={item.id} className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                  <img
                    src={item.imageUrl || 'https://via.placeholder.com/150'}
                    alt={item.name}
                    className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32 bg-stone-100"
                  />
                </div>

                <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <span className="font-medium text-stone-900 hover:text-stone-800">
                            {item.name}
                          </span>
                        </h3>
                      </div>
                      <p className="mt-1 text-sm font-medium text-stone-900">KES {item.price}</p>
                      <p className="mt-1 text-sm text-stone-500">{item.category}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      <div className="flex items-center border border-stone-300 rounded-md w-max">
                        <button
                          type="button"
                          className="p-2 text-stone-600 hover:text-stone-900"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-2 text-stone-900 font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          className="p-2 text-stone-600 hover:text-stone-900"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="absolute top-0 right-0">
                        <button
                          type="button"
                          className="-m-2 p-2 inline-flex text-stone-400 hover:text-stone-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <span className="sr-only">Remove</span>
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Order Summary */}
        <section
          className="mt-16 bg-stone-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 shadow-sm border border-stone-200 sticky top-24"
        >
          <h2 className="text-lg font-medium text-stone-900">Order Summary</h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-stone-600">Subtotal</dt>
              <dd className="text-sm font-medium text-stone-900">KES {cartTotal.toLocaleString()}</dd>
            </div>
            <div className="border-t border-stone-200 pt-4 flex items-center justify-between">
              <dt className="text-base font-medium text-stone-900">Order Total</dt>
              <dd className="text-base font-medium text-stone-900">KES {cartTotal.toLocaleString()}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <button
              type="button"
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                'Processing...'
              ) : (
                <>
                  Pay via M-Pesa <CreditCard className="h-5 w-5" />
                </>
              )}
            </button>
            <p className="mt-4 text-xs text-center text-stone-500">
              Secure payment processing via Lipana.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckoutPage;
