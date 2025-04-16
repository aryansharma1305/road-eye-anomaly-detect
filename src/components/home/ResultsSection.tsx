
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  PlayCircle, 
  Loader, 
  CheckCircle, 
  Eye, 
  Send, 
  AlertTriangle, 
  HandMetal 
} from 'lucide-react';

interface ResultsProps {
  hasUploadedFile: boolean;
}

// Normally this would come from the API, but this is a mock for now
const ResultsSection: React.FC<ResultsProps> = ({ hasUploadedFile = false }) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isReportSent, setIsReportSent] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  
  // Mock detection results
  const detectionResults = {
    potholesDetected: 3,
    cracksDetected: 2,
    totalAnomalies: 5,
    confidence: 89
  };
  
  const handleStartDetection = () => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setIsComplete(true);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };
  
  const handleSendReport = () => {
    setIsReportSent(true);
  };
  
  if (!hasUploadedFile && !isComplete) {
    return (
      <Card className="shadow-md opacity-75">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <PlayCircle className="h-6 w-6 text-roadapp-purple" />
            Road Anomaly Detection
          </CardTitle>
          <CardDescription>
            Results will appear here after processing your uploaded data
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-amber-400 opacity-40" />
          <p className="text-muted-foreground">Please upload an image or video first</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <PlayCircle className="h-6 w-6 text-roadapp-purple" />
          Road Anomaly Detection
        </CardTitle>
        <CardDescription>
          {isProcessing ? 'Processing your data...' : 
           isComplete ? 'Detection completed' : 
           'Start detection process'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isProcessing && !isComplete && (
          <div className="text-center py-6">
            <Button 
              onClick={handleStartDetection}
              className="bg-roadapp-purple hover:bg-roadapp-dark-purple"
              size="lg"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Detect Road Anomalies
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              Click the button above to start the anomaly detection process
            </p>
          </div>
        )}
        
        {isProcessing && (
          <div className="space-y-4">
            <div className="flex items-center justify-center py-6">
              <div className="text-center">
                <Loader className="h-10 w-10 mx-auto mb-4 text-roadapp-purple animate-spin" />
                <p className="font-medium">Processing your data</p>
                <p className="text-sm text-gray-500 mt-1">This may take a few moments</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Detection Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        )}
        
        {isComplete && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 shrink-0" />
              <div>
                <p className="font-medium text-green-800">Detection Complete</p>
                <p className="text-sm text-green-700 mt-1">
                  We've detected {detectionResults.totalAnomalies} road anomalies 
                  with {detectionResults.confidence}% confidence
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Detection Results</h3>
              
              <div className="bg-white border rounded-lg overflow-hidden">
                <div className="grid grid-cols-2 gap-4 p-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Potholes Detected</p>
                    <p className="text-2xl font-semibold flex items-center">
                      {detectionResults.potholesDetected}
                      <Badge variant="outline" className="ml-2 text-xs bg-yellow-50 border-yellow-200 text-yellow-800">
                        High Severity
                      </Badge>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Cracks Detected</p>
                    <p className="text-2xl font-semibold flex items-center">
                      {detectionResults.cracksDetected}
                      <Badge variant="outline" className="ml-2 text-xs bg-blue-50 border-blue-200 text-blue-800">
                        Medium Severity
                      </Badge>
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="p-4">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-md overflow-hidden">
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <HandMetal className="h-10 w-10 mx-auto mb-2 text-roadapp-purple opacity-50" />
                        <p className="text-sm font-medium text-gray-600">Processed Image/Video Result</p>
                        <p className="text-xs text-gray-500">With detection bounding boxes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {!isReportSent ? (
                <Button 
                  onClick={handleSendReport} 
                  className="bg-roadapp-purple hover:bg-roadapp-dark-purple flex-1"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Report to Admin
                </Button>
              ) : (
                <Button variant="outline" className="border-green-500 text-green-600 flex-1" disabled>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Report Sent
                </Button>
              )}
              
              <Button variant="outline" className="flex-1">
                <Eye className="mr-2 h-4 w-4" />
                View Status
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsSection;
