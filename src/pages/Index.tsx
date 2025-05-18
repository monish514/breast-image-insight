
import React, { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import ImageUpload from "@/components/ImageUpload";
import ResultsPanel from "@/components/ResultsPanel";
import Header from "@/components/Header";

const Index: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageSelected = (file: File, previewUrl: string) => {
    setSelectedFile(file);
    setImagePreview(previewUrl);
    setIsLoading(true);
    
    // Simulate brief loading effect
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Image Uploaded",
        description: "Image has been successfully uploaded.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-medical-dark-blue">Upload Scan</h2>
            <ImageUpload onImageSelected={handleImageSelected} isLoading={isLoading} />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-medical-dark-blue">Scan Preview</h2>
            <ResultsPanel imageUrl={imagePreview} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
