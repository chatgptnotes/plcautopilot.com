-- Migration: Add profile image columns to patients table
-- Date: 2025-11-25
-- Purpose: Allow patients to upload and store profile images

-- Add profile_image column to patients table
ALTER TABLE patients
ADD COLUMN IF NOT EXISTS profile_image TEXT;

-- Add avatar_url column to patients table (for compatibility)
ALTER TABLE patients
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Add address column if not exists (for complete patient profile)
ALTER TABLE patients
ADD COLUMN IF NOT EXISTS address TEXT;

-- Add emergency_contact column if not exists
ALTER TABLE patients
ADD COLUMN IF NOT EXISTS emergency_contact VARCHAR(255);

-- Add full_name column if not exists (to store full name separately)
ALTER TABLE patients
ADD COLUMN IF NOT EXISTS full_name VARCHAR(255);

-- Add external_id column if not exists (for patient UID like HOPE-202510-0001)
ALTER TABLE patients
ADD COLUMN IF NOT EXISTS external_id VARCHAR(50) UNIQUE;

-- Add org_id column if not exists (for organization reference)
ALTER TABLE patients
ADD COLUMN IF NOT EXISTS org_id UUID;

-- Add owner_user column if not exists (reference to user who created patient)
ALTER TABLE patients
ADD COLUMN IF NOT EXISTS owner_user UUID;

-- Add brain_fitness_score column if not exists
ALTER TABLE patients
ADD COLUMN IF NOT EXISTS brain_fitness_score INTEGER;

-- Add improvement_focus column if not exists (JSONB array)
ALTER TABLE patients
ADD COLUMN IF NOT EXISTS improvement_focus JSONB DEFAULT '[]';

-- Add clinic_name column for easy filtering
ALTER TABLE patients
ADD COLUMN IF NOT EXISTS clinic_name VARCHAR(255);

-- Create index on profile_image for faster lookups
CREATE INDEX IF NOT EXISTS idx_patients_profile_image ON patients(profile_image) WHERE profile_image IS NOT NULL;

-- Create index on external_id for faster patient UID lookups
CREATE INDEX IF NOT EXISTS idx_patients_external_id ON patients(external_id);

-- Create index on email for faster email-based searches
CREATE INDEX IF NOT EXISTS idx_patients_email ON patients(email);

-- Add comment to columns
COMMENT ON COLUMN patients.profile_image IS 'URL to patient profile image in Supabase Storage';
COMMENT ON COLUMN patients.avatar_url IS 'Alternative field for profile image URL (for compatibility)';
COMMENT ON COLUMN patients.external_id IS 'External patient UID like HOPE-202510-0001';
COMMENT ON COLUMN patients.full_name IS 'Patient full name';
COMMENT ON COLUMN patients.address IS 'Patient home address';
COMMENT ON COLUMN patients.emergency_contact IS 'Emergency contact information';
COMMENT ON COLUMN patients.brain_fitness_score IS 'Patient brain fitness score from assessments';
COMMENT ON COLUMN patients.improvement_focus IS 'JSONB array of improvement focus areas';

-- Verify the changes
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'patients'
ORDER BY ordinal_position;
