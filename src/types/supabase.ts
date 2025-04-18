export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          full_name: string;
          is_admin: boolean;
          avatar_url?: string;
        };
        Insert: {
          id: string;
          created_at?: string;
          full_name: string;
          is_admin?: boolean;
          avatar_url?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          full_name?: string;
          is_admin?: boolean;
          avatar_url?: string;
        };
      };
      road_reports: {
        Row: {
          id: string;
          created_at: string;
          updated_at?: string;
          user_id: string;
          file_id: string;
          location: string;
          potholes: number;
          cracks: number;
          severity_score: number;
          status: string;
          admin_notes?: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id: string;
          file_id: string;
          location: string;
          potholes: number;
          cracks: number;
          severity_score: number;
          status?: string;
          admin_notes?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
          file_id?: string;
          location?: string;
          potholes?: number;
          cracks?: number;
          severity_score?: number;
          status?: string;
          admin_notes?: string;
        };
      };
    };
  };
} 