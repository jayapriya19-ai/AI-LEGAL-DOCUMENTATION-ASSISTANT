/*
  # Complete Lexify Legal AI Database Schema

  1. New Tables
    - `user_profiles` - Extended user information with subscriptions
    - `experts` - Legal expert profiles and credentials
    - `expert_verifications` - Expert verification process tracking
    - `document_analysis_detailed` - Enhanced document analysis with metadata
    - `document_templates` - Legal document templates
    - `expert_specializations` - Expert areas of expertise
    - `expert_reviews` - Expert rating and review system
    - `payments` - Payment transactions and billing
    - `subscriptions` - User subscription management
    - `analytics_events` - System usage analytics
    - `legal_precedents` - Indian legal case references
    - `compliance_rules` - Indian legal compliance rules
    - `notifications` - System notifications
    - `audit_logs` - Security and compliance audit trail

  2. Security
    - Enable RLS on all tables
    - Add comprehensive policies for data access
    - Implement role-based access control

  3. Indexes
    - Performance optimization indexes
    - Search and filtering indexes
*/

-- User Profiles Extension
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name text NOT NULL,
  phone text,
  organization text,
  designation text,
  profile_image_url text,
  location jsonb DEFAULT '{}', -- {city, state, country, pincode}
  preferences jsonb DEFAULT '{}', -- {language, theme, notifications}
  subscription_tier text DEFAULT 'free' CHECK (subscription_tier IN ('free', 'starter', 'professional', 'enterprise')),
  subscription_status text DEFAULT 'active' CHECK (subscription_status IN ('active', 'inactive', 'cancelled', 'expired')),
  subscription_expires_at timestamptz,
  usage_limits jsonb DEFAULT '{"documents_per_month": 5, "analyses_per_month": 10}',
  usage_current jsonb DEFAULT '{"documents_this_month": 0, "analyses_this_month": 0}',
  last_login_at timestamptz,
  is_verified boolean DEFAULT false,
  verification_documents jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Legal Experts
CREATE TABLE IF NOT EXISTS experts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  bar_council_number text UNIQUE NOT NULL,
  title text NOT NULL,
  experience_years integer NOT NULL CHECK (experience_years >= 0),
  hourly_rate decimal(10,2) NOT NULL CHECK (hourly_rate >= 0),
  currency text DEFAULT 'INR',
  bio text,
  education jsonb DEFAULT '[]', -- [{degree, institution, year, specialization}]
  certifications jsonb DEFAULT '[]', -- [{name, issuing_body, issue_date, expiry_date}]
  languages text[] DEFAULT ARRAY['English', 'Hindi'],
  office_address jsonb DEFAULT '{}', -- {street, city, state, pincode, country}
  contact_info jsonb DEFAULT '{}', -- {phone, email, website}
  availability jsonb DEFAULT '{}', -- {working_hours, time_zone, consultation_types}
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'in_review', 'verified', 'rejected')),
  is_active boolean DEFAULT true,
  average_rating decimal(3,2) DEFAULT 0.0 CHECK (average_rating >= 0 AND average_rating <= 5),
  total_reviews integer DEFAULT 0,
  total_consultations integer DEFAULT 0,
  success_rate decimal(5,2) DEFAULT 0.0 CHECK (success_rate >= 0 AND success_rate <= 100),
  response_time_hours integer DEFAULT 24,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Expert Specializations
CREATE TABLE IF NOT EXISTS expert_specializations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  expert_id uuid REFERENCES experts(id) ON DELETE CASCADE NOT NULL,
  specialization text NOT NULL CHECK (specialization IN (
    'Corporate Law', 'Criminal Law', 'Constitutional Law', 'Intellectual Property',
    'Banking Law', 'Technology Law', 'Contract Law', 'Employment Law',
    'Property Law', 'Tax Law', 'Family Law', 'Environmental Law',
    'International Law', 'Arbitration', 'Litigation', 'Cyber Law',
    'Securities Law', 'Insurance Law', 'Immigration Law', 'Consumer Protection'
  )),
  proficiency_level text DEFAULT 'intermediate' CHECK (proficiency_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  years_of_experience integer DEFAULT 0,
  notable_cases text[],
  created_at timestamptz DEFAULT now(),
  UNIQUE(expert_id, specialization)
);

