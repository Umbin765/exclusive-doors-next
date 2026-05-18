# Exclusive Doors — Laravel Backend: Plan 4 — Filament Admin Panel

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete Filament v4 admin panel — 11 resources covering all content, customers, referrals, promotions, and email automation, plus a dashboard with stats, charts, and live-data tables.

**Architecture:** All resources under `app/Filament/Resources/`. Auto-discovery is already configured in `AdminPanelProvider`. No API tests for this plan — Filament resources are UI-only. Manual smoke-test via browser after each task. The `User` model (Laravel default, in `users` table) is already set as the Filament auth guard — staff log in as `User` records.

**Tech Stack:** Filament v4.11.2, Laravel 13, Docker Compose (`docker compose exec app php artisan ...`)

---

## File Structure

```
app/Filament/
├── Resources/
│   ├── ProductResource.php                (+ Pages/)
│   ├── CategoryResource.php               (+ Pages/)
│   ├── ContentBlockResource.php           (+ Pages/)
│   ├── CustomerResource.php               (+ Pages/)
│   ├── TransactionResource.php            (+ Pages/)
│   ├── ReferralResource.php               (+ Pages/)
│   ├── ReferralRewardConfigResource.php   (+ Pages/)
│   ├── PromotionResource.php              (+ Pages/)
│   ├── EmailTemplateResource.php          (+ Pages/)
│   ├── EmailTriggerResource.php           (+ Pages/)
│   └── LeadResource.php                  (+ Pages/)
└── Widgets/
    ├── StatsOverview.php
    ├── NewCustomersChart.php
    ├── PageViewsChart.php
    └── RecentLeadsTable.php
```

---

## Task 1: Products Resource

The most complex resource — full CRUD with Repeaters for specs, finishes, gallery images, detail panels, and scroll stops (with nested stats).

**Files:**
- Create: `app/Filament/Resources/ProductResource.php`
- Create: `app/Filament/Resources/ProductResource/Pages/ListProducts.php`
- Create: `app/Filament/Resources/ProductResource/Pages/CreateProduct.php`
- Create: `app/Filament/Resources/ProductResource/Pages/EditProduct.php`

- [ ] **Step 1: Generate the resource scaffold**

```bash
docker compose exec app php artisan make:filament-resource Product --embed-schemas --embed-table
```

This creates `app/Filament/Resources/ProductResource.php` with stub form, table, and pages.

- [ ] **Step 2: Replace ProductResource.php with full implementation**

