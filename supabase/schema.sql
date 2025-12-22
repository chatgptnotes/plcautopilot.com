-- PLCAutoPilot Database Schema for Supabase
-- Automating the Automation - Mass Production Engineering, PLC, SCADA Systems

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Roles and Hierarchy
CREATE TYPE user_role AS ENUM ('superadmin', 'admin', 'user');
CREATE TYPE subscription_tier AS ENUM ('free', 'professional', 'enterprise');

-- Organizations Table (Companies)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  subscription_tier subscription_tier DEFAULT 'free',
  subscription_start_date TIMESTAMP,
  subscription_end_date TIMESTAMP,
  max_users INTEGER DEFAULT 1,
  max_projects INTEGER DEFAULT 5,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  settings JSONB DEFAULT '{}'::jsonb
);

-- Users Table with Role Hierarchy
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  role user_role DEFAULT 'user',
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  preferences JSONB DEFAULT '{}'::jsonb,
  auth_id TEXT UNIQUE -- Reference to Supabase Auth user
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_organization ON users(organization_id);
CREATE INDEX idx_users_role ON users(role);

-- PLC Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  plc_manufacturer VARCHAR(100),
  plc_model VARCHAR(100),
  programming_language VARCHAR(50),
  application_type VARCHAR(100),
  status VARCHAR(50) DEFAULT 'draft', -- draft, in_progress, completed, archived
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_projects_user ON projects(user_id);
CREATE INDEX idx_projects_org ON projects(organization_id);
CREATE INDEX idx_projects_status ON projects(status);

-- Generated Programs Table
CREATE TABLE generated_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  program_code TEXT NOT NULL,
  program_format VARCHAR(50), -- XML, ST, LD, IL, etc.
  file_name VARCHAR(255),
  file_size INTEGER,
  generation_parameters JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  version INTEGER DEFAULT 1
);

CREATE INDEX idx_programs_project ON generated_programs(project_id);
CREATE INDEX idx_programs_user ON generated_programs(user_id);

-- File Uploads/Downloads Tracking
CREATE TABLE file_operations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  operation_type VARCHAR(50) NOT NULL, -- upload, download, generate
  file_name VARCHAR(255),
  file_path TEXT,
  file_size INTEGER,
  mime_type VARCHAR(100),
  storage_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_file_ops_user ON file_operations(user_id);
CREATE INDEX idx_file_ops_project ON file_operations(project_id);
CREATE INDEX idx_file_ops_type ON file_operations(operation_type);

-- Error Rectifications Table
CREATE TABLE error_rectifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  original_code TEXT,
  error_message TEXT,
  error_screenshot_url TEXT,
  corrected_code TEXT,
  correction_applied BOOLEAN DEFAULT false,
  confidence_score FLOAT,
  created_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP,
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_error_rect_project ON error_rectifications(project_id);
CREATE INDEX idx_error_rect_user ON error_rectifications(user_id);

-- Learning System - Store corrections and feedback
CREATE TABLE learning_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  learning_type VARCHAR(100), -- error_correction, user_feedback, program_optimization
  original_input JSONB,
  corrected_output JSONB,
  user_correction TEXT,
  feedback_rating INTEGER CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
  applied_to_model BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_learning_type ON learning_data(learning_type);
CREATE INDEX idx_learning_applied ON learning_data(applied_to_model);

-- PLC Recommendations Table
CREATE TABLE plc_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id),
  requirements JSONB NOT NULL,
  recommended_plcs JSONB NOT NULL,
  selected_plc JSONB,
  criteria VARCHAR(50), -- cheapest, simplest, robust, balanced
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_recommendations_user ON plc_recommendations(user_id);

-- Engineer Chat Sessions
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  engineer_name VARCHAR(255),
  engineer_specialty VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active', -- active, resolved, closed
  started_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT
);

CREATE INDEX idx_chat_user ON chat_sessions(user_id);
CREATE INDEX idx_chat_status ON chat_sessions(status);

-- Chat Messages
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  sender VARCHAR(50), -- user, engineer, system
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_messages_session ON chat_messages(session_id);

-- Usage Analytics
CREATE TABLE usage_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  event_type VARCHAR(100) NOT NULL, -- program_generated, plc_recommended, error_rectified, etc.
  event_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_analytics_user ON usage_analytics(user_id);
CREATE INDEX idx_analytics_org ON usage_analytics(organization_id);
CREATE INDEX idx_analytics_event ON usage_analytics(event_type);
CREATE INDEX idx_analytics_created ON usage_analytics(created_at);

