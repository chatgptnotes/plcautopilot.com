# Neuro360 Migration Instructions

---

## 🆕 LATEST: Patient UID Migration (CLINICCODE-YYYYMM-XXXX)

### ✅ Implementation Complete!

Patient UID format `CLINICCODE-YYYYMM-XXXX` is now implemented in your codebase.

**Example:** `HOPE-202502-0012`
- **HOPE** = Clinic code
- **202502** = Year (2025) + Month (02 = February)
- **0012** = Sequential patient number

### 🚀 Apply Patient UID Migration

#### Step 1: Add clinic_code Column to Organizations Table

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/omyltmcesgbhnqmhrrvq
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Paste and run this SQL:

```sql
-- Add clinic_code column to organizations table
ALTER TABLE organizations
ADD COLUMN IF NOT EXISTS clinic_code VARCHAR(50);

-- Add unique constraint to clinic_code
ALTER TABLE organizations
ADD CONSTRAINT organizations_clinic_code_key UNIQUE (clinic_code);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_organizations_clinic_code ON organizations(clinic_code);
```

5. Click **Run** to execute

#### Step 2: Generate Clinic Codes (Use HTML Tool)

1. Open `test-patient-uid.html` in your browser
2. Click **"1. Check Database"** to verify column was added
3. Click **"3. Generate Clinic Codes"** to auto-generate codes for all organizations
4. Click **"4. Test UID Generation"** to verify

**Or use browser console:**

```javascript
async function updateClinicCodes() {
  const { data: orgs } = await supabase.from('organizations').select('id, name, clinic_code');
  for (const org of orgs) {
    if (!org.clinic_code) {
      const code = org.name.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 8) || 'CLINIC';
      await supabase.from('organizations').update({ clinic_code: code }).eq('id', org.id);
      console.log(`✅ ${org.name} → ${code}`);
    }
  }
  console.log('✅ All clinic codes generated!');
}
updateClinicCodes();
```

### 📋 Files Modified
- ✅ `src/utils/patientUidGenerator.js` - UID generation logic
- ✅ `src/services/authService.js:650` - Patient registration
- ✅ `src/components/clinic/PatientManagement.jsx:217` - Clinic admin patient creation
- ✅ `supabase/migrations/018_add_clinic_code_to_organizations.sql` - Database migration

### 🧪 Test Patient UID
After migration, create a test patient and verify the UID format in `patients` table:
```sql
SELECT external_id, full_name FROM patients ORDER BY created_at DESC LIMIT 5;
```
Expected: `HOPE-202502-0001`, `HOPE-202502-0002`, etc.

---

## Previous Migrations

### Add Missing Columns to Clinics Table

#### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Paste the following SQL:

```sql
-- Add contact_person column to clinics table
ALTER TABLE clinics
ADD COLUMN IF NOT EXISTS contact_person VARCHAR(255);

-- Add password column to clinics table for authentication
ALTER TABLE clinics
ADD COLUMN IF NOT EXISTS password VARCHAR(255);

-- Add comments for documentation
COMMENT ON COLUMN clinics.contact_person IS 'Name of the primary contact person for the clinic';
COMMENT ON COLUMN clinics.password IS 'Hashed password for clinic login authentication';
```

5. Click **Run** to execute the query
6. Verify the columns were added by going to **Table Editor** > **clinics** table

## Option 2: Using Supabase CLI

If you have Supabase CLI installed:

```bash
supabase db push
```

This will apply all migrations in the `supabase/migrations` folder.

## Verification

After running the migration, the clinics table should have two new columns:
1. `contact_person` - stores the contact person's name for each clinic
2. `password` - stores the password for clinic login authentication

The form will now be able to:
- Display existing contact person, phone, and address data from the database
- Save new contact person, phone, address, and password information
- Update all clinic details including password
- Allow clinic login using email and password

## What This Fixes

1. **Contact Person Field**: The Clinic Information form in the Settings tab was trying to save `contact_person` data, but the column didn't exist in the database. This migration adds that column so the form can properly save and display contact person information.

2. **Password Storage**: Clinic passwords were not being saved in the database, preventing proper authentication. This migration adds the password column so clinics can login with their credentials.

3. **Phone & Address**: These fields already exist in the database but weren't being populated during registration. The code has been updated to save these fields properly.
