# Exclusive Doors — Laravel Backend: Plan 1 — Foundation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the Laravel 11 project, install all dependencies, define the complete database schema via migrations, create all Eloquent models with relationships, and seed the database with the 4 existing products from the Next.js frontend.

**Architecture:** New Laravel 11 project at `/Users/tudor/projects/exclusive-doors-api`. Uses MySQL for the database. All image fields are stored as URL strings for now (Spatie Media Library is installed but configured in Plan 4 when Filament is set up). Laravel Sanctum is installed for API auth used in Plan 3.

**Tech Stack:** Laravel 11, MySQL, Laravel Sanctum, Pest (testing), Faker (seeding), Resend Laravel (email — configured in Plan 5), Filament v3 (installed now, configured in Plan 4)

---

## File Map

```
exclusive-doors-api/
├── app/
│   └── Models/
│       ├── Category.php
│       ├── Product.php
│       ├── Tag.php
│       ├── ProductGalleryImage.php
│       ├── ProductSpec.php
│       ├── ProductFinish.php
│       ├── ProductDetailPanel.php
│       ├── ProductScrollStop.php
│       ├── ProductScrollStopStat.php
│       ├── ContentBlock.php
│       ├── Customer.php
│       ├── Transaction.php
│       ├── Referral.php
│       ├── ReferralRewardConfig.php
│       ├── Lead.php
│       ├── TrackingEvent.php
│       ├── EmailTemplate.php
│       ├── EmailTrigger.php
│       ├── EmailTriggerLog.php
│       ├── Promotion.php
│       └── PromotionTarget.php
├── database/
│   ├── migrations/
│   │   ├── 2026_05_10_000001_create_categories_table.php
│   │   ├── 2026_05_10_000002_create_products_table.php
│   │   ├── 2026_05_10_000003_create_tags_table.php
│   │   ├── 2026_05_10_000004_create_product_tag_table.php
│   │   ├── 2026_05_10_000005_create_product_gallery_images_table.php
│   │   ├── 2026_05_10_000006_create_product_specs_table.php
│   │   ├── 2026_05_10_000007_create_product_finishes_table.php
│   │   ├── 2026_05_10_000008_create_product_detail_panels_table.php
│   │   ├── 2026_05_10_000009_create_product_scroll_stops_table.php
│   │   ├── 2026_05_10_000010_create_product_scroll_stop_stats_table.php
│   │   ├── 2026_05_10_000011_create_content_blocks_table.php
│   │   ├── 2026_05_10_000012_create_customers_table.php
│   │   ├── 2026_05_10_000013_create_transactions_table.php
│   │   ├── 2026_05_10_000014_create_referrals_table.php
│   │   ├── 2026_05_10_000015_create_referral_reward_config_table.php
│   │   ├── 2026_05_10_000016_create_leads_table.php
│   │   ├── 2026_05_10_000017_create_tracking_events_table.php
│   │   ├── 2026_05_10_000018_create_email_templates_table.php
│   │   ├── 2026_05_10_000019_create_email_triggers_table.php
│   │   ├── 2026_05_10_000020_create_email_trigger_logs_table.php
│   │   ├── 2026_05_10_000021_create_promotions_table.php
│   │   └── 2026_05_10_000022_create_promotion_targets_table.php
│   └── seeders/
│       ├── DatabaseSeeder.php
│       ├── CategorySeeder.php
│       ├── ProductSeeder.php
│       └── ReferralRewardConfigSeeder.php
└── tests/
    └── Unit/
        └── Models/
            └── ProductTest.php
```

---

## Task 1: Create Laravel Project & Configure Environment

**Files:**
- Create: `/Users/tudor/projects/exclusive-doors-api/` (entire project)
- Modify: `.env`

- [ ] **Step 1: Create the Laravel project**

```bash
cd /Users/tudor/projects
composer create-project laravel/laravel exclusive-doors-api
cd exclusive-doors-api
```

Expected: Laravel installer runs, project created at `/Users/tudor/projects/exclusive-doors-api`.

- [ ] **Step 2: Create the MySQL database**

```bash
mysql -u root -p -e "CREATE DATABASE exclusive_doors CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

If root has no password: `mysql -u root -e "CREATE DATABASE exclusive_doors CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"`

- [ ] **Step 3: Configure `.env`**

Edit `/Users/tudor/projects/exclusive-doors-api/.env` — update these values:

```env
APP_NAME="Exclusive Doors API"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=exclusive_doors
DB_USERNAME=root
DB_PASSWORD=

RESEND_API_KEY=
RESEND_FROM_ADDRESS=noreply@exclusivedoors.ro
RESEND_FROM_NAME="Exclusive Doors"

FILESYSTEM_DISK=local
```

Leave `RESEND_API_KEY` blank — it will be filled in Plan 5.

- [ ] **Step 4: Generate app key**

```bash
cd /Users/tudor/projects/exclusive-doors-api
php artisan key:generate
```

Expected output: `Application key set successfully.`

- [ ] **Step 5: Verify database connection**

```bash
php artisan db:show
```

Expected: Shows `exclusive_doors` database info with no errors.

- [ ] **Step 6: Commit**

```bash
cd /Users/tudor/projects/exclusive-doors-api
git add -A
git commit -m "chore: initial Laravel 11 project setup"
```

---

## Task 2: Install Dependencies

**Files:**
- Modify: `composer.json`
- Modify: `config/sanctum.php` (published)

- [ ] **Step 1: Install Laravel Sanctum**

```bash
cd /Users/tudor/projects/exclusive-doors-api
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

- [ ] **Step 2: Install Filament v3**

```bash
composer require filament/filament:"^3.2" -W
php artisan filament:install --panels
```

When prompted for panel ID, enter: `admin`
When prompted for auth guard, press Enter for default.

- [ ] **Step 3: Install Resend for Laravel**

