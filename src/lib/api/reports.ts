
// Report submission and retrieval using REST API

interface ReportSubmissionResponse {
  success: boolean;
  reportId?: string;
  error?: string;
}

// Base URL for the Flask backend
const API_BASE_URL = 'http://localhost:5000/api';

// Submit a report to the admin
export const submitReport = async (
  fileId: string, 
  location: string,
  detections: {
    potholes: number;
    cracks: number;
    severityScore: number;
  }
): Promise<ReportSubmissionResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileId,
        location,
        detections,
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to submit report');
    }
    
    return {
      success: true,
      reportId: data.reportId,
    };
  } catch (error) {
    console.error('Error submitting report:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

// Get all reports (for admin dashboard)
export const getReports = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/reports`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch reports');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};

// Get a single report by ID
export const getReportById = async (reportId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reports/${reportId}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch report');
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching report ${reportId}:`, error);
    throw error;
  }
};

// Update a report's status using REST API
export const updateReportStatusREST = async (
  reportId: string, 
  status: string, 
  adminNotes?: string
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reports/${reportId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
        adminNotes,
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update report status');
    }
    
    return data;
  } catch (error) {
    console.error(`Error updating report ${reportId}:`, error);
    throw error;
  }
};
