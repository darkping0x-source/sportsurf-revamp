-- Replaces the random Picsum photos with real, thematically relevant ones.
-- Each URL below was manually reviewed (see PROMPTS.md) to confirm it
-- actually matches its label and avoids identifiable people/brand logos —
-- LoremFlickr's tag search pulls from Flickr's full pool, so results vary a
-- lot by keyword and needed spot-checking rather than blind trust.

update products set image_url = 'https://loremflickr.com/800/600/artificial-turf,football-field?lock=501' where slug = 'fifa-certified-football-turf';
update products set image_url = 'https://loremflickr.com/800/600/sports,complex,building?lock=508' where slug = 'iaaf-certified-athletics-track';
update products set image_url = 'https://loremflickr.com/800/600/badminton-court,indoor?lock=503' where slug = 'badminton-court-flooring';
update products set image_url = 'https://loremflickr.com/800/600/tennis-court,empty?lock=504' where slug = 'synthetic-tennis-courts';
update products set image_url = 'https://loremflickr.com/800/600/swimming-pool,lanes?lock=505' where slug = 'competition-swimming-pools';
update products set image_url = 'https://loremflickr.com/800/600/water,park,slide?lock=506' where slug = 'splash-pads-water-play-zones';
update products set image_url = 'https://loremflickr.com/800/600/artificial-turf,football-field?lock=501' where slug = 'budget-multi-sport-turf';
update products set image_url = 'https://loremflickr.com/800/600/sports,complex,building?lock=508' where slug = 'sports-academy-infrastructure-package';
update products set image_url = 'https://loremflickr.com/800/600/playground,park?lock=709' where slug = 'kids-play-zone-surfacing';
update products set image_url = 'https://loremflickr.com/800/600/climbing,wall,gym?lock=610' where slug = 'climbing-wall-setup';
update products set image_url = 'https://loremflickr.com/800/600/zip,line,adventure?lock=619' where slug = 'zip-line-ropes-course';
update products set image_url = 'https://loremflickr.com/800/600/obstacle,course,ropes?lock=512' where slug = 'obstacle-course-rig';
update products set image_url = 'https://loremflickr.com/800/600/parkour,urban?lock=513' where slug = 'parkour-setup';
update products set image_url = 'https://loremflickr.com/800/600/control,room,screens?lock=514' where slug = 'tactical-board-room';
update products set image_url = 'https://loremflickr.com/800/600/sports,complex,building?lock=508' where slug = 'performance-tracking-turf';

update projects set image_url = 'https://loremflickr.com/1200/800/artificial-turf,football-field?lock=501' where slug = 'fifa-certified-turf-delhi';
update projects set image_url = 'https://loremflickr.com/1200/800/sports,complex,building?lock=508' where slug = 'multi-sport-academy-gurgaon';
update projects set image_url = 'https://loremflickr.com/1200/800/badminton-court,indoor?lock=503' where slug = 'indoor-badminton-complex-kerala';
update projects set image_url = 'https://loremflickr.com/1200/800/swimming-pool,lanes?lock=505' where slug = 'competition-swimming-pool-mumbai';
update projects set image_url = 'https://loremflickr.com/1200/800/tennis-court,empty?lock=504' where slug = 'synthetic-tennis-courts-bangalore';
update projects set image_url = 'https://loremflickr.com/1200/800/playground,park?lock=709' where slug = 'community-play-zone-jaipur';
update projects set image_url = 'https://loremflickr.com/1200/800/artificial-turf,football-field?lock=501' where slug = 'school-multi-sport-ground-chennai';
update projects set image_url = 'https://loremflickr.com/1200/800/sports,complex,building?lock=508' where slug = 'iaaf-athletics-track-lucknow';
update projects set image_url = 'https://loremflickr.com/1200/800/climbing,wall,gym?lock=610' where slug = 'adventure-sports-arena-pune';
update projects set image_url = 'https://loremflickr.com/1200/800/control,room,screens?lock=514' where slug = 'talent-scout-performance-center-ahmedabad';
