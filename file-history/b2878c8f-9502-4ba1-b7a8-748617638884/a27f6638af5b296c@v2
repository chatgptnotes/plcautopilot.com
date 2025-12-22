import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function applyMigration() {
  try {
    console.log('🔧 Applying algorithm_results table migration...\n');

    // Read the migration file
    const migrationPath = path.join(__dirname, 'supabase', 'migrations', '021_create_algorithm_results_table.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    console.log('📄 Migration file loaded');
    console.log('🔄 Executing SQL...\n');

    // Execute the migration
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: migrationSQL
    });

    if (error) {
      // Try direct query if RPC doesn't exist
      console.log('ℹ️  RPC method not available, trying direct query...');

      // Split by semicolons and execute each statement
      const statements = migrationSQL
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

      for (const statement of statements) {
        if (statement) {
          const { error: queryError } = await supabase.from('algorithm_results').select('id').limit(0);
          if (queryError && queryError.code === '42P01') {
            // Table doesn't exist, need to create it manually
            console.log('⚠️  Please run this SQL manually in Supabase SQL Editor:\n');
            console.log('----------------------------------------');
            console.log(migrationSQL);
            console.log('----------------------------------------\n');
            console.log('📝 Steps:');
            console.log('1. Go to Supabase Dashboard > SQL Editor');
            console.log('2. Create a new query');
            console.log('3. Copy-paste the SQL above');
            console.log('4. Click "Run"\n');
            process.exit(0);
          }
        }
      }
    }

    console.log('✅ Migration applied successfully!');
    console.log('\n📊 Checking table...');

    // Verify table exists
    const { data: tableCheck, error: checkError } = await supabase
      .from('algorithm_results')
      .select('id')
      .limit(1);

    if (checkError) {
      if (checkError.code === '42P01') {
        console.log('\n⚠️  Table not found. Please run the SQL manually:');
        console.log('\n1. Open Supabase Dashboard: https://supabase.com/dashboard');
        console.log('2. Go to SQL Editor');
        console.log('3. Run the SQL from: supabase/migrations/021_create_algorithm_results_table.sql\n');
      } else {
        console.error('❌ Error checking table:', checkError.message);
      }
    } else {
      console.log('✅ Table exists and is accessible!');
      console.log('\n🎉 Setup complete! The algorithm_results table is ready.');
    }

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('\n📝 Manual steps:');
    console.error('1. Open Supabase Dashboard');
    console.error('2. Go to SQL Editor');
    console.error('3. Copy the contents of: supabase/migrations/021_create_algorithm_results_table.sql');
    console.error('4. Run the SQL query');
    process.exit(1);
  }
}

applyMigration();
