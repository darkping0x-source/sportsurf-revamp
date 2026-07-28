-- Expands the catalog to match the real site's scope: 9 categories instead
-- of 6, plus the fields needed for photo-card layouts (ratings, image URLs,
-- project area/infrastructure type).

alter type product_category add value if not exists 'adventure_sports';
alter type product_category add value if not exists 'challenge_courses';
alter type product_category add value if not exists 'talent_scout';

alter table products add column if not exists image_url text;
alter table products add column if not exists rating numeric(2, 1) default 4.8;
alter table products add column if not exists review_count integer default 1200;

alter table projects add column if not exists image_url text;
alter table projects add column if not exists area_sqm integer;
alter table projects add column if not exists infrastructure_type text;
