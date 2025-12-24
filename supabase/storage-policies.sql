-- PLCAutoPilot Storage Bucket Policies
-- Run this AFTER creating the storage buckets in Supabase Dashboard

-- ============================================
-- Storage Buckets to Create First (via Dashboard):
-- ============================================
-- 1. plc-programs (Private)
-- 2. user-uploads (Private)
-- 3. error-screenshots (Private)
-- 4. template-thumbnails (Public)
-- 5. avatars (Public)

-- ============================================
-- PLC Programs Bucket Policies (Private)
-- ============================================

-- Allow users to read their own program files
CREATE POLICY "Users can read own program files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'plc-programs'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to upload program files
CREATE POLICY "Users can upload program files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'plc-programs'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to update their own files
CREATE POLICY "Users can update own program files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'plc-programs'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own files
CREATE POLICY "Users can delete own program files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'plc-programs'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- ============================================
-- User Uploads Bucket Policies (Private)
-- ============================================

-- Allow users to read their own uploads
CREATE POLICY "Users can read own uploads"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'user-uploads'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to upload files
CREATE POLICY "Users can upload files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'user-uploads'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to update their uploads
CREATE POLICY "Users can update own uploads"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'user-uploads'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their uploads
CREATE POLICY "Users can delete own uploads"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'user-uploads'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- ============================================
-- Error Screenshots Bucket Policies (Private)
-- ============================================

-- Allow users to read their own screenshots
CREATE POLICY "Users can read own screenshots"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'error-screenshots'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to upload screenshots
CREATE POLICY "Users can upload screenshots"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'error-screenshots'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow system to read all screenshots (for admin debugging)
CREATE POLICY "System can read all screenshots"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'error-screenshots'
  AND EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- ============================================
-- Avatars Bucket Policies (Public)
-- ============================================

-- Allow everyone to read avatars
CREATE POLICY "Public avatars are viewable by everyone"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Allow authenticated users to upload their avatar
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
  AND auth.role() = 'authenticated'
);

-- Allow users to update their own avatar
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own avatar
CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- ============================================
-- Template Thumbnails Bucket Policies (Public)
-- ============================================

-- Allow everyone to read template thumbnails
CREATE POLICY "Public thumbnails are viewable by everyone"
ON storage.objects FOR SELECT
USING (bucket_id = 'template-thumbnails');

-- Allow admins to upload template thumbnails
CREATE POLICY "Admins can upload template thumbnails"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'template-thumbnails'
  AND EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- Allow admins to update template thumbnails
CREATE POLICY "Admins can update template thumbnails"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'template-thumbnails'
  AND EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- Allow admins to delete template thumbnails
CREATE POLICY "Admins can delete template thumbnails"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'template-thumbnails'
  AND EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- ============================================
-- Helper Functions for Storage
-- ============================================

-- Function to get user's total storage usage
CREATE OR REPLACE FUNCTION get_user_storage_usage(user_uuid UUID)
RETURNS BIGINT AS $$
DECLARE
  total_size BIGINT;
BEGIN
  SELECT COALESCE(SUM(metadata->>'size')::BIGINT, 0)
  INTO total_size
  FROM storage.objects
  WHERE (storage.foldername(name))[1] = user_uuid::text;

  RETURN total_size;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check storage quota (100 MB default for free tier)
CREATE OR REPLACE FUNCTION check_storage_quota(user_uuid UUID, file_size BIGINT)
RETURNS BOOLEAN AS $$
DECLARE
  current_usage BIGINT;
  max_storage BIGINT;
  subscription TEXT;
BEGIN
  -- Get user's subscription tier
  SELECT subscription_tier INTO subscription
  FROM public.profiles
  WHERE id = user_uuid;

  -- Set max storage based on tier
  max_storage := CASE subscription
    WHEN 'free' THEN 100 * 1024 * 1024        -- 100 MB
    WHEN 'basic' THEN 1024 * 1024 * 1024      -- 1 GB
    WHEN 'professional' THEN 10 * 1024 * 1024 * 1024  -- 10 GB
    WHEN 'enterprise' THEN 100 * 1024 * 1024 * 1024   -- 100 GB
    ELSE 100 * 1024 * 1024                    -- Default 100 MB
  END;

  -- Get current usage
  current_usage := get_user_storage_usage(user_uuid);

  -- Check if adding new file exceeds quota
  RETURN (current_usage + file_size) <= max_storage;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Bucket Configuration (Reference)
-- ============================================
-- Run these via Supabase Dashboard or API:

/*
-- Create buckets with configuration:

1. plc-programs:
   - Public: false
   - File size limit: 10 MB
   - Allowed MIME types: application/xml, text/plain, application/zip

2. user-uploads:
   - Public: false
   - File size limit: 50 MB
   - Allowed MIME types: application/pdf, image/png, image/jpeg, application/zip

3. error-screenshots:
   - Public: false
   - File size limit: 5 MB
   - Allowed MIME types: image/png, image/jpeg

4. avatars:
   - Public: true
   - File size limit: 2 MB
   - Allowed MIME types: image/png, image/jpeg, image/jpg

5. template-thumbnails:
   - Public: true
   - File size limit: 2 MB
   - Allowed MIME types: image/png, image/jpeg, image/svg+xml
*/

-- ============================================
-- Testing Storage Policies
-- ============================================

-- Test upload a file (via client library):
/*
const { data, error } = await supabase.storage
  .from('plc-programs')
  .upload(`${userId}/motor-control.xml`, file);
*/

-- Test read a file:
/*
const { data, error } = await supabase.storage
  .from('plc-programs')
  .download(`${userId}/motor-control.xml`);
*/

-- Get public URL (for public buckets):
/*
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl(`${userId}/avatar.png`);
*/

-- ============================================
-- Success Message
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '✅ Storage policies created successfully!';
    RAISE NOTICE '📦 Create buckets in Supabase Dashboard first';
    RAISE NOTICE '🔒 All private buckets have user-level access control';
    RAISE NOTICE '🌐 Public buckets (avatars, thumbnails) are read-only for all';
END $$;