```php
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Category;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;
    protected static ?string $navigationIcon = 'heroicon-o-door-open';
    protected static ?string $navigationLabel = 'Produse';
    protected static ?string $modelLabel = 'Produs';
    protected static ?string $pluralModelLabel = 'Produse';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Informații generale')->schema([
                Forms\Components\Select::make('category_id')
                    ->label('Categorie')
                    ->options(Category::pluck('heading', 'id'))
                    ->required(),

                Forms\Components\TextInput::make('slug')
                    ->label('Slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),

                Forms\Components\TextInput::make('eyebrow')
                    ->label('Eyebrow (tip · material)')
                    ->required()
                    ->maxLength(255),

                Forms\Components\TextInput::make('name')
                    ->label('Nume')
                    ->required()
                    ->maxLength(255),

                Forms\Components\TextInput::make('model')
                    ->label('Model')
                    ->maxLength(255),

                Forms\Components\RichEditor::make('description')
                    ->label('Descriere')
                    ->columnSpanFull(),

                Forms\Components\TextInput::make('starting_price')
                    ->label('Preț de la (EUR)')
                    ->numeric()
                    ->prefix('€')
                    ->required(),

                Forms\Components\TextInput::make('sale_percent')
                    ->label('Reducere (%)')
                    ->numeric()
                    ->minValue(0)
                    ->maxValue(100),

                Forms\Components\TextInput::make('sort_order')
                    ->label('Ordine')
                    ->numeric()
                    ->default(0),

                Forms\Components\Toggle::make('made_in_germany')
                    ->label('Made in Germany'),

                Forms\Components\Toggle::make('is_visible')
                    ->label('Vizibil pe site')
                    ->default(true),
            ])->columns(2),

            Forms\Components\Section::make('Specificații')->schema([
                Forms\Components\Repeater::make('specs')
                    ->relationship()
                    ->schema([
                        Forms\Components\TextInput::make('key')->label('Cheie')->required(),
                        Forms\Components\TextInput::make('value')->label('Valoare')->required(),
                        Forms\Components\TextInput::make('sort_order')->label('Ordine')->numeric()->default(0),
                    ])
                    ->columns(3)
                    ->reorderable('sort_order')
                    ->orderColumn('sort_order')
                    ->label('Specificații'),
            ]),

            Forms\Components\Section::make('Finisaje')->schema([
                Forms\Components\Repeater::make('finishes')
                    ->relationship()
                    ->schema([
                        Forms\Components\TextInput::make('color')->label('Hex culoare')->required()->maxLength(7),
                        Forms\Components\TextInput::make('label')->label('Etichetă')->required(),
                        Forms\Components\TextInput::make('sort_order')->label('Ordine')->numeric()->default(0),
                    ])
                    ->columns(3)
                    ->reorderable('sort_order')
                    ->orderColumn('sort_order')
                    ->label('Finisaje'),
            ]),

            Forms\Components\Section::make('Galerie imagini')->schema([
                Forms\Components\Repeater::make('galleryImages')
                    ->relationship()
                    ->schema([
                        Forms\Components\TextInput::make('path')->label('Cale imagine (URL)')->required(),
                        Forms\Components\TextInput::make('sort_order')->label('Ordine')->numeric()->default(0),
                    ])
                    ->columns(2)
                    ->reorderable('sort_order')
                    ->orderColumn('sort_order')
                    ->label('Imagini'),
            ]),

            Forms\Components\Section::make('Panouri detalii')->schema([
                Forms\Components\Repeater::make('detailPanels')
                    ->relationship()
                    ->schema([
                        Forms\Components\TextInput::make('title')->label('Titlu')->required(),
                        Forms\Components\Textarea::make('body')->label('Corp text'),
                        Forms\Components\TextInput::make('spec_key')->label('Spec cheie'),
                        Forms\Components\TextInput::make('spec_val')->label('Spec valoare'),
                        Forms\Components\TextInput::make('image_path')->label('Imagine (URL)'),
                        Forms\Components\TextInput::make('sort_order')->label('Ordine')->numeric()->default(0),
                    ])
                    ->columns(2)
                    ->reorderable('sort_order')
                    ->orderColumn('sort_order')
                    ->label('Panouri'),
            ]),

            Forms\Components\Section::make('Scroll stops')->schema([
                Forms\Components\Repeater::make('scrollStops')
                    ->relationship()
                    ->schema([
                        Forms\Components\TextInput::make('eyebrow')->label('Eyebrow'),
                        Forms\Components\TextInput::make('title')->label('Titlu')->required(),
                        Forms\Components\Textarea::make('body')->label('Corp text'),
                        Forms\Components\TextInput::make('image_path')->label('Imagine (URL)'),
                        Forms\Components\TextInput::make('sort_order')->label('Ordine')->numeric()->default(0),
                    ])
                    ->columns(2)
                    ->reorderable('sort_order')
                    ->orderColumn('sort_order')
                    ->label('Scroll stops'),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('sort_order')->label('#')->sortable(),
                Tables\Columns\TextColumn::make('name')->label('Nume')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('category.heading')->label('Categorie')->sortable(),
                Tables\Columns\TextColumn::make('starting_price')->label('Preț')->money('EUR')->sortable(),
                Tables\Columns\TextColumn::make('sale_percent')->label('Reducere')->suffix('%'),
                Tables\Columns\IconColumn::make('made_in_germany')->label('DE')->boolean(),
                Tables\Columns\IconColumn::make('is_visible')->label('Vizibil')->boolean(),
            ])
            ->defaultSort('sort_order')
            ->filters([
                Tables\Filters\SelectFilter::make('category_id')
                    ->label('Categorie')
                    ->relationship('category', 'heading'),
                Tables\Filters\TernaryFilter::make('is_visible')->label('Vizibil'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit'   => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
```

- [ ] **Step 3: Verify pages were generated**

Check that these files exist after the scaffold command:
- `app/Filament/Resources/ProductResource/Pages/ListProducts.php`
- `app/Filament/Resources/ProductResource/Pages/CreateProduct.php`
- `app/Filament/Resources/ProductResource/Pages/EditProduct.php`

If not, create them manually:

```php
<?php
// app/Filament/Resources/ProductResource/Pages/ListProducts.php
namespace App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
class ListProducts extends ListRecords {
    protected static string $resource = ProductResource::class;
    protected function getHeaderActions(): array {
        return [Actions\CreateAction::make()];
    }
}
```

```php
<?php
// app/Filament/Resources/ProductResource/Pages/CreateProduct.php
namespace App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource;
use Filament\Resources\Pages\CreateRecord;
class CreateProduct extends CreateRecord {
    protected static string $resource = ProductResource::class;
}
```

```php
<?php
// app/Filament/Resources/ProductResource/Pages/EditProduct.php
namespace App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
class EditProduct extends EditRecord {
    protected static string $resource = ProductResource::class;
    protected function getHeaderActions(): array {
        return [Actions\DeleteAction::make()];
    }
}
```

- [ ] **Step 4: Run tests to confirm no regressions**

```bash
docker compose exec app php artisan test
```
Expected: 37 passed

- [ ] **Step 5: Smoke test in browser**

Visit `http://localhost:8000/admin` — log in with your staff account, navigate to Produse. Confirm the list loads and shows the 4 seeded products.

- [ ] **Step 6: Commit**

```bash
git add app/Filament/Resources/ProductResource.php \
        app/Filament/Resources/ProductResource/
git commit -m "feat: Filament Products resource with repeaters for specs, finishes, gallery, detail panels, scroll stops"
```

---

## Task 2: Categories, Content Blocks, and Leads Resources

Three simpler resources — Categories (small form), Content Blocks (key-value CMS), and Leads (read-mostly with a convert action).

**Files:**
- Create: `app/Filament/Resources/CategoryResource.php` (+ Pages/)
- Create: `app/Filament/Resources/ContentBlockResource.php` (+ Pages/)
- Create: `app/Filament/Resources/LeadResource.php` (+ Pages/)