-- Subscription History
CREATE TABLE subscription_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  subscription_tier subscription_tier NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  amount_paid DECIMAL(10, 2),
  payment_method VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sub_history_org ON subscription_history(organization_id);

-- Billing Transactions
CREATE TABLE billing_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
  payment_method VARCHAR(50),
  stripe_transaction_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

CREATE INDEX idx_billing_org ON billing_transactions(organization_id);
CREATE INDEX idx_billing_status ON billing_transactions(status);

-- API Keys for Programmatic Access
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  key_name VARCHAR(255),
  api_key TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  permissions JSONB DEFAULT '[]'::jsonb,
  last_used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

CREATE INDEX idx_api_keys_key ON api_keys(api_key);
CREATE INDEX idx_api_keys_org ON api_keys(organization_id);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_rectifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE plc_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_analytics ENABLE ROW LEVEL SECURITY;

-- Organizations Policy
CREATE POLICY "Users can view their organization" ON organizations
  FOR SELECT USING (
    id IN (SELECT organization_id FROM users WHERE auth_id = auth.uid())
  );

-- SuperAdmins can view all organizations
CREATE POLICY "SuperAdmins can view all organizations" ON organizations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE auth_id = auth.uid() AND role = 'superadmin'
    )
  );

-- Users Policy
CREATE POLICY "Users can view users in their organization" ON users
  FOR SELECT USING (
    organization_id IN (SELECT organization_id FROM users WHERE auth_id = auth.uid())
    OR auth_id = auth.uid()
  );

-- Projects Policy
CREATE POLICY "Users can view their organization's projects" ON projects
  FOR SELECT USING (
    organization_id IN (SELECT organization_id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY "Users can create projects in their organization" ON projects
  FOR INSERT WITH CHECK (
    organization_id IN (SELECT organization_id FROM users WHERE auth_id = auth.uid())
    AND user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY "Users can update their own projects" ON projects
  FOR UPDATE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

-- Generated Programs Policy
CREATE POLICY "Users can view programs from their organization" ON generated_programs
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE organization_id IN (
        SELECT organization_id FROM users WHERE auth_id = auth.uid()
      )
    )
  );

-- File Operations Policy
CREATE POLICY "Users can view their file operations" ON file_operations
  FOR ALL USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

-- Functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create default SuperAdmin (to be updated with real credentials)
INSERT INTO organizations (name, slug, subscription_tier, max_users, max_projects)
VALUES ('PLCAutoPilot Admin', 'plcautopilot-admin', 'enterprise', 1000, 10000)
ON CONFLICT DO NOTHING;

-- Views for Analytics

-- Monthly usage by organization
CREATE OR REPLACE VIEW monthly_usage_by_org AS
SELECT
  o.id AS organization_id,
  o.name AS organization_name,
  DATE_TRUNC('month', ua.created_at) AS month,
  ua.event_type,
  COUNT(*) AS event_count
FROM usage_analytics ua
JOIN organizations o ON ua.organization_id = o.id
GROUP BY o.id, o.name, DATE_TRUNC('month', ua.created_at), ua.event_type;

-- User activity summary
CREATE OR REPLACE VIEW user_activity_summary AS
SELECT
  u.id AS user_id,
  u.email,
  u.full_name,
  u.organization_id,
  COUNT(DISTINCT p.id) AS total_projects,
  COUNT(DISTINCT gp.id) AS total_programs,
  COUNT(DISTINCT er.id) AS total_errors_rectified,
  MAX(u.last_login) AS last_active
FROM users u
LEFT JOIN projects p ON u.id = p.user_id
LEFT JOIN generated_programs gp ON u.id = gp.user_id
LEFT JOIN error_rectifications er ON u.id = er.user_id
GROUP BY u.id, u.email, u.full_name, u.organization_id;

-- Comments
COMMENT ON TABLE organizations IS 'Companies using PLCAutoPilot platform';
COMMENT ON TABLE users IS 'User accounts with role hierarchy: SuperAdmin > Admin > User';
COMMENT ON TABLE projects IS 'PLC automation projects for mass production engineering';
COMMENT ON TABLE generated_programs IS 'AI-generated PLC programs for automation';
COMMENT ON TABLE learning_data IS 'Machine learning data from user corrections and feedback';
COMMENT ON TABLE usage_analytics IS 'Usage tracking for billing and analytics';
COMMENT ON COLUMN users.role IS 'SuperAdmin: platform-wide access, Admin: organization-wide, User: project-level';
