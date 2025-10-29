import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://utoyrpxdpkfvlytulfoz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0b3lycHhkcGtmdmx5dHVsZm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NTc2NDMsImV4cCI6MjA3NzMzMzY0M30.OBAOhMA6eTGlo9525IMSDSzuapKHKsN5imWPMKQvo-Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
