# K-Trip Planner 🧭

Taste-based trip planner for cities around Daejeon, Korea. English & 한국어.

**Live:** https://kang-hoon.github.io/gongju-trip/

Pick a city → set trip length, start/end time, origin and transport → answer 10 quick questions → get an hour-by-hour plan with meals, closing-day checks and a shareable link.

## Features
- **Find your city**: 11-question quiz matches you against 52 places (`data/places.json`, rubric in `data/rubric.md`), shows best match / also great / hidden gem with reasons, Seoul district picks, a shareable result card, and links into the planner and badges. Logic in `js/finder-core.js`.
- 11 cities: Seoul, Busan, Gyeongju, Jeju, Gangneung (`js/cities2.js`) + Gongju, Buyeo, Daejeon, Sejong, Cheongju, Jeonju (`js/data.js`)
- Day trip, 1 night 2 days, 2 nights 3 days (long stays add a nearby city as a day trip)
- Start / end time per day, optional date (Monday closures are skipped automatically)
- Public transport (default) or car, coming from Seoul / Incheon Airport / Daejeon / already in the city
- Monthly closures (e.g. 1st Monday) via `closedNth`
- 10-question taste quiz → profile, persona, best-matching cities
- Remove any stop and the plan re-builds; the URL always reproduces the exact plan
- City theme voting and a short feedback survey (stored in Supabase)
- **Korea Badges** at [`/badges/`](https://kang-hoon.github.io/gongju-trip/badges/): 61 pixel badges (Seoul's 10 districts + 49 destinations + 2 bonus planner cities), ranks, region completion, shareable collection link and badge-card image. Badge art lives in `badges/icons.js` + `badges/render.js`, so the style can be swapped without touching the data.
- Original quiz for Michael is kept at [`/michael/`](https://kang-hoon.github.io/gongju-trip/michael/)

## Structure
```
index.html          app shell
css/style.css       styles
js/data.js          cities, spots, hours, meals, themes  ← edit content here
js/quiz.js          quiz questions
js/planner.js       scoring + itinerary builder
js/app.js           views, routing, sharing, survey UI
js/i18n.js          UI strings (en / ko)
js/store.js         Supabase REST + localStorage fallback
js/config.js        Supabase URL + anon key
supabase/schema.sql tables, view, row-level security
```

## Connect Supabase (votes & survey)
1. Create a free project at supabase.com.
2. SQL Editor → paste and run `supabase/schema.sql`.
3. Settings → API → copy the **Project URL** and **anon public** key into `js/config.js`.
4. Commit and push. Without these values the site still works; votes stay in the visitor's browser.

Read results in the SQL editor:
```sql
select * from theme_vote_counts order by city_id, votes desc;
select city_id, round(avg(rating), 2), count(*) from survey_responses group by city_id;
```

## Adding a city
Add an object to `CITIES` in `js/data.js` (same shape as the others: `from` travel minutes, `areaTime`, `themes`, `spots`, `meals`, `tips`). Hours are approximate — please verify against official sites.

## Run locally
ES modules need a server: `python3 -m http.server` then open http://localhost:8000.
