-- ================================================
-- Generate Clinic Codes for Organizations
-- ================================================
-- This SQL will auto-generate clinic codes from organization names
-- Run this in Supabase SQL Editor
-- ================================================

-- Function to generate unique clinic code
CREATE OR REPLACE FUNCTION generate_unique_clinic_code(org_name TEXT, org_id UUID)
RETURNS TEXT AS $$
DECLARE
  base_code TEXT;
  final_code TEXT;
  counter INTEGER := 1;
BEGIN
  -- Generate base code from organization name
  base_code := UPPER(REGEXP_REPLACE(org_name, '[^A-Z0-9]', '', 'g'));
  base_code := SUBSTRING(base_code, 1, 8);

  -- If base_code is empty, use 'CLINIC'
  IF base_code = '' OR base_code IS NULL THEN
    base_code := 'CLINIC';
  END IF;

  final_code := base_code;

  -- Ensure uniqueness by appending numbers if needed
  WHILE EXISTS (
    SELECT 1 FROM organizations
    WHERE clinic_code = final_code
    AND id != org_id
  ) LOOP
    final_code := base_code || LPAD(counter::TEXT, 2, '0');
    counter := counter + 1;
  END LOOP;

  RETURN final_code;
END;
$$ LANGUAGE plpgsql;

-- Update all organizations without clinic_code
UPDATE organizations
SET clinic_code = generate_unique_clinic_code(name, id)
WHERE clinic_code IS NULL;

-- Display results
SELECT
  name,
  clinic_code,
  created_at
FROM organizations
ORDER BY created_at DESC;

-- Summary
SELECT
  COUNT(*) as total_organizations,
  COUNT(clinic_code) as organizations_with_code,
  COUNT(*) - COUNT(clinic_code) as organizations_without_code
FROM organizations;
