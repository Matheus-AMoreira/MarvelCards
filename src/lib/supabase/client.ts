import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabasePass = process.env.NEXT_PUBLIC_SUPABASE_PASS!

export function createClient() {
  return createBrowserClient(
    supabaseUrl,
    supabasePass
  )
}
