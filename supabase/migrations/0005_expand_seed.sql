-- Adds imagery/ratings to the existing catalog and seeds the 3 new
-- categories added in 0004, so the photo-card layouts have real content.

update products set image_url = 'https://picsum.photos/seed/sportsurf-fifaturf/800/600', rating = 4.9, review_count = 1450 where slug = 'fifa-certified-football-turf';
update products set image_url = 'https://picsum.photos/seed/sportsurf-iaaftrack/800/600', rating = 4.8, review_count = 980 where slug = 'iaaf-certified-athletics-track';
update products set image_url = 'https://picsum.photos/seed/sportsurf-badminton/800/600', rating = 4.7, review_count = 1120 where slug = 'badminton-court-flooring';
update products set image_url = 'https://picsum.photos/seed/sportsurf-tennis/800/600', rating = 4.8, review_count = 860 where slug = 'synthetic-tennis-courts';
update products set image_url = 'https://picsum.photos/seed/sportsurf-pool/800/600', rating = 4.9, review_count = 1310 where slug = 'competition-swimming-pools';
update products set image_url = 'https://picsum.photos/seed/sportsurf-splash/800/600', rating = 4.6, review_count = 540 where slug = 'splash-pads-water-play-zones';
update products set image_url = 'https://picsum.photos/seed/sportsurf-budgetturf/800/600', rating = 4.5, review_count = 720 where slug = 'budget-multi-sport-turf';
update products set image_url = 'https://picsum.photos/seed/sportsurf-academy/800/600', rating = 4.9, review_count = 1600 where slug = 'sports-academy-infrastructure-package';
update products set image_url = 'https://picsum.photos/seed/sportsurf-playzone/800/600', rating = 4.7, review_count = 630 where slug = 'kids-play-zone-surfacing';

insert into products (category, name, slug, description, specs, image_url, rating, review_count) values
  ('adventure_sports', 'Climbing Wall Setup', 'climbing-wall-setup',
   'Indoor bouldering and climbing wall installations with certified holds and crash-pad flooring for adventure sports centers.',
   '{"height":"6-12m","holds":"Certified resin","use":"Indoor climbing gyms"}',
   'https://picsum.photos/seed/sportsurf-climbing/800/600', 4.8, 410),
  ('adventure_sports', 'Zip Line & Ropes Course', 'zip-line-ropes-course',
   'High and low ropes courses with zip lines, engineered for adventure parks and outdoor training centers.',
   '{"use":"Outdoor adventure parks","safety":"Fall-arrest certified"}',
   'https://picsum.photos/seed/sportsurf-zipline/800/600', 4.7, 260),
  ('challenge_courses', 'Obstacle Course Rig', 'obstacle-course-rig',
   'Modular obstacle course rigs for fitness challenges, military-style training, and competitive events.',
   '{"modules":"12-20 stations","use":"Fitness events, training centers"}',
   'https://picsum.photos/seed/sportsurf-obstacle/800/600', 4.6, 380),
  ('challenge_courses', 'Parkour Setup', 'parkour-setup',
   'Purpose-built parkour and freerunning structures with impact-absorbing landing zones.',
   '{"use":"Parkour gyms, youth centers"}',
   'https://picsum.photos/seed/sportsurf-parkour/800/600', 4.7, 310),
  ('talent_scout', 'Tactical Board Room', 'tactical-board-room',
   'Video-analysis and tactical training rooms for talent scouting programs, with performance tracking integration.',
   '{"use":"Talent scout clubs, academies"}',
   'https://picsum.photos/seed/sportsurf-tactical/800/600', 4.9, 590),
  ('talent_scout', 'Performance Tracking Turf', 'performance-tracking-turf',
   'Sensor-embedded turf for talent-scouting programs that track player speed, load, and movement patterns.',
   '{"use":"Talent scout clubs","tech":"Embedded sensors"}',
   'https://picsum.photos/seed/sportsurf-tracking/800/600', 4.8, 340)
on conflict (slug) do nothing;

update projects set image_url = 'https://picsum.photos/seed/sportsurf-proj-delhi/1200/800', area_sqm = 8400, infrastructure_type = 'Synthetic Turf' where slug = 'fifa-certified-turf-delhi';
update projects set image_url = 'https://picsum.photos/seed/sportsurf-proj-gurgaon/1200/800', area_sqm = 15200, infrastructure_type = 'Multi-Sport Campus' where slug = 'multi-sport-academy-gurgaon';
update projects set image_url = 'https://picsum.photos/seed/sportsurf-proj-kerala/1200/800', area_sqm = 4200, infrastructure_type = 'Indoor Flooring' where slug = 'indoor-badminton-complex-kerala';
update projects set image_url = 'https://picsum.photos/seed/sportsurf-proj-mumbai/1200/800', area_sqm = 3600, infrastructure_type = 'Aquatics' where slug = 'competition-swimming-pool-mumbai';
update projects set image_url = 'https://picsum.photos/seed/sportsurf-proj-bangalore/1200/800', area_sqm = 2800, infrastructure_type = 'Court Surfacing' where slug = 'synthetic-tennis-courts-bangalore';
update projects set image_url = 'https://picsum.photos/seed/sportsurf-proj-jaipur/1200/800', area_sqm = 1500, infrastructure_type = 'Play Zone' where slug = 'community-play-zone-jaipur';
update projects set image_url = 'https://picsum.photos/seed/sportsurf-proj-chennai/1200/800', area_sqm = 6000, infrastructure_type = 'Multi-Sport Turf' where slug = 'school-multi-sport-ground-chennai';
update projects set image_url = 'https://picsum.photos/seed/sportsurf-proj-lucknow/1200/800', area_sqm = 12000, infrastructure_type = 'Running Track' where slug = 'iaaf-athletics-track-lucknow';

insert into projects (title, slug, client_name, location, state, category, description, completed_on, image_url, area_sqm, infrastructure_type) values
  ('Adventure Sports Arena', 'adventure-sports-arena-pune', 'Pune Adventure Club', 'Pune', 'Maharashtra', 'adventure_sports',
   'A full climbing wall and ropes course arena built for an outdoor adventure sports club.', '2024-09-01',
   'https://picsum.photos/seed/sportsurf-proj-pune/1200/800', 5200, 'Climbing & Ropes'),
  ('Talent Scout Performance Center', 'talent-scout-performance-center-ahmedabad', 'Gujarat Sports Council', 'Ahmedabad', 'Gujarat', 'talent_scout',
   'A sensor-embedded performance turf and tactical analysis center for a state talent-scouting program.', '2025-02-01',
   'https://picsum.photos/seed/sportsurf-proj-ahmedabad/1200/800', 7100, 'Performance Turf')
on conflict (slug) do nothing;

insert into certifications (name, description, sort_order) values
  ('NSIC Registered', 'National Small Industries Corporation registered supplier.', 5)
on conflict (name) do nothing;
