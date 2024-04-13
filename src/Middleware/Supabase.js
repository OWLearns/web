import { createClient } from "@supabase/supabase-js";

const anonKey = process.env.REACT_APP_ANONKEY;
const supabaseUrl = 'https://gkrzpruurzsarotxqmbc.supabase.co';

const supabase = createClient(supabaseUrl, anonKey);

export default supabase;