# Exclusive Doors — Laravel Backend: Plan 2 — Content & Product API

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the read-only REST API endpoints that allow the Next.js frontend to replace its hardcoded `lib/data.ts` with live data fetched from Laravel.

**Architecture:** Three API controllers (Product, Category, ContentBlock) each paired with an API Resource transformer that maps Laravel snake_case model fields to camelCase JSON matching the existing Next.js TypeScript interfaces. All endpoints are public (no auth required). Routes registered in `routes/api.php` under the `/api` prefix.

**Tech Stack:** Laravel 13, Laravel API Resources, Pest feature tests, Docker Compose (run commands via `docker compose exec app php artisan`)

---

## File Map

```
app/
├── Http/
│   ├── Controllers/
│   │   └── Api/
│   │       ├── ProductController.php       — GET /api/products, GET /api/products/{slug}
│   │       ├── CategoryController.php      — GET /api/categories
│   │       └── ContentBlockController.php  — GET /api/content/{key}, GET /api/content (batch)
│   └── Resources/
│       ├── ProductListResource.php         — lightweight product shape for list view
│       ├── ProductResource.php             — full product shape with all relations
│       ├── CategoryResource.php            — category with product count
│       └── ContentBlockResource.php        — single content block
routes/
└── api.php                                 — registers all API routes
tests/
└── Feature/
    └── Api/
        ├── ProductApiTest.php
        ├── CategoryApiTest.php
        └── ContentBlockApiTest.php
```

---

## JSON Shapes (what Next.js receives)

### ProductListResource (list endpoint — no scroll stops for performance)
```json
{
  "slug": "filomuro",
  "category": "interior",
  "eyebrow": "Ușă interior · Furnir",
  "name": "Filomuro",
  "model": "FMR-200 · La comandă",
  "startingPrice": 3200.00,
  "salePercent": null,
  "madeInGermany": false,
  "mainImg": null,
  "tags": ["Invizibilă", "Furnir Natural"]
}
```

### ProductResource (detail endpoint — full)
```json
{
  "slug": "filomuro",
  "category": "interior",
  "eyebrow": "Ușă interior · Furnir",
  "name": "Filomuro",
  "model": "FMR-200 · La comandă",
  "description": "...",
  "startingPrice": 3200.00,
  "salePercent": null,
  "madeInGermany": false,
  "mainImg": null,
  "thumbImgs": [],
  "tags": ["Invizibilă", "Furnir Natural"],
  "specs": [{ "key": "Material", "value": "Furnir stejar natural" }],
  "finishes": [{ "color": "#c8a96e", "label": "Stejar natural" }],
  "details": [{ "title": "...", "body": "...", "specKey": "...", "specVal": "...", "img": "..." }],
  "scrollStops": [{ "eyebrow": "...", "title": "...", "body": "...", "img": "...", "stats": [{ "num": "3mm", "label": "Toleranță" }] }]
}
```

### CategoryResource
```json
{
  "slug": "interior",
  "label": "Colecția Noastră",
  "heading": "Uși de Interior",
  "sub": "...",
  "imagePath": null
}
```

### ContentBlockResource
```json
{ "key": "hero.title", "type": "text", "value": "Uși Premium" }
```

### Batch content response (`GET /api/content?keys[]=a&keys[]=b`)
```json
{
  "hero.title": { "key": "hero.title", "type": "text", "value": "Uși Premium" },
  "hero.subtitle": { "key": "hero.subtitle", "type": "text", "value": "..." }
}
```

---

## Task 1: Product API

**Files:**
- Create: `app/Http/Resources/ProductListResource.php`
- Create: `app/Http/Resources/ProductResource.php`
- Create: `app/Http/Controllers/Api/ProductController.php`
- Create: `tests/Feature/Api/ProductApiTest.php`

- [ ] **Step 1: Write the failing tests**

Create `tests/Feature/Api/ProductApiTest.php`:

