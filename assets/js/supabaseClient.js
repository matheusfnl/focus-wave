import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'need-supabase-url'
const SUPABASE_KEY = 'need-supabase-key'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
