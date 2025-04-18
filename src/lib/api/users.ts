import { supabase } from "@/integrations/supabase/client";
import { Database } from '@/types/supabase';
import { User } from '@supabase/supabase-js';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface UserData {
  id: string;
  full_name: string;
  is_admin: boolean;
  user: {
    email: string;
    created_at: string;
    last_sign_in_at: string;
  };
}

// Get all users with their profiles
export const getUsers = async (): Promise<UserData[]> => {
  try {
    // Get all profiles
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select();

    if (profileError) {
      throw profileError;
    }

    if (!profiles) {
      return [];
    }

    // Get auth users data
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      throw authError;
    }

    // Combine the data
    return profiles.map(profile => {
      const authUser = authData.users.find((user: User) => user.id === profile.id);
      return {
        id: profile.id,
        full_name: profile.full_name,
        is_admin: profile.is_admin,
        user: {
          email: authUser?.email || '',
          created_at: authUser?.created_at || profile.created_at,
          last_sign_in_at: authUser?.last_sign_in_at || profile.created_at
        }
      };
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userId: string, updates: Partial<Pick<Profile, 'full_name' | 'is_admin'>>) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Deactivate user by updating their admin status to false
export const deactivateUser = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ is_admin: false })
      .eq('id', userId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error deactivating user:', error);
    throw error;
  }
}; 