```bash
composer require resend/resend-laravel
```

- [ ] **Step 4: Install Spatie Media Library**

```bash
composer require spatie/laravel-medialibrary
php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="medialibrary-migrations"
```

- [ ] **Step 5: Set CORS to allow Next.js frontend**

Edit `config/cors.php`:

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:3000', 'https://exclusivedoors.ro'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: install Sanctum, Filament v3, Resend, Spatie Media Library"
```

---

## Task 3: Migrations — Categories & Products

**Files:**
- Create: `database/migrations/2026_05_10_000001_create_categories_table.php`
- Create: `database/migrations/2026_05_10_000002_create_products_table.php`

- [ ] **Step 1: Create categories migration**

```bash
php artisan make:migration create_categories_table --path=database/migrations
```

Replace the generated file content with:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique(); // interior, exterior, glisante, pivotante
            $table->string('label');          // eyebrow text on category hero
            $table->string('heading');        // H1 on category listing page
            $table->text('sub');              // subtitle paragraph
            $table->string('image_path')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
```

- [ ] **Step 2: Create products migration**

```bash
php artisan make:migration create_products_table --path=database/migrations
```

Replace the generated file content with:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('slug')->unique();
            $table->string('eyebrow');                     // e.g. "Ușă interior · Furnir"
            $table->string('name');                        // e.g. "Filomuro"
            $table->string('model');                       // e.g. "FMR-200 · La comandă"
            $table->longText('description');
            $table->decimal('starting_price', 10, 2)->default(0);
            $table->tinyInteger('sale_percent')->nullable(); // null = no sale
            $table->boolean('made_in_germany')->default(false);
            $table->boolean('is_visible')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
