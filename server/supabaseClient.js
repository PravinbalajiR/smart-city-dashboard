const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

let supabaseUrl = process.env.SUPABASE_URL;
let supabaseKey = process.env.SUPABASE_ANON_KEY;

if(!supabaseUrl || !supabaseUrl.startsWith('http')) {
  console.warn("⚠️ Invalid or missing Supabase URL in server/.env. Using placeholder.");
  supabaseUrl = 'https://placeholder.supabase.co';
}

if(!supabaseKey || supabaseKey.includes('YOUR_')) {
  supabaseKey = 'placeholder_key';
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
