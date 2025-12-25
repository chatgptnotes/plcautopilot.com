-- Check all clinic names in organizations table
SELECT
  id,
  name,
  clinic_code,
  type,
  created_at
FROM organizations
WHERE type = 'clinic'
ORDER BY name;

-- Check all names in legacy clinics table
SELECT
  id,
  name,
  email,
  is_active,
  created_at
FROM clinics
ORDER BY name;

-- Search for similar names (case-insensitive)
SELECT
  'organizations' as source_table,
  name,
  clinic_code
FROM organizations
WHERE LOWER(name) LIKE '%hope%'
   OR LOWER(name) LIKE '%usha%'
   OR LOWER(name) LIKE '%neuro%'
UNION ALL
SELECT
  'clinics' as source_table,
  name,
  NULL as clinic_code
FROM clinics
WHERE LOWER(name) LIKE '%hope%'
   OR LOWER(name) LIKE '%usha%'
   OR LOWER(name) LIKE '%neuro%';
