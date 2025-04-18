import { supabase } from "@/integrations/supabase/client";

interface ReportSubmissionResponse {
  success: boolean;
  reportId?: string;
  error?: string;
}

// Submit a report to Supabase
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
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated to submit a report');
    }
    
    // Insert the report into Supabase
    const { data, error } = await supabase
      .from('road_reports')
      .insert([
        {
          file_id: fileId,
          location,
          user_id: user.id,
          potholes: detections.potholes,
          cracks: detections.cracks,
          severity_score: detections.severityScore,
          status: 'pending',
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return {
      success: true,
      reportId: data.id,
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
    const { data, error } = await supabase
      .from('road_reports')
      .select(`
        *,
        profiles:user_id (
          full_name,
          email
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
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
    const { data, error } = await supabase
      .from('road_reports')
      .select(`
        *,
        profiles:user_id (
          full_name,
          email
        )
      `)
      .eq('id', reportId)
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching report ${reportId}:`, error);
    throw error;
  }
};

// Update a report's status
export const updateReportStatus = async (
  reportId: string, 
  status: string, 
  adminNotes?: string
) => {
  try {
    const { data, error } = await supabase
      .from('road_reports')
      .update({ 
        status,
        admin_notes: adminNotes,
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId)
      .select();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error(`Error updating report ${reportId}:`, error);
    throw error;
  }
};
