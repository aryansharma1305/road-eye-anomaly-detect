
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Eye, 
  RotateCcw, 
  Filter, 
  Search,
  Image,
  Video
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for the table
const mockReports = [
  {
    id: '1',
    preview: 'image',
    clientName: 'John Doe',
    date: '2025-04-10',
    anomalies: { potholes: 3, cracks: 2 },
    location: '123 Main St, City',
    status: 'pending'
  },
  {
    id: '2',
    preview: 'video',
    clientName: 'Jane Smith',
    date: '2025-04-12',
    anomalies: { potholes: 1, cracks: 5 },
    location: '456 Oak Ave, Town',
    status: 'under_review'
  },
  {
    id: '3',
    preview: 'image',
    clientName: 'Bob Johnson',
    date: '2025-04-14',
    anomalies: { potholes: 2, cracks: 0 },
    location: '789 Pine Rd, Village',
    status: 'repaired'
  },
  {
    id: '4',
    preview: 'image',
    clientName: 'Alice Brown',
    date: '2025-04-15',
    anomalies: { potholes: 0, cracks: 3 },
    location: '101 Cedar St, County',
    status: 'pending'
  },
  {
    id: '5',
    preview: 'video',
    clientName: 'Charlie Wilson',
    date: '2025-04-16',
    anomalies: { potholes: 4, cracks: 1 },
    location: '202 Maple Dr, District',
    status: 'under_review'
  }
];

const ReportsTable: React.FC = () => {
  const [reports, setReports] = useState(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? report.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });
  
  const updateStatus = (id: string, newStatus: string) => {
    setReports(prev => 
      prev.map(report => 
        report.id === id ? { ...report, status: newStatus } : report
      )
    );
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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Road Anomaly Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or location..."
              className="pl-8 w-full sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <Filter className="mr-2 h-4 w-4" />
                {statusFilter ? `Filter: ${statusFilter.replace('_', ' ')}` : 'Filter by status'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                All reports
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                <Clock className="mr-2 h-4 w-4 text-amber-500" />
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('under_review')}>
                <Eye className="mr-2 h-4 w-4 text-blue-500" />
                Under review
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('repaired')}>
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                Repaired
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Anomalies</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
                        {report.preview === 'image' ? (
                          <Image className="h-5 w-5 text-gray-500" />
                        ) : (
                          <Video className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{report.clientName}</TableCell>
                    <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1 text-sm">
                        <div className="flex items-center">
                          <span className="w-20">Potholes:</span>
                          <span className="font-medium">{report.anomalies.potholes}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-20">Cracks:</span>
                          <span className="font-medium">{report.anomalies.cracks}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate" title={report.location}>
                      {report.location}
                    </TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon" title="View Details">
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Filter className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => updateStatus(report.id, 'pending')}>
                              <Clock className="mr-2 h-4 w-4 text-amber-500" />
                              Mark as Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateStatus(report.id, 'under_review')}>
                              <Eye className="mr-2 h-4 w-4 text-blue-500" />
                              Mark as Under Review
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateStatus(report.id, 'repaired')}>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                              Mark as Repaired
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RotateCcw className="mr-2 h-4 w-4 text-purple-500" />
                              Request Re-inspection
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <AlertTriangle className="h-8 w-8 mb-2 text-amber-400" />
                      <p>No reports found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsTable;
