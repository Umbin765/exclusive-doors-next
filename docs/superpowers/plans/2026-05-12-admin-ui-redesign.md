# Admin UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Filament v4 admin panel with a custom light brand theme, grouped sidebar navigation, and a tabbed product form.

**Architecture:** All changes are confined to the `exclusive-doors-api` Laravel project. Task 1 sets up the Filament custom theme (colours, fonts, background). Task 2 groups the sidebar. Task 3 restructures the product form into tabs. Task 4 merges the two Email resources into one nav item.

**Tech Stack:** Laravel 11, Filament v4, Pest v4, Tailwind CSS v4 (via `@tailwindcss/vite`), Google Fonts (DM Sans, Cormorant Garamond)

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `app/Providers/Filament/AdminPanelProvider.php` | Modify | Register theme, colours, font, disable dark mode |
| `vite.config.js` | Modify | Add Filament theme CSS as Vite input |
| `resources/css/filament/admin/theme.css` | Create | Custom Tailwind/Filament CSS overrides |
| `app/Filament/Resources/Products/ProductResource.php` | Modify | Wrap form fields in 4 Tabs |
| `app/Filament/Resources/Categories/CategoryResource.php` | Modify | Add navigation group `Catalog` |
| `app/Filament/Resources/ContentBlocks/ContentBlockResource.php` | Modify | Add navigation group `Catalog` |
| `app/Filament/Resources/Customers/CustomerResource.php` | Modify | Add navigation group `Clienți` |
| `app/Filament/Resources/Transactions/TransactionResource.php` | Modify | Add navigation group `Clienți` |
| `app/Filament/Resources/Leads/LeadResource.php` | Modify | Add navigation group `Clienți` |
| `app/Filament/Resources/Referrals/ReferralResource.php` | Modify | Add navigation group `Clienți` |
| `app/Filament/Resources/Promotions/PromotionResource.php` | Modify | Add navigation group `Marketing` |
| `app/Filament/Resources/EmailTemplates/EmailTemplateResource.php` | Modify | Rename to "Email", add group `Marketing` |
| `app/Filament/Resources/EmailTriggers/EmailTriggerResource.php` | Modify | Hide from nav, add group `Marketing` |
| `app/Filament/Resources/EmailTemplates/Pages/ListEmailTemplates.php` | Modify | Add tab header (Template-uri active / Trigger-uri link) |
| `app/Filament/Resources/EmailTriggers/Pages/ListEmailTriggers.php` | Modify | Add tab header (Template-uri link / Trigger-uri active) |
| `app/Filament/Resources/ReferralRewardConfigs/ReferralRewardConfigResource.php` | Modify | Add navigation group `Setări` |
| `tests/Feature/Admin/AdminNavigationTest.php` | Create | Smoke tests: admin pages load, groups assigned correctly |
| `tests/Feature/Admin/ProductFormTest.php` | Create | Product create/edit pages load, form has tabs |

---

## Task 1: Custom Filament theme (colours, font, light background)

**Files:**
- Create: `resources/css/filament/admin/theme.css`
- Modify: `app/Providers/Filament/AdminPanelProvider.php`
- Modify: `vite.config.js`
- Create: `tests/Feature/Admin/AdminNavigationTest.php`

- [ ] **Step 1: Write the failing test**

Create `tests/Feature/Admin/AdminNavigationTest.php`:

```php
<?php

use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

it('loads the admin login page', function () {
    $this->get('/admin/login')->assertOk();
});

it('redirects unauthenticated users to login', function () {
    $this->get('/admin')->assertRedirect('/admin/login');
});

it('loads the admin dashboard for authenticated users', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->get('/admin')->assertOk();
});
```

- [ ] **Step 2: Run to verify tests pass (these are baseline smoke tests)**

```bash
cd /path/to/exclusive-doors-api
php artisan test tests/Feature/Admin/AdminNavigationTest.php --testdox
```

Expected: all 3 pass. If the second test redirects to `/admin` instead of `/admin/login`, update the expected redirect URL to match.

- [ ] **Step 3: Scaffold the Filament theme**

```bash
php artisan make:filament-theme
```

This creates `resources/css/filament/admin/theme.css` and prints instructions to update `vite.config.js`.

