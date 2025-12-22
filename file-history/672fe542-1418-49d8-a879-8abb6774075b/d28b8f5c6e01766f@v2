-- Create clinical_reports table to store comprehensive patient clinical information
-- Migration: 019_create_clinical_reports_table.sql

-- Create clinical_reports table
CREATE TABLE IF NOT EXISTS clinical_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Link to patient and clinic
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  patient_uid VARCHAR(50) NOT NULL, -- Store patient UID (CLINICCODE-YYYYMM-XXXX)
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  clinic_name VARCHAR(255),

  -- Patient Information
  full_name VARCHAR(255) NOT NULL,
  date_of_birth DATE,
  gender VARCHAR(20),
  handedness VARCHAR(20),
  occupation VARCHAR(255),
  date_of_test DATE,
  referring_physician VARCHAR(255),
  referral_reason TEXT,

  -- Clinical & Medical History (stored as JSONB for flexibility)
  presenting_complaints JSONB,
  symptom_duration JSONB,
  past_medical_history JSONB,

  -- Medication History
  medications JSONB,

  -- Family History
  family_history JSONB,

  -- Lifestyle Factors
  lifestyle JSONB,

  -- Supporting Documents (array of file URLs/paths)
  uploaded_documents JSONB,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id),

  -- Constraints
  CONSTRAINT clinical_reports_patient_uid_check CHECK (patient_uid ~ '^[A-Z0-9]+-\d{6}-\d{4}$')
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_clinical_reports_patient_id ON clinical_reports(patient_id);
CREATE INDEX IF NOT EXISTS idx_clinical_reports_patient_uid ON clinical_reports(patient_uid);
CREATE INDEX IF NOT EXISTS idx_clinical_reports_org_id ON clinical_reports(org_id);
CREATE INDEX IF NOT EXISTS idx_clinical_reports_created_at ON clinical_reports(created_at DESC);

-- Create trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_clinical_reports_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_clinical_reports_updated_at
  BEFORE UPDATE ON clinical_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_clinical_reports_updated_at();

-- Add comments for documentation
COMMENT ON TABLE clinical_reports IS 'Comprehensive clinical reports for patients including medical history, medications, lifestyle factors';
COMMENT ON COLUMN clinical_reports.patient_uid IS 'Patient unique identifier in format CLINICCODE-YYYYMM-XXXX';
COMMENT ON COLUMN clinical_reports.presenting_complaints IS 'JSON object containing patient presenting complaints checkboxes and notes';
COMMENT ON COLUMN clinical_reports.symptom_duration IS 'JSON object containing symptom onset and duration information';
COMMENT ON COLUMN clinical_reports.past_medical_history IS 'JSON object containing past medical history checkboxes and notes';
COMMENT ON COLUMN clinical_reports.medications IS 'JSON object containing current medications and recent changes';
COMMENT ON COLUMN clinical_reports.family_history IS 'JSON object containing family medical history';
COMMENT ON COLUMN clinical_reports.lifestyle IS 'JSON object containing lifestyle and contributing factors';
COMMENT ON COLUMN clinical_reports.uploaded_documents IS 'JSON array containing uploaded document metadata and URLs';
