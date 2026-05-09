# Exclusive Doors — Laravel Backend Design Spec

**Date:** 2026-05-10
**Status:** Approved

---

## 1. Overview

A Laravel 11 backend serving two purposes:

1. **REST API** consumed by the existing Next.js 14 frontend (replacing hardcoded `lib/data.ts`)
2. **Filament v3 admin panel** at `admin.exclusivedoors.ro` for staff to manage all content, customers, referrals, promotions, and email automation

The public site remains Next.js for SEO. Laravel handles all data, business logic, and email delivery. No e-commerce checkout — this is a showroom/consultation model. All transactions are logged manually by staff.

---

## 2. Stack

| Layer | Technology |
|---|---|
| Public frontend | Next.js 14 (existing, unchanged) |
| Backend API | Laravel 11 (REST/JSON) |
| Admin panel | Filament v3 |
| Database | MySQL |
| Email | Resend |
| File storage | Cloudflare R2 / S3 |
| Queue | Laravel Queues (database driver, upgradeable to Redis) |
| Scheduler | Laravel Scheduler (hourly behavioral trigger checks) |

---

## 3. Data Models

### 3.1 Product

Every field rendered on the public product pages is editable from the admin.

```
products
├── id, slug (unique), category_id (FK)
├── eyebrow          — e.g. "Ușă interior · Furnir"
├── name             — e.g. "Filomuro"
├── model            — e.g. "FMR-200 · La comandă"
├── description      — richtext, also used as pull quote on detail page
├── starting_price   — decimal, EUR
├── sale_percent     — nullable integer, triggers sale badge + discounted price
├── made_in_germany  — boolean, triggers badge on card and detail page
├── is_visible       — boolean
├── sort_order       — integer
└── timestamps

product_tags (many-to-many pivot: product_id, tag_id)
tags: id, name

product_gallery_images (ordered)
├── id, product_id, path, sort_order

product_specs (ordered)
├── id, product_id, key, value, sort_order
— e.g. key="Material", value="Furnir stejar natural"
— spec icons are auto-generated on frontend based on key name

product_finishes (ordered)
├── id, product_id, color (hex), label, sort_order
— e.g. color="#c8a96e", label="Stejar natural"
— not currently rendered, ready for future UI

product_detail_panels (ordered, 3-5 per product)
├── id, product_id, title, body, spec_key, spec_val, image_path, sort_order

product_scroll_stops (ordered, ~5 per product)
├── id, product_id, eyebrow, title, body, image_path, sort_order

product_scroll_stop_stats (ordered)
├── id, scroll_stop_id, num, label, sort_order
— e.g. num="3mm", label="Toleranță fabricație"
```

### 3.2 Category

```
categories
├── id, slug         — "interior" | "exterior" | "glisante" | "pivotante"
├── label            — eyebrow text on category hero
├── heading          — H1 on category listing page
├── sub              — subtitle paragraph
├── image_path
└── timestamps
```

### 3.3 Content Blocks (CMS)

Stores every editable text or image on the site that is not a product or category.

```
content_blocks
├── id
├── key    — unique, e.g. "hero.title", "hero.subtitle", "about.body", "faq.1.question"
├── type   — "text" | "richtext" | "image"
├── value
└── timestamps
```

Examples: hero heading, hero stats, product section copy, portfolio items, FAQs, blog posts, footer columns, consultant info (currently hardcoded as Monica Dochia).

### 3.4 Customer

```
customers
├── id, name, email (unique), phone
├── password (hashed)
├── email_verified_at (nullable)
├── source               — "registered" | "referred" | "lead"
├── referred_by_id       — nullable FK to customers
├── referral_code        — nullable, generated after first transaction is logged by staff
├── referral_count       — integer default 0, increments on each converted referral
├── base_discount_pct    — decimal default 5.00 (globally configurable)
└── timestamps
```

### 3.5 Transactions

Logged manually by staff only. No self-service checkout.

```
transactions
├── id, customer_id (FK), amount (decimal), notes (text)
├── transaction_date
├── created_by           — FK to users (staff)
└── timestamps
```

On first transaction logged for a customer → system auto-generates their `referral_code`.

### 3.6 Referrals & Milestone Rewards

```
referrals
├── id
├── referrer_id          — FK to customers (who shared the link)
├── referred_id          — FK to customers (who registered via link)
├── status               — "pending" | "converted"
├── reward_granted       — boolean, set when milestone is triggered
└── timestamps

referral_reward_config   — single-row config table, managed in admin
├── id
├── milestone            — integer, default 3 (configurable to 5, etc.)
├── reward_type          — "discount" | "free_service"
├── reward_value         — discount % or free service description
└── resets_after_milestone — boolean, always true
```

**Milestone flow:**
1. Staff logs transaction for referred customer → marks Referral `converted`
2. `referral_count` on referrer increments by 1
3. If `referral_count` reaches `milestone` → reward granted → `referral_count` resets to 0
4. Staff is notified in Filament; customer can be emailed automatically

### 3.7 Leads

Form submissions from non-registered visitors.

```
leads
├── id, name, email, phone (nullable)
├── message (text)
├── source_page          — which page the form was on
├── converted_to_customer_id — nullable FK, set when staff converts lead
└── timestamps
```