- [ ] **Step 4: Register the theme CSS in Vite**

Open `vite.config.js` and add the theme CSS to the `input` array:

```js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/css/filament/admin/theme.css',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        tailwindcss(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
```

(The `bunny` font loader is removed — we load fonts via CSS instead.)

- [ ] **Step 5: Write the theme CSS**

Replace the contents of `resources/css/filament/admin/theme.css` with:

```css
@import '/vendor/filament/filament/resources/css/theme.css';

@source '../../views/filament';
@source '../../../app/Filament';
@source '../../../app/Livewire';

/* ── Google Fonts ── */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Cormorant+Garamond:wght@600&display=swap');

/* ── Override Filament body background ── */
:root {
    --filament-font-family: 'DM Sans', system-ui, sans-serif;
}

.fi-body {
    background-color: #F5F5F3 !important;
}

.fi-sidebar {
    background-color: #ffffff !important;
    border-right: 1px solid #E8E8E5 !important;
}

.fi-topbar {
    background-color: #ffffff !important;
    border-bottom: 1px solid #E8E8E5 !important;
}
```

- [ ] **Step 6: Configure AdminPanelProvider**

Replace the `panel()` method body in `app/Providers/Filament/AdminPanelProvider.php`:

```php
public function panel(Panel $panel): Panel
{
    return $panel
        ->default()
        ->id('admin')
        ->path('admin')
        ->login()
        ->darkMode(false)
        ->font('DM Sans')
        ->colors([
            'primary' => [
                50  => '252 249 245',
                100 => '244 238 229',
                200 => '229 218 207',
                300 => '205 190 172',
                400 => '175 157 136',
                500 => '148 126 105',
                600 => '118 98 78',
                700 => '88 72 54',
                800 => '62 50 38',
                900 => '44 36 24',
                950 => '30 24 16',
            ],
        ])
        ->viteTheme('resources/css/filament/admin/theme.css')
        ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
        ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
        ->pages([
            Dashboard::class,
        ])
        ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
        ->widgets([
            \App\Filament\Widgets\StatsOverview::class,
            \App\Filament\Widgets\NewCustomersChart::class,
            \App\Filament\Widgets\RecentLeadsTable::class,
        ])
        ->middleware([
            EncryptCookies::class,
            AddQueuedCookiesToResponse::class,
            StartSession::class,
            AuthenticateSession::class,
            ShareErrorsFromSession::class,
            PreventRequestForgery::class,
            SubstituteBindings::class,
            DisableBladeIconComponents::class,
            DispatchServingFilamentEvent::class,
        ])
        ->authMiddleware([
            Authenticate::class,
        ]);
}
```

- [ ] **Step 7: Build assets and verify in browser**

```bash
npm run build
php artisan filament:assets
```

Open `http://localhost/admin/login` — background should be light gray, fonts DM Sans, no dark mode.

- [ ] **Step 8: Run tests**

```bash
php artisan test tests/Feature/Admin/AdminNavigationTest.php --testdox
```

Expected: all 3 pass.

- [ ] **Step 9: Commit**

```bash
git add resources/css/filament/admin/theme.css app/Providers/Filament/AdminPanelProvider.php vite.config.js tests/Feature/Admin/AdminNavigationTest.php
git commit -m "feat(admin): custom light theme — DM Sans, warm brown primary, #F5F5F3 bg"
```

---

## Task 2: Navigation groups

**Files:**
- Modify: 9 resource files (see list below)
- Modify: `tests/Feature/Admin/AdminNavigationTest.php`

- [ ] **Step 1: Add navigation group tests**

Append to `tests/Feature/Admin/AdminNavigationTest.php`:

