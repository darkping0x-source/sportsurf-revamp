-- Adds an urgency field to the quote form, matching the real site's
-- "Urgency Level" field (see PROMPTS.md / quote page redesign).

alter table quote_requests add column urgency text;
