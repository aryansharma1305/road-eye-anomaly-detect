import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import ReportsTable from '@/components/admin/ReportsTable';
import ReportDetail from '@/components/admin/ReportDetail';
import { ADMIN_EMAIL } from '@/lib/api/auth';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Users, 
  Settings, 
  LogOut, 
  ChevronDown, 
  BellRing,
  Navigation
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import UsersTable from '@/components/admin/UsersTable';

const Admin = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
<<<<<<< HEAD
  const [isLoading, setIsLoading] = useState(true);
=======
  const [isLoading, setIsLoading] = useState(false);
>>>>>>> b6582226b003c994a710d10224418576efc0e784
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // Mock data for the dashboard
  const dashboardData = {
    totalReports: 158,
    pendingReports: 37,
    underReviewReports: 12,
    repairedReports: 109,
    severityAverage: 6.8,
    mostFrequentIssue: 'Potholes',
    recentReports: [
      { id: '001', location: '123 Main St', date: '2025-04-15', type: 'Pothole', severity: 'High' },
      { id: '002', location: '456 Oak Ave', date: '2025-04-15', type: 'Crack', severity: 'Medium' },
      { id: '003', location: '789 Pine Rd', date: '2025-04-14', type: 'Pothole', severity: 'Low' },
    ]
  };
  
