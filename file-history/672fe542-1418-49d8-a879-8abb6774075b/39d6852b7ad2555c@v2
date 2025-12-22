-- ================================================
-- Generate Patient UIDs for Existing Patients
-- ================================================
-- This SQL will generate UIDs for all existing patients
-- Format: CLINICCODE-YYYYMM-XXXX
-- ================================================

-- Function to generate patient UID
CREATE OR REPLACE FUNCTION generate_patient_uid(
  p_org_id UUID,
  p_created_at TIMESTAMPTZ
) RETURNS TEXT AS $$
DECLARE
  clinic_code TEXT;
  year_month TEXT;
  seq_num INTEGER;
  uid TEXT;
BEGIN
  -- Get clinic code
  SELECT o.clinic_code INTO clinic_code
  FROM organizations o
  WHERE o.id = p_org_id;

  -- If no clinic code, use CLINIC
  IF clinic_code IS NULL THEN
    clinic_code := 'CLINIC';
  END IF;

  -- Get year and month from created_at
  year_month := TO_CHAR(p_created_at, 'YYYYMM');

  -- Get next sequential number for this clinic and month
  SELECT COUNT(*) + 1 INTO seq_num
  FROM patients
  WHERE org_id = p_org_id
    AND external_id LIKE clinic_code || '-' || year_month || '-%'
    AND external_id IS NOT NULL;

  -- Format UID
  uid := clinic_code || '-' || year_month || '-' || LPAD(seq_num::TEXT, 4, '0');

  RETURN uid;
END;
$$ LANGUAGE plpgsql;

-- Generate UIDs for all patients without external_id
UPDATE patients
SET external_id = generate_patient_uid(org_id, created_at)
WHERE external_id IS NULL;

-- Show updated patients
SELECT
  p.full_name,
  p.external_id as patient_uid,
  o.name as clinic_name,
  o.clinic_code,
  p.created_at
FROM patients p
LEFT JOIN organizations o ON p.org_id = o.id
ORDER BY p.created_at DESC;

-- Summary
SELECT
  COUNT(*) as total_patients,
  COUNT(external_id) as patients_with_uid,
  COUNT(*) - COUNT(external_id) as patients_without_uid
FROM patients;

-- ================================================
-- Expected Output:
-- All patients should now have external_id in format:
-- HOPE-202511-0001
-- USHA-202510-0001
-- etc.
-- ================================================
