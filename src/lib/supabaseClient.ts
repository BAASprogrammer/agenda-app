import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan variables de entorno de Supabase. Revisa NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseKey);