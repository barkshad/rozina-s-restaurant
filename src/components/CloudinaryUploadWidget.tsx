import React, { useEffect, useRef } from 'react';
import { ImagePlus, Video } from 'lucide-react';

interface CloudinaryUploadWidgetProps {
  onUploadSuccess: (url: string) => void;
  resourceType?: 'image' | 'video' | 'auto';
  clientAllowedFormats?: string[];
  buttonText?: string;
}

const CloudinaryUploadWidget: React.FC<CloudinaryUploadWidgetProps> = ({ 
  onUploadSuccess, 
  resourceType = 'image',
  clientAllowedFormats = ['png', 'jpeg', 'jpg', 'webp'],
  buttonText = 'Upload Image'
}) => {
  const cloudinaryRef = useRef<any>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    if ((window as any).cloudinary) {
      cloudinaryRef.current = (window as any).cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: "ds2mbrzcn",
          uploadPreset: "rozina_unsigned",
          sources: ['local', 'url', 'camera'],
          multiple: false,
          folder: 'rozina_menu',
          resourceType: resourceType,
          clientAllowedFormats: clientAllowedFormats,
          maxFileSize: resourceType === 'video' ? 100000000 : 10000000, // 100MB for video, 10MB for image
          maxChunkSize: 6000000, // 6MB chunks for reliability
          showAdvancedOptions: true,
          cropping: resourceType === 'image', // Enable cropping for images
          showCompletedButton: true,
        },
        (error: any, result: any) => {
          if (!error && result && result.event === 'success') {
            console.log('Upload success:', result.info.secure_url);
            onUploadSuccess(result.info.secure_url);
          }
        }
      );
    }
  }, [onUploadSuccess, resourceType, clientAllowedFormats]);

  const openWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    } else {
      console.error('Cloudinary widget not loaded');
      // Fallback or user notification
      if (!(window as any).cloudinary) {
        alert('Upload widget failed to load. Please check your internet connection or ad blocker.');
      }
    }
  };

  return (
    <button
      type="button"
      onClick={openWidget}
      className="flex items-center justify-center px-4 py-2 border border-stone-300 shadow-sm text-sm font-medium rounded-md text-stone-700 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rozina-gold transition-colors"
    >
      {resourceType === 'video' ? (
        <Video className="mr-2 h-5 w-5 text-stone-400" />
      ) : (
        <ImagePlus className="mr-2 h-5 w-5 text-stone-400" />
      )}
      {buttonText}
    </button>
  );
};

export default CloudinaryUploadWidget;