```

- [ ] **Step 3: Commit**

```bash
git add database/migrations/
git commit -m "feat: add categories and products migrations"
```

---

## Task 4: Migrations — Product Sub-Tables

**Files:**
- Create: migrations 000003 through 000010 (tags, pivot, gallery, specs, finishes, detail panels, scroll stops, stats)

- [ ] **Step 1: Create tags & pivot migrations**

```bash
php artisan make:migration create_tags_table
php artisan make:migration create_product_tag_table
```

`create_tags_table`:
```php
public function up(): void
{
    Schema::create('tags', function (Blueprint $table) {
        $table->id();
        $table->string('name')->unique();
        $table->timestamps();
    });
}
public function down(): void { Schema::dropIfExists('tags'); }
```

`create_product_tag_table`:
```php
public function up(): void
{
    Schema::create('product_tag', function (Blueprint $table) {
        $table->foreignId('product_id')->constrained()->cascadeOnDelete();
        $table->foreignId('tag_id')->constrained()->cascadeOnDelete();
        $table->primary(['product_id', 'tag_id']);
    });
}
public function down(): void { Schema::dropIfExists('product_tag'); }
```

- [ ] **Step 2: Create gallery images migration**

```bash
php artisan make:migration create_product_gallery_images_table
```

```php
public function up(): void
{
    Schema::create('product_gallery_images', function (Blueprint $table) {
        $table->id();
        $table->foreignId('product_id')->constrained()->cascadeOnDelete();
        $table->string('path');
        $table->integer('sort_order')->default(0);
        $table->timestamps();
    });
}
public function down(): void { Schema::dropIfExists('product_gallery_images'); }
```

- [ ] **Step 3: Create specs migration**

```bash
php artisan make:migration create_product_specs_table
```

```php
public function up(): void
{
    Schema::create('product_specs', function (Blueprint $table) {
        $table->id();
        $table->foreignId('product_id')->constrained()->cascadeOnDelete();
        $table->string('key');   // e.g. "Material"
        $table->string('value'); // e.g. "Furnir stejar natural"
        $table->integer('sort_order')->default(0);
        $table->timestamps();
    });
}
public function down(): void { Schema::dropIfExists('product_specs'); }
```

- [ ] **Step 4: Create finishes migration**

```bash
php artisan make:migration create_product_finishes_table
```

```php
public function up(): void
{
    Schema::create('product_finishes', function (Blueprint $table) {
        $table->id();
        $table->foreignId('product_id')->constrained()->cascadeOnDelete();
        $table->string('color', 7); // hex e.g. "#c8a96e"
        $table->string('label');    // e.g. "Stejar natural"
        $table->integer('sort_order')->default(0);
        $table->timestamps();
    });
}
public function down(): void { Schema::dropIfExists('product_finishes'); }
```

- [ ] **Step 5: Create detail panels migration**

```bash
php artisan make:migration create_product_detail_panels_table
```

```php
public function up(): void
{
    Schema::create('product_detail_panels', function (Blueprint $table) {
        $table->id();
        $table->foreignId('product_id')->constrained()->cascadeOnDelete();
        $table->string('title');
        $table->text('body');
        $table->string('spec_key');
        $table->string('spec_val');
        $table->string('image_path');
        $table->integer('sort_order')->default(0);
        $table->timestamps();
    });
}
public function down(): void { Schema::dropIfExists('product_detail_panels'); }
```

- [ ] **Step 6: Create scroll stops migration**

```bash
php artisan make:migration create_product_scroll_stops_table
```

```php
public function up(): void
{
    Schema::create('product_scroll_stops', function (Blueprint $table) {
        $table->id();
        $table->foreignId('product_id')->constrained()->cascadeOnDelete();
        $table->string('eyebrow');
        $table->string('title');
        $table->text('body');
        $table->string('image_path');
        $table->integer('sort_order')->default(0);
        $table->timestamps();
    });
}
public function down(): void { Schema::dropIfExists('product_scroll_stops'); }
```

- [ ] **Step 7: Create scroll stop stats migration**

```bash
php artisan make:migration create_product_scroll_stop_stats_table
```

```php
public function up(): void
{
    Schema::create('product_scroll_stop_stats', function (Blueprint $table) {
        $table->id();
        $table->foreignId('scroll_stop_id')
              ->constrained('product_scroll_stops')
              ->cascadeOnDelete();
        $table->string('num');   // e.g. "3mm"
        $table->string('label'); // e.g. "Toleranță fabricație"
        $table->integer('sort_order')->default(0);
        $table->timestamps();
    });
}
public function down(): void { Schema::dropIfExists('product_scroll_stop_stats'); }
```

- [ ] **Step 8: Commit**

```bash
git add database/migrations/
git commit -m "feat: add product sub-table migrations (tags, gallery, specs, finishes, panels, scroll stops)"
```

---

## Task 5: Migrations — CMS & Customer Tables

**Files:**
- Create: migrations 000011 through 000016

- [ ] **Step 1: Content blocks migration**

```bash
php artisan make:migration create_content_blocks_table
```

```php
public function up(): void
{
    Schema::create('content_blocks', function (Blueprint $table) {
        $table->id();
        $table->string('key')->unique(); // e.g. "hero.title", "faq.1.question"
        $table->enum('type', ['text', 'richtext', 'image']);
        $table->longText('value')->nullable();
        $table->timestamps();
    });
}
public function down(): void { Schema::dropIfExists('content_blocks'); }
```

- [ ] **Step 2: Customers migration**

```bash
php artisan make:migration create_customers_table
```

```php
public function up(): void
{
    Schema::create('customers', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('email')->unique();
        $table->string('phone')->nullable();
        $table->string('password');
        $table->timestamp('email_verified_at')->nullable();
        $table->enum('source', ['registered', 'referred', 'lead'])->default('registered');
        $table->foreignId('referred_by_id')->nullable()->constrained('customers')->nullOnDelete();
        $table->string('referral_code')->unique()->nullable(); // generated after first transaction
        $table->tinyInteger('referral_count')->default(0);
        $table->decimal('base_discount_pct', 5, 2)->default(5.00);
        $table->rememberToken();
        $table->timestamps();
    });
}
public function down(): void { Schema::dropIfExists('customers'); }
```

- [ ] **Step 3: Transactions migration**

```bash
php artisan make:migration create_transactions_table
```

```php
public function up(): void
{
    Schema::create('transactions', function (Blueprint $table) {
        $table->id();
        $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
        $table->decimal('amount', 10, 2);
        $table->text('notes')->nullable();
        $table->date('transaction_date');
        $table->foreignId('created_by')->constrained('users'); // staff user
        $table->timestamps();
    });
}
public function down(): void { Schema::dropIfExists('transactions'); }
```

- [ ] **Step 4: Referrals migration**

```bash
php artisan make:migration create_referrals_table
```

```php
public function up(): void
{
    Schema::create('referrals', function (Blueprint $table) {
        $table->id();
        $table->foreignId('referrer_id')->constrained('customers')->cascadeOnDelete();
        $table->foreignId('referred_id')->unique()->constrained('customers')->cascadeOnDelete();
        $table->enum('status', ['pending', 'converted'])->default('pending');
        $table->boolean('reward_granted')->default(false);
        $table->timestamps();
    });
}
public function down(): void { Schema::dropIfExists('referrals'); }
```

- [ ] **Step 5: Referral reward config migration**

```bash
php artisan make:migration create_referral_reward_config_table
```

```php
public function up(): void
{
    Schema::create('referral_reward_config', function (Blueprint $table) {
        $table->id();
        $table->tinyInteger('milestone')->default(3); // 3 or 5 referrals to earn reward
        $table->enum('reward_type', ['discount', 'free_service']);
        $table->string('reward_value'); // discount % as string, or service description
        $table->boolean('resets_after_milestone')->default(true);
        $table->timestamps();
    });
}
public function down(): void { Schema::dropIfExists('referral_reward_config'); }
```

- [ ] **Step 6: Leads migration**

```bash
php artisan make:migration create_leads_table
```

```php
public function up(): void
{
    Schema::create('leads', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('email');
        $table->string('phone')->nullable();
        $table->text('message');
        $table->string('source_page');
        $table->foreignId('converted_to_customer_id')
              ->nullable()
              ->constrained('customers')
              ->nullOnDelete();
        $table->timestamps();
    });
}
public function down(): void { Schema::dropIfExists('leads'); }
```

- [ ] **Step 7: Commit**

```bash
git add database/migrations/
git commit -m "feat: add CMS content blocks and customer system migrations"
```

---

## Task 6: Migrations — Email, Tracking & Promotions

**Files:**
- Create: migrations 000017 through 000022

- [ ] **Step 1: Tracking events migration**

```bash
php artisan make:migration create_tracking_events_table
```

```php
public function up(): void
{
    Schema::create('tracking_events', function (Blueprint $table) {
        $table->id();
        $table->string('session_id')->index();
        $table->string('email')->nullable()->index();
        $table->string('page_url');
        $table->enum('event_type', ['page_view', 'form_submit'])->default('page_view');
        $table->timestamp('created_at')->useCurrent();
        // No updated_at — events are immutable
    });
}
public function down(): void { Schema::dropIfExists('tracking_events'); }
```

- [ ] **Step 2: Email templates migration**

```bash
php artisan make:migration create_email_templates_table
```

```php
public function up(): void
{
    Schema::create('email_templates', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('subject');
        $table->longText('body'); // HTML with {{variable}} placeholders
        $table->timestamps();
    });
}
public function down(): void { Schema::dropIfExists('email_templates'); }
```

- [ ] **Step 3: Email triggers migration**

```bash
php artisan make:migration create_email_triggers_table
```

```php
public function up(): void
{
    Schema::create('email_triggers', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->boolean('is_active')->default(true);
        $table->enum('condition_type', ['page_visited', 'no_return_after_visit', 'form_submitted']);
        $table->string('condition_value'); // URL pattern e.g. "/products/exterior"
        $table->integer('delay_hours')->default(24);
        $table->foreignId('email_template_id')->constrained()->cascadeOnDelete();
        $table->timestamps();
    });
}
public function down(): void { Schema::dropIfExists('email_triggers'); }
```

- [ ] **Step 4: Email trigger logs migration**

```bash
php artisan make:migration create_email_trigger_logs_table
```

```php
public function up(): void
{
    Schema::create('email_trigger_logs', function (Blueprint $table) {
        $table->id();
        $table->foreignId('trigger_id')->constrained('email_triggers')->cascadeOnDelete();
        $table->string('email')->index();
        $table->timestamp('sent_at')->useCurrent();
        $table->unique(['trigger_id', 'email']); // prevent duplicate sends
    });
}
public function down(): void { Schema::dropIfExists('email_trigger_logs'); }
```

- [ ] **Step 5: Promotions migration**

```bash
php artisan make:migration create_promotions_table
```

```php
public function up(): void
{
    Schema::create('promotions', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->enum('type', ['percentage', 'fixed']);
        $table->decimal('value', 10, 2);
        $table->enum('scope', ['all', 'category', 'product'])->default('all');
        $table->boolean('stackable')->default(false); // combine with base_discount_pct?
        $table->json('conditions')->nullable(); // { requires_account, min_referral_count }
        $table->timestamp('starts_at')->nullable();
        $table->timestamp('ends_at')->nullable();
        $table->boolean('is_active')->default(true);
        $table->timestamps();
    });
}
public function down(): void { Schema::dropIfExists('promotions'); }
```

- [ ] **Step 6: Promotion targets migration**

```bash
php artisan make:migration create_promotion_targets_table
```

```php
public function up(): void
{
    Schema::create('promotion_targets', function (Blueprint $table) {
        $table->id();
        $table->foreignId('promotion_id')->constrained()->cascadeOnDelete();
        $table->enum('target_type', ['category', 'product']);
        $table->unsignedBigInteger('target_id');
        $table->index(['target_type', 'target_id']);
    });
}
public function down(): void { Schema::dropIfExists('promotion_targets'); }
```

- [ ] **Step 7: Run all migrations**

```bash
php artisan migrate
```

Expected output: All 22+ migrations run successfully with no errors. If you see a foreign key error, check that the parent migration ran before the child (the timestamps in filenames ensure ordering).

- [ ] **Step 8: Commit**

```bash
git add database/migrations/
git commit -m "feat: add email automation, tracking, and promotions migrations — run full schema"
```

---

## Task 7: Eloquent Models — Products & Categories

**Files:**
- Create: `app/Models/Category.php`
- Create: `app/Models/Product.php`
- Create: `app/Models/Tag.php`
- Create: `app/Models/ProductGalleryImage.php`
- Create: `app/Models/ProductSpec.php`
- Create: `app/Models/ProductFinish.php`
- Create: `app/Models/ProductDetailPanel.php`
- Create: `app/Models/ProductScrollStop.php`
- Create: `app/Models/ProductScrollStopStat.php`
- Test: `tests/Unit/Models/ProductTest.php`

- [ ] **Step 1: Write the failing test**

Create `tests/Unit/Models/ProductTest.php`:

```php
<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\Tag;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

