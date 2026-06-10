
CREATE TABLE public.assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  company text,
  contact_name text,
  email text,
  business_type text,
  team_size text,
  primary_focus text,
  pains text[] DEFAULT '{}'::text[],
  tools text[] DEFAULT '{}'::text[],
  hours_per_week int,
  goal text,
  status text NOT NULL DEFAULT 'pending_payment',
  payment_method text,
  payment_reference text,
  payment_confirmed_at timestamptz,
  report jsonb,
  pdf_url text,
  delivered_at timestamptz
);

GRANT INSERT ON public.assessments TO anon;
GRANT INSERT ON public.assessments TO authenticated;
GRANT ALL ON public.assessments TO service_role;

ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create an assessment"
  ON public.assessments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_assessments_updated_at
  BEFORE UPDATE ON public.assessments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
