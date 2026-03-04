import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MenuItem } from '@/types';
import MenuItemCard from '@/components/MenuItemCard';
import { Loader2, Search, Filter } from 'lucide-react';
import { clsx } from 'clsx';

const CATEGORIES = ['All', 'Poussin Specials', 'BBQ/Tikka', 'Chinese', 'Italian', 'Seafood'];

const MenuPage = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const q = query(collection(db, 'menu'), orderBy('name'));
        const querySnapshot = await getDocs(q);
        const menuItems: MenuItem[] = [];
        querySnapshot.forEach((doc) => {
          menuItems.push({ id: doc.id, ...doc.data() } as MenuItem);
        });
        setItems(menuItems);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-rozina-maroon">Our Menu</h1>
        <p className="text-stone-600 max-w-2xl mx-auto">
          Explore our diverse selection of culinary delights, prepared fresh daily.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-stone-100 sticky top-20 z-40">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={clsx(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                selectedCategory === cat
                  ? 'bg-rozina-maroon text-white shadow-md'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-stone-400" />
          </div>
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-stone-200 rounded-lg leading-5 bg-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rozina-gold focus:border-rozina-gold sm:text-sm transition-shadow"
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-rozina-maroon" />
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-stone-50 rounded-xl border border-dashed border-stone-300">
          <p className="text-stone-500 text-lg">No items found matching your criteria.</p>
          <button 
            onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
            className="mt-4 text-rozina-maroon font-medium hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