- [ ] **Step 1: Generate scaffolds**

```bash
docker compose exec app php artisan make:filament-resource Category --embed-schemas --embed-table
docker compose exec app php artisan make:filament-resource ContentBlock --embed-schemas --embed-table
docker compose exec app php artisan make:filament-resource Lead --embed-schemas --embed-table
```

- [ ] **Step 2: Write CategoryResource**

```php
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CategoryResource\Pages;
use App\Models\Category;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CategoryResource extends Resource
{
    protected static ?string $model = Category::class;
    protected static ?string $navigationIcon = 'heroicon-o-squares-2x2';
    protected static ?string $navigationLabel = 'Categorii';
    protected static ?string $modelLabel = 'Categorie';
    protected static ?string $pluralModelLabel = 'Categorii';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('slug')->label('Slug')->required()->unique(ignoreRecord: true)->maxLength(100),
            Forms\Components\TextInput::make('label')->label('Eyebrow label')->required()->maxLength(255),
            Forms\Components\TextInput::make('heading')->label('Heading H1')->required()->maxLength(255),
            Forms\Components\Textarea::make('sub')->label('Subtitlu')->rows(3),
            Forms\Components\TextInput::make('image_path')->label('Imagine (URL)')->maxLength(500),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('slug')->label('Slug')->searchable(),
                Tables\Columns\TextColumn::make('heading')->label('Heading')->searchable(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListCategories::route('/'),
            'create' => Pages\CreateCategory::route('/create'),
            'edit'   => Pages\EditCategory::route('/{record}/edit'),
        ];
    }
}
```

Create the 3 page stubs (ListCategories, CreateCategory, EditCategory) following the same pattern as ProductResource pages in Task 1.

- [ ] **Step 3: Write ContentBlockResource**

```php
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContentBlockResource\Pages;
use App\Models\ContentBlock;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ContentBlockResource extends Resource
{
    protected static ?string $model = ContentBlock::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'Conținut CMS';
    protected static ?string $modelLabel = 'Bloc conținut';
    protected static ?string $pluralModelLabel = 'Conținut CMS';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('key')
                ->label('Cheie (ex: hero.title)')
                ->required()
                ->unique(ignoreRecord: true)
                ->maxLength(255)
                ->columnSpanFull(),

            Forms\Components\Select::make('type')
                ->label('Tip')
                ->options([
                    'text'     => 'Text simplu',
                    'richtext' => 'Rich text',
                    'image'    => 'Imagine (URL)',
                ])
                ->required()
                ->reactive(),

            Forms\Components\TextInput::make('value')
                ->label('Valoare')
                ->visible(fn ($get) => in_array($get('type'), ['text', 'image']))
                ->columnSpanFull(),

            Forms\Components\RichEditor::make('value')
                ->label('Valoare (rich text)')
                ->visible(fn ($get) => $get('type') === 'richtext')
                ->columnSpanFull(),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('key')->label('Cheie')->searchable()->sortable(),
                Tables\Columns\BadgeColumn::make('type')->label('Tip'),
                Tables\Columns\TextColumn::make('value')->label('Valoare')->limit(60)->searchable(),
            ])
            ->defaultSort('key')
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->label('Tip')
                    ->options([
                        'text'     => 'Text',
                        'richtext' => 'Rich text',
                        'image'    => 'Imagine',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListContentBlocks::route('/'),
            'create' => Pages\CreateContentBlock::route('/create'),
            'edit'   => Pages\EditContentBlock::route('/{record}/edit'),
        ];
    }
}
```

Create the 3 page stubs (ListContentBlocks, CreateContentBlock, EditContentBlock).

- [ ] **Step 4: Write LeadResource**

```php
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LeadResource\Pages;
use App\Models\Customer;
use App\Models\Lead;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Hash;

class LeadResource extends Resource
{
    protected static ?string $model = Lead::class;
    protected static ?string $navigationIcon = 'heroicon-o-inbox-arrow-down';
    protected static ?string $navigationLabel = 'Lead-uri';
    protected static ?string $modelLabel = 'Lead';
    protected static ?string $pluralModelLabel = 'Lead-uri';
    protected static ?int $navigationSort = 9;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')->label('Nume')->disabled(),
            Forms\Components\TextInput::make('email')->label('Email')->disabled(),
            Forms\Components\TextInput::make('phone')->label('Telefon')->disabled(),
            Forms\Components\Textarea::make('message')->label('Mesaj')->disabled()->columnSpanFull(),
            Forms\Components\TextInput::make('source_page')->label('Pagina sursă')->disabled(),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('Nume')->searchable(),
                Tables\Columns\TextColumn::make('email')->label('Email')->searchable(),
                Tables\Columns\TextColumn::make('source_page')->label('Pagina sursă'),
                Tables\Columns\TextColumn::make('created_at')->label('Data')->dateTime('d.m.Y H:i')->sortable(),
                Tables\Columns\IconColumn::make('converted_to_customer_id')
                    ->label('Convertit')
                    ->boolean()
                    ->trueColor('success')
                    ->falseColor('gray'),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\TernaryFilter::make('converted_to_customer_id')
                    ->label('Convertit')
                    ->nullable(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\Action::make('convert')
                    ->label('Convertește în client')
                    ->icon('heroicon-o-user-plus')
                    ->color('success')
                    ->visible(fn (Lead $record) => is_null($record->converted_to_customer_id))
                    ->requiresConfirmation()
                    ->action(function (Lead $record) {
                        $customer = Customer::create([
                            'name'     => $record->name,
                            'email'    => $record->email,
                            'phone'    => $record->phone,
                            'password' => Hash::make(str()->random(16)),
                            'source'   => 'lead',
                        ]);
                        $record->update(['converted_to_customer_id' => $customer->id]);
                        Notification::make()->title('Lead convertit cu succes')->success()->send();
                    }),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListLeads::route('/'),
            'view'  => Pages\ViewLead::route('/{record}'),
        ];
    }
}
```