### 3.8 Behavioral Tracking & Email Automation

```
tracking_events
├── id, session_id, email (nullable)
├── page_url
├── event_type           — "page_view" | "form_submit"
└── created_at

email_templates
├── id, name, subject
├── body                 — HTML with {{variable}} placeholders
└── timestamps

email_triggers
├── id, name, is_active
├── condition_type       — "page_visited" | "no_return_after_visit" | "form_submitted"
├── condition_value      — e.g. "/products/exterior"
├── delay_hours          — wait before sending
├── email_template_id    — FK to email_templates
└── timestamps

email_trigger_logs       — prevents duplicate sends
├── id, trigger_id, email, sent_at
```

**Automation flow:**
1. Next.js sends `POST /api/track` on every page load with `{ session_id, email?, page_url }`
2. Event stored in `tracking_events`
3. Laravel Scheduler runs hourly → evaluates active triggers against events
4. Matching emails queued via Laravel Jobs → delivered via Resend
5. Log entry created to prevent re-sending

### 3.9 Promotions

```
promotions
├── id, name
├── type                 — "percentage" | "fixed"
├── value                — discount amount or percentage
├── scope                — "all" | "category" | "product"
├── stackable            — boolean: can combine with base_discount_pct?
├── conditions           — JSON: { requires_account, min_referral_count, ... }
├── starts_at, ends_at   — nullable datetime
├── is_active
└── timestamps

promotion_targets        — which categories or products the promotion applies to
├── promotion_id, target_type ("category"|"product"), target_id
```

---

## 4. API Endpoints (Next.js consumes)

All responses are JSON. Public endpoints are unauthenticated. Customer endpoints use Laravel Sanctum tokens.

```
# Content
GET  /api/products                    — all visible products
GET  /api/products/{slug}             — single product with all relations
GET  /api/categories                  — all categories with meta
GET  /api/content/{key}               — single content block by key
GET  /api/content?keys[]=a&keys[]=b  — batch fetch multiple content blocks

# Tracking & Leads
POST /api/track                       — { session_id, email?, page_url }
POST /api/leads                       — { name, email, phone?, message, source_page }

# Auth
POST /api/auth/register               — { name, email, phone, password }
POST /api/auth/login                  — { email, password }
POST /api/auth/logout                 — (authenticated)

# Customer (authenticated)
GET  /api/customers/me                — profile, referral_count, discount, referral_code
GET  /api/referral/{code}             — validate referral code before showing modal
POST /api/auth/register-with-referral — { ...register fields, referral_code }
```

---

## 5. Filament Admin Panel

### Resources

| Resource | Key Capabilities |
|---|---|
| **Products** | Full CRUD with inline editors for specs, scroll stops, detail panels, finishes, gallery images (drag-to-reorder) |
| **Categories** | Edit hero label, heading, subtitle, image |
| **Content Blocks** | Key-value CMS editor for all site text and images |
| **Customers** | List/search, view profile + referral history, manually send email, apply custom discount, create account on behalf of customer |
| **Transactions** | Log new sale (triggers referral_code generation if first), view history per customer |
| **Referrals** | View pending/converted, mark as converted (triggers milestone check), view reward status |
| **Referral Rewards** | Configure milestone number, reward type, reward value |
| **Promotions** | Create/edit promotions with scope, conditions, date ranges, stackability |
| **Email Templates** | HTML editor with variable reference panel |
| **Email Triggers** | Configure behavioral automation: condition type, page URL pattern, delay, template |
| **Leads** | View form submissions, convert lead to customer |

### Dashboard Widgets

**Stats row:**
- Total customers (+ delta this month)
- New leads this month
- Active promotions
- Pending referrals

**Charts:**
- New customers over time (line, last 30/90 days, toggleable)
- Page views by URL (bar, top 10 pages)
- Referral conversions over time (bar)

**Tables:**
- Top 5 most visited products (from tracking_events)
- Recent leads (name, email, source page, date)
- Recent transactions (customer, amount, date)

---

## 6. Referral UX Flow

1. Customer has first transaction logged by staff → `referral_code` generated → customer receives email with their unique link: `https://exclusivedoors.ro/?ref=CODE`
2. Recipient clicks link → homepage loads → registration modal appears automatically (cannot be dismissed without registering — referral only activates on account creation)
3. Recipient registers → Referral record created (`status: pending`, `referred_by_id` set)
4. Staff logs recipient's first transaction → marks Referral as `converted` → `referral_count` on referrer increments
5. If `referral_count` reaches milestone → reward granted → `referral_count` resets to 0 → both referrer and staff notified

---

## 7. Discount & Promotion Priority

1. **Base discount** — `customer.base_discount_pct` (default 5% on account creation)
2. **Milestone reward** — applied as one-time discount or noted as free service
3. **Active promotions** — applied if conditions met; stackable flag determines if they combine with base discount

---

## 8. Out of Scope

- Online checkout / payment processing
- Customer self-service transaction history (staff-only)
- Mobile app
- Multi-language admin (Romanian only)
- Real-time notifications (polling or scheduler is sufficient)