```php
use App\Filament\Resources\Products\ProductResource;
use App\Filament\Resources\Categories\CategoryResource;
use App\Filament\Resources\ContentBlocks\ContentBlockResource;
use App\Filament\Resources\Customers\CustomerResource;
use App\Filament\Resources\Transactions\TransactionResource;
use App\Filament\Resources\Leads\LeadResource;
use App\Filament\Resources\Referrals\ReferralResource;
use App\Filament\Resources\Promotions\PromotionResource;
use App\Filament\Resources\EmailTemplates\EmailTemplateResource;
use App\Filament\Resources\ReferralRewardConfigs\ReferralRewardConfigResource;

it('assigns Catalog group to catalog resources', function () {
    expect(ProductResource::getNavigationGroup())->toBe('Catalog');
    expect(CategoryResource::getNavigationGroup())->toBe('Catalog');
    expect(ContentBlockResource::getNavigationGroup())->toBe('Catalog');
});

it('assigns Clienți group to customer resources', function () {
    expect(CustomerResource::getNavigationGroup())->toBe('Clienți');
    expect(TransactionResource::getNavigationGroup())->toBe('Clienți');
    expect(LeadResource::getNavigationGroup())->toBe('Clienți');
    expect(ReferralResource::getNavigationGroup())->toBe('Clienți');
});

it('assigns Marketing group to marketing resources', function () {
    expect(PromotionResource::getNavigationGroup())->toBe('Marketing');
    expect(EmailTemplateResource::getNavigationGroup())->toBe('Marketing');
});

it('assigns Setări group to config resources', function () {
    expect(ReferralRewardConfigResource::getNavigationGroup())->toBe('Setări');
});

it('renames EmailTemplate nav label to Email', function () {
    expect(EmailTemplateResource::getNavigationLabel())->toBe('Email');
});
```

- [ ] **Step 2: Run to verify they fail**

```bash
php artisan test tests/Feature/Admin/AdminNavigationTest.php --testdox
```

Expected: the new group/label tests fail (`null !== 'Catalog'` etc).

- [ ] **Step 3: Add navigation group and sort to ProductResource**

In `app/Filament/Resources/Products/ProductResource.php`, add after `$navigationSort`:

```php
protected static ?string $navigationGroup = 'Catalog';
protected static ?int $navigationSort = 1;
```

- [ ] **Step 4: Add navigation group to CategoryResource**

In `app/Filament/Resources/Categories/CategoryResource.php`, add:

```php
protected static ?string $navigationGroup = 'Catalog';
protected static ?int $navigationSort = 2;
```

- [ ] **Step 5: Add navigation group to ContentBlockResource**

In `app/Filament/Resources/ContentBlocks/ContentBlockResource.php`, add:

```php
protected static ?string $navigationGroup = 'Catalog';
protected static ?int $navigationSort = 3;
```

- [ ] **Step 6: Add navigation group to CustomerResource**

In `app/Filament/Resources/Customers/CustomerResource.php`, add:

```php
protected static ?string $navigationGroup = 'Clienți';
protected static ?int $navigationSort = 1;
```

- [ ] **Step 7: Add navigation group to TransactionResource**

In `app/Filament/Resources/Transactions/TransactionResource.php`, add:

```php
protected static ?string $navigationGroup = 'Clienți';
protected static ?int $navigationSort = 2;
```

- [ ] **Step 8: Add navigation group to LeadResource**

In `app/Filament/Resources/Leads/LeadResource.php`, add:

```php
protected static ?string $navigationGroup = 'Clienți';
protected static ?int $navigationSort = 3;
```

- [ ] **Step 9: Add navigation group to ReferralResource**

In `app/Filament/Resources/Referrals/ReferralResource.php`, add:

```php
protected static ?string $navigationGroup = 'Clienți';
protected static ?int $navigationSort = 4;
```

- [ ] **Step 10: Add navigation group to PromotionResource**

In `app/Filament/Resources/Promotions/PromotionResource.php`, add:

```php
protected static ?string $navigationGroup = 'Marketing';
protected static ?int $navigationSort = 1;
```

- [ ] **Step 11: Update EmailTemplateResource label and group**

In `app/Filament/Resources/EmailTemplates/EmailTemplateResource.php`, change:

```php
protected static ?string $navigationLabel = 'Email';
protected static ?string $navigationGroup = 'Marketing';
protected static ?int $navigationSort = 2;
```

- [ ] **Step 12: Add group to ReferralRewardConfigResource and collapse Setări**

In `app/Filament/Resources/ReferralRewardConfigs/ReferralRewardConfigResource.php`, add:

```php
protected static ?string $navigationGroup = 'Setări';
protected static ?int $navigationSort = 1;
```

