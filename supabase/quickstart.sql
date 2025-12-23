-- PLCAutoPilot Quick Start SQL
-- Minimal essential tables to get started quickly
-- Run this first, then run schema.sql for full features

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ESSENTIAL TABLES ONLY
-- ============================================

-- 1. User Profiles (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    company_name TEXT,
    subscription_tier TEXT DEFAULT 'free',
    credits_remaining INTEGER DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PLC Programs
CREATE TABLE IF NOT EXISTS public.plc_programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    specifications TEXT NOT NULL,
    platform TEXT NOT NULL,
    generated_code TEXT NOT NULL,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Chat History
CREATE TABLE IF NOT EXISTS public.chat_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    session_id UUID NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plc_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view own programs" ON public.plc_programs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create programs" ON public.plc_programs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own chat" ON public.chat_history
    FOR SELECT USING (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes
CREATE INDEX idx_programs_user ON public.plc_programs(user_id);
CREATE INDEX idx_chat_user ON public.chat_history(user_id);

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ Quick start tables created successfully!';
    RAISE NOTICE '📝 Next: Run schema.sql for complete features';
END $$;
