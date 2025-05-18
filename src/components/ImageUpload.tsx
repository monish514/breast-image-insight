
import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { FileImageIcon } from "lucide-react";

interface ImageUploadProps {
  onImageSelected: (file: File, imagePreviewUrl: string) => void;
  isLoading: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, isLoading }) => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  }, []);

  const processFile = (file: File) => {
    // Check if the file is an image
    if (!file.type.match('image.*')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
      });
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Image size should be less than 5MB",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imagePreviewUrl = reader.result as string;
      onImageSelected(file, imagePreviewUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="w-full shadow-sm">
      <CardContent className="p-6">
        <div
          className={`dropzone flex flex-col items-center justify-center p-8 min-h-[300px] cursor-pointer border-2 border-dashed ${
            isDragging ? 'border-neutral-400 bg-neutral-50' : 'border-neutral-200'
          }`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <FileImageIcon className="h-16 w-16 text-neutral-500 mb-4" />
          <h3 className="text-xl font-medium text-gray-800 mb-2">Upload Breast Scan Image</h3>
          <p className="text-sm text-neutral-500 mb-4 text-center">
            Drag and drop your scan here, or click to select a file
          </p>
          <p className="text-xs text-neutral-400 mb-6">
            Supported formats: JPEG, PNG, DICOM, TIFF | Max size: 5MB
          </p>
          <Button 
            variant="outline" 
            disabled={isLoading}
            className="border-neutral-300 text-neutral-700 hover:bg-neutral-100"
          >
            {isLoading ? "Processing..." : "Select Image"}
          </Button>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
