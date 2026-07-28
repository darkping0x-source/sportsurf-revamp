-- Corrective migration for projects that already ran 0001_init.sql before the
-- infinite-recursion fix: the admin policies queried `profiles` from within a
-- policy defined on `profiles` itself, which Postgres detects and rejects.
-- Fix: route the admin check through a SECURITY DEFINER function, which
-- bypasses RLS for that lookup instead of re-triggering it.

create or replace function is_admin(uid uuid) returns boolean
language sql security definer stable
as $$
  select exists (select 1 from profiles where id = uid and role = 'admin');
$$;

drop policy if exists "admins manage profiles" on profiles;
drop policy if exists "admins manage products" on products;
drop policy if exists "admins manage projects" on projects;
drop policy if exists "admins manage certifications" on certifications;
drop policy if exists "admins manage quote requests" on quote_requests;
drop policy if exists "admins manage chat queries" on chat_queries;

create policy "admins manage profiles" on profiles for all
  using (is_admin(auth.uid()));
create policy "admins manage products" on products for all
  using (is_admin(auth.uid()));
create policy "admins manage projects" on projects for all
  using (is_admin(auth.uid()));
create policy "admins manage certifications" on certifications for all
  using (is_admin(auth.uid()));
create policy "admins manage quote requests" on quote_requests for all
  using (is_admin(auth.uid()));
create policy "admins manage chat queries" on chat_queries for all
  using (is_admin(auth.uid()));
