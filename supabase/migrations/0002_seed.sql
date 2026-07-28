-- Seed data mirroring src/lib/data/*.ts, so the live DB has content to browse,
-- search, and manage in the admin dashboard from day one.

insert into products (category, name, slug, description, specs) values
  ('surface_sports', 'FIFA-Certified Football Turf', 'fifa-certified-football-turf',
   'Synthetic football turf built to FIFA Quality Pro specification, engineered for consistent ball bounce and player traction across full-size and academy pitches.',
   '{"pileHeight":"50-60mm","infill":"Sand + rubber","certification":"FIFA Quality Pro"}'),
  ('surface_sports', 'IAAF-Certified Athletics Track', 'iaaf-certified-athletics-track',
   'Polyurethane running tracks meeting IAAF Class 1/2 standards, designed for schools, academies, and competition-grade stadiums.',
   '{"surface":"Polyurethane","lanes":"6-8","certification":"IAAF Class 1/2"}'),
  ('small_sports', 'Badminton Court Flooring', 'badminton-court-flooring',
   'PU and PVC sports flooring for indoor badminton courts, tuned for shock absorption and consistent shuttle response.',
   '{"surface":"PU / PVC","use":"Indoor","courts":"Single or multi-court"}'),
  ('small_sports', 'Synthetic Tennis Courts', 'synthetic-tennis-courts',
   'Acrylic and synthetic clay tennis court surfacing built to individual site preferences, indoor or outdoor.',
   '{"surface":"Acrylic / Synthetic clay","use":"Indoor or outdoor"}'),
  ('water_sports', 'Competition Swimming Pools', 'competition-swimming-pools',
   'Design, build, and outfitting of competition and training swimming pools, including filtration and lane-marking systems.',
   '{"lanes":"6-10","depth":"1.2m-2m","use":"Training or competition"}'),
  ('water_sports', 'Splash Pads & Water Play Zones', 'splash-pads-water-play-zones',
   'Recreational splash pad installations for community and academy water-play areas.',
   '{"use":"Recreational","ageGroup":"All ages"}'),
  ('budget_sports', 'Budget Multi-Sport Turf', 'budget-multi-sport-turf',
   'Cost-optimized synthetic turf for schools and community grounds needing durable surfacing without full competition-grade specs.',
   '{"pileHeight":"35-40mm","use":"Multi-sport, community"}'),
  ('sports_academies', 'Sports Academy Infrastructure Package', 'sports-academy-infrastructure-package',
   'End-to-end infrastructure for sports academies: pitch/court construction, floodlighting, seating, and equipment outfitting.',
   '{"includes":"Pitch, lighting, seating, equipment"}'),
  ('play_zones', 'Kids'' Play Zone Surfacing', 'kids-play-zone-surfacing',
   'Impact-absorbing rubber and EPDM flooring for children''s play zones, built for safety compliance and weather durability.',
   '{"surface":"EPDM / Rubber","use":"Play zones, parks"}')
on conflict (slug) do nothing;

insert into projects (title, slug, client_name, location, state, category, description, completed_on) values
  ('FIFA-Certified Turf Installation', 'fifa-certified-turf-delhi', 'Delhi Sports Authority', 'New Delhi', 'Delhi', 'surface_sports',
   'Our first FIFA-certified turf installation — a full-size football pitch built to Quality Pro specification.', '2019-03-01'),
  ('Multi-Sport Academy Campus', 'multi-sport-academy-gurgaon', 'Gurgaon Sports Academy', 'Gurgaon', 'Haryana', 'sports_academies',
   'A full academy build-out including a FIFA-standard pitch, IAAF athletics track, and academy seating.', '2021-06-01'),
  ('Indoor Badminton Complex', 'indoor-badminton-complex-kerala', 'Kerala Badminton Association', 'Kochi', 'Kerala', 'small_sports',
   'An eight-court indoor badminton complex with PU flooring tuned for shuttle response.', '2022-01-01'),
  ('Competition Swimming Pool', 'competition-swimming-pool-mumbai', 'Mumbai Aquatics Club', 'Mumbai', 'Maharashtra', 'water_sports',
   'A ten-lane competition swimming pool with full filtration and lane-marking systems.', '2022-09-01'),
  ('Synthetic Tennis Courts', 'synthetic-tennis-courts-bangalore', 'Bangalore Tennis Club', 'Bangalore', 'Karnataka', 'small_sports',
   'Four acrylic tennis courts built for club-level competition play.', '2023-02-01'),
  ('Community Play Zone', 'community-play-zone-jaipur', 'Jaipur Municipal Corporation', 'Jaipur', 'Rajasthan', 'play_zones',
   'An EPDM-surfaced children''s play zone built for a public community park.', '2023-08-01'),
  ('School Multi-Sport Ground', 'school-multi-sport-ground-chennai', 'Chennai Public School', 'Chennai', 'Tamil Nadu', 'budget_sports',
   'A budget-tier synthetic turf ground serving football, hockey, and athletics for a school campus.', '2024-01-01'),
  ('IAAF Athletics Track', 'iaaf-athletics-track-lucknow', 'Uttar Pradesh Sports Council', 'Lucknow', 'Uttar Pradesh', 'surface_sports',
   'An eight-lane IAAF Class 1 athletics track built for state-level competition.', '2024-05-01')
on conflict (slug) do nothing;

insert into certifications (name, description, sort_order) values
  ('ISO 9001:2015', 'Certified quality management system.', 1),
  ('FIFA Quality', 'FIFA-certified football turf installations.', 2),
  ('IAAF Certified', 'IAAF-standard athletics track construction.', 3),
  ('BIS Approved', 'Bureau of Indian Standards approved materials.', 4)
on conflict (name) do nothing;