it('belongs to a category', function () {
    $category = Category::factory()->create();
    $product = Product::factory()->create(['category_id' => $category->id]);

    expect($product->category)->toBeInstanceOf(Category::class);
    expect($product->category->id)->toBe($category->id);
});

it('has many tags', function () {
    $product = Product::factory()->create();
    $tags = Tag::factory()->count(3)->create();
    $product->tags()->attach($tags);

    expect($product->tags)->toHaveCount(3);
});

it('has many specs ordered by sort_order', function () {
    $product = Product::factory()->create();
    $product->specs()->createMany([
        ['key' => 'Garanție', 'value' => '5 ani', 'sort_order' => 1],
        ['key' => 'Material', 'value' => 'Furnir', 'sort_order' => 0],
    ]);

    expect($product->specs->first()->key)->toBe('Material');
});

it('has many scroll stops each with stats', function () {
    $product = Product::factory()->create();
    $stop = $product->scrollStops()->create([
        'eyebrow' => 'Inovație',
        'title' => 'Titlu',
        'body' => 'Corp',
        'image_path' => '/img/test.jpg',
        'sort_order' => 0,
    ]);
    $stop->stats()->create(['num' => '3mm', 'label' => 'Toleranță', 'sort_order' => 0]);

    expect($product->scrollStops->first()->stats)->toHaveCount(1);
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
php artisan test tests/Unit/Models/ProductTest.php
```

Expected: FAIL — `Class "App\Models\Category" not found` or similar.

- [ ] **Step 3: Create Category model**

```bash
php artisan make:model Category --factory
```

Replace `app/Models/Category.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['slug', 'label', 'heading', 'sub', 'image_path'];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
```

Replace `database/factories/CategoryFactory.php`:

```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    public function definition(): array
    {
        $slugs = ['interior', 'exterior', 'glisante', 'pivotante'];
        return [
            'slug' => $this->faker->unique()->randomElement($slugs),
            'label' => $this->faker->words(2, true),
            'heading' => $this->faker->sentence(3),
            'sub' => $this->faker->sentence(8),
            'image_path' => null,
        ];
    }
}
```

- [ ] **Step 4: Create Product model and factory**

```bash
php artisan make:model Product --factory
```

Replace `app/Models/Product.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id', 'slug', 'eyebrow', 'name', 'model',
        'description', 'starting_price', 'sale_percent',
        'made_in_germany', 'is_visible', 'sort_order',
    ];

    protected $casts = [
        'made_in_germany' => 'boolean',
        'is_visible' => 'boolean',
        'starting_price' => 'decimal:2',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function galleryImages(): HasMany
    {
        return $this->hasMany(ProductGalleryImage::class)->orderBy('sort_order');
    }

    public function specs(): HasMany
    {
        return $this->hasMany(ProductSpec::class)->orderBy('sort_order');
    }

    public function finishes(): HasMany
    {
        return $this->hasMany(ProductFinish::class)->orderBy('sort_order');
    }

    public function detailPanels(): HasMany
    {
        return $this->hasMany(ProductDetailPanel::class)->orderBy('sort_order');
    }

    public function scrollStops(): HasMany
    {
        return $this->hasMany(ProductScrollStop::class)->orderBy('sort_order');
    }
}
```

Replace `database/factories/ProductFactory.php`:

```php
<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'category_id' => Category::factory(),
            'slug' => $this->faker->unique()->slug(2),
            'eyebrow' => 'Ușă interior · Furnir',
            'name' => $this->faker->words(2, true),
            'model' => strtoupper($this->faker->lexify('???')) . '-' . $this->faker->numerify('###'),
            'description' => $this->faker->paragraph(),
            'starting_price' => $this->faker->randomFloat(2, 1000, 10000),
            'sale_percent' => null,
            'made_in_germany' => false,
            'is_visible' => true,
            'sort_order' => 0,
        ];
    }
}
```

- [ ] **Step 5: Create remaining product sub-models**

```bash
php artisan make:model Tag --factory
php artisan make:model ProductGalleryImage
php artisan make:model ProductSpec
php artisan make:model ProductFinish
php artisan make:model ProductDetailPanel
php artisan make:model ProductScrollStop
php artisan make:model ProductScrollStopStat
```

Replace `app/Models/Tag.php`:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    use HasFactory;
    protected $fillable = ['name'];
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class);
    }
}
```

