import React from 'react';
import { MenuItem } from '@/types';
import { useCart } from '@/context/CartContext';
import { Plus, Check } from 'lucide-react';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);

  const handleAddToCart = () => {
    addToCart(item);
    setAdded(true);
    toast.success(`Added ${item.name} to cart`);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-100 flex flex-col h-full group"
    >
      <div className="relative h-56 overflow-hidden bg-stone-200">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            decoding="async"
            width="400"
            height="300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-stone-400 bg-stone-100">
            <span className="text-sm font-medium">No Image</span>
          </div>
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-rozina-maroon shadow-sm uppercase tracking-wider border border-stone-100">
          {item.category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-serif font-bold text-stone-900 line-clamp-1 group-hover:text-rozina-maroon transition-colors">{item.name}</h3>
          <span className="text-rozina-maroon font-bold whitespace-nowrap ml-3 bg-rozina-maroon/5 px-2 py-1 rounded-lg">
            KES {item.price.toLocaleString()}
          </span>
        </div>
        <p className="text-stone-500 text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">{item.description}</p>
        <button
          onClick={handleAddToCart}
          disabled={added}
          className={clsx(
            'w-full py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-sm',
            added
              ? 'bg-green-600 text-white cursor-default'
              : 'bg-stone-900 text-white hover:bg-rozina-maroon hover:shadow-md active:scale-95'
          )}
        >
          {added ? (
            <motion.div 
              initial={{ scale: 0.5 }} 
              animate={{ scale: 1 }}
              className="flex items-center gap-2"
            >
              <Check className="h-4 w-4" /> Added
            </motion.div>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default MenuItemCard;
