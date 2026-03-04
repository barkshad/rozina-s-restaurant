import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Order, MenuItem } from '@/types';
import CloudinaryUploadWidget from '@/components/CloudinaryUploadWidget';
import { LayoutDashboard, ShoppingBag, Utensils, CheckCircle, Loader2, Plus } from 'lucide-react';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

const CATEGORIES = ['Poussin Specials', 'BBQ/Tikka', 'Chinese', 'Italian', 'Seafood'];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'menu'>('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Menu Form State
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    price: 0,
    category: CATEGORIES[0],
    description: '',
    imageUrl: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'orders'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedOrders: Order[] = [];
      querySnapshot.forEach((doc) => {
        fetchedOrders.push({ id: doc.id, ...doc.data() } as Order);
      });
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsPaid = async (orderId: string) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: 'Paid' });
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? { ...order, status: 'Paid' } : order))
      );
      toast.success('Order marked as Paid');
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order');
    }
  };

  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price || !newItem.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'menu'), newItem);
      toast.success('Menu item added successfully');
      setNewItem({
        name: '',
        price: 0,
        category: CATEGORIES[0],
        description: '',
        imageUrl: '',
      });
    } catch (error) {
      console.error('Error adding menu item:', error);
      toast.error('Failed to add menu item');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Seed Data
  const handleSeedMenu = async () => {
    if (!window.confirm('This will add sample items to your menu. Continue?')) return;
    
    setLoading(true);
    const sampleItems = [
      {
        name: 'Poussin Chips',
        price: 450,
        category: 'Poussin Specials',
        description: 'Our signature chips tossed in the famous spicy Poussin sauce.',
        imageUrl: 'https://images.unsplash.com/photo-1630384060421-a4323ce5663e?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Poussin Chicken (Half)',
        price: 900,
        category: 'Poussin Specials',
        description: 'Tender chicken fried and coated in our secret spicy Poussin sauce.',
        imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Chicken Tikka Breast',
        price: 650,
        category: 'BBQ/Tikka',
        description: 'Succulent chicken breast marinated in yogurt and spices, grilled to perfection.',
        imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Paneer Tikka',
        price: 750,
        category: 'BBQ/Tikka',
        description: 'Cubes of cottage cheese marinated in spices and grilled with vegetables.',
        imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Sizzling Beef',
        price: 950,
        category: 'Chinese',
        description: 'Stir-fried beef strips with vegetables served on a hot sizzling plate.',
        imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Chilli Garlic Prawns',
        price: 1400,
        category: 'Seafood',
        description: 'Fresh prawns sautéed in a spicy chilli and garlic sauce.',
        imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Spaghetti Bolognese',
        price: 850,
        category: 'Italian',
        description: 'Classic Italian pasta with a rich minced meat and tomato sauce.',
        imageUrl: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Fish Fingers & Chips',
        price: 800,
        category: 'Seafood',
        description: 'Breaded fish fillet strips served with tartar sauce and fries.',
        imageUrl: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=800&q=80',
      },
    ];

    try {
      const batchPromises = sampleItems.map((item) => addDoc(collection(db, 'menu'), item));
      await Promise.all(batchPromises);
      toast.success('Sample menu items added successfully!');
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error seeding database:', error);
      toast.error('Failed to add sample items');
    } finally {
      setLoading(false);
    }
  };

  // Stats
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.status !== 'Cancelled' ? order.total : 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending');

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-10 w-10 animate-spin text-rozina-maroon" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-serif font-bold text-rozina-maroon mb-8">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-stone-200 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={clsx(
            'pb-4 px-4 text-sm font-medium transition-colors whitespace-nowrap',
            activeTab === 'dashboard'
              ? 'border-b-2 border-rozina-maroon text-rozina-maroon'
              : 'text-stone-500 hover:text-stone-700'
          )}
        >
          <LayoutDashboard className="inline-block w-4 h-4 mr-2" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={clsx(
            'pb-4 px-4 text-sm font-medium transition-colors whitespace-nowrap',
            activeTab === 'orders'
              ? 'border-b-2 border-rozina-maroon text-rozina-maroon'
              : 'text-stone-500 hover:text-stone-700'
          )}
        >
          <ShoppingBag className="inline-block w-4 h-4 mr-2" />
          Orders ({pendingOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('menu')}
          className={clsx(
            'pb-4 px-4 text-sm font-medium transition-colors whitespace-nowrap',
            activeTab === 'menu'
              ? 'border-b-2 border-rozina-maroon text-rozina-maroon'
              : 'text-stone-500 hover:text-stone-700'
          )}
        >
          <Utensils className="inline-block w-4 h-4 mr-2" />
          Menu Management
        </button>
      </div>

      {/* Dashboard Content */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-stone-500 truncate">Total Orders</dt>
              <dd className="mt-1 text-3xl font-semibold text-stone-900">{totalOrders}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-stone-500 truncate">Total Revenue</dt>
              <dd className="mt-1 text-3xl font-semibold text-stone-900">KES {totalRevenue.toLocaleString()}</dd>
            </div>
          </div>
        </div>
      )}

      {/* Orders Content */}
      {activeTab === 'orders' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-stone-200">
            {orders.map((order) => (
              <li key={order.id} className="px-4 py-4 sm:px-6 hover:bg-stone-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-rozina-maroon truncate">
                      Order ID: {order.id}
                    </p>
                    <p className="text-sm text-stone-500">
                      Total: <span className="font-bold text-stone-900">KES {order.total.toLocaleString()}</span>
                    </p>
                    <p className="text-xs text-stone-400">
                      {order.timestamp?.toDate ? order.timestamp.toDate().toLocaleString() : 'Just now'}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={clsx(
                        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full mr-4',
                        order.status === 'Paid'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-stone-100 text-stone-800'
                      )}
                    >
                      {order.status}
                    </span>
                    {order.status === 'Pending' && (
                      <button
                        onClick={() => handleMarkAsPaid(order.id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                      >
                        <CheckCircle className="mr-1 h-3 w-3" /> Mark Paid
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-stone-600">
                    Items: {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                  </p>
                </div>
              </li>
            ))}
            {orders.length === 0 && (
              <li className="px-4 py-8 text-center text-stone-500">No orders found.</li>
            )}
          </ul>
        </div>
      )}

      {/* Menu Management Content */}
      {activeTab === 'menu' && (
        <div className="bg-white shadow sm:rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg leading-6 font-medium text-stone-900">Add New Dish</h3>
            <button
              onClick={handleSeedMenu}
              className="text-sm text-rozina-maroon hover:text-rozina-maroon/80 underline"
            >
              Populate with Sample Data
            </button>
          </div>
          <form onSubmit={handleAddMenuItem} className="space-y-6 max-w-2xl">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium text-stone-700">
                  Dish Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="shadow-sm focus:ring-rozina-gold focus:border-rozina-gold block w-full sm:text-sm border-stone-300 rounded-md p-2 border"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="price" className="block text-sm font-medium text-stone-700">
                  Price (KES)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    required
                    min="0"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                    className="shadow-sm focus:ring-rozina-gold focus:border-rozina-gold block w-full sm:text-sm border-stone-300 rounded-md p-2 border"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="category" className="block text-sm font-medium text-stone-700">
                  Category
                </label>
                <div className="mt-1">
                  <select
                    id="category"
                    name="category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="shadow-sm focus:ring-rozina-gold focus:border-rozina-gold block w-full sm:text-sm border-stone-300 rounded-md p-2 border bg-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-stone-700">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    required
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    className="shadow-sm focus:ring-rozina-gold focus:border-rozina-gold block w-full sm:text-sm border-stone-300 rounded-md p-2 border"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-stone-700 mb-2">Dish Image</label>
                <div className="flex items-center space-x-4">
                  {newItem.imageUrl && (
                    <img
                      src={newItem.imageUrl}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded-md border border-stone-200"
                    />
                  )}
                  <CloudinaryUploadWidget
                    onUploadSuccess={(url) => setNewItem({ ...newItem, imageUrl: url })}
                  />
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-stone-200">
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rozina-maroon hover:bg-rozina-maroon/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rozina-gold disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" /> Saving...
                    </>
                  ) : (
                    <>
                      <Plus className="-ml-1 mr-2 h-5 w-5" /> Add Dish
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
