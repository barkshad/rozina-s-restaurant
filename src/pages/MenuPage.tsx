import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MenuItem } from '@/types';
import MenuItemCard from '@/components/MenuItemCard';
import { Loader2, Search } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import TiltCard from '@/components/animations/TiltCard';
import FadeInUp from '@/components/animations/FadeInUp';

const MenuPage = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const q = query(collection(db, 'menu'), orderBy('name'));
        const querySnapshot = await getDocs(q);
        const menuItems: MenuItem[] = [];
        const uniqueCategories = new Set<string>(['All']);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Basic validation to ensure data is not malformed
          if (data && typeof data === 'object' && 'name' in data && 'price' in data) {
             const menuItem = { id: doc.id, ...data } as MenuItem;
             menuItems.push(menuItem);
             if (typeof menuItem.category === 'string') {
               uniqueCategories.add(menuItem.category);
             }
          }
        });
        
        setItems(menuItems);
        setCategories(Array.from(uniqueCategories));
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const filteredItems = React.useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-rozina-maroon">
              Our Menu
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Explore our diverse selection of culinary delights, prepared fresh daily.
            </p>
          </FadeInUp>
        </div>

        {/* Filters & Search */}
        <FadeInUp delay={0.3}>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-stone-100 sticky top-24 z-40 backdrop-blur-md bg-opacity-90">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={clsx(
                    'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300',
                    selectedCategory === cat
                      ? 'bg-rozina-maroon text-white shadow-md transform scale-105'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
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
                className="block w-full pl-10 pr-3 py-2 border border-stone-200 rounded-lg leading-5 bg-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rozina-gold focus:border-rozina-gold sm:text-sm transition-shadow shadow-sm"
              />
            </div>
          </div>
        </FadeInUp>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-rozina-maroon" />
          </div>
        ) : filteredItems.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <TiltCard scale={1.02} perspective={800}>
                    <MenuItemCard item={item} />
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <FadeInUp>
            <div className="text-center py-20 bg-stone-50 rounded-xl border border-dashed border-stone-300">
              <p className="text-stone-500 text-lg">No items found matching your criteria.</p>
              <button 
                onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
                className="mt-4 text-rozina-maroon font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          </FadeInUp>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
