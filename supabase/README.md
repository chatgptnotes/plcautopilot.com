# PLCAutoPilot Supabase Database Setup

Complete guide to setting up the PLCAutoPilot database on Supabase.

## Quick Setup

### 1. Database Schema Setup

**Method A: Using Supabase Dashboard (Recommended)**

1. Go to your Supabase project: https://app.supabase.com/project/suhrhquytzlfgwxwdvls
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `schema.sql`
5. Paste into the SQL editor
6. Click **Run** to execute

**Method B: Using Supabase CLI**

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref suhrhquytzlfgwxwdvls

# Apply migrations
supabase db push
```

### 2. Storage Buckets Setup

Create the following storage buckets in Supabase Dashboard:

**Navigate to: Storage > Create new bucket**

| Bucket Name | Public | File Size Limit | Allowed MIME Types |
|------------|--------|-----------------|-------------------|
| `plc-programs` | Private | 10 MB | .xml, .st, .ld, .txt, .zip |
| `user-uploads` | Private | 50 MB | .pdf, .docx, .png, .jpg, .zip |
| `error-screenshots` | Private | 5 MB | .png, .jpg, .jpeg |
| `template-thumbnails` | Public | 2 MB | .png, .jpg, .jpeg, .svg |
| `avatars` | Public | 2 MB | .png, .jpg, .jpeg |

### 3. Storage Policies

After creating buckets, add these policies:

**For `plc-programs` bucket:**
```sql
-- Allow users to read their own files
CREATE POLICY "Users can read own program files"
ON storage.objects FOR SELECT
USING (bucket_id = 'plc-programs' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to upload their own files
CREATE POLICY "Users can upload own program files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'plc-programs' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to delete their own files
CREATE POLICY "Users can delete own program files"
ON storage.objects FOR DELETE
USING (bucket_id = 'plc-programs' AND auth.uid()::text = (storage.foldername(name))[1]);
```

**For `user-uploads` bucket:**
```sql
-- Allow users to read their own uploads
CREATE POLICY "Users can read own uploads"
ON storage.objects FOR SELECT
USING (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to upload files
CREATE POLICY "Users can upload files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);
```

**For `avatars` bucket (Public):**
```sql
-- Allow anyone to read avatars
CREATE POLICY "Public avatars are viewable by everyone"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Allow users to upload their own avatar
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to update their own avatar
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### 4. Authentication Setup

**Enable Auth Providers:**

1. Go to **Authentication > Providers**
2. Enable the following:
   - Email (with email confirmation)
   - Google OAuth (optional)
   - GitHub OAuth (optional)

**Email Templates:**

Customize email templates in **Authentication > Email Templates**:
- Confirmation email
- Password reset
- Magic link

**Configure Site URL:**

Go to **Authentication > URL Configuration**:
- Site URL: `http://localhost:3000` (development)
- Redirect URLs: Add `http://localhost:3000/auth/callback`

For production:
- Site URL: `https://plcautopilot.com`
- Redirect URLs: `https://plcautopilot.com/auth/callback`

### 5. Environment Variables

Your `.env` file is already configured with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://suhrhquytzlfgwxwdvls.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Database Schema Overview

### Core Tables

| Table | Purpose | Key Features |
|-------|---------|--------------|
| `organizations` | Company accounts | Multi-tenant support, subscription tiers |
| `users` | User accounts | Role hierarchy (superadmin, admin, user) |
| `projects` | PLC automation projects | Links to organizations and users |
| `generated_programs` | AI-generated PLC code | Versioning, multiple formats |
| `error_rectifications` | Error correction tracking | Vision AI integration |
| `learning_data` | ML training data | User corrections and feedback |
| `chat_sessions` | Engineer chat support | Real-time messaging |
| `usage_analytics` | Usage tracking | Billing and analytics |
| `api_keys` | API access tokens | Programmatic access |

### Role Hierarchy

1. **SuperAdmin**
   - Platform-wide access
   - Manage all organizations
   - System configuration
   - Access all data

2. **Admin**
   - Organization-wide access
   - Manage organization users
   - View all projects in organization
   - Billing management

3. **User**
   - Project-level access
   - Create and manage own projects
   - Generate PLC programs
   - Chat with engineers

### Row Level Security (RLS)

All tables have RLS enabled with policies that:
- Users can only see data from their organization
- Users can only modify their own resources
- SuperAdmins have full access
- Admins have organization-wide access

## Testing the Setup

### 1. Verify Tables Created

Run this query in SQL Editor:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

Expected tables:
- organizations
- users
- projects
- generated_programs
- file_operations
- error_rectifications
- learning_data
- plc_recommendations
- chat_sessions
- chat_messages
- usage_analytics
- subscription_history
- billing_transactions
- api_keys

### 2. Test Authentication

Create a test user:

```sql
-- This will automatically create a profile via trigger
-- Use Supabase Dashboard > Authentication > Users > Invite User
-- Or use the signup API endpoint
```

### 3. Verify RLS Policies

```sql
-- Check all policies are enabled
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- List all policies
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE schemaname = 'public';
```

### 4. Test Data Insertion

```sql
-- Create test organization
INSERT INTO organizations (name, slug, subscription_tier)
VALUES ('Test Company', 'test-company', 'free')
RETURNING *;

-- Create test user (after auth user exists)
INSERT INTO users (email, full_name, role, organization_id, auth_id)
VALUES (
  'test@example.com',
  'Test User',
  'user',
  '<organization_id>',
  '<auth_id_from_auth.users>'
)
RETURNING *;
```

## Database Functions

### Available Functions

1. **update_updated_at_column()**
   - Automatically updates `updated_at` timestamp
   - Triggered on UPDATE for organizations, users, projects

2. **Custom Functions** (Add as needed)

Example custom function:

```sql
-- Function to get user's project count
CREATE OR REPLACE FUNCTION get_user_project_count(user_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (SELECT COUNT(*) FROM projects WHERE user_id = user_uuid);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Database Views

### Available Views

1. **monthly_usage_by_org**
   - Aggregated usage analytics by organization
   - Monthly granularity

2. **user_activity_summary**
   - User statistics (projects, programs, errors)
   - Last activity tracking

### Query Examples

```sql
-- Get monthly usage for an organization
SELECT * FROM monthly_usage_by_org
WHERE organization_id = '<org_id>'
ORDER BY month DESC;

-- Get user activity
SELECT * FROM user_activity_summary
WHERE organization_id = '<org_id>';
```

## Maintenance

### Backup

Supabase automatically backs up your database daily. To create manual backup:

1. Go to **Database > Backups**
2. Click **Create backup**

### Monitoring

1. **Database > Logs** - View query logs
2. **Database > Roles** - Manage database users
3. **Database > Extensions** - Enable PostgreSQL extensions

### Performance

Monitor performance:

```sql
-- Check table sizes
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check slow queries
SELECT * FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;
```

## Troubleshooting

### Common Issues

1. **RLS Policy Errors**
   - Verify user is authenticated
   - Check policy conditions match your query
   - Use service role key for admin operations

2. **Foreign Key Violations**
   - Ensure referenced records exist
   - Check cascade delete settings

3. **Storage Upload Fails**
   - Verify bucket exists
   - Check storage policies
   - Validate file size limits

### Useful Queries

```sql
-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- List all indexes
SELECT indexname, tablename
FROM pg_indexes
WHERE schemaname = 'public';

-- Check trigger status
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public';
```

## Next Steps

1. ✅ Run `schema.sql` in Supabase SQL Editor
2. ✅ Create storage buckets
3. ✅ Configure storage policies
4. ✅ Enable authentication providers
5. ✅ Test user signup/login
6. ✅ Insert sample data
7. ✅ Verify RLS policies work
8. ✅ Test API integration in Next.js app

## Resources

- Supabase Dashboard: https://app.supabase.com/project/suhrhquytzlfgwxwdvls
- Supabase Docs: https://supabase.com/docs
- PostgreSQL Docs: https://www.postgresql.org/docs/
- PLCAutoPilot API Docs: `/docs/api`

---

**Project**: PLCAutoPilot
**Database**: suhrhquytzlfgwxwdvls
**Region**: Supabase Default
**PostgreSQL Version**: 15.x
