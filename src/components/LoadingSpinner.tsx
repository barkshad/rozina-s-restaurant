import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-rozina-maroon" />
        <p className="text-stone-500 font-medium animate-pulse">Loading deliciousness...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
