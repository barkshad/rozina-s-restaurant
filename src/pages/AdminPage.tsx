import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, where, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Order, MenuItem } from '@/types';
import CloudinaryUploadWidget from '@/components/CloudinaryUploadWidget';
import { LayoutDashboard, ShoppingBag, Utensils, CheckCircle, Loader2, Plus, Trash2, Users, Download, Settings, Video } from 'lucide-react';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const CATEGORIES = ['Poussin Specials', 'BBQ/Tikka', 'Chinese', 'Italian', 'Seafood'];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'menu' | 'customers' | 'settings'>('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Settings State
  const [heroVideoUrl, setHeroVideoUrl] = useState('');
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  
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
      // Fetch Orders
      const ordersQuery = query(collection(db, 'orders'), orderBy('timestamp', 'desc'));
      const ordersSnapshot = await getDocs(ordersQuery);
      const fetchedOrders: Order[] = [];
      ordersSnapshot.forEach((doc) => {
        fetchedOrders.push({ id: doc.id, ...doc.data() } as Order);
      });
      setOrders(fetchedOrders);

      // Fetch Menu Items
      const menuQuery = query(collection(db, 'menu'), orderBy('name'));
      const menuSnapshot = await getDocs(menuQuery);
      const fetchedMenu: MenuItem[] = [];
      menuSnapshot.forEach((doc) => {
        fetchedMenu.push({ id: doc.id, ...doc.data() } as MenuItem);
      });
      setMenuItems(fetchedMenu);

      // Fetch Settings
      const settingsRef = doc(db, 'settings', 'site_config');
      const settingsSnap = await getDoc(settingsRef);
      if (settingsSnap.exists()) {
        setHeroVideoUrl(settingsSnap.data().heroVideoUrl || '');
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setIsSavingSettings(true);
    try {
      await setDoc(doc(db, 'settings', 'site_config'), {
        heroVideoUrl
      }, { merge: true });
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setIsSavingSettings(false);
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

  const handleDeleteMenuItem = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteDoc(doc(db, 'menu', id));
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
      toast.success('Menu item deleted');
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
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

  const handleHeroVideoUploadSuccess = React.useCallback((url: string) => {
    setHeroVideoUrl(url);
  }, []);

  const handleMenuItemImageUploadSuccess = React.useCallback((url: string) => {
    setNewItem((prev) => ({ ...prev, imageUrl: url }));
  }, []);

  // Customer Data Extraction
  const uniqueCustomers = React.useMemo(() => {
    const customerMap = new Map();
    orders.forEach((order) => {
      if (order.customerPhone) {
        if (!customerMap.has(order.customerPhone)) {
          customerMap.set(order.customerPhone, {
            name: order.customerName,
            phone: order.customerPhone,
            email: order.customerEmail || 'N/A',
            lastOrderDate: order.timestamp?.toDate ? order.timestamp.toDate() : new Date(),
            totalOrders: 1,
            totalSpent: order.total
          });
        } else {
          const customer = customerMap.get(order.customerPhone);
          customer.totalOrders += 1;
          customer.totalSpent += order.total;
          const orderDate = order.timestamp?.toDate ? order.timestamp.toDate() : new Date();
          if (orderDate > customer.lastOrderDate) {
            customer.lastOrderDate = orderDate;
          }
        }
      }
    });
    return Array.from(customerMap.values());
  }, [orders]);

  const handleDownloadCustomersPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Rozina's Restaurant - Customer Database", 14, 22);
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    const tableColumn = ["Name", "Phone", "Email", "Total Orders", "Total Spent (KES)", "Last Active"];
    const tableRows = uniqueCustomers.map(customer => [
      customer.name,
      customer.phone,
      customer.email,
      customer.totalOrders,
      customer.totalSpent.toLocaleString(),
      customer.lastOrderDate.toLocaleDateString()
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [128, 0, 0], textColor: [255, 255, 255] }, // Rozina Maroon
    });

    doc.save("rozinas_customers.pdf");
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
    <div className="min-h-screen bg-stone-50 pt-24 pb-12">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <button
          onClick={() => setActiveTab('customers')}
          className={clsx(
            'pb-4 px-4 text-sm font-medium transition-colors whitespace-nowrap',
            activeTab === 'customers'
              ? 'border-b-2 border-rozina-maroon text-rozina-maroon'
              : 'text-stone-500 hover:text-stone-700'
          )}
        >
          <Users className="inline-block w-4 h-4 mr-2" />
          Customers
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={clsx(
            'pb-4 px-4 text-sm font-medium transition-colors whitespace-nowrap',
            activeTab === 'settings'
              ? 'border-b-2 border-rozina-maroon text-rozina-maroon'
              : 'text-stone-500 hover:text-stone-700'
          )}
        >
          <Settings className="inline-block w-4 h-4 mr-2" />
          Site Settings
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

      {/* Customers Content */}
      {activeTab === 'customers' && (
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-stone-50 border-b border-stone-200">
            <div>
              <h3 className="text-lg leading-6 font-medium text-stone-900">Customer Database</h3>
              <p className="mt-1 max-w-2xl text-sm text-stone-500">
                Contact details collected from orders.
              </p>
            </div>
            <button
              onClick={handleDownloadCustomersPDF}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-rozina-maroon hover:bg-rozina-maroon/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rozina-gold transition-all"
            >
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-200">
              <thead className="bg-stone-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Total Orders
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Last Active
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-stone-200">
                {uniqueCustomers.map((customer, index) => (
                  <tr key={index} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-stone-900">{customer.name || 'Unknown'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-stone-500">{customer.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-stone-500">{customer.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-stone-900">{customer.totalOrders}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-stone-900 font-medium">KES {customer.totalSpent.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-stone-500">{customer.lastOrderDate.toLocaleDateString()}</div>
                    </td>
                  </tr>
                ))}
                {uniqueCustomers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-stone-500">
                      No customer data found yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Settings Content */}
      {activeTab === 'settings' && (
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-stone-50 border-b border-stone-200">
            <h3 className="text-lg leading-6 font-medium text-stone-900">Site Configuration</h3>
            <p className="mt-1 max-w-2xl text-sm text-stone-500">
              Manage global website settings.
            </p>
          </div>
          <div className="p-6 space-y-8">
            <div>
              <h4 className="text-md font-medium text-stone-900 mb-4 flex items-center">
                <Video className="w-5 h-5 mr-2 text-rozina-maroon" />
                Hero Section Video
              </h4>
              <p className="text-sm text-stone-500 mb-4">
                Upload a video to play in the background of the hero section. This will replace the default image.
                For best results, use a compressed MP4 file (under 50MB).
              </p>
              
              <div className="flex flex-col space-y-4 max-w-xl">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={heroVideoUrl}
                    onChange={(e) => setHeroVideoUrl(e.target.value)}
                    placeholder="https://..."
                    className="shadow-sm focus:ring-rozina-gold focus:border-rozina-gold block w-full sm:text-sm border-stone-300 rounded-md p-2 border"
                  />
                  <CloudinaryUploadWidget
                    onUploadSuccess={handleHeroVideoUploadSuccess}
                    resourceType="video"
                    clientAllowedFormats={['mp4', 'webm', 'mov']}
                    buttonText="Upload Video"
                  />
                </div>
                
                {heroVideoUrl && (
                  <div className="mt-4 rounded-lg overflow-hidden border border-stone-200 bg-black aspect-video">
                    <video 
                      src={heroVideoUrl} 
                      controls 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                <div className="pt-4">
                  <button
                    onClick={handleSaveSettings}
                    disabled={isSavingSettings}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rozina-maroon hover:bg-rozina-maroon/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rozina-gold disabled:opacity-50 transition-all"
                  >
                    {isSavingSettings ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" /> Saving...
                      </>
                    ) : (
                      'Save Settings'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
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
                    onUploadSuccess={handleMenuItemImageUploadSuccess}
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

          <div className="mt-10 border-t border-stone-200 pt-10">
            <h3 className="text-lg leading-6 font-medium text-stone-900 mb-6">Current Menu Items ({menuItems.length})</h3>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-stone-200">
                {menuItems.map((item) => (
                  <li key={item.id} className="px-4 py-4 flex items-center sm:px-6 hover:bg-stone-50">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-md object-cover bg-stone-100"
                            src={item.imageUrl || 'https://via.placeholder.com/150'}
                            alt={item.name}
                          />
                        </div>
                        <div className="ml-4 truncate">
                          <div className="flex text-sm">
                            <p className="font-medium text-rozina-maroon truncate">{item.name}</p>
                            <p className="ml-1 flex-shrink-0 font-normal text-stone-500">
                              in {item.category}
                            </p>
                          </div>
                          <div className="mt-1 flex">
                            <p className="text-sm text-stone-900 font-bold">KES {item.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <button
                        onClick={() => handleDeleteMenuItem(item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
                {menuItems.length === 0 && (
                  <li className="px-4 py-8 text-center text-stone-500">
                    No menu items found. Use the "Populate with Sample Data" button above to add some.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default AdminPage;
