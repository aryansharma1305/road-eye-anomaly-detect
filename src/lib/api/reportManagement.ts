// Report management functions using Supabase

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
