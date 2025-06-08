import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dzrvoxvwejrhjlgzfojl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6cnZveHZ3ZWpyaGpsZ3pmb2psIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNjIxMTAsImV4cCI6MjA2NDkzODExMH0.IoMdIVa1NrNJZq5dNNhnC_Onnajo3mu2QCGDfOdZqzI';

export const supabase = createClient(supabaseUrl, supabaseKey); 