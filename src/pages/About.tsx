
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Info, AlertTriangle, CheckCircle, Navigation, Eye, Send } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 flex items-center gap-2">
            <Info className="h-7 w-7 text-roadapp-purple" />
            About Road Anomaly Detection
          </h1>
          <p className="text-gray-600 mb-6 max-w-3xl">
            Our advanced road anomaly detection system helps identify and report road damage for faster repairs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-roadapp-purple" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Road Anomaly Detection is dedicated to improving road safety and maintenance through 
                  advanced artificial intelligence and computer vision technology. Our mission is to 
                  create safer roads for everyone by enabling quick and accurate detection of road 
                  damage, facilitating faster repairs and maintenance.
                </p>
                <p className="text-gray-600">
                  We believe that by leveraging modern technology, we can significantly reduce the time 
                  between damage occurring and repairs being made, ultimately saving costs for municipalities 
                  and preventing accidents caused by road hazards.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Eye className="h-5 w-5 text-roadapp-purple" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-roadapp-purple text-white flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">Upload</h3>
                      <p className="text-sm text-gray-600">
                        Users upload photos or videos of damaged road sections through our interface.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-roadapp-purple text-white flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">AI Detection</h3>
                      <p className="text-sm text-gray-600">
                        Our YOLOv8 model analyzes the media and identifies potholes, cracks, and other anomalies.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-roadapp-purple text-white flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium">Report</h3>
                      <p className="text-sm text-gray-600">
                        Detected issues are compiled into a detailed report with location data.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-roadapp-purple text-white flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium">Action</h3>
                      <p className="text-sm text-gray-600">
                        Road maintenance teams review and prioritize repairs based on severity and location.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-roadapp-purple" />
                Our Technology
              </CardTitle>
              <CardDescription>
                Powered by advanced computer vision and machine learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">YOLOv8 Detection</h3>
                  <p className="text-sm text-gray-600">
                    We utilize YOLOv8, a state-of-the-art object detection model, trained specifically 
                    on road anomaly datasets to accurately identify various types of road damage.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Severity Classification</h3>
                  <p className="text-sm text-gray-600">
                    Our system not only detects anomalies but also classifies their severity, helping 
                    maintenance teams prioritize the most critical repairs.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Location Tracking</h3>
                  <p className="text-sm text-gray-600">
                    Precise location data is captured and stored with each report, making it easy for 
                    repair teams to locate and address the reported issues.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-roadapp-purple" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
                  <p>
                    While our system is highly accurate, it may not detect all types of road damage. 
                    The detection accuracy depends on the quality of the uploaded image or video.
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
                  <p>
                    This system is designed to supplement, not replace, professional road inspections. 
                    Critical infrastructure should always be inspected by qualified professionals.
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
                  <p>
                    Response and repair times depend on local maintenance teams and resources, not on 
                    our detection system.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
