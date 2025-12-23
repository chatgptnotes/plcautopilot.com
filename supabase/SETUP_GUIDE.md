# PLCAutoPilot Supabase Setup Guide

Complete step-by-step guide to set up your Supabase database from scratch.

## Overview

Your Supabase project is already created:
- **Project ID**: suhrhquytzlfgwxwdvls
- **URL**: https://suhrhquytzlfgwxwdvls.supabase.co
- **Dashboard**: https://app.supabase.com/project/suhrhquytzlfgwxwdvls

## Step-by-Step Setup

### Step 1: Access Supabase Dashboard

1. Open: https://app.supabase.com/project/suhrhquytzlfgwxwdvls
2. Sign in with: drmfirebase81@gmail.com

### Step 2: Run Database Schema

**Option A: Full Schema (Recommended)**

1. Click **SQL Editor** in left sidebar
2. Click **New Query**
3. Open file: `supabase/schema.sql`
4. Copy all contents (377 lines)
5. Paste into SQL editor
6. Click **Run** (or press Cmd+Enter)
7. Wait for "Success" message

**Expected Result:**
```
✅ 14 tables created
✅ 20+ indexes created
✅ RLS policies enabled
✅ Triggers configured
✅ Sample data inserted
```

**Option B: Quick Start (Minimal)**

1. SQL Editor > New Query
2. Open file: `supabase/quickstart.sql`
3. Copy and paste
4. Click **Run**

**Expected Result:**
```
✅ 3 essential tables created
✅ Basic RLS policies enabled
✅ Auto-profile creation trigger
```

### Step 3: Create Storage Buckets

1. Click **Storage** in left sidebar
2. Click **Create new bucket**

**Create these 5 buckets:**

#### Bucket 1: plc-programs
```
Name: plc-programs
Public: ❌ No (Private)
File size limit: 10 MB
Allowed MIME types:
  - application/xml
  - text/plain
  - application/zip
  - text/x-structured-text
```

#### Bucket 2: user-uploads
```
Name: user-uploads
Public: ❌ No (Private)
File size limit: 50 MB
Allowed MIME types:
  - application/pdf
  - image/png
  - image/jpeg
  - application/zip
  - application/msword
```

#### Bucket 3: error-screenshots
```
Name: error-screenshots
Public: ❌ No (Private)
File size limit: 5 MB
Allowed MIME types:
  - image/png
  - image/jpeg
  - image/jpg
```

#### Bucket 4: avatars
```
Name: avatars
Public: ✅ Yes (Public)
File size limit: 2 MB
Allowed MIME types:
  - image/png
  - image/jpeg
  - image/jpg
```

#### Bucket 5: template-thumbnails
```
Name: template-thumbnails
Public: ✅ Yes (Public)
File size limit: 2 MB
Allowed MIME types:
  - image/png
  - image/jpeg
  - image/svg+xml
```

### Step 4: Apply Storage Policies

1. SQL Editor > New Query
2. Open file: `supabase/storage-policies.sql`
3. Copy all contents
4. Paste into SQL editor
5. Click **Run**

**Expected Result:**
```
✅ Storage policies created
✅ User-level access control enabled
✅ Public bucket policies configured
```

### Step 5: Configure Authentication

#### Enable Email Authentication

1. Click **Authentication** in left sidebar
2. Click **Providers**
3. Find **Email** provider
4. Toggle **Enable Email Provider** to ON
5. Configure:
   ```
   ✅ Enable Email Confirmations
   ✅ Enable Email Change Confirmations
   ✅ Secure Email Change
   ```

#### Configure Site URLs

1. Authentication > **URL Configuration**
2. Add Site URL:
   ```
   Development: http://localhost:3000
   Production: https://plcautopilot.com
   ```
3. Add Redirect URLs:
   ```
   http://localhost:3000/auth/callback
   https://plcautopilot.com/auth/callback
   ```

#### Optional: Enable OAuth Providers

**Google OAuth:**
1. Authentication > Providers > Google
2. Enable Google provider
3. Add credentials:
   - Client ID: (from Google Cloud Console)
   - Client Secret: (from Google Cloud Console)

**GitHub OAuth:**
1. Authentication > Providers > GitHub
2. Enable GitHub provider
3. Add credentials:
   - Client ID: (from GitHub OAuth Apps)
   - Client Secret: (from GitHub OAuth Apps)

### Step 6: Customize Email Templates

1. Authentication > **Email Templates**

**Confirmation Email:**
```html
<h2>Confirm your signup</h2>
<p>Welcome to PLCAutoPilot!</p>
<p>Click the link below to confirm your email:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your email</a></p>
```

**Reset Password:**
```html
<h2>Reset your password</h2>
<p>Click the link below to reset your password:</p>
<p><a href="{{ .ConfirmationURL }}">Reset password</a></p>
```

**Magic Link:**
```html
<h2>Your magic link</h2>
<p>Click the link below to sign in:</p>
<p><a href="{{ .ConfirmationURL }}">Sign in to PLCAutoPilot</a></p>
```

### Step 7: Verify Setup

#### Check Tables