```php
<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\Tag;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

it('returns all visible products as a list', function () {
    $category = Category::factory()->create(['slug' => 'interior']);
    Product::factory()->count(3)->create(['category_id' => $category->id, 'is_visible' => true]);
    Product::factory()->create(['category_id' => $category->id, 'is_visible' => false]);

    $response = $this->getJson('/api/products');

    $response->assertOk()
        ->assertJsonCount(3)
        ->assertJsonStructure([['slug', 'category', 'eyebrow', 'name', 'model', 'startingPrice', 'salePercent', 'madeInGermany', 'mainImg', 'tags']]);
});

it('returns a single product by slug with full details', function () {
    $category = Category::factory()->create(['slug' => 'exterior']);
    $product = Product::factory()->create([
        'category_id' => $category->id,
        'slug' => 'test-door',
        'is_visible' => true,
    ]);
    $tag = Tag::factory()->create(['name' => 'Antiefracție']);
    $product->tags()->attach($tag);
    $product->specs()->create(['key' => 'Material', 'value' => 'Aluminiu', 'sort_order' => 0]);
    $stop = $product->scrollStops()->create([
        'eyebrow' => 'Test', 'title' => 'Titlu', 'body' => 'Corp',
        'image_path' => '/img/test.jpg', 'sort_order' => 0,
    ]);
    $stop->stats()->create(['num' => '3mm', 'label' => 'Toleranță', 'sort_order' => 0]);

    $response = $this->getJson('/api/products/test-door');

    $response->assertOk()
        ->assertJsonPath('slug', 'test-door')
        ->assertJsonPath('category', 'exterior')
        ->assertJsonPath('tags.0', 'Antiefracție')
        ->assertJsonPath('specs.0.key', 'Material')
        ->assertJsonPath('scrollStops.0.stats.0.num', '3mm')
        ->assertJsonStructure(['slug', 'category', 'name', 'mainImg', 'thumbImgs', 'specs', 'finishes', 'details', 'scrollStops']);
});

it('returns 404 for unknown product slug', function () {
    $this->getJson('/api/products/does-not-exist')->assertNotFound();
});

it('does not return hidden products in list', function () {
    $category = Category::factory()->create();
    Product::factory()->create(['category_id' => $category->id, 'is_visible' => false]);

    $this->getJson('/api/products')->assertOk()->assertJsonCount(0);
});

it('returns 404 for hidden product accessed by slug', function () {
    $category = Category::factory()->create();
    $product = Product::factory()->create([
        'category_id' => $category->id,
        'slug' => 'hidden-door',
        'is_visible' => false,
    ]);

    $this->getJson('/api/products/hidden-door')->assertNotFound();
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
docker compose exec app php artisan test tests/Feature/Api/ProductApiTest.php
```

Expected: FAIL — routes not found (404 on all).

- [ ] **Step 3: Create ProductListResource**

