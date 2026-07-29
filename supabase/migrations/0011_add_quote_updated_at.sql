-- Lets the account dashboard show real "quote approved/rejected" activity
-- instead of static placeholder text, by tracking when status last changed.

alter table quote_requests add column updated_at timestamptz not null default now();
