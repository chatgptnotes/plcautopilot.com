# Add Missing Columns to Clinics Table

## Option 1: Using Supabase Dashboard (Recommended)

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
