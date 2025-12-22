-- ================================================
-- Patient UID Migration - Add clinic_code Column
-- ================================================
-- Run this SQL in Supabase SQL Editor FIRST
-- Then your app will work properly
-- ================================================

-- Step 1: Add clinic_code column to organizations table
ALTER TABLE organizations
ADD COLUMN IF NOT EXISTS clinic_code VARCHAR(50);

-- Step 2: Add unique constraint to clinic_code
-- (This will fail if constraint already exists - that's OK)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'organizations_clinic_code_key'
  ) THEN
    ALTER TABLE organizations
    ADD CONSTRAINT organizations_clinic_code_key UNIQUE (clinic_code);
  END IF;
END $$;

-- Step 3: Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_organizations_clinic_code
ON organizations(clinic_code);

-- Step 4: Check if column was added successfully
SELECT
  column_name,
  data_type,
  character_maximum_length,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'organizations'
AND column_name = 'clinic_code';

-- Step 5: View current organizations
SELECT
  id,
  name,
  clinic_code,
  created_at
FROM organizations
ORDER BY created_at DESC;

-- ================================================
-- After running this SQL, use the HTML tool or
-- browser console to generate clinic codes
-- ================================================