For LeadResource pages, create ListLeads and ViewLead (view-only, no create/edit):

```php
<?php
// app/Filament/Resources/LeadResource/Pages/ListLeads.php
namespace App\Filament\Resources\LeadResource\Pages;
use App\Filament\Resources\LeadResource;
use Filament\Resources\Pages\ListRecords;
class ListLeads extends ListRecords {
    protected static string $resource = LeadResource::class;
}
```

```php
<?php
// app/Filament/Resources/LeadResource/Pages/ViewLead.php
namespace App\Filament\Resources\LeadResource\Pages;
use App\Filament\Resources\LeadResource;
use Filament\Resources\Pages\ViewRecord;
class ViewLead extends ViewRecord {
    protected static string $resource = LeadResource::class;
}
```

- [ ] **Step 5: Run tests — expect 37 still passing**

```bash
docker compose exec app php artisan test
```

- [ ] **Step 6: Smoke test in browser**

Visit `http://localhost:8000/admin` — confirm Categorii, Conținut CMS, and Lead-uri appear in the sidebar.

- [ ] **Step 7: Commit**

```bash
git add app/Filament/Resources/CategoryResource.php \
        app/Filament/Resources/CategoryResource/ \
        app/Filament/Resources/ContentBlockResource.php \
        app/Filament/Resources/ContentBlockResource/ \
        app/Filament/Resources/LeadResource.php \
        app/Filament/Resources/LeadResource/
git commit -m "feat: Filament resources for Categories, Content Blocks, and Leads"
```

---

## Task 3: Customers and Transactions Resources

Customers resource with referral info visible. Transactions resource for staff to log sales (triggers referral_code generation on first sale).

**Files:**
- Create: `app/Filament/Resources/CustomerResource.php` (+ Pages/)
- Create: `app/Filament/Resources/TransactionResource.php` (+ Pages/)

- [ ] **Step 1: Generate scaffolds**

```bash
docker compose exec app php artisan make:filament-resource Customer --embed-schemas --embed-table
docker compose exec app php artisan make:filament-resource Transaction --embed-schemas --embed-table
```

- [ ] **Step 2: Write CustomerResource**

```php
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CustomerResource\Pages;
use App\Models\Customer;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CustomerResource extends Resource
{
    protected static ?string $model = Customer::class;
    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationLabel = 'Clienți';
    protected static ?string $modelLabel = 'Client';
    protected static ?string $pluralModelLabel = 'Clienți';
    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Profil')->schema([
                Forms\Components\TextInput::make('name')->label('Nume')->required()->maxLength(255),
                Forms\Components\TextInput::make('email')->label('Email')->email()->required()->unique(ignoreRecord: true),
                Forms\Components\TextInput::make('phone')->label('Telefon')->maxLength(30),
                Forms\Components\Select::make('source')
                    ->label('Sursă')
                    ->options([
                        'registered' => 'Înregistrat',
                        'referred'   => 'Referit',
                        'lead'       => 'Lead',
                    ])
                    ->required(),
            ])->columns(2),

            Forms\Components\Section::make('Reduceri & Referral')->schema([
                Forms\Components\TextInput::make('base_discount_pct')
                    ->label('Reducere de bază (%)')
                    ->numeric()
                    ->minValue(0)
                    ->maxValue(100)
                    ->default(5),

                Forms\Components\TextInput::make('referral_code')
                    ->label('Cod referral')
                    ->disabled(),

                Forms\Components\TextInput::make('referral_count')
                    ->label('Referrals convertite')
                    ->numeric()
                    ->disabled(),
            ])->columns(3),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('Nume')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('email')->label('Email')->searchable(),
                Tables\Columns\TextColumn::make('phone')->label('Telefon'),
                Tables\Columns\BadgeColumn::make('source')->label('Sursă'),
                Tables\Columns\TextColumn::make('referral_code')->label('Cod referral'),
                Tables\Columns\TextColumn::make('referral_count')->label('Referrals')->sortable(),
                Tables\Columns\TextColumn::make('base_discount_pct')->label('Reducere')->suffix('%'),
                Tables\Columns\TextColumn::make('created_at')->label('Înregistrat')->date('d.m.Y')->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('source')
                    ->label('Sursă')
                    ->options([
                        'registered' => 'Înregistrat',
                        'referred'   => 'Referit',
                        'lead'       => 'Lead',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListCustomers::route('/'),
            'create' => Pages\CreateCustomer::route('/create'),
            'edit'   => Pages\EditCustomer::route('/{record}/edit'),
        ];
    }
}
```

