# Moran Team · Bay Area Market Intelligence OS

A keyboard-driven monthly briefing for Moran Team (CBRE Science & Innovation). Capital partners, developers, and pension-fund managers read the market from a high-contrast paper rail. The living map always sits on the right.

**Layout rule:** briefing content is at least half of the 16:9 frame (50/50, or 55/45 when a table needs it). Never again a skinny 33/67 paper column. Cluster tables, chatter, and comps cross the rail. The map does not overlap the table.

The Q2 2026 story: vacant life-science shells are still the AI tour. Office and R&D prints are Q2. Life-science vacancy is the existing Q4 2025 / Q1 2026 cluster — we did not invent a science quarterly. Proof is 150 Industrial Road, San Carlos — 230,961 SF, former Novartis, Moran Team transaction, leased to an unnamed robotics user.

Every print lives in `src/data/snapshot/*.json` and is assembled by `src/data/load.ts`. Do not invent numbers. Stanford Research Park is a landmark logo on the four-geo cluster map only — there is no SRP chapter. There is no Capital Markets chapter.

Rents are spoken as monthly dollars per SF (`$5.52/sf NNN` or `$6.08/sf FSG`). Annual FSG source prints are divided by 12. Named companies get a real logo; a 404 falls back to a one-letter mark. Unnamed tenants stay unnamed.

## Run

```bash
npm install
npm run dev
```

Opens at [http://127.0.0.1:43173](http://127.0.0.1:43173).

Production: [https://moran-monthly-market-os.vercel.app](https://moran-monthly-market-os.vercel.app)

## Modes

| Mode | URL | Keys |
| --- | --- | --- |
| Master (11 scenes) | `/#cover` | `P` |
| Twin (living map) | `/#twin/cover` | `T` |
| Share / compile | `/#share/cover` | `S` |

Jump legend: Overview · Markets map · SV R&D · Life science · Office · Exploding / AI · Power blueprint · Funding · Mission Bay · Live inventory · Decision.

Map pins on cluster chapters are the four geos only — San Francisco, SF Peninsula, Silicon Valley, East Bay — with color polygons, university marks, 101 / 280 / 880 shields, and spaced leader lines. Mission Bay keeps numbered property pins and a UCSF campus outline.

Audience lens: `1` Occupier · `2` Owner · `3` Lender. `←` `→` Space · `F` fullscreen · `Shift+P` print 16:9 from Share.

## Sources in this restage

- CBRE Research Q2 2026 — SF / Peninsula / Greater SV / Oakland office and Silicon Valley R&D
- CBRE Research Q4 2025 / Q1 2026 — Bay Area life science cluster (not restated as a Q2 science quarterly)
- PitchBook / Crunchbase Bay Area VC Q4 2025 and FY 2025
- February 3 deck — SF AI leasing and high-powered AI tenant spec
- Moran-Bennett Mission Bay one-pager, Q4 2025 — LS vacancy only; office vacancy is the Q2 pack (17.0%, not 22.7%)
- CBRE Research, Scoring Tech Talent 2026 (August 2026) — recurring proof points only
- 150 Industrial / San Carlos Research Center — Moran Team transaction
- Power working layer, 11 May 2026

## Stack

Vite · React · TypeScript · Tailwind v4 · Motion · MapLibre GL.
