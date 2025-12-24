# Create Storage Buckets in Supabase

## ✅ Database Status: WORKING!

Your database tables are successfully created and RLS is enabled.

**Test Results:**
- ✅ Database Connection: Working
- ✅ Profiles Table: Created (0 profiles)
- ✅ PLC Programs Table: Created (0 programs)
- ✅ Chat History Table: Created (0 messages)
- ✅ Row Level Security: Enabled and working
- ⚠️  Storage Buckets: Need to be created
- ✅ Authentication System: Working

## 📦 Next Step: Create Storage Buckets

You need to create 5 storage buckets in Supabase Dashboard.

### Quick Instructions

1. **Go to Supabase Dashboard**
   ```
   https://app.supabase.com/project/suhrhquytzlfgwxwdvls/storage/buckets
   ```

2. **Click "Create new bucket"** (or "New bucket" button)

3. **Create each bucket below** (one at a time):

---

### Bucket 1: plc-programs

**Click "Create new bucket" and enter:**

```
Name: plc-programs
Public bucket: ❌ OFF (Keep Private)
File size limit: 10485760 (10 MB)
Allowed MIME types: (leave empty for now, or add):
  - application/xml
  - text/plain
  - application/zip
```

**Click "Create bucket"**

---

### Bucket 2: user-uploads

**Click "Create new bucket" and enter:**

```
Name: user-uploads
Public bucket: ❌ OFF (Keep Private)
File size limit: 52428800 (50 MB)
Allowed MIME types: (leave empty or add):
  - application/pdf
  - image/png
  - image/jpeg
  - application/zip
```

**Click "Create bucket"**

---

### Bucket 3: error-screenshots

**Click "Create new bucket" and enter:**

```
Name: error-screenshots
Public bucket: ❌ OFF (Keep Private)
File size limit: 5242880 (5 MB)
Allowed MIME types:
  - image/png
  - image/jpeg
  - image/jpg
```

**Click "Create bucket"**

---

### Bucket 4: avatars

**Click "Create new bucket" and enter:**

```
Name: avatars
Public bucket: ✅ ON (Make Public)
File size limit: 2097152 (2 MB)
Allowed MIME types:
  - image/png
  - image/jpeg
  - image/jpg
```

**Click "Create bucket"**

---

### Bucket 5: template-thumbnails

**Click "Create new bucket" and enter:**

```
Name: template-thumbnails
Public bucket: ✅ ON (Make Public)
File size limit: 2097152 (2 MB)
Allowed MIME types:
  - image/png
  - image/jpeg
  - image/svg+xml
```

**Click "Create bucket"**

---

## After Creating Buckets

### Step 1: Apply Storage Policies

1. Go to SQL Editor: https://app.supabase.com/project/suhrhquytzlfgwxwdvls/sql
2. Click "New Query"
3. Copy the contents of `storage-policies-simple.sql` (compatible with quickstart.sql)
4. Paste and click "Run"

**Note**: Use `storage-policies-simple.sql` if you ran quickstart.sql
Use `storage-policies.sql` if you ran the full schema.sql

### Step 2: Verify Setup

Run the test again:

```bash
npx ts-node test-supabase-connection.ts
```

**Expected Result:**
```
Total Tests: 7
✅ Passed: 7
❌ Failed: 0

🎉 All tests passed! Your Supabase setup is working correctly.
```

## Alternative: Create Buckets via SQL (Advanced)

If you prefer, you can create buckets using SQL:

```sql
-- Note: Run this in Supabase SQL Editor
-- You may need to use Supabase Dashboard for some settings

-- Insert buckets
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('plc-programs', 'plc-programs', false),
  ('user-uploads', 'user-uploads', false),
  ('error-screenshots', 'error-screenshots', false),
  ('avatars', 'avatars', true),
  ('template-thumbnails', 'template-thumbnails', true)
ON CONFLICT (id) DO NOTHING;
```

Then apply the storage policies from `storage-policies.sql`.

## Quick Visual Guide

```
Dashboard → Storage → Create new bucket

For each bucket:
┌─────────────────────────────────────┐
│ Create a new storage bucket         │
├─────────────────────────────────────┤
│ Name: [bucket-name]                 │
│ Public: [✓/✗]                       │
│ File size limit: [size in bytes]    │
│ Allowed MIME types: [optional]      │
└─────────────────────────────────────┘
         Click "Create bucket"
```

## Troubleshooting

### Can't find "Create new bucket" button?

1. Make sure you're logged in
2. Go to: Storage (in left sidebar)
3. You should see either:
   - "Create new bucket" button (if no buckets exist)
   - "New bucket" button (if buckets already exist)

### Bucket creation fails?

- Check you have permission to create buckets
- Verify project is not in read-only mode
- Try refreshing the page

### After creating buckets, test still fails?

1. Wait 10 seconds for changes to propagate
2. Run test again: `npx ts-node test-supabase-connection.ts`
3. Check bucket names match exactly (case-sensitive)

## What's Next?

Once all 5 buckets are created:

1. ✅ Run `storage-policies.sql`
2. ✅ Test again with `npx ts-node test-supabase-connection.ts`
3. ✅ All tests should pass (7/7)
4. ✅ Start building your app: `npm run dev`

## Summary

**Created by quickstart.sql:**
- ✅ profiles table
- ✅ plc_programs table
- ✅ chat_history table
- ✅ RLS policies
- ✅ Auto-create profile trigger

**To Do Now:**
- [ ] Create 5 storage buckets (via Dashboard)
- [ ] Apply storage-policies.sql
- [ ] Run test to verify (7/7 pass)
- [ ] Optional: Run full schema.sql for all features

---

**Dashboard Link**: https://app.supabase.com/project/suhrhquytzlfgwxwdvls/storage/buckets

**Your Database Is Working!** 🎉

Just add the storage buckets and you're ready to build!
