import React from 'react';
import { MenuItem } from '@/types';
import { useCart } from '@/context/CartContext';
import { Plus, Check } from 'lucide-react';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

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
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-stone-100 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden bg-stone-200">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-stone-400 bg-stone-100">
            <span className="text-sm font-medium">No Image</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-rozina-maroon shadow-sm uppercase tracking-wide">
          {item.category}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-stone-900 line-clamp-1">{item.name}</h3>
          <span className="text-rozina-maroon font-bold whitespace-nowrap ml-2">
            KES {item.price.toLocaleString()}
          </span>
        </div>
        <p className="text-stone-500 text-sm mb-4 line-clamp-2 flex-grow">{item.description}</p>
        <button
          onClick={handleAddToCart}
          disabled={added}
          className={clsx(
            'w-full py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2',
            added
              ? 'bg-green-600 text-white cursor-default'
              : 'bg-rozina-maroon text-white hover:bg-rozina-maroon/90 active:scale-95'
          )}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" /> Added
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