Replace `database/factories/TagFactory.php`:
```php
<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
class TagFactory extends Factory
{
    public function definition(): array
    {
        return ['name' => $this->faker->unique()->word()];
    }
}
```

Replace `app/Models/ProductGalleryImage.php`:
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class ProductGalleryImage extends Model
{
    protected $fillable = ['product_id', 'path', 'sort_order'];
    public function product(): BelongsTo { return $this->belongsTo(Product::class); }
}
```

Replace `app/Models/ProductSpec.php`:
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class ProductSpec extends Model
{
    protected $fillable = ['product_id', 'key', 'value', 'sort_order'];
    public function product(): BelongsTo { return $this->belongsTo(Product::class); }
}
```

Replace `app/Models/ProductFinish.php`:
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class ProductFinish extends Model
{
    protected $fillable = ['product_id', 'color', 'label', 'sort_order'];
    public function product(): BelongsTo { return $this->belongsTo(Product::class); }
}
```

Replace `app/Models/ProductDetailPanel.php`:
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class ProductDetailPanel extends Model
{
    protected $fillable = ['product_id', 'title', 'body', 'spec_key', 'spec_val', 'image_path', 'sort_order'];
    public function product(): BelongsTo { return $this->belongsTo(Product::class); }
}
```

Replace `app/Models/ProductScrollStop.php`:
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class ProductScrollStop extends Model
{
    protected $fillable = ['product_id', 'eyebrow', 'title', 'body', 'image_path', 'sort_order'];
    public function product(): BelongsTo { return $this->belongsTo(Product::class); }
    public function stats(): HasMany
    {
        return $this->hasMany(ProductScrollStopStat::class, 'scroll_stop_id')->orderBy('sort_order');
    }
}
```

Replace `app/Models/ProductScrollStopStat.php`:
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class ProductScrollStopStat extends Model
{
    protected $fillable = ['scroll_stop_id', 'num', 'label', 'sort_order'];
    public function scrollStop(): BelongsTo
    {
        return $this->belongsTo(ProductScrollStop::class, 'scroll_stop_id');
    }
}
```

- [ ] **Step 6: Run tests to verify they pass**

```bash
php artisan test tests/Unit/Models/ProductTest.php
```

Expected: 4 tests, 4 passed.

- [ ] **Step 7: Commit**

```bash
git add app/Models/ database/factories/ tests/Unit/
git commit -m "feat: add product and category models with factories and tests"
```

---

## Task 8: Eloquent Models — Customer System & Remaining Models

**Files:**
- Create: `app/Models/ContentBlock.php`
- Create: `app/Models/Customer.php`
- Create: `app/Models/Transaction.php`
- Create: `app/Models/Referral.php`
- Create: `app/Models/ReferralRewardConfig.php`
- Create: `app/Models/Lead.php`
- Create: `app/Models/TrackingEvent.php`
- Create: `app/Models/EmailTemplate.php`
- Create: `app/Models/EmailTrigger.php`
- Create: `app/Models/EmailTriggerLog.php`
- Create: `app/Models/Promotion.php`
- Create: `app/Models/PromotionTarget.php`
- Test: `tests/Unit/Models/CustomerTest.php`

- [ ] **Step 1: Write the failing test**

Create `tests/Unit/Models/CustomerTest.php`:

```php
<?php

use App\Models\Customer;
use App\Models\Referral;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

it('generates a referral code that is unique and 8 chars', function () {
    $customer = Customer::factory()->create(['referral_code' => null]);
    $customer->generateReferralCode();

    expect($customer->fresh()->referral_code)->toHaveLength(8);
});

it('has referrals sent as referrer', function () {
    $referrer = Customer::factory()->create();
    $referred = Customer::factory()->create(['referred_by_id' => $referrer->id]);
    Referral::create([
        'referrer_id' => $referrer->id,
        'referred_id' => $referred->id,
        'status' => 'pending',
    ]);

    expect($referrer->referralsSent)->toHaveCount(1);
});

it('knows who referred it', function () {
    $referrer = Customer::factory()->create(['referral_code' => 'ABCD1234']);
    $referred = Customer::factory()->create(['referred_by_id' => $referrer->id]);

    expect($referred->referredBy->id)->toBe($referrer->id);
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
php artisan test tests/Unit/Models/CustomerTest.php
```

