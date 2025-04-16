
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import UploadSection from '@/components/home/UploadSection';
import LocationSection from '@/components/home/LocationSection';
import ResultsSection from '@/components/home/ResultsSection';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [hasUploadedFile, setHasUploadedFile] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  
  // Simulate file upload for demo
  useEffect(() => {
    // Auto-hide success alert after 5 seconds
    if (showSuccessAlert) {
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showSuccessAlert]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-8">
          {showSuccessAlert && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800">Report Submitted Successfully</AlertTitle>
              <AlertDescription className="text-green-700">
                Your road anomaly report has been submitted and will be reviewed by our team.
              </AlertDescription>
            </Alert>
          )}
          
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            Road Anomaly Detection
          </h1>
          <p className="text-gray-600 mb-6 max-w-3xl">
            Detect and report road anomalies such as potholes and cracks using our advanced AI-powered system.
            Upload an image or video of damaged roads and our system will automatically detect and classify issues.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <UploadSection />
            </div>
            <div>
              <LocationSection />
            </div>
          </div>
          
          <div className="mt-8">
            <ResultsSection hasUploadedFile={hasUploadedFile} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
