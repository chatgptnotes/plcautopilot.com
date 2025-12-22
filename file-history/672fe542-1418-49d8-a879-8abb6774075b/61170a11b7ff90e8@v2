-- ================================================
-- Update Clinic Codes to Match Clinic Names
-- ================================================
-- This will set clinic_code as simplified clinic name
-- Example: "Hope Clinic" → "HOPE"
--          "Usha Hospital" → "USHA"
-- ================================================

-- Simple function to generate clinic code from name
CREATE OR REPLACE FUNCTION simple_clinic_code(org_name TEXT, org_id UUID)
RETURNS TEXT AS $$
DECLARE
  clean_name TEXT;
  base_code TEXT;
  final_code TEXT;
  counter INTEGER := 1;
BEGIN
  -- Remove common suffixes and clean the name
  clean_name := org_name;
  clean_name := REGEXP_REPLACE(clean_name, '\s+(Clinic|Hospital|Medical|Center|Centre|Healthcare).*$', '', 'i');

  -- Take first word and make uppercase
  clean_name := TRIM(clean_name);
  base_code := SPLIT_PART(clean_name, ' ', 1);
  base_code := UPPER(base_code);

  -- If empty, use full name without spaces
  IF base_code = '' OR base_code IS NULL THEN
    base_code := UPPER(REGEXP_REPLACE(org_name, '[^A-Za-z0-9]', '', 'g'));
    base_code := SUBSTRING(base_code, 1, 10);
  END IF;

  -- If still empty, use CLINIC
  IF base_code = '' OR base_code IS NULL THEN
    base_code := 'CLINIC';
  END IF;

  final_code := base_code;

  -- Ensure uniqueness
  WHILE EXISTS (
    SELECT 1 FROM organizations
    WHERE clinic_code = final_code AND id != org_id
  ) LOOP
    final_code := base_code || counter;
    counter := counter + 1;
  END LOOP;

  RETURN final_code;
END;
$$ LANGUAGE plpgsql;

-- Update all organizations with new clinic codes
UPDATE organizations
SET clinic_code = simple_clinic_code(name, id);

-- Display results
SELECT
  name,
  clinic_code,
  created_at
FROM organizations
ORDER BY name;

-- ================================================
-- Expected Results:
-- "Hope Clinic" → HOPE
-- "Usha Hospital" → USHA
-- "Dev Clinics" → DEV
-- "Neuro360 System Administration" → NEURO360
-- ================================================
