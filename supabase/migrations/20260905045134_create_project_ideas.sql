/*
# Create public project ideas table

1. New Tables
- `project_ideas`
- `id` (uuid, primary key)
- `title` (text, generated project name)
- `description` (text, short project summary)
- `track` (text, selected interest area)
- `stack` (text array, suggested technologies)
- `created_at` (timestamp, creation time)

2. Security
- Row Level Security is enabled.
- Anonymous and authenticated visitors can create, view, update, and delete ideas because this is a shared hackathon showcase with no sign-in screen.

3. Important Notes
- The table stores saved ideas from the generator so they remain available after a refresh.
- Policies are intentionally public for this no-account demo experience.
*/

CREATE TABLE IF NOT EXISTS public.project_ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  track text NOT NULL,
  stack text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.project_ideas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view project ideas" ON public.project_ideas;
CREATE POLICY "Public can view project ideas"
  ON public.project_ideas FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public can save project ideas" ON public.project_ideas;
CREATE POLICY "Public can save project ideas"
  ON public.project_ideas FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can edit project ideas" ON public.project_ideas;
CREATE POLICY "Public can edit project ideas"
  ON public.project_ideas FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can remove project ideas" ON public.project_ideas;
CREATE POLICY "Public can remove project ideas"
  ON public.project_ideas FOR DELETE
  TO anon, authenticated
  USING (true);
