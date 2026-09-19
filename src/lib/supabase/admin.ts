import { createServerSupabaseClient } from './server';

export async function verifyAdminUser(): Promise<{
  authorized: boolean;
  userId?: string;
  email?: string;
  error?: string;
}> {
  const supabase = await createServerSupabaseClient();

  // If Supabase credentials are not yet configured in local environment:
  if (!supabase) {
    // In local dev/fallback mode without Supabase connection, return unauthorized for admin mutations
    return {
      authorized: false,
      error: 'Supabase credentials not configured in environment',
    };
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      authorized: false,
      error: 'Not authenticated',
    };
  }

  // Check admin_users allowlist
  const { data: adminRecord, error: adminError } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .single();

  if (adminError || !adminRecord) {
    return {
      authorized: false,
      error: 'User is not an authorized Tendercraft administrator',
    };
  }

  return {
    authorized: true,
    userId: user.id,
    email: user.email,
  };
}
