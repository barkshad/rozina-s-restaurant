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
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group bg-white rounded-none border border-transparent hover:border-rozina-gold/20 hover:shadow-2xl transition-all duration-500 p-4"
    >
      <div className="relative aspect-[4/3] overflow-hidden mb-6">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
            decoding="async"
            width="400"
            height="300"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
              e.currentTarget.onerror = null; // Prevent infinite loop
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-stone-400 bg-stone-100 font-serif italic">
            No Image Available
          </div>
        )}
        
        {/* Price Tag Overlay */}
        <div className="absolute bottom-0 left-0 bg-rozina-maroon text-rozina-gold px-4 py-2 font-serif text-lg font-bold">
          KES {item.price.toLocaleString()}
        </div>
      </div>

      <div className="flex flex-col h-full">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="text-2xl font-serif font-medium text-rozina-charcoal group-hover:text-rozina-maroon transition-colors duration-300">
            {item.name}
          </h3>
        </div>
        
        <p className="text-rozina-charcoal/60 font-sans text-sm leading-relaxed mb-6 line-clamp-2 min-h-[2.5em]">
          {item.description}
        </p>

        <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
          <span className="text-xs font-sans uppercase tracking-wider text-rozina-charcoal/40 font-medium">
            {item.category}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={added}
            className={clsx(
              'px-6 py-2 rounded-full font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2',
              added
                ? 'bg-green-600 text-white cursor-default'
                : 'bg-transparent text-rozina-maroon border border-rozina-maroon hover:bg-rozina-maroon hover:text-white'
            )}
          >
            {added ? (
              <>
                <Check className="h-3 w-3" /> Added
              </>
            ) : (
              <>
                Add to Order
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItemCard;
