-- The LoremFlickr lock=508 "sports,complex,building" photo (from 0006) started
-- returning HTTP 500, breaking 5 rows that all shared it: 3 products and 2
-- projects. Swapping in the same verified Unsplash photos now used in
-- 0006's source for fresh installs.

update products set image_url = 'https://images.unsplash.com/photo-1502954268779-a2e1a7cca09c?w=800&h=600&fit=crop&q=80' where slug = 'iaaf-certified-athletics-track';
update products set image_url = 'https://images.unsplash.com/photo-1771909713569-356610d7e192?w=800&h=600&fit=crop&q=80' where slug = 'sports-academy-infrastructure-package';
update products set image_url = 'https://images.unsplash.com/photo-1502954268779-a2e1a7cca09c?w=800&h=600&fit=crop&q=80' where slug = 'performance-tracking-turf';

update projects set image_url = 'https://images.unsplash.com/photo-1771909713569-356610d7e192?w=1200&h=800&fit=crop&q=80' where slug = 'multi-sport-academy-gurgaon';
update projects set image_url = 'https://images.unsplash.com/photo-1502954268779-a2e1a7cca09c?w=1200&h=800&fit=crop&q=80' where slug = 'iaaf-athletics-track-lucknow';