Expected: FAIL — `Class "App\Models\Customer" not found`.

- [ ] **Step 3: Create Customer model and factory**

```bash
php artisan make:model Customer --factory
```

Replace `app/Models/Customer.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class Customer extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'phone', 'password',
        'source', 'referred_by_id', 'referral_code',
        'referral_count', 'base_discount_pct',
    ];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'base_discount_pct' => 'decimal:2',
    ];

    public function referredBy(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'referred_by_id');
    }

    public function referralsSent(): HasMany
    {
        return $this->hasMany(Referral::class, 'referrer_id');
    }

    public function referralReceived(): HasMany
    {
        return $this->hasMany(Referral::class, 'referred_id');
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class)->latest();
    }

    public function generateReferralCode(): void
    {
        $this->update(['referral_code' => strtoupper(Str::random(8))]);
    }

    public function hasReachedMilestone(): bool
    {
        $config = ReferralRewardConfig::first();
        return $config && $this->referral_count >= $config->milestone;
    }
}
```

Replace `database/factories/CustomerFactory.php`:

```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class CustomerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'password' => Hash::make('password'),
            'source' => 'registered',
            'referred_by_id' => null,
            'referral_code' => null,
            'referral_count' => 0,
            'base_discount_pct' => 5.00,
        ];
    }
}
```

- [ ] **Step 4: Create remaining models**

```bash
php artisan make:model ContentBlock
php artisan make:model Transaction
php artisan make:model Referral
php artisan make:model ReferralRewardConfig
php artisan make:model Lead
php artisan make:model TrackingEvent
php artisan make:model EmailTemplate
php artisan make:model EmailTrigger
php artisan make:model EmailTriggerLog
php artisan make:model Promotion
php artisan make:model PromotionTarget
```

Replace `app/Models/ContentBlock.php`:
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class ContentBlock extends Model
{
    protected $fillable = ['key', 'type', 'value'];
}
```

Replace `app/Models/Transaction.php`:
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Transaction extends Model
{
    protected $fillable = ['customer_id', 'amount', 'notes', 'transaction_date', 'created_by'];
    protected $casts = ['transaction_date' => 'date', 'amount' => 'decimal:2'];
    public function customer(): BelongsTo { return $this->belongsTo(Customer::class); }
    public function createdByUser(): BelongsTo { return $this->belongsTo(User::class, 'created_by'); }
}
```

Replace `app/Models/Referral.php`:
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Referral extends Model
{
    protected $fillable = ['referrer_id', 'referred_id', 'status', 'reward_granted'];
    protected $casts = ['reward_granted' => 'boolean'];
    public function referrer(): BelongsTo { return $this->belongsTo(Customer::class, 'referrer_id'); }
    public function referred(): BelongsTo { return $this->belongsTo(Customer::class, 'referred_id'); }
}
```

Replace `app/Models/ReferralRewardConfig.php`:
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class ReferralRewardConfig extends Model
{
    protected $table = 'referral_reward_config';
    protected $fillable = ['milestone', 'reward_type', 'reward_value', 'resets_after_milestone'];
    protected $casts = ['resets_after_milestone' => 'boolean'];
}
```

Replace `app/Models/Lead.php`:
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Lead extends Model
{
    protected $fillable = ['name', 'email', 'phone', 'message', 'source_page', 'converted_to_customer_id'];
    public function convertedCustomer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'converted_to_customer_id');
    }
}
```

Replace `app/Models/TrackingEvent.php`:
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class TrackingEvent extends Model
{
    protected $fillable = ['session_id', 'email', 'page_url', 'event_type'];
    public $timestamps = false;
    protected $casts = ['created_at' => 'datetime'];
}
```

Replace `app/Models/EmailTemplate.php`:
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
class EmailTemplate extends Model
{
    protected $fillable = ['name', 'subject', 'body'];
    public function triggers(): HasMany { return $this->hasMany(EmailTrigger::class); }
}
```

Replace `app/Models/EmailTrigger.php`:
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class EmailTrigger extends Model
{
    protected $fillable = ['name', 'is_active', 'condition_type', 'condition_value', 'delay_hours', 'email_template_id'];
    protected $casts = ['is_active' => 'boolean'];
    public function template(): BelongsTo { return $this->belongsTo(EmailTemplate::class, 'email_template_id'); }
    public function logs(): HasMany { return $this->hasMany(EmailTriggerLog::class, 'trigger_id'); }
}
```

Replace `app/Models/EmailTriggerLog.php`:
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class EmailTriggerLog extends Model
{
    protected $fillable = ['trigger_id', 'email', 'sent_at'];
    public $timestamps = false;
    protected $casts = ['sent_at' => 'datetime'];
    public function trigger(): BelongsTo { return $this->belongsTo(EmailTrigger::class); }
}
```

Replace `app/Models/Promotion.php`:
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Promotion extends Model
{
    protected $fillable = ['name', 'type', 'value', 'scope', 'stackable', 'conditions', 'starts_at', 'ends_at', 'is_active'];
    protected $casts = [
        'stackable' => 'boolean',
        'is_active' => 'boolean',
        'conditions' => 'array',
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'value' => 'decimal:2',
    ];
    public function targets(): HasMany { return $this->hasMany(PromotionTarget::class); }
}
```

