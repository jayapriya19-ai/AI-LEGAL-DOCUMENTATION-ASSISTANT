/*
  # Initial Schema Setup for Lexify Legal AI Platform

  1. New Tables
    - `document_analyses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `file_name` (text)
      - `analysis_data` (jsonb)
      - `created_at` (timestamp)
    
    - `generated_documents`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `document_type` (text)
      - `content` (text)
      - `user_insights` (text)
      - `created_at` (timestamp)
    
    - `expert_connections`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `expert_id` (integer)
      - `message` (text)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

-- Create document_analyses table
CREATE TABLE IF NOT EXISTS document_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  file_name text NOT NULL,
  analysis_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create generated_documents table
CREATE TABLE IF NOT EXISTS generated_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  document_type text NOT NULL,
  content text NOT NULL,
  user_insights text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create expert_connections table
CREATE TABLE IF NOT EXISTS expert_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  expert_id integer NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE document_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE expert_connections ENABLE ROW LEVEL SECURITY;

-- Create policies for document_analyses
CREATE POLICY "Users can read own document analyses"
  ON document_analyses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own document analyses"
  ON document_analyses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own document analyses"
  ON document_analyses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own document analyses"
  ON document_analyses
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for generated_documents
CREATE POLICY "Users can read own generated documents"
  ON generated_documents
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generated documents"
  ON generated_documents
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own generated documents"
  ON generated_documents
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own generated documents"
  ON generated_documents
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for expert_connections
CREATE POLICY "Users can read own expert connections"
  ON expert_connections
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own expert connections"
  ON expert_connections
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own expert connections"
  ON expert_connections
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own expert connections"
  ON expert_connections
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);