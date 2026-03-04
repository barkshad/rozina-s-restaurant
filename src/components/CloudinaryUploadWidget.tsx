import React, { useEffect, useRef } from 'react';
import { ImagePlus } from 'lucide-react';

interface CloudinaryUploadWidgetProps {
  onUploadSuccess: (url: string) => void;
}

const CloudinaryUploadWidget: React.FC<CloudinaryUploadWidgetProps> = ({ onUploadSuccess }) => {
  const cloudinaryRef = useRef<any>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    if ((window as any).cloudinary) {
      cloudinaryRef.current = (window as any).cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
          uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
          sources: ['local', 'url', 'camera'],
          multiple: false,
          folder: 'rozina_menu',
          clientAllowedFormats: ['png', 'jpeg', 'jpg', 'webp'],
          maxImageFileSize: 2000000, // 2MB
        },
        (error: any, result: any) => {
          if (!error && result && result.event === 'success') {
            console.log('Upload success:', result.info.secure_url);
            onUploadSuccess(result.info.secure_url);
          }
        }
      );
    }
  }, [onUploadSuccess]);

  const openWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    } else {
      console.error('Cloudinary widget not loaded');
    }
  };

  return (
    <button
      type="button"
      onClick={openWidget}
      className="flex items-center justify-center px-4 py-2 border border-stone-300 shadow-sm text-sm font-medium rounded-md text-stone-700 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rozina-gold"
    >
      <ImagePlus className="mr-2 h-5 w-5 text-stone-400" />
      Upload Image
    </button>
  );
};

export default CloudinaryUploadWidget;
