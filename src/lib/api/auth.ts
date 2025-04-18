
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Admin credentials
export const ADMIN_EMAIL = 'admin@roadapp.com';
export const ADMIN_PASSWORD = 'RoadApp2025!Admin';

// Login function that handles both Supabase auth and admin login
export const loginUser = async (email: string, password: string) => {
  try {
    // Check if admin login credentials match
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      console.log("Admin login successful");
      return {
        user: { email: ADMIN_EMAIL, is_admin: true },
        isAdmin: true,
        session: null
      };
    }
    
    // If not admin, try Supabase auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Supabase login error:', error);
      throw error;
    }
    
    // Get user profile from Supabase
    const { data: profileData } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', data.user?.id)
      .single();
    
    const isAdmin = profileData?.is_admin || false;
    
    return {
      user: data.user,
      session: data.session,
      isAdmin
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Register function
export const registerUser = async (email: string, password: string, name: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      }
    });
    
    if (error) throw error;
    
    return {
      user: data.user,
      session: data.session
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
