
// This file would handle all API calls to your Flask backend

interface UploadFileResponse {
  success: boolean;
  fileId?: string;
  error?: string;
}

interface DetectionResult {
  success: boolean;
  fileId?: string;
  detections?: {
    potholes: number;
    cracks: number;
    severityScore: number;
    processedImageUrl?: string;
  };
  error?: string;
}

interface ReportSubmissionResponse {
  success: boolean;
  reportId?: string;
  error?: string;
}

// Base URL for the Flask backend
const API_BASE_URL = 'http://localhost:5000/api';

// Upload a file (image or video) to the Flask backend
export const uploadFile = async (file: File, type: 'image' | 'video'): Promise<UploadFileResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to upload file');
    }
    
    return {
      success: true,
      fileId: data.fileId,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

// Detect anomalies in the uploaded file
export const detectAnomalies = async (fileId: string, location: string): Promise<DetectionResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/detect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileId,
        location,
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to detect anomalies');
    }
    
    return {
      success: true,
      fileId: data.fileId,
      detections: data.detections,
    };
  } catch (error) {
    console.error('Error detecting anomalies:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

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

import { supabase } from "@/integrations/supabase/client";

// Fetch reports with optional filtering
export const fetchReports = async (filters?: {
  status?: string, 
  userId?: string, 
  isAdmin?: boolean
}) => {
  try {
    let query = supabase.from('road_reports').select('*');
    
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    
    if (filters?.userId) {
      query = query.eq('user_id', filters.userId);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};

// Update report status (only for admins) using Supabase
export const updateReportStatus = async (
  reportId: string, 
  status: string, 
  additionalNotes?: string
) => {
  try {
    const { data, error } = await supabase
      .from('road_reports')
      .update({ 
        status, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', reportId)
      .select();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error updating report:', error);
    throw error;
  }
};
