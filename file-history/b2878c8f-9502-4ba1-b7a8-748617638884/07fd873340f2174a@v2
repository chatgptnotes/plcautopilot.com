-- Fix RLS policies for algorithm_results table to allow INSERT operations
-- This adds the WITH CHECK clause needed for INSERT operations

-- Drop existing policies
DROP POLICY IF EXISTS "Super admins have full access to algorithm_results" ON public.algorithm_results;
DROP POLICY IF EXISTS "Clinic admins can view their clinic algorithm_results" ON public.algorithm_results;
DROP POLICY IF EXISTS "Doctors can view their clinic algorithm_results" ON public.algorithm_results;

-- Recreate policies with proper WITH CHECK clause for INSERT operations
CREATE POLICY "Super admins have full access to algorithm_results"
    ON public.algorithm_results
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'super_admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'super_admin'
        )
    );

CREATE POLICY "Clinic admins can view their clinic algorithm_results"
    ON public.algorithm_results
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'clinic_admin'
            AND profiles.clinic_id = algorithm_results.clinic_id
        )
    );

CREATE POLICY "Doctors can view their clinic algorithm_results"
    ON public.algorithm_results
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'doctor'
            AND profiles.clinic_id = algorithm_results.clinic_id
        )
    );

-- ALTERNATIVE: Temporarily disable RLS for testing
-- Uncomment the line below if you want to disable RLS for testing purposes
-- ALTER TABLE public.algorithm_results DISABLE ROW LEVEL SECURITY;

-- After disabling RLS, you can re-enable it later with:
-- ALTER TABLE public.algorithm_results ENABLE ROW LEVEL SECURITY;
