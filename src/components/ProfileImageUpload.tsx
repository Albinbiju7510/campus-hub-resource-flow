
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileImageUploadProps {
  currentImage?: string;
  onImageUpdate: (imageUrl: string) => void;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({ currentImage, onImageUpdate }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { toast } = useToast();

  // In a real app, this would upload to a server
  // Here we simulate it by creating a data URL
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "The image must be less than 5MB in size."
      });
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please select an image file."
      });
      return;
    }
    
    setIsUploading(true);
    
    // Create a preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
    }, 1500);
  };

  const handleSaveImage = () => {
    if (previewImage) {
      onImageUpdate(previewImage);
      toast({
        title: "Profile image updated",
        description: "Your profile image has been updated successfully."
      });
      setPreviewImage(null);
    }
  };

  const handleCancelUpload = () => {
    setPreviewImage(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-campus-light">
          {previewImage ? (
            <img 
              src={previewImage} 
              alt="Profile preview" 
              className="w-full h-full object-cover"
            />
          ) : currentImage ? (
            <img 
              src={currentImage} 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          ) : (
            <Camera className="h-12 w-12 text-gray-400" />
          )}
        </div>
        
        <label htmlFor="profile-image-upload" className="absolute bottom-0 right-0 bg-campus-primary text-white p-2 rounded-full cursor-pointer hover:bg-campus-secondary transition-colors">
          <Upload className="h-4 w-4" />
          <input 
            type="file" 
            id="profile-image-upload" 
            className="hidden" 
            accept="image/*"
            onChange={handleImageChange}
            disabled={isUploading}
          />
        </label>
      </div>
      
      {isUploading && (
        <div className="text-sm text-gray-500">Uploading image...</div>
      )}
      
      {previewImage && !isUploading && (
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSaveImage} className="flex items-center">
            <Check className="h-4 w-4 mr-1" /> Save
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancelUpload}>
            Cancel
          </Button>
        </div>
      )}
      
      <p className="text-sm text-gray-500 text-center max-w-xs">
        Upload a professional profile picture. JPG, PNG or GIF format, less than 5MB in size.
      </p>
    </div>
  );
};

export default ProfileImageUpload;