Create ListCustomers, CreateCustomer, EditCustomer pages following the standard pattern.

- [ ] **Step 3: Write TransactionResource**

When a transaction is created for a customer who has no referral_code yet, generate one automatically.

```php
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TransactionResource\Pages;
use App\Models\Customer;
use App\Models\Transaction;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class TransactionResource extends Resource
{
    protected static ?string $model = Transaction::class;
    protected static ?string $navigationIcon = 'heroicon-o-banknotes';
    protected static ?string $navigationLabel = 'Tranzacții';
    protected static ?string $modelLabel = 'Tranzacție';
    protected static ?string $pluralModelLabel = 'Tranzacții';
    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('customer_id')
                ->label('Client')
                ->options(Customer::orderBy('name')->pluck('name', 'id'))
                ->searchable()
                ->required(),

            Forms\Components\TextInput::make('amount')
                ->label('Sumă (EUR)')
                ->numeric()
                ->prefix('€')
                ->required(),

            Forms\Components\DatePicker::make('transaction_date')
                ->label('Data tranzacției')
                ->required()
                ->default(now()),

            Forms\Components\Textarea::make('notes')
                ->label('Note')
                ->columnSpanFull(),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('customer.name')->label('Client')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('amount')->label('Sumă')->money('EUR')->sortable(),
                Tables\Columns\TextColumn::make('transaction_date')->label('Data')->date('d.m.Y')->sortable(),
                Tables\Columns\TextColumn::make('notes')->label('Note')->limit(50),
                Tables\Columns\TextColumn::make('created_at')->label('Înregistrat')->dateTime('d.m.Y H:i')->sortable(),
            ])
            ->defaultSort('transaction_date', 'desc')
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListTransactions::route('/'),
            'create' => Pages\CreateTransaction::route('/create'),
            'edit'   => Pages\EditTransaction::route('/{record}/edit'),
        ];
    }
}
```

For the referral_code auto-generation on first transaction, override the `CreateTransaction` page:

```php
<?php
// app/Filament/Resources/TransactionResource/Pages/CreateTransaction.php
namespace App\Filament\Resources\TransactionResource\Pages;

use App\Filament\Resources\TransactionResource;
use App\Models\Customer;
use Filament\Resources\Pages\CreateRecord;

class CreateTransaction extends CreateRecord
{
    protected static string $resource = TransactionResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['created_by'] = auth()->id();
        return $data;
    }

    protected function afterCreate(): void
    {
        $customer = Customer::find($this->record->customer_id);
        if ($customer && is_null($customer->referral_code)) {
            $customer->generateReferralCode();
        }
    }
}
```

Create ListTransactions and EditTransaction pages following the standard pattern.

- [ ] **Step 4: Run tests — expect 37 still passing**

```bash
docker compose exec app php artisan test
```

- [ ] **Step 5: Commit**

```bash
git add app/Filament/Resources/CustomerResource.php \
        app/Filament/Resources/CustomerResource/ \
        app/Filament/Resources/TransactionResource.php \
        app/Filament/Resources/TransactionResource/
git commit -m "feat: Filament Customers and Transactions resources"
```

---

## Task 4: Referrals and Referral Reward Config Resources

Referrals list with "Mark as converted" action that increments referral_count and checks milestone. Referral Reward Config is a single-row settings page.

**Files:**
- Create: `app/Filament/Resources/ReferralResource.php` (+ Pages/)
- Create: `app/Filament/Resources/ReferralRewardConfigResource.php` (+ Pages/)

- [ ] **Step 1: Generate scaffolds**

```bash
docker compose exec app php artisan make:filament-resource Referral --embed-schemas --embed-table
docker compose exec app php artisan make:filament-resource ReferralRewardConfig --embed-schemas --embed-table
```

- [ ] **Step 2: Write ReferralResource**

```php
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ReferralResource\Pages;
use App\Models\Referral;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ReferralResource extends Resource
{
    protected static ?string $model = Referral::class;
    protected static ?string $navigationIcon = 'heroicon-o-share';
    protected static ?string $navigationLabel = 'Referrals';
    protected static ?string $modelLabel = 'Referral';
    protected static ?string $pluralModelLabel = 'Referrals';
    protected static ?int $navigationSort = 6;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('referrer_id')
                ->label('Referent (trimițător)')
                ->relationship('referrer', 'name')
                ->disabled(),
            Forms\Components\Select::make('referred_id')
                ->label('Referit (primit)')
                ->relationship('referred', 'name')
                ->disabled(),
            Forms\Components\Select::make('status')
                ->label('Status')
                ->options(['pending' => 'În așteptare', 'converted' => 'Convertit'])
                ->disabled(),
            Forms\Components\Toggle::make('reward_granted')->label('Recompensă acordată')->disabled(),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('referrer.name')->label('Referent')->searchable(),
                Tables\Columns\TextColumn::make('referred.name')->label('Referit')->searchable(),
                Tables\Columns\BadgeColumn::make('status')
                    ->label('Status')
                    ->colors(['warning' => 'pending', 'success' => 'converted']),
                Tables\Columns\IconColumn::make('reward_granted')->label('Recompensă')->boolean(),
                Tables\Columns\TextColumn::make('created_at')->label('Data')->date('d.m.Y')->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(['pending' => 'În așteptare', 'converted' => 'Convertit']),
            ])
            ->actions([
                Tables\Actions\Action::make('convert')
                    ->label('Marchează convertit')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn (Referral $record) => $record->status === 'pending')
                    ->requiresConfirmation()
                    ->action(function (Referral $record) {
                        $record->update(['status' => 'converted']);
                        $referrer = $record->referrer;
                        $referrer->increment('referral_count');
                        $referrer->refresh();

                        if ($referrer->hasReachedMilestone()) {
                            $record->update(['reward_granted' => true]);
                            $referrer->update(['referral_count' => 0]);
                            Notification::make()
                                ->title("🎉 {$referrer->name} a atins milestone-ul! Recompensă acordată.")
                                ->success()
                                ->send();
                        } else {
                            Notification::make()->title('Referral marcat ca convertit.')->success()->send();
                        }
                    }),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListReferrals::route('/'),
        ];
    }
}
```