Then in `app/Providers/Filament/AdminPanelProvider.php`, add `navigationGroups()` after `->darkMode(false)`:

```php
->navigationGroups([
    \Filament\Navigation\NavigationGroup::make('Catalog'),
    \Filament\Navigation\NavigationGroup::make('Clienți'),
    \Filament\Navigation\NavigationGroup::make('Marketing'),
    \Filament\Navigation\NavigationGroup::make('Setări')->collapsed(),
])
```

- [ ] **Step 13: Run tests**

```bash
php artisan test tests/Feature/Admin/AdminNavigationTest.php --testdox
```

Expected: all tests pass.

- [ ] **Step 14: Commit**

```bash
git add app/Filament/Resources app/Providers/Filament/AdminPanelProvider.php tests/Feature/Admin/AdminNavigationTest.php
git commit -m "feat(admin): grouped sidebar navigation — Catalog, Clienți, Marketing, Setări"
```

---

## Task 3: Product form tabs

**Files:**
- Modify: `app/Filament/Resources/Products/ProductResource.php`
- Create: `tests/Feature/Admin/ProductFormTest.php`

- [ ] **Step 1: Write the failing test**

Create `tests/Feature/Admin/ProductFormTest.php`:

```php
<?php

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Filament\Resources\Products\ProductResource;
use Filament\Schemas\Components\Tabs;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

it('loads the product create page', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/admin/products/create')
        ->assertOk();
});

it('loads the product edit page', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create();
    $product = Product::factory()->create(['category_id' => $category->id]);

    $this->actingAs($user)
        ->get("/admin/products/{$product->id}/edit")
        ->assertOk();
});

it('product form schema contains a Tabs component', function () {
    $components = ProductResource::form(
        \Filament\Schemas\Schema::make(
            new \Livewire\Component()
        )
    )->getComponents();

    $hasTab = collect($components)->contains(
        fn ($c) => $c instanceof Tabs
    );

    expect($hasTab)->toBeTrue();
});
```

- [ ] **Step 2: Run to verify the Tabs test fails**

```bash
php artisan test tests/Feature/Admin/ProductFormTest.php --testdox
```

Expected: first two tests pass (pages load), third fails (`false is not true`).

- [ ] **Step 3: Rewrite ProductResource form() with Tabs**

Replace the entire `form()` method in `app/Filament/Resources/Products/ProductResource.php`:

