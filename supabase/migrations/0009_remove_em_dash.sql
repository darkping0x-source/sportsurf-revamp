-- 0002_seed.sql seeded this description with an em dash; fixing the live row.

update projects set description = 'Our first FIFA-certified turf installation, a full-size football pitch built to Quality Pro specification.' where slug = 'fifa-certified-turf-delhi';
