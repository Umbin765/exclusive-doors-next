# Admin UI Redesign — Design Spec

**Date:** 2026-05-12
**Status:** Approved
**Project:** exclusive-doors-api (Filament v3 admin panel)

---

## 1. Overview

Redesign the Filament v3 admin panel to reduce visual complexity and make product management more intuitive. Three problems to solve:

1. **Navigation overload** — 11 flat sidebar items with no grouping
2. **Generic theme** — default Filament dark look with no brand identity
3. **Product form too long** — all related data (specs, gallery, scroll stops, detail panels, finishes) on one scrolling page

---

## 2. Theme

Replace the default Filament dark theme with a custom light theme using the same typefaces and colour vocabulary as the public Next.js site.

### Colours

| Token | Value | Usage |
|---|---|---|
| Background | `#F5F5F3` | Page background |
| Surface | `#FFFFFF` | Sidebar, cards, inputs, table rows |
| Accent | `#2C2418` | Active nav item, tab underline, toggle on, primary button |
| Border | `#E8E8E5` | All dividers, input borders, card borders |
| Text primary | `#2C2418` | Headings, labels, input values |
| Text muted | `#7A7A78` | Inactive nav items, secondary text |
| Text subtle | `#BEBEBE` | Group labels, breadcrumb, placeholder text |
| Active nav bg | `#EFEDE9` | Background of selected nav item |
| Hint bg | `#EFEDE9` | Instructional hint boxes |

No orange (`#FF6600`) in the admin — that colour belongs to the public site only.

### Typography

| Role | Font | Weight |
|---|---|---|
| Logo, page titles | Cormorant Garamond | 600 |
| All UI text | DM Sans | 400 / 500 / 600 / 700 |

### Active nav indicator

Selected item: `background #EFEDE9`, `color #2C2418`, `font-weight 600`, `border-right: 2px solid #2C2418`.

---

## 3. Navigation

### Sidebar structure

Replace the flat 11-item list with 4 named groups. "Setări" is collapsed by default (opacity 0.38) since it contains rarely-used config.

```
Dashboard                        ← standalone, no group

── Catalog ──────────────────
  Produse
  Categorii
  Conținut CMS

── Clienți ──────────────────
  Clienți
  Tranzacții
  Lead-uri
  Referrals

── Marketing ────────────────
  Promoții
  Email                          ← merged resource (see §3.1)

── Setări (collapsed) ───────
  Config Referral
```

### 3.1 Email resource merge

Email Templates and Email Triggers are merged into a single **Email** Filament resource with two internal tabs: **Template-uri** and **Trigger-uri**. This removes one sidebar item while keeping both features accessible.

### Sidebar footer

A user avatar + name + role strip sits at the bottom of the sidebar, above nothing else.

---

## 4. Product Form — Tab Layout

Replace the single long-scroll product form with 4 tabs. The tab bar sits directly below the page title. Save button is in the page header (top right), always visible regardless of active tab.

### Tab 1 — Bază

Core fields required before a product can be published. All fields displayed in a 2-column grid.

| Field | Notes |
|---|---|
| Categorie | Select |
| Slug | Auto-generated from name, editable |
| Eyebrow | Text |
| Nume produs | Text |
| Model / SKU | Text |
| Preț de la (EUR) | Decimal |
| Descriere scurtă | Textarea, full width |
| Vizibil pe site | Toggle — default off for new products |
| Made in Germany | Toggle — default off |
| Reducere (%) | Optional integer, triggers sale badge on frontend |

### Tab 2 — Galerie

- Filament `SpatieMediaLibraryFileUpload` or native `FileUpload` with `reorderable()`
- Hint text: "Trage imaginile pentru a le reordona. Prima imagine apare pe cardul din catalog."
- Order badge (1, 2, 3…) shown on each thumbnail

### Tab 3 — Conținut

Two repeater sections on one tab:

**Specificații tehnice** — key/value repeater (key col 1fr, value col 2fr), drag-to-reorder, no minimum.

**Panouri detaliu** — repeater with title, spec_key, spec_val, body (textarea), image upload per panel. Caption: "(3–5 afișate pe pagina produsului)". Scroll stops (`product_scroll_stops` + `product_scroll_stop_stats`) also live here, below detail panels.

### Tab 4 — Finisaje

Two optional sections, clearly marked as optional via hint box.

**Finisaje disponibile** — repeater: colour picker (hex), label text, drag-to-reorder.

**Taguri** — tag select/create input. Existing tags shown as pills.

---

## 5. Dashboard

Retain existing widgets with updated styling:

- **Stats row** — 4 stat cards in a single row: Clienți total, Lead-uri luna aceasta, Promoții active, Referrals în așteptare
- **Two-column layout below stats** — chart (Clienți noi, last 30 days) on the left, Lead-uri recente table on the right
- Stat card delta text (e.g. "+1 luna aceasta") in `#5A8A5A` green

---

## 6. Filament Implementation Notes

- Use `FilamentServiceProvider` / `AdminPanelProvider` with a custom theme compiled via `php artisan filament:assets`
- Custom theme: create `resources/css/filament/admin/theme.css`, extend Filament's Tailwind preset, override colour tokens
- Navigation groups: use `NavigationGroup` in each resource's `getNavigationGroup()` method
- Email merge: create a new `EmailResource` with two `Tab` pages (ListEmailTemplates, ListEmailTriggers) instead of two separate resources; remove the old separate resources from the panel
- Product tabs: use Filament `Tabs` layout component wrapping the existing form fields — no schema logic changes required, only layout restructuring
- `Setări` group collapsed by default: `NavigationGroup::make('Setări')->collapsed()`

---

## 7. Out of Scope

- Mobile responsiveness of the admin panel (Filament handles this by default)
- Any changes to the existing API endpoints or data models
- Changes to any other resource's form layout (only Products is being restructured)
- Dark mode toggle
