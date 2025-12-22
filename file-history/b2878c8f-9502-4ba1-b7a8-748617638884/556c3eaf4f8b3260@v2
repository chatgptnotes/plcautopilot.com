-- TEMPORARY FIX: Disable RLS on algorithm_results table for testing
-- This allows INSERT operations without authentication
-- Run this in Supabase SQL Editor to fix the save issue

-- 1. First, verify the table exists
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'algorithm_results';

-- 2. Disable Row Level Security temporarily
ALTER TABLE public.algorithm_results DISABLE ROW LEVEL SECURITY;

-- 3. Verify RLS is disabled (rowsecurity should be 'false')
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'algorithm_results';

-- After testing is successful, you can re-enable RLS with proper authentication:
-- ALTER TABLE public.algorithm_results ENABLE ROW LEVEL SECURITY;
