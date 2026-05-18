# Exclusive Doors — Laravel Backend: Plan 3 — Auth, Referral & Lead APIs

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build customer authentication (register/login/logout via Sanctum tokens), referral code validation and referral registration, lead form submission, and behavioral tracking endpoints.

**Architecture:** Four controller groups all under `routes/api.php`. Auth and customer routes use Laravel Sanctum. Referral registration is a separate endpoint that sets `source = referred` and creates a Referral record. Leads and tracking events are public, no auth required. All responses camelCase, no data wrapper (JsonResource::withoutWrapping already set).

**Tech Stack:** Laravel 13, Laravel Sanctum v4.3, Pest feature tests, Docker Compose (`docker compose exec app php artisan`)

---

## File Structure

**New files:**
- `app/Http/Controllers/Api/AuthController.php` — register, login, logout
- `app/Http/Controllers/Api/CustomerController.php` — me (authenticated profile)
- `app/Http/Controllers/Api/ReferralController.php` — validate code, register-with-referral
- `app/Http/Controllers/Api/LeadController.php` — store lead
- `app/Http/Controllers/Api/TrackingController.php` — store tracking event
- `app/Http/Resources/CustomerResource.php` — profile shape
- `app/Http/Requests/RegisterRequest.php` — validated register input
- `app/Http/Requests/LoginRequest.php` — validated login input
- `app/Http/Requests/LeadRequest.php` — validated lead input
- `tests/Feature/Api/AuthApiTest.php`
- `tests/Feature/Api/ReferralApiTest.php`
- `tests/Feature/Api/LeadApiTest.php`
- `tests/Feature/Api/TrackingApiTest.php`
- `database/factories/CustomerFactory.php`
- `database/factories/LeadFactory.php`
- `database/factories/ReferralFactory.php`

**Modified files:**
- `routes/api.php` — add all new routes

---

## Task 1: Customer Factory & Auth Scaffold

**Files:**
- Create: `database/factories/CustomerFactory.php`
- Create: `app/Http/Requests/RegisterRequest.php`
- Create: `app/Http/Requests/LoginRequest.php`
- Create: `app/Http/Resources/CustomerResource.php`
- Create: `app/Http/Controllers/Api/AuthController.php`
- Create: `app/Http/Controllers/Api/CustomerController.php`
- Modify: `routes/api.php`
- Create: `tests/Feature/Api/AuthApiTest.php`

- [ ] **Step 1: Create CustomerFactory**

```php
<?php
// database/factories/CustomerFactory.php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class CustomerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'             => $this->faker->name(),
            'email'            => $this->faker->unique()->safeEmail(),
            'phone'            => $this->faker->phoneNumber(),
            'password'         => Hash::make('password'),
            'source'           => 'registered',
            'referred_by_id'   => null,
            'referral_code'    => null,
            'referral_count'   => 0,
            'base_discount_pct' => 5.00,
        ];
    }
}
```

- [ ] **Step 2: Create RegisterRequest**

```php
<?php
// app/Http/Requests/RegisterRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'unique:customers,email'],
            'phone'    => ['nullable', 'string', 'max:30'],
            'password' => ['required', 'string', 'min:8'],
        ];
    }
}
```

- [ ] **Step 3: Create LoginRequest**

```php
<?php
// app/Http/Requests/LoginRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'email'    => ['required', 'email'],
            'password' => ['required', 'string'],
        ];
    }
}
```

- [ ] **Step 4: Create CustomerResource**

```php
<?php
// app/Http/Resources/CustomerResource.php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'              => $this->id,
            'name'            => $this->name,
            'email'           => $this->email,
            'phone'           => $this->phone,
            'source'          => $this->source,
            'referralCode'    => $this->referral_code,
            'referralCount'   => $this->referral_count,
            'baseDiscountPct' => (float) $this->base_discount_pct,
        ];
    }
}
```

- [ ] **Step 5: Create AuthController**