-- Expert Verification Process
CREATE TABLE IF NOT EXISTS expert_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  expert_id uuid REFERENCES experts(id) ON DELETE CASCADE NOT NULL,
  verification_type text NOT NULL CHECK (verification_type IN ('initial', 'renewal', 'update')),
  submitted_documents jsonb NOT NULL DEFAULT '[]', -- [{type, url, uploaded_at}]
  verification_status text DEFAULT 'submitted' CHECK (verification_status IN ('submitted', 'under_review', 'approved', 'rejected', 'requires_clarification')),
  reviewer_id uuid REFERENCES auth.users(id),
  reviewer_notes text,
  verification_score integer CHECK (verification_score >= 0 AND verification_score <= 100),
  verified_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enhanced Document Analysis
CREATE TABLE IF NOT EXISTS document_analysis_detailed (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  file_name text NOT NULL,
  file_size bigint NOT NULL,
  file_type text NOT NULL,
  file_hash text, -- For duplicate detection
  original_content text,
  processed_content text,
  analysis_results jsonb NOT NULL DEFAULT '{}', -- Complete analysis data
  ai_model_version text DEFAULT 'lexify-v1.0',
  processing_time_ms integer,
  confidence_score decimal(5,2) CHECK (confidence_score >= 0 AND confidence_score <= 100),
  document_type text,
  document_complexity text CHECK (document_complexity IN ('Low', 'Medium', 'High', 'Very High')),
  legal_terms_found integer DEFAULT 0,
  risks_identified integer DEFAULT 0,
  compliance_score decimal(5,2) DEFAULT 0 CHECK (compliance_score >= 0 AND compliance_score <= 100),
  indian_legal_refs jsonb DEFAULT '[]',
  recommendations jsonb DEFAULT '[]',
  tags text[],
  is_public boolean DEFAULT false,
  download_count integer DEFAULT 0,
  last_accessed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Document Templates
CREATE TABLE IF NOT EXISTS document_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_name text NOT NULL,
  template_type text NOT NULL CHECK (template_type IN (
    'service_agreement', 'employment_contract', 'lease_agreement',
    'partnership_deed', 'nda', 'loan_agreement', 'sale_deed',
    'mou', 'power_of_attorney', 'affidavit'
  )),
  template_content text NOT NULL,
  template_variables jsonb DEFAULT '[]', -- [{name, type, required, description}]
  indian_legal_refs text[],
  required_clauses text[],
  version text DEFAULT '1.0',
  is_active boolean DEFAULT true,
  usage_count integer DEFAULT 0,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Expert Reviews and Ratings
CREATE TABLE IF NOT EXISTS expert_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  expert_id uuid REFERENCES experts(id) ON DELETE CASCADE NOT NULL,
  reviewer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  connection_id uuid REFERENCES expert_connections(id),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  review_categories jsonb DEFAULT '{}', -- {communication, expertise, timeliness, value}
  is_verified boolean DEFAULT false,
  is_public boolean DEFAULT true,
  helpful_votes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(expert_id, reviewer_id, connection_id)
);

-- Payment Transactions
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  expert_id uuid REFERENCES experts(id),
  connection_id uuid REFERENCES expert_connections(id),
  payment_type text NOT NULL CHECK (payment_type IN ('subscription', 'consultation', 'document_generation', 'expert_fee')),
  amount decimal(10,2) NOT NULL CHECK (amount >= 0),
  currency text DEFAULT 'INR',
  payment_method text CHECK (payment_method IN ('razorpay', 'upi', 'card', 'net_banking', 'wallet')),
  payment_gateway_id text, -- External payment gateway transaction ID
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled')),
  payment_metadata jsonb DEFAULT '{}', -- Gateway specific data
  invoice_number text UNIQUE,
  invoice_url text,
  tax_amount decimal(10,2) DEFAULT 0,
  discount_amount decimal(10,2) DEFAULT 0,
  net_amount decimal(10,2) NOT NULL,
  paid_at timestamptz,
  refunded_at timestamptz,
  refund_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Subscription Management
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_type text NOT NULL CHECK (plan_type IN ('starter', 'professional', 'enterprise')),
  billing_cycle text DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'suspended')),
  current_period_start timestamptz NOT NULL,
  current_period_end timestamptz NOT NULL,
  cancel_at_period_end boolean DEFAULT false,
  cancelled_at timestamptz,
  trial_start timestamptz,
  trial_end timestamptz,
  plan_limits jsonb NOT NULL DEFAULT '{}', -- {documents_per_month, analyses_per_month, expert_consultations}
  usage_tracking jsonb DEFAULT '{}', -- Current usage against limits
  auto_renew boolean DEFAULT true,
  payment_method_id text,
  next_billing_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Analytics Events
CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  event_type text NOT NULL CHECK (event_type IN (
    'document_upload', 'document_analysis', 'document_generation',
    'expert_search', 'expert_connection', 'payment_completed',
    'subscription_created', 'subscription_cancelled', 'login', 'logout'
  )),
  event_data jsonb DEFAULT '{}',
  session_id text,
  ip_address inet,
  user_agent text,
  referrer text,
  page_url text,
  created_at timestamptz DEFAULT now()
);

-- Legal Precedents Database
CREATE TABLE IF NOT EXISTS legal_precedents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_title text NOT NULL,
  citation text NOT NULL UNIQUE,
  court text NOT NULL,
  judgment_date date,
  legal_principle text NOT NULL,
  case_summary text,
  relevant_sections text[],
  keywords text[],
  case_type text CHECK (case_type IN ('civil', 'criminal', 'constitutional', 'commercial', 'tax', 'labor')),
  importance_level text DEFAULT 'medium' CHECK (importance_level IN ('low', 'medium', 'high', 'landmark')),
  full_text_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indian Legal Compliance Rules
CREATE TABLE IF NOT EXISTS compliance_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_name text NOT NULL,
  legal_act text NOT NULL, -- e.g., "Indian Contract Act 1872"
  section_reference text,
  rule_description text NOT NULL,
  rule_type text CHECK (rule_type IN ('mandatory', 'recommended', 'best_practice')),
  applicable_document_types text[],
  compliance_check_pattern text, -- Regex or keyword pattern
  violation_severity text DEFAULT 'medium' CHECK (violation_severity IN ('low', 'medium', 'high', 'critical')),
  remediation_steps text[],
  is_active boolean DEFAULT true,
  effective_from date,
  effective_until date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- System Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  notification_type text NOT NULL CHECK (notification_type IN (
    'expert_response', 'document_ready', 'payment_success', 'payment_failed',
    'subscription_expiry', 'verification_update', 'system_announcement'
  )),
  title text NOT NULL,
  message text NOT NULL,
  action_url text,
  is_read boolean DEFAULT false,
  priority text DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  metadata jsonb DEFAULT '{}',
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id text,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  success boolean DEFAULT true,
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription ON user_profiles(subscription_tier, subscription_status);
CREATE INDEX IF NOT EXISTS idx_experts_verification_status ON experts(verification_status);
CREATE INDEX IF NOT EXISTS idx_experts_rating ON experts(average_rating DESC);
CREATE INDEX IF NOT EXISTS idx_experts_specialization ON expert_specializations(specialization);
CREATE INDEX IF NOT EXISTS idx_document_analysis_user_date ON document_analysis_detailed(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_document_analysis_type ON document_analysis_detailed(document_type);
CREATE INDEX IF NOT EXISTS idx_expert_reviews_expert_rating ON expert_reviews(expert_id, rating DESC);
CREATE INDEX IF NOT EXISTS idx_payments_user_status ON payments(user_id, payment_status);
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_status ON subscriptions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type_date ON analytics_events(event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, is_read, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_action ON audit_logs(user_id, action, created_at DESC);

-- Enable Row Level Security on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE expert_specializations ENABLE ROW LEVEL SECURITY;
ALTER TABLE expert_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_analysis_detailed ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE expert_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_precedents ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can read own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Expert Policies
CREATE POLICY "Anyone can read verified experts"
  ON experts FOR SELECT
  TO authenticated
  USING (verification_status = 'verified' AND is_active = true);

CREATE POLICY "Experts can manage own profile"
  ON experts FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Expert Specializations Policies
CREATE POLICY "Anyone can read expert specializations"
  ON expert_specializations FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM experts 
    WHERE experts.id = expert_specializations.expert_id 
    AND experts.verification_status = 'verified'
  ));

CREATE POLICY "Experts can manage own specializations"
  ON expert_specializations FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM experts 
    WHERE experts.id = expert_specializations.expert_id 
    AND experts.user_id = auth.uid()
  ));

-- Expert Verification Policies
CREATE POLICY "Experts can read own verifications"
  ON expert_verifications FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM experts 
    WHERE experts.id = expert_verifications.expert_id 
    AND experts.user_id = auth.uid()
  ));

CREATE POLICY "Experts can insert own verifications"
  ON expert_verifications FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM experts 
    WHERE experts.id = expert_verifications.expert_id 
    AND experts.user_id = auth.uid()
  ));

-- Document Analysis Policies
CREATE POLICY "Users can manage own document analyses"
  ON document_analysis_detailed FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Document Templates Policies
CREATE POLICY "Anyone can read active templates"
  ON document_templates FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Expert Reviews Policies
CREATE POLICY "Anyone can read public reviews"
  ON expert_reviews FOR SELECT
  TO authenticated
  USING (is_public = true);