<<<<<<< HEAD
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        // Check if user is logged in
        const { data: { user } } = await supabase.auth.getUser();
        const storedIsAdmin = localStorage.getItem('isAdmin');
        
        // Check for hardcoded admin or database admin
        if (user?.email === ADMIN_EMAIL || storedIsAdmin === 'true') {
          loadReports();
          return;
        }
        
        if (!user) {
          toast.error('Please login to access admin dashboard');
          navigate('/login');
          return;
        }
        
        // Check if user has admin profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();
        
        if (profileError || !profileData?.is_admin) {
          toast.error('Access Denied: Admin rights required');
          navigate('/');
          return;
        }

        // If we get here, user is an admin
        loadReports();
      } catch (error) {
        console.error('Error checking admin status:', error);
        toast.error('Error verifying admin status');
        navigate('/');
      }
    };
    
    checkAdminStatus();
  }, [navigate]);
  
  const loadReports = async () => {
    try {
      const fetchedReports = await fetchReports({ isAdmin: true });
      setReports(fetchedReports);
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to load reports');
      setIsLoading(false);
    }
  };
  
  const handleStatusUpdate = async (reportId: string, newStatus: string) => {
    try {
      await updateReportStatus(reportId, newStatus);
      loadReports(); // Refresh the reports
      toast.success(`Report status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update report status');
    }
  };
  
=======
>>>>>>> b6582226b003c994a710d10224418576efc0e784
  const handleViewReport = (reportId: string) => {
    setSelectedReportId(reportId);
    setActiveTab('reportDetail');
  };
  
  const handleBackToReports = () => {
    setSelectedReportId(null);
    setActiveTab('reports');
  };
  
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r">
        <div className="h-16 px-4 border-b flex items-center">
          <Navigation className="h-6 w-6 text-roadapp-purple" />
          <h1 className="text-lg font-bold ml-2">Road Admin</h1>
        </div>
        
        <div className="flex-1 px-4 py-6">
          <div className="mb-6">
            <p className="text-xs font-medium text-gray-400 uppercase mb-2 px-2">Main</p>
            <nav className="space-y-1">
              <Button 
                variant={activeTab === 'overview' ? 'default' : 'ghost'} 
                className={`w-full justify-start ${activeTab === 'overview' ? 'bg-roadapp-purple hover:bg-roadapp-dark-purple' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button 
                variant={activeTab === 'reports' || activeTab === 'reportDetail' ? 'default' : 'ghost'} 
                className={`w-full justify-start ${activeTab === 'reports' || activeTab === 'reportDetail' ? 'bg-roadapp-purple hover:bg-roadapp-dark-purple' : ''}`}
                onClick={() => setActiveTab('reports')}
              >
                <ClipboardList className="h-4 w-4 mr-2" />
                Reports
              </Button>
              <Button 
                variant={activeTab === 'users' ? 'default' : 'ghost'} 
                className={`w-full justify-start ${activeTab === 'users' ? 'bg-roadapp-purple hover:bg-roadapp-dark-purple' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                <Users className="h-4 w-4 mr-2" />
                Users
              </Button>
              <Button 
                variant={activeTab === 'settings' ? 'default' : 'ghost'} 
                className={`w-full justify-start ${activeTab === 'settings' ? 'bg-roadapp-purple hover:bg-roadapp-dark-purple' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </nav>
          </div>
        </div>
        
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/'}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-6">
          <div className="md:hidden flex items-center">
            <Navigation className="h-6 w-6 text-roadapp-purple" />
            <span className="ml-2 font-bold">Road Admin</span>
          </div>
          
          <div className="flex space-x-4 items-center">
            <button className="relative text-gray-500 hover:text-gray-700">
              <BellRing className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-sm text-gray-700 hover:text-gray-900">
                  <div className="w-8 h-8 bg-roadapp-purple text-white rounded-full flex items-center justify-center mr-2">
                    A
                  </div>
                  <span className="hidden sm:inline-block">Admin User</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.location.href = '/'}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <Button className="bg-roadapp-purple hover:bg-roadapp-dark-purple">
                  Export Reports
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{dashboardData.totalReports}</div>
                    <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Pending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{dashboardData.pendingReports}</div>
                    <p className="text-xs text-amber-600 mt-1">Requires attention</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Under Review</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{dashboardData.underReviewReports}</div>
                    <p className="text-xs text-blue-600 mt-1">In progress</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Repaired</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{dashboardData.repairedReports}</div>
                    <p className="text-xs text-green-600 mt-1">+8% from last month</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Reports</CardTitle>
                    <CardDescription>Latest anomalies reported by users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.recentReports.map((report) => (
                        <div key={report.id} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                          <div>
                            <div className="font-medium text-sm">Report #{report.id}</div>
                            <div className="text-xs text-gray-500">{report.location}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={
                              report.severity === 'High' 
                                ? 'bg-red-50 text-red-800 border-red-200' 
                                : report.severity === 'Medium' 
                                ? 'bg-amber-50 text-amber-800 border-amber-200' 
                                : 'bg-green-50 text-green-800 border-green-200'
                            }>
                              {report.severity}
                            </Badge>
                            <Button variant="ghost" size="sm" onClick={() => handleViewReport(report.id)}>
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics Overview</CardTitle>
                    <CardDescription>Key metrics summary</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Average Severity Score</div>
                        <div className="text-2xl font-bold">{dashboardData.severityAverage}/10</div>
                        <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                          <div 
                            className="h-2 bg-roadapp-purple rounded-full" 
                            style={{ width: `${(dashboardData.severityAverage / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Most Frequent Issue</div>
                        <div className="text-xl font-medium">{dashboardData.mostFrequentIssue}</div>
                        <p className="text-xs text-gray-500 mt-1">62% of all reports</p>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Resolution Rate</div>
                        <div className="text-xl font-medium">
                          {Math.round((dashboardData.repairedReports / dashboardData.totalReports) * 100)}%
                        </div>
                        <p className="text-xs text-green-600 mt-1">+5% from previous period</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
                <Button className="bg-roadapp-purple hover:bg-roadapp-dark-purple">
                  Export CSV
                </Button>
              </div>
              
              <ReportsTable />
            </div>
          )}
          
          {activeTab === 'reportDetail' && (
            <div className="space-y-6">
              <ReportDetail 
                reportId={selectedReportId || undefined}
                onBack={handleBackToReports}
              />
            </div>
          )}
          
          {activeTab === 'users' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Users</h1>
              <UsersTable />
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure your application settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-12 text-gray-500">Settings configuration will be implemented in a future update.</p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