```php
<?php
// app/Http/Controllers/Api/AuthController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $customer = Customer::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'phone'    => $request->phone,
            'password' => Hash::make($request->password),
            'source'   => 'registered',
        ]);

        $token = $customer->createToken('api')->plainTextToken;

        return response()->json([
            'customer' => new CustomerResource($customer),
            'token'    => $token,
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $customer = Customer::where('email', $request->email)->first();

        if (! $customer || ! Hash::check($request->password, $customer->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $customer->createToken('api')->plainTextToken;

        return response()->json([
            'customer' => new CustomerResource($customer),
            'token'    => $token,
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user('customer')->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out.']);
    }
}
```

- [ ] **Step 6: Create CustomerController**

```php
<?php
// app/Http/Controllers/Api/CustomerController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerResource;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function me(Request $request): CustomerResource
    {
        return new CustomerResource($request->user('customer'));
    }
}
```

- [ ] **Step 7: Write auth tests (failing first)**

```php
<?php
// tests/Feature/Api/AuthApiTest.php
use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('registers a new customer and returns token', function () {
    $response = $this->postJson('/api/auth/register', [
        'name'     => 'Ana Ionescu',
        'email'    => 'ana@example.com',
        'phone'    => '0741000000',
        'password' => 'secret123',
    ]);

    $response->assertStatus(201)
             ->assertJsonStructure(['customer' => ['id', 'name', 'email', 'referralCode', 'baseDiscountPct'], 'token']);

    expect(Customer::where('email', 'ana@example.com')->exists())->toBeTrue();
});

it('returns 422 if email already taken', function () {
    Customer::factory()->create(['email' => 'taken@example.com']);

    $this->postJson('/api/auth/register', [
        'name'     => 'Another',
        'email'    => 'taken@example.com',
        'password' => 'secret123',
    ])->assertStatus(422);
});

it('logs in with correct credentials', function () {
    $customer = Customer::factory()->create();

    $response = $this->postJson('/api/auth/login', [
        'email'    => $customer->email,
        'password' => 'password',
    ]);

    $response->assertOk()->assertJsonStructure(['customer', 'token']);
});

it('returns 422 for wrong password', function () {
    $customer = Customer::factory()->create();

    $this->postJson('/api/auth/login', [
        'email'    => $customer->email,
        'password' => 'wrongpassword',
    ])->assertStatus(422);
});

it('returns authenticated customer profile', function () {
    $customer = Customer::factory()->create();
    $token = $customer->createToken('api')->plainTextToken;

    $this->withHeader('Authorization', "Bearer $token")
         ->getJson('/api/customers/me')
         ->assertOk()
         ->assertJsonPath('email', $customer->email)
         ->assertJsonPath('baseDiscountPct', 5.0);
});

it('logs out and invalidates token', function () {
    $customer = Customer::factory()->create();
    $token = $customer->createToken('api')->plainTextToken;

    $this->withHeader('Authorization', "Bearer $token")
         ->postJson('/api/auth/logout')
         ->assertOk();

    $this->withHeader('Authorization', "Bearer $token")
         ->getJson('/api/customers/me')
         ->assertStatus(401);
});
```

- [ ] **Step 8: Run tests to confirm they fail**

```bash
docker compose exec app php artisan test --filter=AuthApiTest
```
Expected: FAIL (routes not registered yet)

- [ ] **Step 9: Add Sanctum customer guard to `config/auth.php`**

In `config/auth.php`, add `customers` guard and provider to the existing `guards` and `providers` arrays:

```php
// In 'guards':
'customer' => [
    'driver'   => 'sanctum',
    'provider' => 'customers',
],

// In 'providers':
'customers' => [
    'driver' => 'eloquent',
    'model'  => App\Models\Customer::class,
],
```

- [ ] **Step 10: Add routes to `routes/api.php`**

```php
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CustomerController;

// Auth
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login',    [AuthController::class, 'login']);

// Authenticated customer routes
Route::middleware('auth:customer')->group(function () {
    Route::post('/auth/logout',  [AuthController::class, 'logout']);
    Route::get('/customers/me',  [CustomerController::class, 'me']);
});
```