Replace `app/Models/PromotionTarget.php`:
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class PromotionTarget extends Model
{
    protected $fillable = ['promotion_id', 'target_type', 'target_id'];
    public $timestamps = false;
    public function promotion(): BelongsTo { return $this->belongsTo(Promotion::class); }
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
php artisan test tests/Unit/Models/CustomerTest.php
```

Expected: 3 tests, 3 passed.

- [ ] **Step 6: Commit**

```bash
git add app/Models/ database/factories/ tests/Unit/
git commit -m "feat: add customer system, CMS, email, and promotions models"
```

---

## Task 9: Seed Database with Existing Product Data

**Files:**
- Create: `database/seeders/CategorySeeder.php`
- Create: `database/seeders/ProductSeeder.php`
- Create: `database/seeders/ReferralRewardConfigSeeder.php`
- Modify: `database/seeders/DatabaseSeeder.php`

- [ ] **Step 1: Create CategorySeeder**

```bash
php artisan make:seeder CategorySeeder
```

Replace `database/seeders/CategorySeeder.php`:

```php
<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'slug' => 'interior',
                'label' => 'Colecția Noastră',
                'heading' => 'Uși de Interior',
                'sub' => 'Eleganță și funcționalitate pentru spațiile interioare. Descoperă colecția noastră de uși premium pentru orice stil arhitectural.',
                'image_path' => null,
            ],
            [
                'slug' => 'exterior',
                'label' => 'Colecția Noastră',
                'heading' => 'Uși de Exterior',
                'sub' => 'Securitate și design premium pentru intrarea în locuința ta. Uși de exterior cu izolație termică și fonică de înaltă performanță.',
                'image_path' => null,
            ],
            [
                'slug' => 'glisante',
                'label' => 'Colecția Noastră',
                'heading' => 'Uși Glisante',
                'sub' => 'Soluții moderne de separare a spațiilor. Uși glisante cu mecanism silențios pentru o experiență de utilizare fluidă.',
                'image_path' => null,
            ],
            [
                'slug' => 'pivotante',
                'label' => 'Colecția Noastră',
                'heading' => 'Uși Pivotante',
                'sub' => 'Declarații arhitecturale îndrăznețe pentru spații exclusive. Uși pivotante de mari dimensiuni cu impact vizual maxim.',
                'image_path' => null,
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(['slug' => $category['slug']], $category);
        }
    }
}
```

- [ ] **Step 2: Create ProductSeeder**

```bash
php artisan make:seeder ProductSeeder
```

Replace `database/seeders/ProductSeeder.php` with the 4 products from the Next.js `lib/data.ts`:

```php
<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $interior = Category::where('slug', 'interior')->first();
        $exterior = Category::where('slug', 'exterior')->first();
        $glisante = Category::where('slug', 'glisante')->first();
        $pivotante = Category::where('slug', 'pivotante')->first();

        // 1. Filomuro — Interior
        $filomuro = Product::updateOrCreate(['slug' => 'filomuro'], [
            'category_id' => $interior->id,
            'eyebrow' => 'Ușă interior · Furnir',
            'name' => 'Filomuro',
            'model' => 'FMR-200 · La comandă',
            'description' => 'Filomuro este definiția perfecțiunii arhitecturale — o ușă care dispare în perete, lăsând doar eleganța spațiului să vorbească. Construită cu precizie elvețiană și finisată cu furnir natural de stejar, aceasta nu este o ușă, ci o declarație de design.',
            'starting_price' => 3200.00,
            'sale_percent' => null,
            'made_in_germany' => false,
            'is_visible' => true,
            'sort_order' => 0,
        ]);

        $this->attachTags($filomuro, ['Invizibilă', 'Furnir Natural', 'Izolație Fonică', 'Flush']);
        $filomuro->specs()->delete();
        $filomuro->specs()->createMany([
            ['key' => 'Material', 'value' => 'Furnir stejar natural', 'sort_order' => 0],
            ['key' => 'Izolație fonică', 'value' => 'Rw 42 dB', 'sort_order' => 1],
            ['key' => 'Sistem', 'value' => 'Flush / Filomuro', 'sort_order' => 2],
            ['key' => 'Înălțime max.', 'value' => '3000 mm', 'sort_order' => 3],
            ['key' => 'Lățime max.', 'value' => '1200 mm', 'sort_order' => 4],
            ['key' => 'Garanție', 'value' => '5 ani', 'sort_order' => 5],
        ]);

        // 2. GROKE Thermosafe — Exterior
        $groke = Product::updateOrCreate(['slug' => 'groke-thermosafe'], [
            'category_id' => $exterior->id,
            'eyebrow' => 'Ușă exterior · Aluminiu',
            'name' => 'GROKE Thermosafe',
            'model' => 'TS-800 · La comandă',
            'description' => 'GROKE Thermosafe redefinește standardele de securitate și eficiență energetică. Cu un coeficient termic Uw=0.71 și certificare antiefracție RC3, această ușă germană de aluminiu oferă protecție maximă fără a compromite estetica.',
            'starting_price' => 5800.00,
            'sale_percent' => 10,
            'made_in_germany' => true,
            'is_visible' => true,
            'sort_order' => 1,
        ]);

        $this->attachTags($groke, ['Antiefracție RC3', 'Made in Germany', 'Izolație Termică', 'Aluminiu']);
        $groke->specs()->delete();
        $groke->specs()->createMany([
            ['key' => 'Material', 'value' => 'Aluminiu premium', 'sort_order' => 0],
            ['key' => 'Izolație termică', 'value' => 'Uw=0.71 W/m²K', 'sort_order' => 1],
            ['key' => 'Antiefracție', 'value' => 'RC3 certificat', 'sort_order' => 2],
            ['key' => 'Izolație fonică', 'value' => 'Rw 45 dB', 'sort_order' => 3],
            ['key' => 'Garanție', 'value' => '10 ani', 'sort_order' => 4],
            ['key' => 'Fabricație', 'value' => 'Germania', 'sort_order' => 5],
        ]);

        // 3. Liftant-Culisant — Glisante
        $liftant = Product::updateOrCreate(['slug' => 'liftant-culisant'], [
            'category_id' => $glisante->id,
            'eyebrow' => 'Ușă glisantă · Lift & Slide',
            'name' => 'Liftant-Culisant',
            'model' => 'LC-500 · La comandă',
            'description' => 'Sistemul Liftant-Culisant transformă granița dintre interior și exterior într-o experiență fluidă. Cu un mecanism de ridicare și glisare de precizie, panouri de până la 400kg se mișcă cu o singură atingere, oferind o deschidere panoramică impresionantă.',
            'starting_price' => 8500.00,
            'sale_percent' => null,
            'made_in_germany' => false,
            'is_visible' => true,
            'sort_order' => 2,
        ]);

        $this->attachTags($liftant, ['Lift & Slide', 'Panoramic', 'Silențios', 'Termoizolant']);
        $liftant->specs()->delete();
        $liftant->specs()->createMany([
            ['key' => 'Sistem', 'value' => 'Lift & Slide', 'sort_order' => 0],
            ['key' => 'Greutate max.', 'value' => '400 kg/canat', 'sort_order' => 1],
            ['key' => 'Izolație termică', 'value' => 'Uw=0.8 W/m²K', 'sort_order' => 2],
            ['key' => 'Lățime max.', 'value' => '6000 mm', 'sort_order' => 3],
            ['key' => 'Înălțime max.', 'value' => '3500 mm', 'sort_order' => 4],
            ['key' => 'Garanție', 'value' => '5 ani', 'sort_order' => 5],
        ]);

        // 4. Grand Pivot — Pivotante
        $pivot = Product::updateOrCreate(['slug' => 'grand-pivot'], [
            'category_id' => $pivotante->id,
            'eyebrow' => 'Ușă pivotantă · Statement',
            'name' => 'Grand Pivot',
            'model' => 'GP-1200 · La comandă',
            'description' => 'Grand Pivot este mai mult decât o ușă — este prima impresie a unei reședințe de excepție. Cu o înălțime de până la 4 metri și un pivot central de precizie, această ușă pivotantă creează un moment arhitectural memorabil la fiecare intrare.',
            'starting_price' => 12000.00,
            'sale_percent' => null,
            'made_in_germany' => false,
            'is_visible' => true,
            'sort_order' => 3,
        ]);

        $this->attachTags($pivot, ['Pivot Central', 'Statement', 'La Comandă', 'Grandoare']);
        $pivot->specs()->delete();
        $pivot->specs()->createMany([
            ['key' => 'Pivot', 'value' => 'Central / offset', 'sort_order' => 0],
            ['key' => 'Înălțime max.', 'value' => '4000 mm', 'sort_order' => 1],
            ['key' => 'Lățime max.', 'value' => '1500 mm', 'sort_order' => 2],
            ['key' => 'Material', 'value' => 'Aluminiu / Lemn masiv', 'sort_order' => 3],
            ['key' => 'Greutate max.', 'value' => '500 kg', 'sort_order' => 4],
            ['key' => 'Garanție', 'value' => '5 ani', 'sort_order' => 5],
        ]);
    }

    private function attachTags(Product $product, array $tagNames): void
    {
        $tagIds = collect($tagNames)->map(function (string $name) {
            return Tag::firstOrCreate(['name' => $name])->id;
        });
        $product->tags()->sync($tagIds);
    }
}
```

- [ ] **Step 3: Create ReferralRewardConfigSeeder**

```bash
php artisan make:seeder ReferralRewardConfigSeeder
```

Replace `database/seeders/ReferralRewardConfigSeeder.php`:

```php
<?php

