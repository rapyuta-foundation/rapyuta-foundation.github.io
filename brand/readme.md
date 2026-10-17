# brand

Logo files for rapyuta foundation. The heart playground lives at `heart/index.html` in this repo and is served, unlisted, at https://rapyuta-foundation.org/heart/.

These files moved here on 2026-10-18 from the private repo rapyuta-foundation/rf_brand, which is now archived. Everything in this folder is public.

## Files

| File | What it is |
| --- | --- |
| `rf_logo_v2_heart.svg` | Current logo (v2): Rapyuta Robotics mark, bold "rapyuta", regular "foundation", brushstroke heart in place of the red circle |
| `rf_logo_v2_heart_1600.png` | The same logo as a transparent PNG, 1600 px wide |
| `rf_logo_v2_settings.json` | Exact heart settings for v2, so the logo can be rebuilt |
| `rf_logo.js` | The code behind the logo: mark from two golden-ratio circles, wordmark outlines, heart generators |
| `rf_heart_brush_reference.png` | The brushstroke heart image used in v2, recolored to Rapyuta Red |

## Rules

- The wordmark is always part of the logo. The mark is never used on its own.
- The mark is built from two circle radii in the golden ratio (R = r × φ). The gap between the heart and the black is r/φ by default; v2 deliberately goes closer to look bold.
- File names: lowercase with underscores.

Open https://rapyuta-foundation.org/heart/ (or `heart/index.html` locally) to try settings; press **Copy settings** to record a result. The playground page carries a noindex tag so search engines skip it; keep that tag when editing it.