Create `app/Http/Resources/ProductListResource.php`:

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductListResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $images = $this->galleryImages;

        return [
            'slug'          => $this->slug,
            'category'      => $this->category->slug,
            'eyebrow'       => $this->eyebrow,
            'name'          => $this->name,
            'model'         => $this->model,
            'startingPrice' => (float) $this->starting_price,
            'salePercent'   => $this->sale_percent,
            'madeInGermany' => (bool) $this->made_in_germany,
            'mainImg'       => $images->first()?->path,
            'tags'          => $this->tags->pluck('name')->values()->all(),
        ];
    }
}
```

- [ ] **Step 4: Create ProductResource**

Create `app/Http/Resources/ProductResource.php`:

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $images = $this->galleryImages;

        return [
            'slug'          => $this->slug,
            'category'      => $this->category->slug,
            'eyebrow'       => $this->eyebrow,
            'name'          => $this->name,
            'model'         => $this->model,
            'description'   => $this->description,
            'startingPrice' => (float) $this->starting_price,
            'salePercent'   => $this->sale_percent,
            'madeInGermany' => (bool) $this->made_in_germany,
            'mainImg'       => $images->first()?->path,
            'thumbImgs'     => $images->pluck('path')->values()->all(),
            'tags'          => $this->tags->pluck('name')->values()->all(),
            'specs'         => $this->specs->map(fn($s) => [
                'key'   => $s->key,
                'value' => $s->value,
            ])->values()->all(),
            'finishes'      => $this->finishes->map(fn($f) => [
                'color' => $f->color,
                'label' => $f->label,
            ])->values()->all(),
            'details'       => $this->detailPanels->map(fn($d) => [
                'title'   => $d->title,
                'body'    => $d->body,
                'specKey' => $d->spec_key,
                'specVal' => $d->spec_val,
                'img'     => $d->image_path,
            ])->values()->all(),
            'scrollStops'   => $this->scrollStops->map(fn($stop) => [
                'eyebrow' => $stop->eyebrow,
                'title'   => $stop->title,
                'body'    => $stop->body,
                'img'     => $stop->image_path,
                'stats'   => $stop->stats->map(fn($stat) => [
                    'num'   => $stat->num,
                    'label' => $stat->label,
                ])->values()->all(),
            ])->values()->all(),
        ];
    }
}
```

- [ ] **Step 5: Create ProductController**

Create `app/Http/Controllers/Api/ProductController.php`:

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['category', 'tags', 'galleryImages'])
            ->where('is_visible', true)
            ->orderBy('sort_order')
            ->get();

        return ProductListResource::collection($products);
    }

    public function show(string $slug)
    {
        $product = Product::with([
            'category',
            'tags',
            'galleryImages',
            'specs',
            'finishes',
            'detailPanels',
            'scrollStops.stats',
        ])
            ->where('slug', $slug)
            ->where('is_visible', true)
            ->firstOrFail();

        return new ProductResource($product);
    }
}
```

- [ ] **Step 6: Register routes temporarily to run tests**

Modify `routes/api.php` — add these lines:

```php
use App\Http\Controllers\Api\ProductController;

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);
```

- [ ] **Step 7: Run tests — expect all 5 passing**

```bash
docker compose exec app php artisan test tests/Feature/Api/ProductApiTest.php
```

Expected: 5 tests, 5 passed.

- [ ] **Step 8: Commit**

```bash
git add app/Http/Resources/ProductListResource.php \
        app/Http/Resources/ProductResource.php \
        app/Http/Controllers/Api/ProductController.php \
        routes/api.php \
        tests/Feature/Api/ProductApiTest.php
git commit -m "feat: add product API endpoints with resources and tests"
```

---

## Task 2: Category API

**Files:**
- Create: `app/Http/Resources/CategoryResource.php`
- Create: `app/Http/Controllers/Api/CategoryController.php`
- Create: `tests/Feature/Api/CategoryApiTest.php`
- Modify: `routes/api.php`

- [ ] **Step 1: Write the failing tests**

Create `tests/Feature/Api/CategoryApiTest.php`:

```php
<?php

use App\Models\Category;
use App\Models\Product;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

it('returns all categories', function () {
    Category::factory()->count(4)->create();

    $response = $this->getJson('/api/categories');

    $response->assertOk()
        ->assertJsonCount(4)
        ->assertJsonStructure([['slug', 'label', 'heading', 'sub', 'imagePath']]);
});

