
export interface DetectionResult {
  cancerType: string;
  cancerLevel: string;
  confidence: number;
  details?: {
    [key: string]: string | number;
  };
}

export interface AnalysisResponse {
  success: boolean;
  results?: DetectionResult;
  error?: string;
}