Create ListReferrals page:

```php
<?php
// app/Filament/Resources/ReferralResource/Pages/ListReferrals.php
namespace App\Filament\Resources\ReferralResource\Pages;
use App\Filament\Resources\ReferralResource;
use Filament\Resources\Pages\ListRecords;
class ListReferrals extends ListRecords {
    protected static string $resource = ReferralResource::class;
}
```

- [ ] **Step 3: Write ReferralRewardConfigResource**

This is a single-row config table — no "create new" button, just edit the one existing row.

```php
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ReferralRewardConfigResource\Pages;
use App\Models\ReferralRewardConfig;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ReferralRewardConfigResource extends Resource
{
    protected static ?string $model = ReferralRewardConfig::class;
    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';
    protected static ?string $navigationLabel = 'Config Referral';
    protected static ?string $modelLabel = 'Configurare referral';
    protected static ?string $pluralModelLabel = 'Configurare referral';
    protected static ?int $navigationSort = 7;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('milestone')
                ->label('Milestone (nr. referrals pentru recompensă)')
                ->numeric()
                ->required()
                ->minValue(1),

            Forms\Components\Select::make('reward_type')
                ->label('Tip recompensă')
                ->options(['discount' => 'Reducere %', 'free_service' => 'Serviciu gratuit'])
                ->required(),

            Forms\Components\TextInput::make('reward_value')
                ->label('Valoare recompensă (% sau descriere)')
                ->required(),

            Forms\Components\Toggle::make('resets_after_milestone')
                ->label('Resetează după milestone')
                ->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('milestone')->label('Milestone'),
                Tables\Columns\TextColumn::make('reward_type')->label('Tip recompensă'),
                Tables\Columns\TextColumn::make('reward_value')->label('Valoare'),
                Tables\Columns\IconColumn::make('resets_after_milestone')->label('Resetare')->boolean(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListReferralRewardConfigs::route('/'),
            'edit'  => Pages\EditReferralRewardConfig::route('/{record}/edit'),
        ];
    }
}
```

Create ListReferralRewardConfigs and EditReferralRewardConfig pages following standard pattern.

- [ ] **Step 4: Run tests — expect 37 still passing**

```bash
docker compose exec app php artisan test
```

- [ ] **Step 5: Commit**

```bash
git add app/Filament/Resources/ReferralResource.php \
        app/Filament/Resources/ReferralResource/ \
        app/Filament/Resources/ReferralRewardConfigResource.php \
        app/Filament/Resources/ReferralRewardConfigResource/
git commit -m "feat: Filament Referrals and Referral Reward Config resources"
```

---

## Task 5: Promotions, Email Templates, and Email Triggers Resources

**Files:**
- Create: `app/Filament/Resources/PromotionResource.php` (+ Pages/)
- Create: `app/Filament/Resources/EmailTemplateResource.php` (+ Pages/)
- Create: `app/Filament/Resources/EmailTriggerResource.php` (+ Pages/)

- [ ] **Step 1: Generate scaffolds**

```bash
docker compose exec app php artisan make:filament-resource Promotion --embed-schemas --embed-table
docker compose exec app php artisan make:filament-resource EmailTemplate --embed-schemas --embed-table
docker compose exec app php artisan make:filament-resource EmailTrigger --embed-schemas --embed-table
```

- [ ] **Step 2: Write PromotionResource**

