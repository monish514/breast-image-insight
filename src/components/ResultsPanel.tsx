
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { DetectionResult } from '@/utils/types';
import { FileImageIcon } from 'lucide-react';

interface ResultsPanelProps {
  imageUrl: string | null;
  results: DetectionResult | null;
  isLoading: boolean;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ imageUrl, results, isLoading }) => {
  
  const renderSeverityBadge = (level: string) => {
    const levelLower = level.toLowerCase();
    
    if (levelLower.includes('high') || levelLower.includes('severe')) {
      return <Badge className="bg-destructive">High</Badge>;
    } else if (levelLower.includes('moderate') || levelLower.includes('medium')) {
      return <Badge className="bg-orange-500">Moderate</Badge>;
    } else if (levelLower.includes('low') || levelLower.includes('mild')) {
      return <Badge className="bg-amber-500">Low</Badge>;
    } else if (levelLower.includes('benign') || levelLower.includes('normal')) {
      return <Badge className="bg-green-500">Benign</Badge>;
    }
    
    return <Badge className="bg-gray-500">{level}</Badge>;
  };
  
  return (
    <div className="h-full flex flex-col space-y-4">
      {imageUrl ? (
        <Card className="flex-1 min-h-0">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-medium">Image Preview</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex items-center justify-center">
            <div className="relative w-full h-[250px] md:h-[300px] overflow-hidden rounded-md">
              <img 
                src={imageUrl} 
                alt="Breast cancer scan" 
                className="w-full h-full object-contain"
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="flex-1 min-h-0 opacity-70">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-medium">Image Preview</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex items-center justify-center">
            <div className="text-center p-12 text-gray-500">
              <FileImageIcon className="mx-auto h-12 w-12 mb-3 text-gray-400" />
              <p>No image selected</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="flex-1 min-h-0 result-card">
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-medium">Analysis Results</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-medical-blue mb-4"></div>
              <p className="text-gray-600">Analyzing image...</p>
            </div>
          ) : results ? (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-500">Cancer Type</h4>
                  <span className="text-sm font-semibold">{results.cancerType}</span>
                </div>
                <Separator />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-500">Severity Level</h4>
                  {renderSeverityBadge(results.cancerLevel)}
                </div>
                <Separator />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-500">Confidence</h4>
                  <span className="text-sm font-semibold">{results.confidence}%</span>
                </div>
                <Progress value={results.confidence} className="h-2" />
              </div>
              
              {results.details && Object.keys(results.details).length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium mb-3">Additional Details</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(results.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-500">{key}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Upload an image to see analysis results</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsPanel;