it('returns categories with correct field names', function () {
    Category::factory()->create([
        'slug'       => 'interior',
        'label'      => 'Colecția Noastră',
        'heading'    => 'Uși de Interior',
        'sub'        => 'Eleganță și funcționalitate.',
        'image_path' => null,
    ]);

    $response = $this->getJson('/api/categories');

    $response->assertOk()
        ->assertJsonPath('0.slug', 'interior')
        ->assertJsonPath('0.label', 'Colecția Noastră')
        ->assertJsonPath('0.heading', 'Uși de Interior')
        ->assertJsonPath('0.imagePath', null);
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
docker compose exec app php artisan test tests/Feature/Api/CategoryApiTest.php
```

Expected: FAIL — route not found.

- [ ] **Step 3: Create CategoryResource**

Create `app/Http/Resources/CategoryResource.php`:

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug'      => $this->slug,
            'label'     => $this->label,
            'heading'   => $this->heading,
            'sub'       => $this->sub,
            'imagePath' => $this->image_path,
        ];
    }
}
```

- [ ] **Step 4: Create CategoryController**

Create `app/Http/Controllers/Api/CategoryController.php`:

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        return CategoryResource::collection(Category::all());
    }
}
```

- [ ] **Step 5: Add route to `routes/api.php`**

Add to `routes/api.php`:

```php
use App\Http\Controllers\Api\CategoryController;

Route::get('/categories', [CategoryController::class, 'index']);
```

- [ ] **Step 6: Run tests — expect all passing**

```bash
docker compose exec app php artisan test tests/Feature/Api/CategoryApiTest.php
```

Expected: 2 tests, 2 passed.

- [ ] **Step 7: Commit**

```bash
git add app/Http/Resources/CategoryResource.php \
        app/Http/Controllers/Api/CategoryController.php \
        routes/api.php \
        tests/Feature/Api/CategoryApiTest.php
git commit -m "feat: add category API endpoint with resource and tests"
```

---

## Task 3: Content Block API

**Files:**
- Create: `app/Http/Resources/ContentBlockResource.php`
- Create: `app/Http/Controllers/Api/ContentBlockController.php`
- Create: `tests/Feature/Api/ContentBlockApiTest.php`
- Modify: `routes/api.php`

- [ ] **Step 1: Write the failing tests**

Create `tests/Feature/Api/ContentBlockApiTest.php`:

```php
<?php

use App\Models\ContentBlock;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

it('returns a single content block by key', function () {
    ContentBlock::create(['key' => 'hero.title', 'type' => 'text', 'value' => 'Uși Premium']);

    $response = $this->getJson('/api/content/hero.title');

    $response->assertOk()
        ->assertJsonPath('key', 'hero.title')
        ->assertJsonPath('type', 'text')
        ->assertJsonPath('value', 'Uși Premium');
});

it('returns 404 for unknown content block key', function () {
    $this->getJson('/api/content/does.not.exist')->assertNotFound();
});

it('returns multiple content blocks by keys', function () {
    ContentBlock::create(['key' => 'hero.title', 'type' => 'text', 'value' => 'Uși Premium']);
    ContentBlock::create(['key' => 'hero.subtitle', 'type' => 'text', 'value' => 'Calitate superioară']);

    $response = $this->getJson('/api/content?keys[]=hero.title&keys[]=hero.subtitle');

    $response->assertOk()
        ->assertJsonPath('hero.title.value', 'Uși Premium')
        ->assertJsonPath('hero.subtitle.value', 'Calitate superioară');
});