```php
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PromotionResource\Pages;
use App\Models\Promotion;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PromotionResource extends Resource
{
    protected static ?string $model = Promotion::class;
    protected static ?string $navigationIcon = 'heroicon-o-tag';
    protected static ?string $navigationLabel = 'Promoții';
    protected static ?string $modelLabel = 'Promoție';
    protected static ?string $pluralModelLabel = 'Promoții';
    protected static ?int $navigationSort = 8;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Detalii promoție')->schema([
                Forms\Components\TextInput::make('name')->label('Nume promoție')->required()->maxLength(255),

                Forms\Components\Select::make('type')
                    ->label('Tip')
                    ->options(['percentage' => 'Procentual (%)', 'fixed' => 'Sumă fixă (EUR)'])
                    ->required(),

                Forms\Components\TextInput::make('value')
                    ->label('Valoare (% sau EUR)')
                    ->numeric()
                    ->required(),

                Forms\Components\Select::make('scope')
                    ->label('Aplicabilitate')
                    ->options(['all' => 'Toate produsele', 'category' => 'Categorie', 'product' => 'Produs specific'])
                    ->required(),

                Forms\Components\Toggle::make('stackable')->label('Cumulabil cu reducerea de bază'),
                Forms\Components\Toggle::make('is_active')->label('Activ')->default(true),
            ])->columns(2),

            Forms\Components\Section::make('Perioadă')->schema([
                Forms\Components\DateTimePicker::make('starts_at')->label('Începe la'),
                Forms\Components\DateTimePicker::make('ends_at')->label('Expiră la'),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('Nume')->searchable(),
                Tables\Columns\BadgeColumn::make('type')->label('Tip'),
                Tables\Columns\TextColumn::make('value')->label('Valoare'),
                Tables\Columns\BadgeColumn::make('scope')->label('Aplicabilitate'),
                Tables\Columns\IconColumn::make('stackable')->label('Cumulabil')->boolean(),
                Tables\Columns\IconColumn::make('is_active')->label('Activ')->boolean(),
                Tables\Columns\TextColumn::make('ends_at')->label('Expiră')->date('d.m.Y'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListPromotions::route('/'),
            'create' => Pages\CreatePromotion::route('/create'),
            'edit'   => Pages\EditPromotion::route('/{record}/edit'),
        ];
    }
}
```

Create ListPromotions, CreatePromotion, EditPromotion pages.

- [ ] **Step 3: Write EmailTemplateResource**

```php
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EmailTemplateResource\Pages;
use App\Models\EmailTemplate;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class EmailTemplateResource extends Resource
{
    protected static ?string $model = EmailTemplate::class;
    protected static ?string $navigationIcon = 'heroicon-o-envelope';
    protected static ?string $navigationLabel = 'Template-uri email';
    protected static ?string $modelLabel = 'Template email';
    protected static ?string $pluralModelLabel = 'Template-uri email';
    protected static ?int $navigationSort = 10;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')->label('Nume template')->required()->maxLength(255)->columnSpanFull(),
            Forms\Components\TextInput::make('subject')->label('Subiect email')->required()->maxLength(255)->columnSpanFull(),
            Forms\Components\RichEditor::make('body')
                ->label('Corp email (HTML cu {{variabile}})')
                ->helperText('Variabile disponibile: {{name}}, {{email}}, {{referral_code}}, {{referral_link}}')
                ->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('Nume')->searchable(),
                Tables\Columns\TextColumn::make('subject')->label('Subiect')->limit(60),
                Tables\Columns\TextColumn::make('updated_at')->label('Ultima modificare')->dateTime('d.m.Y H:i')->sortable(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListEmailTemplates::route('/'),
            'create' => Pages\CreateEmailTemplate::route('/create'),
            'edit'   => Pages\EditEmailTemplate::route('/{record}/edit'),
        ];
    }
}
```

Create ListEmailTemplates, CreateEmailTemplate, EditEmailTemplate pages.

- [ ] **Step 4: Write EmailTriggerResource**

```php
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EmailTriggerResource\Pages;
use App\Models\EmailTemplate;
use App\Models\EmailTrigger;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class EmailTriggerResource extends Resource
{
    protected static ?string $model = EmailTrigger::class;
    protected static ?string $navigationIcon = 'heroicon-o-bolt';
    protected static ?string $navigationLabel = 'Trigger-uri email';
    protected static ?string $modelLabel = 'Trigger email';
    protected static ?string $pluralModelLabel = 'Trigger-uri email';
    protected static ?int $navigationSort = 11;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')->label('Nume trigger')->required()->maxLength(255),
            Forms\Components\Toggle::make('is_active')->label('Activ')->default(true),

            Forms\Components\Select::make('condition_type')
                ->label('Condiție')
                ->options([
                    'page_visited'        => 'Pagina vizitată',
                    'no_return_after_visit' => 'Nu s-a întors după vizită',
                    'form_submitted'      => 'Formular trimis',
                ])
                ->required(),

            Forms\Components\TextInput::make('condition_value')
                ->label('Valoare condiție (URL pagină)')
                ->required()
                ->maxLength(500)
                ->placeholder('/products/exterior'),

            Forms\Components\TextInput::make('delay_hours')
                ->label('Întârziere (ore)')
                ->numeric()
                ->minValue(0)
                ->required(),

            Forms\Components\Select::make('email_template_id')
                ->label('Template email')
                ->options(EmailTemplate::pluck('name', 'id'))
                ->required(),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('Nume')->searchable(),
                Tables\Columns\BadgeColumn::make('condition_type')->label('Condiție'),
                Tables\Columns\TextColumn::make('condition_value')->label('URL'),
                Tables\Columns\TextColumn::make('delay_hours')->label('Întârziere (h)'),
                Tables\Columns\TextColumn::make('template.name')->label('Template'),
                Tables\Columns\IconColumn::make('is_active')->label('Activ')->boolean(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListEmailTriggers::route('/'),
            'create' => Pages\CreateEmailTrigger::route('/create'),
            'edit'   => Pages\EditEmailTrigger::route('/{record}/edit'),
        ];
    }
}
```

Create ListEmailTriggers, CreateEmailTrigger, EditEmailTrigger pages.

