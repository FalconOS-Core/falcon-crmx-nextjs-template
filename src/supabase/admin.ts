import { createClient } from "@supabase/supabase-js";

/**
 * Supabase admin client using the service role key.
 * Used for privileged operations like generating email verification links.
 * NEVER expose this client or import it on the client side.
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } },
);