- [ ] **Step 11: Run tests — expect pass**

```bash
docker compose exec app php artisan test --filter=AuthApiTest
```
Expected: 6 tests, 6 passed

- [ ] **Step 12: Commit**

```bash
git add app/Http/Controllers/Api/AuthController.php \
        app/Http/Controllers/Api/CustomerController.php \
        app/Http/Requests/RegisterRequest.php \
        app/Http/Requests/LoginRequest.php \
        app/Http/Resources/CustomerResource.php \
        database/factories/CustomerFactory.php \
        config/auth.php \
        routes/api.php \
        tests/Feature/Api/AuthApiTest.php
git commit -m "feat: customer auth endpoints (register, login, logout, me)"
```

---

## Task 2: Referral Code Validation & Register-with-Referral

**Files:**
- Create: `app/Http/Controllers/Api/ReferralController.php`
- Create: `database/factories/ReferralFactory.php`
- Create: `tests/Feature/Api/ReferralApiTest.php`
- Modify: `routes/api.php`

- [ ] **Step 1: Create ReferralFactory**

```php
<?php
// database/factories/ReferralFactory.php
namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReferralFactory extends Factory
{
    public function definition(): array
    {
        return [
            'referrer_id'   => Customer::factory(),
            'referred_id'   => Customer::factory(),
            'status'        => 'pending',
            'reward_granted' => false,
        ];
    }
}
```

- [ ] **Step 2: Write referral tests (failing first)**

```php
<?php
// tests/Feature/Api/ReferralApiTest.php
use App\Models\Customer;
use App\Models\Referral;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('validates a real referral code and returns referrer info', function () {
    $referrer = Customer::factory()->create(['referral_code' => 'ABCD1234']);

    $this->getJson('/api/referral/ABCD1234')
         ->assertOk()
         ->assertJsonPath('valid', true)
         ->assertJsonPath('referrerName', $referrer->name);
});

it('returns valid false for unknown referral code', function () {
    $this->getJson('/api/referral/NOTEXIST')
         ->assertOk()
         ->assertJsonPath('valid', false);
});

it('registers a customer linked to a referral code', function () {
    $referrer = Customer::factory()->create(['referral_code' => 'REF12345']);

    $response = $this->postJson('/api/auth/register-with-referral', [
        'name'          => 'New User',
        'email'         => 'newuser@example.com',
        'phone'         => '0742000000',
        'password'      => 'secret123',
        'referral_code' => 'REF12345',
    ]);

    $response->assertStatus(201)
             ->assertJsonStructure(['customer', 'token']);

    $customer = Customer::where('email', 'newuser@example.com')->first();
    expect($customer->source)->toBe('referred');
    expect($customer->referred_by_id)->toBe($referrer->id);

    expect(Referral::where('referrer_id', $referrer->id)
                   ->where('referred_id', $customer->id)
                   ->where('status', 'pending')
                   ->exists())->toBeTrue();
});

it('returns 422 if referral code is invalid on register-with-referral', function () {
    $this->postJson('/api/auth/register-with-referral', [
        'name'          => 'Ghost',
        'email'         => 'ghost@example.com',
        'password'      => 'secret123',
        'referral_code' => 'BADCODE!',
    ])->assertStatus(422);
});
```

- [ ] **Step 3: Run tests to confirm they fail**

```bash
docker compose exec app php artisan test --filter=ReferralApiTest
```
Expected: FAIL

- [ ] **Step 4: Create ReferralController**