it('batch endpoint returns only found keys and ignores missing ones', function () {
    ContentBlock::create(['key' => 'hero.title', 'type' => 'text', 'value' => 'Uși Premium']);

    $response = $this->getJson('/api/content?keys[]=hero.title&keys[]=does.not.exist');

    $response->assertOk()
        ->assertJsonPath('hero.title.value', 'Uși Premium')
        ->assertJsonMissingPath('does.not.exist');
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
docker compose exec app php artisan test tests/Feature/Api/ContentBlockApiTest.php
```

Expected: FAIL — route not found.

- [ ] **Step 3: Create ContentBlockResource**

Create `app/Http/Resources/ContentBlockResource.php`:

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContentBlockResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'key'   => $this->key,
            'type'  => $this->type,
            'value' => $this->value,
        ];
    }
}
```

- [ ] **Step 4: Create ContentBlockController**

Create `app/Http/Controllers/Api/ContentBlockController.php`:

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContentBlockResource;
use App\Models\ContentBlock;
use Illuminate\Http\Request;

class ContentBlockController extends Controller
{
    public function show(string $key)
    {
        $block = ContentBlock::where('key', $key)->firstOrFail();
        return new ContentBlockResource($block);
    }

    public function batch(Request $request)
    {
        $keys = $request->query('keys', []);

        $blocks = ContentBlock::whereIn('key', $keys)->get();

        // Return as object keyed by content block key
        return response()->json(
            $blocks->mapWithKeys(fn($block) => [
                $block->key => [
                    'key'   => $block->key,
                    'type'  => $block->type,
                    'value' => $block->value,
                ],
            ])
        );
    }
}
```

- [ ] **Step 5: Add routes to `routes/api.php`**

Add to `routes/api.php`:

```php
use App\Http\Controllers\Api\ContentBlockController;

Route::get('/content', [ContentBlockController::class, 'batch']);
Route::get('/content/{key}', [ContentBlockController::class, 'show'])->where('key', '.+');
```

Note: the `->where('key', '.+')` regex allows dots in the key (e.g. `hero.title`).

- [ ] **Step 6: Run tests — expect all passing**

```bash
docker compose exec app php artisan test tests/Feature/Api/ContentBlockApiTest.php
```

Expected: 4 tests, 4 passed.

- [ ] **Step 7: Commit**

```bash
git add app/Http/Resources/ContentBlockResource.php \
        app/Http/Controllers/Api/ContentBlockController.php \
        routes/api.php \
        tests/Feature/Api/ContentBlockApiTest.php
git commit -m "feat: add content block API endpoints (single + batch) with tests"
```

---

## Task 4: Final Route Cleanup & Full Test Verification

**Files:**
- Modify: `routes/api.php` — clean up and organise all routes

- [ ] **Step 1: Consolidate `routes/api.php`**

Replace the entire contents of `routes/api.php` with the clean, organised version:

```php
<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ContentBlockController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public API Routes
|--------------------------------------------------------------------------
| These routes are unauthenticated and consumed by the Next.js frontend.
*/

// Products
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);

// Categories
Route::get('/categories', [CategoryController::class, 'index']);

// Content blocks (CMS)
Route::get('/content', [ContentBlockController::class, 'batch']);
Route::get('/content/{key}', [ContentBlockController::class, 'show'])->where('key', '.+');
```

- [ ] **Step 2: Run the full test suite**

```bash
docker compose exec app php artisan test
```

Expected: All tests pass (10 unit + 11 feature = 21 total).

- [ ] **Step 3: Verify seeded data is accessible via API**

```bash
docker compose exec app php artisan tinker --execute="
  \$r = app()->make(\Illuminate\Http\Request::class);
  echo App\Http\Controllers\Api\ProductController::class;
"
```

Then hit the actual endpoint:
```bash
curl -s http://localhost:8000/api/products | python3 -m json.tool | head -40
```

Expected: JSON array with 4 products (Filomuro, GROKE Thermosafe, Liftant-Culisant, Grand Pivot) with camelCase field names.

```bash
curl -s http://localhost:8000/api/products/filomuro | python3 -m json.tool | head -30
```

Expected: Full Filomuro product JSON with specs array.

```bash
curl -s http://localhost:8000/api/categories | python3 -m json.tool
```

Expected: 4 categories (interior, exterior, glisante, pivotante).

- [ ] **Step 4: Commit**

```bash
git add routes/api.php
git commit -m "feat: Plan 2 complete — public content API fully operational"
```

---

## What's Next

- **Plan 3:** Customer auth (register/login), referral flow, lead capture, tracking endpoint
- **Plan 4:** Filament admin panel — full resource management UI for staff
- **Plan 5:** Email automation, promotions engine, analytics dashboard