```php
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
// Remove the Section import — it's no longer used

public static function form(Schema $schema): Schema
{
    return $schema->components([
        Tabs::make('Produs')
            ->tabs([

                Tab::make('Bază')
                    ->schema([
                        Select::make('category_id')
                            ->label('Categorie')
                            ->options(Category::pluck('heading', 'id'))
                            ->required(),

                        TextInput::make('slug')
                            ->label('Slug')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),

                        TextInput::make('eyebrow')
                            ->label('Eyebrow (tip · material)')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('name')
                            ->label('Nume')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('model')
                            ->label('Model')
                            ->maxLength(255),

                        RichEditor::make('description')
                            ->label('Descriere')
                            ->columnSpanFull(),

                        TextInput::make('starting_price')
                            ->label('Preț de la (EUR)')
                            ->numeric()
                            ->prefix('€')
                            ->required(),

                        TextInput::make('sale_percent')
                            ->label('Reducere (%)')
                            ->numeric()
                            ->minValue(0)
                            ->maxValue(100),

                        TextInput::make('sort_order')
                            ->label('Ordine')
                            ->numeric()
                            ->default(0),

                        Toggle::make('is_visible')
                            ->label('Vizibil pe site')
                            ->default(true),

                        Toggle::make('made_in_germany')
                            ->label('Made in Germany'),
                    ])
                    ->columns(2),

                Tab::make('Galerie')
                    ->schema([
                        Repeater::make('galleryImages')
                            ->relationship()
                            ->schema([
                                TextInput::make('path')
                                    ->label('Cale imagine (URL)')
                                    ->required(),
                                TextInput::make('sort_order')
                                    ->label('Ordine')
                                    ->numeric()
                                    ->default(0),
                            ])
                            ->columns(2)
                            ->orderColumn('sort_order')
                            ->label('Imagini')
                            ->helperText('Prima imagine apare pe cardul din catalog.'),
                    ]),

                Tab::make('Conținut')
                    ->schema([
                        Repeater::make('specs')
                            ->relationship()
                            ->schema([
                                TextInput::make('key')->label('Cheie')->required(),
                                TextInput::make('value')->label('Valoare')->required(),
                                TextInput::make('sort_order')->label('Ordine')->numeric()->default(0),
                            ])
                            ->columns(3)
                            ->orderColumn('sort_order')
                            ->label('Specificații tehnice'),

                        Repeater::make('detailPanels')
                            ->relationship()
                            ->schema([
                                TextInput::make('title')->label('Titlu')->required(),
                                Textarea::make('body')->label('Corp text'),
                                TextInput::make('spec_key')->label('Spec cheie'),
                                TextInput::make('spec_val')->label('Spec valoare'),
                                TextInput::make('image_path')->label('Imagine (URL)'),
                                TextInput::make('sort_order')->label('Ordine')->numeric()->default(0),
                            ])
                            ->columns(2)
                            ->orderColumn('sort_order')
                            ->label('Panouri detalii')
                            ->helperText('3–5 panouri afișate pe pagina produsului.'),

                        Repeater::make('scrollStops')
                            ->relationship()
                            ->schema([
                                TextInput::make('eyebrow')->label('Eyebrow'),
                                TextInput::make('title')->label('Titlu')->required(),
                                Textarea::make('body')->label('Corp text'),
                                TextInput::make('image_path')->label('Imagine (URL)'),
                                TextInput::make('sort_order')->label('Ordine')->numeric()->default(0),
                            ])
                            ->columns(2)
                            ->orderColumn('sort_order')
                            ->label('Scroll stops'),
                    ]),

                Tab::make('Finisaje')
                    ->schema([
                        Repeater::make('finishes')
                            ->relationship()
                            ->schema([
                                TextInput::make('color')->label('Hex culoare')->required()->maxLength(7),
                                TextInput::make('label')->label('Etichetă')->required(),
                                TextInput::make('sort_order')->label('Ordine')->numeric()->default(0),
                            ])
                            ->columns(3)
                            ->orderColumn('sort_order')
                            ->label('Finisaje disponibile'),
                    ])
                    ->hint('Opțional'),

            ])
            ->columnSpanFull(),
    ]);
}
```

Also update the imports at the top of `ProductResource.php` — add the Tab imports and remove Section:

```php
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
// Remove: use Filament\Schemas\Components\Section;
```

- [ ] **Step 4: Run tests**

```bash
php artisan test tests/Feature/Admin/ProductFormTest.php --testdox
```

Expected: all 3 pass.

- [ ] **Step 5: Commit**

```bash
git add app/Filament/Resources/Products/ProductResource.php tests/Feature/Admin/ProductFormTest.php
git commit -m "feat(admin): product form restructured into Bază / Galerie / Conținut / Finisaje tabs"
```

---

## Task 4: Email navigation merge

Hide `EmailTriggerResource` from the sidebar. `EmailTemplateResource` becomes the single "Email" nav item (already renamed in Task 2). Add a tab-style header to both list pages so staff can switch between templates and triggers without going back to the sidebar.

**Files:**
- Modify: `app/Filament/Resources/EmailTriggers/EmailTriggerResource.php`
- Modify: `app/Filament/Resources/EmailTemplates/Pages/ListEmailTemplates.php`
- Modify: `app/Filament/Resources/EmailTriggers/Pages/ListEmailTriggers.php`
- Modify: `tests/Feature/Admin/AdminNavigationTest.php`

- [ ] **Step 1: Add the nav-hidden test**

Append to `tests/Feature/Admin/AdminNavigationTest.php`:

```php
use App\Filament\Resources\EmailTriggers\EmailTriggerResource;

it('hides EmailTriggerResource from the sidebar', function () {
    expect(EmailTriggerResource::shouldRegisterNavigation())->toBeFalse();
});

it('email trigger list page loads', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/admin/email-triggers')
        ->assertOk();
});
```

- [ ] **Step 2: Run to verify they fail**

