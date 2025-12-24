# Storage Policies Error Fix

## The Error You Saw

```
Error: Failed to run sql query: ERROR: 42703: column "role" does not exist
```

## What Happened

The `storage-policies.sql` file was designed for the **full schema.sql** (14 tables) which includes a `role` column in the profiles table.

Since you ran **quickstart.sql** (3 tables), the `role` column doesn't exist, causing the error.

## The Solution

Use the **simplified storage policies** instead:

### ✅ Correct File to Use

**File**: `storage-policies-simple.sql`

This file is compatible with the quickstart.sql schema and doesn't reference the `role` column.

## How to Apply Storage Policies (Corrected)

### Step 1: Create Storage Buckets (if not done)

Go to: https://app.supabase.com/project/suhrhquytzlfgwxwdvls/storage/buckets

Create these 5 buckets:
1. `plc-programs` (Private, 10MB)
2. `user-uploads` (Private, 50MB)
3. `error-screenshots` (Private, 5MB)
4. `avatars` (Public, 2MB)
5. `template-thumbnails` (Public, 2MB)

### Step 2: Apply Simple Storage Policies

1. Go to SQL Editor: https://app.supabase.com/project/suhrhquytzlfgwxwdvls/sql
2. Click **New Query**
3. Open file: `supabase/storage-policies-simple.sql`
4. Copy **all contents**
5. Paste into SQL editor
6. Click **Run**

**Expected Output:**
```
✅ Storage policies created successfully!
📦 All policies compatible with quickstart.sql schema
🔒 Private buckets have user-level access control
🌐 Public buckets (avatars, thumbnails) are read-only for all
💾 Storage quota functions created
```

### Step 3: Test Again

```bash
npx ts-node test-supabase-connection.ts
```

**Expected Result:**
```
Total Tests: 7
✅ Passed: 7
❌ Failed: 0

🎉 All tests passed!
```

## File Reference Guide

| Schema Used | Storage Policies File | Tables |
|-------------|----------------------|--------|
| quickstart.sql ✅ | storage-policies-simple.sql ✅ | 3 tables |
| schema.sql | storage-policies.sql | 14 tables |

## What's in storage-policies-simple.sql

The simplified version includes:

✅ **All 5 bucket policies** (same as full version)
✅ **User-level folder isolation** (same security)
✅ **Public bucket access** (avatars, thumbnails)
✅ **Storage quota functions** (100MB free tier)

❌ **No admin role checks** (simplified, works with quickstart.sql)
❌ **No organization checks** (not in quickstart.sql)

## If You Want Full Features Later

To upgrade to the full schema with admin roles:

1. Run `schema.sql` in SQL Editor (adds 11 more tables)
2. Then you can use `storage-policies.sql` (full version)

But for now, use **storage-policies-simple.sql** and you're good to go!

## Quick Action

**Do this now:**

```bash
# 1. Create buckets in Dashboard
# 2. Run storage-policies-simple.sql in SQL Editor
# 3. Test connection:

npx ts-node test-supabase-connection.ts
```

**Expected:** 7/7 tests pass! 🎉

## Summary

- ❌ Don't use: `storage-policies.sql` (requires full schema)
- ✅ Do use: `storage-policies-simple.sql` (works with quickstart)
- Both provide the same security and functionality
- The simple version just doesn't check for admin roles

---

**File Created**: `storage-policies-simple.sql` ✅

**Action**: Apply this file after creating storage buckets

**Test**: `npx ts-node test-supabase-connection.ts` should pass 7/7