CREATE POLICY "Users can manage own reviews"
  ON expert_reviews FOR ALL
  TO authenticated
  USING (auth.uid() = reviewer_id);

-- Payment Policies
CREATE POLICY "Users can read own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Experts can read payments for their services"
  ON payments FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM experts 
    WHERE experts.id = payments.expert_id 
    AND experts.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Subscription Policies
CREATE POLICY "Users can manage own subscriptions"
  ON subscriptions FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Analytics Events Policies
CREATE POLICY "Users can read own analytics"
  ON analytics_events FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert analytics"
  ON analytics_events FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Legal Precedents Policies
CREATE POLICY "Anyone can read active precedents"
  ON legal_precedents FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Compliance Rules Policies
CREATE POLICY "Anyone can read active compliance rules"
  ON compliance_rules FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Notifications Policies
CREATE POLICY "Users can manage own notifications"
  ON notifications FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Audit Logs Policies
CREATE POLICY "Users can read own audit logs"
  ON audit_logs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert audit logs"
  ON audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Functions for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experts_updated_at BEFORE UPDATE ON experts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_expert_verifications_updated_at BEFORE UPDATE ON expert_verifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_document_analysis_updated_at BEFORE UPDATE ON document_analysis_detailed FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_document_templates_updated_at BEFORE UPDATE ON document_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_expert_reviews_updated_at BEFORE UPDATE ON expert_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_legal_precedents_updated_at BEFORE UPDATE ON legal_precedents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_compliance_rules_updated_at BEFORE UPDATE ON compliance_rules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for legal precedents
INSERT INTO legal_precedents (case_title, citation, court, judgment_date, legal_principle, case_summary, relevant_sections, keywords, case_type, importance_level) VALUES
('Mohori Bibee v. Dharmodas Ghose', '(1903) ILR 30 Cal 539', 'Privy Council', '1903-03-11', 'Minor''s agreement is void ab initio', 'Landmark case establishing that agreements with minors are void from the beginning', ARRAY['Section 11', 'Section 65'], ARRAY['minor', 'void agreement', 'capacity'], 'civil', 'landmark'),
('Satyabrata Ghose v. Mugneeram Bangur & Co.', 'AIR 1954 SC 44', 'Supreme Court of India', '1954-01-15', 'Doctrine of frustration in Indian contract law', 'Established the doctrine of frustration under Indian Contract Act', ARRAY['Section 56'], ARRAY['frustration', 'impossibility', 'contract'], 'civil', 'landmark'),
('Carlill v. Carbolic Smoke Ball Co.', '(1893) 1 QB 256', 'Court of Appeal', '1893-12-07', 'Unilateral contracts can be formed through conduct', 'Classic case on offer and acceptance in unilateral contracts', ARRAY['Section 2(a)', 'Section 2(b)'], ARRAY['offer', 'acceptance', 'unilateral contract'], 'commercial', 'high');

-- Insert sample compliance rules
INSERT INTO compliance_rules (rule_name, legal_act, section_reference, rule_description, rule_type, applicable_document_types, violation_severity) VALUES
('GST Registration Mandatory', 'GST Act 2017', 'Section 22', 'All service agreements must include GST registration numbers of both parties', 'mandatory', ARRAY['service_agreement', 'employment_contract'], 'high'),
('Stamp Duty Payment', 'Indian Stamp Act 1899', 'Section 3', 'All agreements above ₹100 must have adequate stamp duty', 'mandatory', ARRAY['lease_agreement', 'sale_deed', 'loan_agreement'], 'critical'),
('Jurisdiction Clause', 'Code of Civil Procedure 1908', 'Section 20', 'Contracts should specify Indian court jurisdiction for dispute resolution', 'recommended', ARRAY['service_agreement', 'partnership_deed', 'nda'], 'medium');

-- Insert sample document templates
INSERT INTO document_templates (template_name, template_type, template_content, template_variables, indian_legal_refs, required_clauses, created_by) VALUES
('Standard Service Agreement', 'service_agreement', 'SERVICE AGREEMENT\n\nThis Service Agreement is entered into on [DATE] between [PARTY1] and [PARTY2]...', 
'[{"name": "DATE", "type": "date", "required": true}, {"name": "PARTY1", "type": "text", "required": true}, {"name": "PARTY2", "type": "text", "required": true}]'::jsonb,
ARRAY['Indian Contract Act 1872', 'GST Act 2017'],
ARRAY['scope', 'payment', 'gst', 'termination', 'jurisdiction'],
NULL);