Run this query in SQL Editor:
```sql
SELECT table_name, table_type
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

**Expected Output:**
- api_keys
- billing_transactions
- chat_messages
- chat_sessions
- error_rectifications
- file_operations
- generated_programs
- learning_data
- organizations
- plc_recommendations
- projects
- subscription_history
- usage_analytics
- users

#### Check RLS Policies

```sql
SELECT tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename;
```

**Expected Output:**
Multiple policies for each table ensuring data security.

#### Check Storage Buckets

```sql
SELECT name, public
FROM storage.buckets
ORDER BY name;
```

**Expected Output:**
- avatars (public: true)
- error-screenshots (public: false)
- plc-programs (public: false)
- template-thumbnails (public: true)
- user-uploads (public: false)

### Step 8: Test Authentication Flow

#### Create Test User

1. Authentication > **Users**
2. Click **Invite User**
3. Enter email: test@plcautopilot.com
4. Click **Invite User**

#### Verify Profile Created

```sql
SELECT id, email, full_name, subscription_tier
FROM public.profiles
WHERE email = 'test@plcautopilot.com';
```

**Expected:** Profile automatically created via trigger.

### Step 9: Insert Sample Data

#### Add Sample Organization

```sql
INSERT INTO organizations (name, slug, subscription_tier, max_users, max_projects)
VALUES ('Demo Company', 'demo-company', 'professional', 10, 100)
RETURNING *;
```

#### Add Sample User

```sql
-- First, get auth user ID from step 8
-- Then insert into users table

INSERT INTO users (
  email,
  full_name,
  role,
  organization_id,
  auth_id
)
VALUES (
  'test@plcautopilot.com',
  'Test User',
  'admin',
  '<organization_id_from_above>',
  '<auth_id_from_auth.users>'
)
RETURNING *;
```

#### Add Sample Project

```sql
INSERT INTO projects (
  name,
  description,
  user_id,
  organization_id,
  plc_manufacturer,
  plc_model,
  programming_language,
  status
)
VALUES (
  'Motor Control System',
  'Basic motor start/stop control',
  '<user_id>',
  '<organization_id>',
  'Schneider Electric',
  'M221',
  'Ladder Logic',
  'draft'
)
RETURNING *;
```

### Step 10: Test API Integration

#### Test from Next.js

Create test file: `test-supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Test connection
async function testConnection() {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .limit(1)

  if (error) {
    console.error('❌ Connection failed:', error)
  } else {
    console.log('✅ Connection successful:', data)
  }
}

testConnection()
```

Run test:
```bash
npx ts-node test-supabase.ts
```

### Step 11: Enable Database Extensions (Optional)

For advanced features:

```sql
-- Full text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- PostGIS for location data
CREATE EXTENSION IF NOT EXISTS postgis;

-- Cryptographic functions
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

### Step 12: Configure Database Backup

1. Click **Database** in left sidebar
2. Click **Backups**
3. Configure:
   ```
   ✅ Enable automatic daily backups
   Retention: 7 days (free tier)
   ```

### Step 13: Set Up Database Webhooks (Optional)

For real-time updates:

1. Database > **Webhooks**
2. Click **Create webhook**
3. Configure:
   ```
   Name: new_program_webhook
   Table: generated_programs
   Events: INSERT
   Webhook URL: https://your-app.com/api/webhooks/new-program
   ```

## Verification Checklist

Use this checklist to verify everything is set up correctly:

- [ ] All 14 tables created successfully
- [ ] All 5 storage buckets created
- [ ] Storage policies applied to all buckets
- [ ] Email authentication enabled
- [ ] Site URLs configured
- [ ] Email templates customized
- [ ] RLS policies verified
- [ ] Test user created
- [ ] Profile auto-created on signup
- [ ] Sample data inserted successfully
- [ ] API connection test passed
- [ ] Backups enabled

## Common Issues and Solutions

### Issue 1: RLS Policy Errors

**Error:** `row-level security policy for table "profiles" = permission denied`

**Solution:**
```sql
-- Check if RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'profiles';

-- If not enabled, run:
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
```

### Issue 2: Profile Not Auto-Created

**Error:** Profile doesn't exist after user signup

**Solution:**
```sql
-- Check trigger exists
SELECT trigger_name
FROM information_schema.triggers
WHERE event_object_table = 'users'
AND trigger_name = 'on_auth_user_created';

-- If missing, recreate from schema.sql
```

### Issue 3: Storage Upload Fails

**Error:** `new row violates row-level security policy`

**Solution:**
1. Verify bucket exists
2. Check storage policies are applied
3. Ensure user is authenticated
4. Check file path format: `{userId}/filename.ext`

### Issue 4: Foreign Key Violation

**Error:** `insert or update on table violates foreign key constraint`

**Solution:**
- Ensure referenced records exist first
- Check correct UUID format
- Verify user is authenticated

## Performance Optimization

### Recommended Indexes

Already created in schema.sql, but verify:

```sql
-- Check all indexes
SELECT tablename, indexname
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```

### Database Connection Pooling

Configure in Supabase Dashboard:
1. Settings > **Database**
2. Connection pooling: Mode = **Transaction**
3. Pool size: 15 (default)

### Query Performance

Monitor slow queries:

```sql
-- Enable pg_stat_statements
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- View slow queries
SELECT query, calls, mean_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

## Security Best Practices

1. **Never expose service role key in client code**
2. **Always use RLS policies for data access**
3. **Validate all user inputs**
4. **Use parameterized queries**
5. **Enable email confirmation for signups**
6. **Regularly rotate API keys**
7. **Monitor authentication logs**
8. **Set up database backups**

## Next Steps

After setup is complete:

1. ✅ Test user signup flow
2. ✅ Generate first PLC program
3. ✅ Test chat functionality
4. ✅ Upload test files to storage
5. ✅ Configure Stripe for payments
6. ✅ Set up production environment
7. ✅ Deploy to Vercel

## Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **SQL Reference**: https://www.postgresql.org/docs/
- **Project Dashboard**: https://app.supabase.com/project/suhrhquytzlfgwxwdvls
- **API Documentation**: https://supabase.com/docs/reference/javascript/introduction

---

**Setup Complete!** 🎉

Your PLCAutoPilot database is now ready for development.

Test your application at: http://localhost:3000
