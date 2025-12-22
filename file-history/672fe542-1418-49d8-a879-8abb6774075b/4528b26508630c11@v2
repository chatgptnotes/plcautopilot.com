-- Add clinic_code column to organizations table for patient UID generation
-- Migration: 018_add_clinic_code_to_organizations.sql

-- Add clinic_code column to organizations table
ALTER TABLE organizations
ADD COLUMN IF NOT EXISTS clinic_code VARCHAR(50);

-- Add unique constraint to clinic_code
ALTER TABLE organizations
ADD CONSTRAINT organizations_clinic_code_key UNIQUE (clinic_code);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_organizations_clinic_code ON organizations(clinic_code);

-- Function to generate clinic code from organization name
CREATE OR REPLACE FUNCTION generate_clinic_code(org_name TEXT)
RETURNS TEXT AS $$
DECLARE
  base_code TEXT;
  final_code TEXT;
  counter INTEGER := 1;
BEGIN
  -- Generate base code from organization name
  -- Remove spaces, special characters, and take first 8 characters
  base_code := UPPER(REGEXP_REPLACE(org_name, '[^A-Z0-9]', '', 'g'));
  base_code := SUBSTRING(base_code, 1, 8);

  -- If base_code is empty, use 'CLINIC'
  IF base_code = '' THEN
    base_code := 'CLINIC';
  END IF;

  final_code := base_code;

  -- Ensure uniqueness by appending numbers if needed
  WHILE EXISTS (SELECT 1 FROM organizations WHERE clinic_code = final_code) LOOP
    final_code := base_code || LPAD(counter::TEXT, 2, '0');
    counter := counter + 1;
  END LOOP;

  RETURN final_code;
END;
$$ LANGUAGE plpgsql;

-- Populate existing organizations with clinic codes
DO $$
DECLARE
  org RECORD;
  new_code TEXT;
BEGIN
  FOR org IN SELECT id, name FROM organizations WHERE clinic_code IS NULL
  LOOP
    new_code := generate_clinic_code(org.name);
    UPDATE organizations
    SET clinic_code = new_code
    WHERE id = org.id;
  END LOOP;
END $$;

-- Create trigger to automatically generate clinic_code for new organizations
CREATE OR REPLACE FUNCTION set_clinic_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.clinic_code IS NULL THEN
    NEW.clinic_code := generate_clinic_code(NEW.name);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_clinic_code
  BEFORE INSERT ON organizations
  FOR EACH ROW
  WHEN (NEW.clinic_code IS NULL)
  EXECUTE FUNCTION set_clinic_code();

-- Add comment for documentation
COMMENT ON COLUMN organizations.clinic_code IS 'Unique clinic code used in patient UID generation (format: CLINICCODE-YYYYMM-XXXX)';
