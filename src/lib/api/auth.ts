import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Admin credentials
export const ADMIN_EMAIL = 'admin@roadapp.com';
export const ADMIN_PASSWORD = 'RoadApp2025!Admin';

// Login function that handles both Supabase auth and admin login
export const loginUser = async (email: string, password: string) => {
  try {
   
    const isAdminLogin = email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
    
    
    if (isAdminLogin) {
      return {
        user: { email: ADMIN_EMAIL, is_admin: true },
        isAdmin: true,
        session: null
      };
    }
    
   
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      throw error;
    }

    if (!data.user) {
      throw new Error('No user found');
    }
    
   
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id, is_admin')
      .eq('id', data.user.id)
      .single();
    
    if (profileError) {
      // If profile doesn't exist, create it
      await supabase.from('profiles').insert({
        id: data.user.id,
        full_name: data.user.user_metadata.full_name || '',
        is_admin: false,
      });
    }

    return {
      user: data.user,
      session: data.session,
      isAdmin: profileData?.is_admin || false
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Register a new user
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

    if (data.user) {
      // Create user profile
      await supabase.from('profiles').insert({
        id: data.user.id,
        full_name: name,
        is_admin: false,
      });
    }
    
    return {
      user: data.user,
      session: data.session
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
