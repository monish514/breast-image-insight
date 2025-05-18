
import React, { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import ImageUpload from "@/components/ImageUpload";
import ResultsPanel from "@/components/ResultsPanel";
import Header from "@/components/Header";
import { DetectionResult, AnalysisResponse } from '@/utils/types';
import { FileImageIcon } from 'lucide-react';

const Index: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<DetectionResult | null>(null);

  const handleImageSelected = (file: File, previewUrl: string) => {
    setSelectedFile(file);
    setImagePreview(previewUrl);
    setResults(null);
    
    // Simulate sending to backend
    handleAnalyzeImage(file);
  };

  const handleAnalyzeImage = async (file: File) => {
    setIsLoading(true);
    
    try {
      // This is a simulation of sending the image to the backend
      // In a real implementation, you would send the file to your backend
      // const formData = new FormData();
      // formData.append('image', file);
      // const response = await fetch('your-backend-url', {
      //   method: 'POST',
      //   body: formData
      // });
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response (replace with actual backend integration)
      const mockResponse: AnalysisResponse = {
        success: true,
        results: {
          cancerType: "Invasive Ductal Carcinoma",
          cancerLevel: "Moderate",
          confidence: 89,
          details: {
            "Tumor Size": "2.3 cm",
            "Histological Grade": "Grade 2",
            "Margin Status": "Negative",
            "Lymph Node Involvement": "Yes (2/15)"
          }
        }
      };
      
      if (mockResponse.success && mockResponse.results) {
        setResults(mockResponse.results);
        toast({
          title: "Analysis Complete",
          description: "Image has been successfully analyzed.",
        });
      } else {
        throw new Error(mockResponse.error || "Failed to analyze image");
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "There was a problem analyzing your image",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-medical-light-gray">
      <Header />
      <main className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload Scan</h2>
            <ImageUpload onImageSelected={handleImageSelected} isLoading={isLoading} />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Analysis</h2>
            <ResultsPanel imageUrl={imagePreview} results={results} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