```php
<?php
// app/Http/Controllers/Api/ReferralController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use App\Models\Referral;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ReferralController extends Controller
{
    public function validate(string $code): JsonResponse
    {
        $referrer = Customer::where('referral_code', $code)->first();

        if (! $referrer) {
            return response()->json(['valid' => false]);
        }

        return response()->json([
            'valid'        => true,
            'referrerName' => $referrer->name,
        ]);
    }

    public function registerWithReferral(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'          => ['required', 'string', 'max:255'],
            'email'         => ['required', 'email', 'unique:customers,email'],
            'phone'         => ['nullable', 'string', 'max:30'],
            'password'      => ['required', 'string', 'min:8'],
            'referral_code' => ['required', 'string', 'exists:customers,referral_code'],
        ]);

        $referrer = Customer::where('referral_code', $data['referral_code'])->firstOrFail();

        $customer = Customer::create([
            'name'           => $data['name'],
            'email'          => $data['email'],
            'phone'          => $data['phone'] ?? null,
            'password'       => Hash::make($data['password']),
            'source'         => 'referred',
            'referred_by_id' => $referrer->id,
        ]);

        Referral::create([
            'referrer_id' => $referrer->id,
            'referred_id' => $customer->id,
            'status'      => 'pending',
        ]);

        $token = $customer->createToken('api')->plainTextToken;

        return response()->json([
            'customer' => new CustomerResource($customer),
            'token'    => $token,
        ], 201);
    }
}
```

- [ ] **Step 5: Add routes to `routes/api.php`**

```php
use App\Http\Controllers\Api\ReferralController;

Route::get('/referral/{code}',            [ReferralController::class, 'validate']);
Route::post('/auth/register-with-referral', [ReferralController::class, 'registerWithReferral']);
```

- [ ] **Step 6: Run tests — expect pass**

```bash
docker compose exec app php artisan test --filter=ReferralApiTest
```
Expected: 4 tests, 4 passed

- [ ] **Step 7: Commit**

```bash
git add app/Http/Controllers/Api/ReferralController.php \
        database/factories/ReferralFactory.php \
        routes/api.php \
        tests/Feature/Api/ReferralApiTest.php
git commit -m "feat: referral code validation and register-with-referral endpoint"
```

---

## Task 3: Lead Capture Endpoint

**Files:**
- Create: `app/Http/Controllers/Api/LeadController.php`
- Create: `app/Http/Requests/LeadRequest.php`
- Create: `database/factories/LeadFactory.php`
- Create: `tests/Feature/Api/LeadApiTest.php`
- Modify: `routes/api.php`

- [ ] **Step 1: Create LeadFactory**

```php
<?php
// database/factories/LeadFactory.php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class LeadFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'        => $this->faker->name(),
            'email'       => $this->faker->unique()->safeEmail(),
            'phone'       => $this->faker->optional()->phoneNumber(),
            'message'     => $this->faker->paragraph(),
            'source_page' => $this->faker->randomElement(['/products/filomuro', '/contact', '/']),
        ];
    }
}
```

- [ ] **Step 2: Create LeadRequest**

```php
<?php
// app/Http/Requests/LeadRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LeadRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'        => ['required', 'string', 'max:255'],
            'email'       => ['required', 'email'],
            'phone'       => ['nullable', 'string', 'max:30'],
            'message'     => ['required', 'string'],
            'source_page' => ['required', 'string', 'max:500'],
        ];
    }
}
```

- [ ] **Step 3: Write lead tests (failing first)**

```php
<?php
// tests/Feature/Api/LeadApiTest.php
use App\Models\Lead;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('stores a lead from a contact form submission', function () {
    $response = $this->postJson('/api/leads', [
        'name'        => 'Mihai Popescu',
        'email'       => 'mihai@example.com',
        'phone'       => '0740111222',
        'message'     => 'Vreau o ofertă pentru o ușă de interior.',
        'source_page' => '/products/filomuro',
    ]);

    $response->assertStatus(201)
             ->assertJsonPath('message', 'Lead saved.');

    expect(Lead::where('email', 'mihai@example.com')->exists())->toBeTrue();
});

it('returns 422 if required lead fields are missing', function () {
    $this->postJson('/api/leads', [
        'email' => 'incomplete@example.com',
    ])->assertStatus(422);
});

it('stores lead without phone (phone is optional)', function () {
    $this->postJson('/api/leads', [
        'name'        => 'Fara Telefon',
        'email'       => 'fara@example.com',
        'message'     => 'Fără telefon.',
        'source_page' => '/contact',
    ])->assertStatus(201);
});
```