namespace Database\Seeders;

use App\Models\ReferralRewardConfig;
use Illuminate\Database\Seeder;

class ReferralRewardConfigSeeder extends Seeder
{
    public function run(): void
    {
        ReferralRewardConfig::updateOrCreate(
            ['id' => 1],
            [
                'milestone' => 3,
                'reward_type' => 'discount',
                'reward_value' => '10',
                'resets_after_milestone' => true,
            ]
        );
    }
}
```

- [ ] **Step 4: Wire up DatabaseSeeder**

Replace `database/seeders/DatabaseSeeder.php`:

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
            ReferralRewardConfigSeeder::class,
        ]);
    }
}
```

- [ ] **Step 5: Run seeders**

```bash
php artisan db:seed
```

Expected output:
```
Seeding: CategorySeeder ✓
Seeding: ProductSeeder ✓
Seeding: ReferralRewardConfigSeeder ✓
Database seeding completed successfully.
```

- [ ] **Step 6: Verify data in database**

```bash
php artisan tinker --execute="echo App\Models\Product::with('category','specs','tags')->count() . ' products seeded';"
```

Expected: `4 products seeded`

- [ ] **Step 7: Commit**

```bash
git add database/seeders/
git commit -m "feat: seed database with 4 existing products, 4 categories, and default referral reward config"
```

---

## Task 10: Final Verification

- [ ] **Step 1: Fresh migrate + seed to confirm everything works end to end**

```bash
php artisan migrate:fresh --seed
```

Expected: All 22+ migrations run, all 3 seeders run, no errors.

- [ ] **Step 2: Run full test suite**

```bash
php artisan test
```

Expected: All tests pass.

- [ ] **Step 3: Start dev server to confirm Laravel is running**

```bash
php artisan serve
```

Visit `http://localhost:8000` — should see the default Laravel welcome page.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: Plan 1 complete — full schema, models, and seeded data"
```

---

## What's Next

- **Plan 2:** Product, Category & Content API endpoints — Next.js fetches real data from Laravel
- **Plan 3:** Customer auth, referral flow, leads capture, tracking endpoint
- **Plan 4:** Filament admin panel — full resource management for staff
- **Plan 5:** Email automation, promotions engine, analytics dashboard
