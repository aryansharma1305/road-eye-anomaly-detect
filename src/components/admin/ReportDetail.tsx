
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Clock,
  Eye,
  CheckCircle,
  MapPin,
  Calendar,
  User,
  AlertTriangle,
  HandMetal,
  ArrowLeft,
  SendHorizonal
} from 'lucide-react';
import { Label } from '@/components/ui/label';

interface ReportDetailProps {
  reportId?: string;
  onBack?: () => void;
}

const ReportDetail: React.FC<ReportDetailProps> = ({ reportId = '2', onBack }) => {
  const [status, setStatus] = useState<string>('under_review');
  const [adminNotes, setAdminNotes] = useState<string>('The road damage appears to be medium severity. We should schedule repair within the next 2 weeks.');
  
  // Mock data for a single report
  const reportData = {
    id: reportId,
    clientName: 'Jane Smith',
    date: '2025-04-12',
    location: '456 Oak Avenue, Downtown, Town',
    type: 'video',
    anomalies: {
      potholes: 1,
      cracks: 5,
      severityScore: 7.2
    },
    originalStatus: 'under_review'
  };
  
  const handleSubmit = () => {
    console.log('Updating report status:', {
      reportId,
      newStatus: status,
      adminNotes
    });
    // This would send data to your Flask backend
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'under_review':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Eye className="h-3 w-3 mr-1" />
            Under Review
          </Badge>
        );
      case 'repaired':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Repaired
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {onBack && (
                <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <CardTitle>Report #{reportData.id}</CardTitle>
              {getStatusBadge(reportData.originalStatus)}
            </div>
            <CardDescription>
              Detailed view of the road anomaly report
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium">Severity Score</span>
              <span className="text-2xl font-bold text-amber-600">{reportData.anomalies.severityScore}/10</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h3 className="font-medium text-gray-700">Report Information</h3>
              
              <div className="flex items-start">
                <User className="h-4 w-4 mt-0.5 mr-2 text-roadapp-purple" />
                <div>
                  <p className="text-sm text-gray-500">Reported By</p>
                  <p className="font-medium">{reportData.clientName}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Calendar className="h-4 w-4 mt-0.5 mr-2 text-roadapp-purple" />
                <div>
                  <p className="text-sm text-gray-500">Report Date</p>
                  <p className="font-medium">{new Date(reportData.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mt-0.5 mr-2 text-roadapp-purple" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{reportData.location}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-3">Anomalies Detected</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Potholes</span>
                  <Badge variant="outline" className="bg-yellow-50 border-yellow-200 text-yellow-800">
                    {reportData.anomalies.potholes} detected
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cracks</span>
                  <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-800">
                    {reportData.anomalies.cracks} detected
                  </Badge>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Anomalies</span>
                  <span className="font-bold">{reportData.anomalies.potholes + reportData.anomalies.cracks}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-3">Preview</h3>
              
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-md overflow-hidden">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <HandMetal className="h-10 w-10 mx-auto mb-2 text-roadapp-purple opacity-50" />
                    <p className="text-sm font-medium text-gray-600">Processed {reportData.type}</p>
                    <p className="text-xs text-gray-500">With detection bounding boxes</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 text-xs text-gray-500 flex items-start">
                <AlertTriangle className="h-3 w-3 mr-1 mt-0.5 text-amber-500" />
                <p>
                  {reportData.type === 'video' 
                    ? 'Click to play video with detection overlay' 
                    : 'Click to view full resolution image'}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-3">Update Status</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-amber-500" />
                          Pending
                        </div>
                      </SelectItem>
                      <SelectItem value="under_review">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-2 text-blue-500" />
                          Under Review
                        </div>
                      </SelectItem>
                      <SelectItem value="repaired">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          Repaired
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Admin Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Add notes about this report"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reports
          </Button>
        )}
        <Button 
          onClick={handleSubmit}
          className="ml-auto bg-roadapp-purple hover:bg-roadapp-dark-purple"
        >
          <SendHorizonal className="mr-2 h-4 w-4" />
          Update Report
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReportDetail;
