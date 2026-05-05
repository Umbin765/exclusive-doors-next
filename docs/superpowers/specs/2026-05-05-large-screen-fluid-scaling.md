# Large Screen Fluid Scaling

**Date:** 2026-05-05  
**Status:** Approved

## Goal

Make the site scale automatically on large monitors (1440px → 1920px+) without per-breakpoint hacks. Mobile and tablet (< 1391px) are unaffected.

## Approach: Fluid HTML font-size

One CSS rule controls everything:

```css
html {
  font-size: clamp(1rem, 1.15vw, 1.375rem);
}
```

Because Tailwind uses `rem` for text sizes, spacing, padding, gaps, and max-widths — this single rule causes the entire layout to scale proportionally and automatically.

| Viewport | Base font | Scale factor |
|---|---|---|
| ≤ 1391px | 16px | 1× (no change) |
| 1440px | 16.6px | 1.04× |
| 1600px | 18.4px | 1.15× |
| 1920px | 22px (capped) | 1.375× |

Effect on key elements at 1920px:
- Hero H1 (`text-6xl`): 60px → 82px
- Nav height (`h-16` = 4rem): 64px → 88px
- Container (`max-w-7xl` = 80rem): 1280px → 1760px (fills 91% of 1920px)
- Body text (`text-lg`): 18px → 24.75px

## Additional changes

### Nav mega menu
`w-[660px]` is a hard-coded px value — convert to `w-[41.25rem]` so the dropdown also scales.

### Hero background image
Bump Unsplash image URL from `w=1600` to `w=2400` so it stays sharp on large/retina displays.

## What is NOT changed
- Mobile layout (unchanged below 1391px)
- Component structure (no new breakpoints added)
- Tailwind config (no custom screen sizes needed)
- Any px-based decorative values (borders, shadows) — these look fine not scaling