- [ ] **Step 5: Run tests — expect 37 still passing**

```bash
docker compose exec app php artisan test
```

- [ ] **Step 6: Commit**

```bash
git add app/Filament/Resources/PromotionResource.php \
        app/Filament/Resources/PromotionResource/ \
        app/Filament/Resources/EmailTemplateResource.php \
        app/Filament/Resources/EmailTemplateResource/ \
        app/Filament/Resources/EmailTriggerResource.php \
        app/Filament/Resources/EmailTriggerResource/
git commit -m "feat: Filament resources for Promotions, Email Templates, and Email Triggers"
```

---

## Task 6: Dashboard Widgets

Replace the default Filament widgets with stats, a new customers chart, and a recent leads table.

**Files:**
- Create: `app/Filament/Widgets/StatsOverview.php`
- Create: `app/Filament/Widgets/NewCustomersChart.php`
- Create: `app/Filament/Widgets/RecentLeadsTable.php`
- Modify: `app/Providers/Filament/AdminPanelProvider.php`

- [ ] **Step 1: Create StatsOverview widget**

```bash
docker compose exec app php artisan make:filament-widget StatsOverview --stats-overview
```

Replace the generated file:

```php
<?php

namespace App\Filament\Widgets;

use App\Models\Customer;
use App\Models\Lead;
use App\Models\Promotion;
use App\Models\Referral;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        $totalCustomers    = Customer::count();
        $newThisMonth      = Customer::whereMonth('created_at', now()->month)->count();
        $newLeadsThisMonth = Lead::whereMonth('created_at', now()->month)->count();
        $activePromotions  = Promotion::where('is_active', true)->count();
        $pendingReferrals  = Referral::where('status', 'pending')->count();

        return [
            Stat::make('Clienți total', $totalCustomers)
                ->description("+{$newThisMonth} luna aceasta")
                ->icon('heroicon-o-users')
                ->color('primary'),

            Stat::make('Lead-uri luna aceasta', $newLeadsThisMonth)
                ->icon('heroicon-o-inbox-arrow-down')
                ->color('warning'),

            Stat::make('Promoții active', $activePromotions)
                ->icon('heroicon-o-tag')
                ->color('success'),

            Stat::make('Referrals în așteptare', $pendingReferrals)
                ->icon('heroicon-o-share')
                ->color('info'),
        ];
    }
}
```

- [ ] **Step 2: Create NewCustomersChart widget**

```bash
docker compose exec app php artisan make:filament-widget NewCustomersChart --chart
```

Replace the generated file:

```php
<?php

namespace App\Filament\Widgets;

use App\Models\Customer;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Carbon;

class NewCustomersChart extends ChartWidget
{
    protected static ?string $heading = 'Clienți noi (ultimele 30 de zile)';
    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $days   = collect(range(29, 0))->map(fn ($i) => now()->subDays($i)->format('Y-m-d'));
        $counts = Customer::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('created_at', '>=', now()->subDays(30)->startOfDay())
            ->groupBy('date')
            ->pluck('count', 'date');

        return [
            'datasets' => [[
                'label'           => 'Clienți noi',
                'data'            => $days->map(fn ($d) => $counts[$d] ?? 0)->values()->toArray(),
                'borderColor'     => '#f59e0b',
                'backgroundColor' => 'rgba(245, 158, 11, 0.1)',
                'fill'            => true,
            ]],
            'labels' => $days->map(fn ($d) => Carbon::parse($d)->format('d.m'))->values()->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
```

- [ ] **Step 3: Create RecentLeadsTable widget**

```bash
docker compose exec app php artisan make:filament-widget RecentLeadsTable --table
```

Replace the generated file:

```php
<?php

namespace App\Filament\Widgets;

use App\Models\Lead;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentLeadsTable extends BaseWidget
{
    protected static ?string $heading = 'Lead-uri recente';
    protected static ?int $sort = 3;
    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(Lead::latest()->limit(10))
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('Nume'),
                Tables\Columns\TextColumn::make('email')->label('Email'),
                Tables\Columns\TextColumn::make('source_page')->label('Pagina sursă'),
                Tables\Columns\TextColumn::make('created_at')->label('Data')->dateTime('d.m.Y H:i'),
            ]);
    }
}
```

- [ ] **Step 4: Update AdminPanelProvider to use only the new widgets**

Read the existing `app/Providers/Filament/AdminPanelProvider.php` then replace the `->widgets()` call:

```php
->widgets([
    \App\Filament\Widgets\StatsOverview::class,
    \App\Filament\Widgets\NewCustomersChart::class,
    \App\Filament\Widgets\RecentLeadsTable::class,
])
```

Also remove the `AccountWidget::class` and `FilamentInfoWidget::class` imports if they are no longer referenced.

- [ ] **Step 5: Run tests — expect 37 still passing**

```bash
docker compose exec app php artisan test
```

- [ ] **Step 6: Smoke test dashboard**

Visit `http://localhost:8000/admin` — confirm the stats row shows 4 stat cards, the line chart renders, and the leads table appears.

- [ ] **Step 7: Commit**

```bash
git add app/Filament/Widgets/ \
        app/Providers/Filament/AdminPanelProvider.php
git commit -m "feat: Filament dashboard widgets — stats, new customers chart, recent leads table"
```
