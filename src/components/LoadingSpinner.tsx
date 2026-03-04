import React from 'react';
import { Loader2, Utensils } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh] w-full">
      <div className="flex flex-col items-center gap-6 relative">
        <div className="relative">
          <div className="absolute inset-0 bg-rozina-gold/20 rounded-full blur-xl animate-pulse"></div>
          <div className="relative bg-white p-4 rounded-full shadow-lg border border-stone-100">
            <Utensils className="h-8 w-8 text-rozina-maroon animate-bounce" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-rozina-gold" />
          <p className="text-rozina-charcoal/70 font-serif text-lg tracking-wide animate-pulse">
            Preparing your experience...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
