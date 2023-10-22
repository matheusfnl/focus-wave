import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://bndvswdzxhfrfgreyfir.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuZHZzd2R6eGhmcmZncmV5ZmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwMDk3NjMsImV4cCI6MjAxMzU4NTc2M30.7iO6GdfeXmUTJsi934xqiNpr-BKbDX-PIILRCtRSDI4'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
