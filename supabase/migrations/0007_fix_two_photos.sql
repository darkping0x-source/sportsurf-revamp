-- Every LoremFlickr candidate checked for these two spots came back broken:
-- solid-color letterboxing baked into the image (source photo doesn't match
-- the requested aspect ratio), extreme close-up crops, or an unrelated
-- result entirely (the tag search isn't reliable for these two subjects).
-- Reverting both back to their original Picsum photos, which don't have
-- this problem.

update products set image_url = 'https://picsum.photos/seed/sportsurf-climbing/800/600' where slug = 'climbing-wall-setup';

update projects set image_url = 'https://picsum.photos/seed/sportsurf-proj-pune/1200/800' where slug = 'adventure-sports-arena-pune';