- [ ] **Step 4: Run tests to confirm they fail**

```bash
docker compose exec app php artisan test --filter=LeadApiTest
```
Expected: FAIL

- [ ] **Step 5: Create LeadController**

```php
<?php
// app/Http/Controllers/Api/LeadController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LeadRequest;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;

class LeadController extends Controller
{
    public function store(LeadRequest $request): JsonResponse
    {
        Lead::create($request->validated());

        return response()->json(['message' => 'Lead saved.'], 201);
    }
}
```

- [ ] **Step 6: Add route to `routes/api.php`**

```php
use App\Http\Controllers\Api\LeadController;

Route::post('/leads', [LeadController::class, 'store']);
```

- [ ] **Step 7: Run tests — expect pass**

```bash
docker compose exec app php artisan test --filter=LeadApiTest
```
Expected: 3 tests, 3 passed

- [ ] **Step 8: Commit**

```bash
git add app/Http/Controllers/Api/LeadController.php \
        app/Http/Requests/LeadRequest.php \
        database/factories/LeadFactory.php \
        routes/api.php \
        tests/Feature/Api/LeadApiTest.php
git commit -m "feat: lead capture endpoint POST /api/leads"
```

---

## Task 4: Behavioral Tracking Endpoint

**Files:**
- Create: `app/Http/Controllers/Api/TrackingController.php`
- Create: `tests/Feature/Api/TrackingApiTest.php`
- Modify: `routes/api.php`

- [ ] **Step 1: Write tracking tests (failing first)**

```php
<?php
// tests/Feature/Api/TrackingApiTest.php
use App\Models\TrackingEvent;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('stores a page view tracking event', function () {
    $this->postJson('/api/track', [
        'session_id' => 'sess-abc-123',
        'page_url'   => '/products/filomuro',
    ])->assertStatus(201)
      ->assertJsonPath('message', 'Tracked.');

    expect(TrackingEvent::where('session_id', 'sess-abc-123')->exists())->toBeTrue();
});

it('stores a tracking event with email', function () {
    $this->postJson('/api/track', [
        'session_id' => 'sess-xyz-456',
        'email'      => 'visitor@example.com',
        'page_url'   => '/products/exterior/groke-thermosafe',
    ])->assertStatus(201);

    $event = TrackingEvent::where('session_id', 'sess-xyz-456')->first();
    expect($event->email)->toBe('visitor@example.com');
});

it('returns 422 if session_id or page_url is missing', function () {
    $this->postJson('/api/track', [
        'email' => 'ghost@example.com',
    ])->assertStatus(422);
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
docker compose exec app php artisan test --filter=TrackingApiTest
```
Expected: FAIL

- [ ] **Step 3: Create TrackingController**

```php
<?php
// app/Http/Controllers/Api/TrackingController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TrackingEvent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TrackingController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'session_id' => ['required', 'string', 'max:255'],
            'email'      => ['nullable', 'email'],
            'page_url'   => ['required', 'string', 'max:1000'],
        ]);

        TrackingEvent::create(array_merge($data, ['event_type' => 'page_view']));

        return response()->json(['message' => 'Tracked.'], 201);
    }
}
```

- [ ] **Step 4: Add route to `routes/api.php`**

```php
use App\Http\Controllers\Api\TrackingController;

Route::post('/track', [TrackingController::class, 'store']);
```

- [ ] **Step 5: Run tests — expect pass**

```bash
docker compose exec app php artisan test --filter=TrackingApiTest
```
Expected: 3 tests, 3 passed

- [ ] **Step 6: Run full suite**

```bash
docker compose exec app php artisan test
```
Expected: 34 tests passed (21 existing + 6 auth + 4 referral + 3 lead + 3 tracking)

- [ ] **Step 7: Commit**

```bash
git add app/Http/Controllers/Api/TrackingController.php \
        routes/api.php \
        tests/Feature/Api/TrackingApiTest.php
git commit -m "feat: behavioral tracking endpoint POST /api/track"
```