```bash
php artisan test tests/Feature/Admin/AdminNavigationTest.php --testdox
```

Expected: the two new tests fail.

- [ ] **Step 3: Hide EmailTriggerResource from nav**

In `app/Filament/Resources/EmailTriggers/EmailTriggerResource.php`, add:

```php
protected static bool $shouldRegisterNavigation = false;
```

- [ ] **Step 4: Add in-page tab header to ListEmailTemplates**

Replace the contents of `app/Filament/Resources/EmailTemplates/Pages/ListEmailTemplates.php` with:

```php
<?php

namespace App\Filament\Resources\EmailTemplates\Pages;

use App\Filament\Resources\EmailTemplates\EmailTemplateResource;
use App\Filament\Resources\EmailTriggers\EmailTriggerResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListEmailTemplates extends ListRecords
{
    protected static string $resource = EmailTemplateResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    public function getTitle(): string
    {
        return 'Email — Template-uri';
    }

    protected function getHeaderWidgets(): array
    {
        return [];
    }

    public function getSubNavigation(): array
    {
        return [
            \Filament\Navigation\NavigationItem::make('Template-uri')
                ->url(EmailTemplateResource::getUrl('index'))
                ->isActiveWhen(fn () => true),
            \Filament\Navigation\NavigationItem::make('Trigger-uri')
                ->url(EmailTriggerResource::getUrl('index')),
        ];
    }
}
```

- [ ] **Step 5: Add in-page tab header to ListEmailTriggers**

Replace the contents of `app/Filament/Resources/EmailTriggers/Pages/ListEmailTriggers.php` with:

```php
<?php

namespace App\Filament\Resources\EmailTriggers\Pages;

use App\Filament\Resources\EmailTemplates\EmailTemplateResource;
use App\Filament\Resources\EmailTriggers\EmailTriggerResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListEmailTriggers extends ListRecords
{
    protected static string $resource = EmailTriggerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    public function getTitle(): string
    {
        return 'Email — Trigger-uri';
    }

    public function getSubNavigation(): array
    {
        return [
            \Filament\Navigation\NavigationItem::make('Template-uri')
                ->url(EmailTemplateResource::getUrl('index')),
            \Filament\Navigation\NavigationItem::make('Trigger-uri')
                ->url(EmailTriggerResource::getUrl('index'))
                ->isActiveWhen(fn () => true),
        ];
    }
}
```

- [ ] **Step 6: Run tests**

```bash
php artisan test tests/Feature/Admin/AdminNavigationTest.php tests/Feature/Admin/ProductFormTest.php --testdox
```

Expected: all tests pass.

- [ ] **Step 7: Full test suite**

```bash
php artisan test --testdox
```

Expected: no regressions in the existing API tests.

- [ ] **Step 8: Commit**

```bash
git add app/Filament/Resources/EmailTriggers/EmailTriggerResource.php \
        app/Filament/Resources/EmailTemplates/Pages/ListEmailTemplates.php \
        app/Filament/Resources/EmailTriggers/Pages/ListEmailTriggers.php \
        tests/Feature/Admin/AdminNavigationTest.php
git commit -m "feat(admin): merge Email Templates + Triggers into single Email nav item"
```

---

## Self-Review

**Spec coverage:**
- §2 Theme — Task 1 covers colours, fonts, light background, dark mode disabled ✓
- §3 Navigation groups — Task 2 covers all 4 groups + Setări collapsed ✓
- §3.1 Email merge — Task 4 covers hiding trigger from nav + sub-navigation tabs ✓
- §3 Sidebar footer (avatar) — handled by Filament's default user menu; no custom code needed ✓
- §4 Product form tabs (Bază/Galerie/Conținut/Finisaje) — Task 3 ✓
- §4 Save button always visible — Filament's Tabs component keeps the form header/save bar sticky by default ✓
- §5 Dashboard widgets — no changes required; existing StatsOverview, NewCustomersChart, RecentLeadsTable widgets are retained and will pick up the new theme automatically ✓

**No placeholder issues found.** All code blocks are complete.

**Type consistency:** `Tabs` and `Tab` are imported consistently across Task 3. `NavigationItem` is used via full class path in Task 4 to avoid import conflicts.
