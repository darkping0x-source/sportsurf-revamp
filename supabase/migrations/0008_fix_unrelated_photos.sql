-- Picsum's seeded photos are literally random and unrelated to their label
-- (a pair of heels for Talent Scout, a turntable for Adventure Sports
-- Arena). Replacing these two with specific, manually verified Unsplash
-- photos (free tier, not Unsplash+) that actually match the subject: a
-- bouldering wall with no people in frame, and an aerial shot of a
-- professional turf field (no branding/logos visible) for the
-- "sensor-embedded performance turf" project.

update projects set image_url = 'https://images.unsplash.com/photo-1659666287295-7da26c3f80d4?w=1200&h=800&fit=crop&q=80' where slug = 'adventure-sports-arena-pune';

update projects set image_url = 'https://images.unsplash.com/photo-1510679980-48540f7d5879?w=1200&h=800&fit=crop&q=80' where slug = 'talent-scout-performance-center-ahmedabad';
