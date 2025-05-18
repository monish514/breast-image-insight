
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileImageIcon } from 'lucide-react';

interface ResultsPanelProps {
  imageUrl: string | null;
  isLoading: boolean;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ imageUrl, isLoading }) => {
  return (
    <div className="h-full flex flex-col">
      {imageUrl ? (
        <Card className="flex-1 min-h-0 shadow-sm">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-medium text-gray-800">Scan Preview</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex items-center justify-center">
            <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-md">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-600 mb-4"></div>
                </div>
              ) : (
                <img 
                  src={imageUrl} 
                  alt="Breast cancer scan" 
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="flex-1 min-h-0 opacity-70 shadow-sm">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-medium text-gray-800">Scan Preview</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex items-center justify-center">
            <div className="text-center p-12 text-neutral-500">
              <FileImageIcon className="mx-auto h-12 w-12 mb-3 text-neutral-400" />
              <p>No image selected</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResultsPanel;
