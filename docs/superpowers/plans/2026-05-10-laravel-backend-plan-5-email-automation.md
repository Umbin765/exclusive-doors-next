# Exclusive Doors — Laravel Backend: Plan 5 — Email Automation & Scheduler

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the behavioral email automation system — a `SendTriggerEmail` queued job that substitutes variables into email templates and delivers via Resend, and an `EvaluateEmailTriggers` Artisan command that runs hourly via the Laravel Scheduler to match `TrackingEvent` records against active `EmailTrigger` rules.

**Architecture:** Scheduler → `EvaluateEmailTriggers` command (hourly) → dispatches `SendTriggerEmail` jobs for each matching email → Resend delivery → `EmailTriggerLog` entry written to prevent re-sends. Variable substitution (`{{name}}`, `{{email}}`, `{{referral_code}}`, `{{referral_link}}`) is done inside the job.

**Tech Stack:** Laravel 13, Laravel Queues (database driver), Laravel Scheduler, Resend (`resend/resend-laravel ^1.4`), Pest, Docker Compose

**Already in place:**
- `jobs` table migrated, `QUEUE_CONNECTION=database`
- `MAIL_MAILER=resend`, `resend/resend-laravel` in composer.json
- Models: `TrackingEvent`, `EmailTrigger`, `EmailTemplate`, `EmailTriggerLog`, `Customer`
- `email_trigger_logs` table: id, trigger_id, email, sent_at

---

## File Structure

```
app/
├── Jobs/
│   └── SendTriggerEmail.php          — queued job: render template + send via Resend
├── Console/
│   └── Commands/
│       └── EvaluateEmailTriggers.php — artisan command: match triggers → dispatch jobs
routes/
└── console.php                       — register hourly schedule
config/
└── mail.php                          — verify Resend from-address is set
tests/Feature/
├── Jobs/
│   └── SendTriggerEmailTest.php
└── Console/
    └── EvaluateEmailTriggersTest.php
```

---

## Task 1: SendTriggerEmail Job

**Files:**
- Create: `app/Jobs/SendTriggerEmail.php`
- Create: `tests/Feature/Jobs/SendTriggerEmailTest.php`

- [ ] **Step 1: Write the failing test**

```php
<?php
// tests/Feature/Jobs/SendTriggerEmailTest.php
use App\Jobs\SendTriggerEmail;
use App\Models\EmailTemplate;
use App\Models\EmailTrigger;
use App\Models\EmailTriggerLog;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;

uses(RefreshDatabase::class);

it('sends an email using the trigger template and logs the send', function () {
    Mail::fake();

    $template = EmailTemplate::create([
        'name'    => 'Welcome',
        'subject' => 'Bun venit, {{name}}!',
        'body'    => '<p>Salut {{name}}, mulțumim că ne-ai vizitat pagina {{page_url}}.</p>',
    ]);

    $trigger = EmailTrigger::create([
        'name'               => 'Post-visit',
        'is_active'          => true,
        'condition_type'     => 'page_visited',
        'condition_value'    => '/products/filomuro',
        'delay_hours'        => 2,
        'email_template_id'  => $template->id,
    ]);

    $job = new SendTriggerEmail(
        trigger: $trigger,
        email: 'client@example.com',
        variables: ['name' => 'Ana', 'page_url' => '/products/filomuro'],
    );

    $job->handle();

    Mail::assertSent(\Illuminate\Mail\Mailable::class, function ($mail) {
        return $mail->hasTo('client@example.com');
    });

    expect(EmailTriggerLog::where('trigger_id', $trigger->id)
        ->where('email', 'client@example.com')
        ->exists())->toBeTrue();
});

it('substitutes variables in subject and body', function () {
    Mail::fake();

    $template = EmailTemplate::create([
        'name'    => 'Referral',
        'subject' => 'Codul tău: {{referral_code}}',
        'body'    => '<p>Link: {{referral_link}}</p>',
    ]);

    $trigger = EmailTrigger::create([
        'name'               => 'Referral trigger',
        'is_active'          => true,
        'condition_type'     => 'page_visited',
        'condition_value'    => '/',
        'delay_hours'        => 0,
        'email_template_id'  => $template->id,
    ]);

    $job = new SendTriggerEmail(
        trigger: $trigger,
        email: 'ref@example.com',
        variables: ['referral_code' => 'ABC123', 'referral_link' => 'https://exclusivedoors.ro/?ref=ABC123'],
    );

    $job->handle();

    Mail::assertSent(\Illuminate\Mail\Mailable::class, function ($mail) {
        return str_contains($mail->subject, 'ABC123');
    });
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
docker compose exec app php artisan test --filter=SendTriggerEmailTest
```
Expected: FAIL — `SendTriggerEmail` class does not exist

- [ ] **Step 3: Create `app/Jobs/SendTriggerEmail.php`**

```php
<?php

namespace App\Jobs;

use App\Models\EmailTrigger;
use App\Models\EmailTriggerLog;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Mail\Message;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendTriggerEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public readonly EmailTrigger $trigger,
        public readonly string $email,
        public readonly array $variables = [],
    ) {}

    public function handle(): void
    {
        $template = $this->trigger->template;
        $subject  = $this->substitute($template->subject);
        $body     = $this->substitute($template->body);

        Mail::send([], [], function (Message $message) use ($subject, $body) {
            $message
                ->to($this->email)
                ->subject($subject)
                ->html($body);
        });

        EmailTriggerLog::create([
            'trigger_id' => $this->trigger->id,
            'email'      => $this->email,
            'sent_at'    => now(),
        ]);
    }

    private function substitute(string $text): string
    {
        foreach ($this->variables as $key => $value) {
            $text = str_replace("{{{$key}}}", $value, $text);
        }
        return $text;
    }
}
```

- [ ] **Step 4: Run tests — expect pass**

```bash
docker compose exec app php artisan test --filter=SendTriggerEmailTest
```
Expected: 2 tests, 2 passed

- [ ] **Step 5: Run full suite**

```bash
docker compose exec app php artisan test
```
Expected: 39 passed

- [ ] **Step 6: Commit**

```bash
git add app/Jobs/SendTriggerEmail.php \
        tests/Feature/Jobs/SendTriggerEmailTest.php
git commit -m "feat: SendTriggerEmail queued job with variable substitution and send logging"
```

---

## Task 2: EvaluateEmailTriggers Command

**Files:**
- Create: `app/Console/Commands/EvaluateEmailTriggers.php`
- Create: `tests/Feature/Console/EvaluateEmailTriggersTest.php`
- Modify: `routes/console.php` — register hourly schedule

The command evaluates each active trigger against tracking events:

| condition_type | Logic |
|---|---|
| `page_visited` | TrackingEvent where page_url LIKE condition_value, email not null, created_at ≤ now - delay_hours, no log entry |
| `no_return_after_visit` | Same as page_visited, but also verify no newer TrackingEvent exists for that email after the matched event |
| `form_submitted` | TrackingEvent where event_type = 'form_submitted', page_url LIKE condition_value, email not null, delay_hours elapsed, no log entry |

- [ ] **Step 1: Write the failing tests**

```php
<?php
// tests/Feature/Console/EvaluateEmailTriggersTest.php
use App\Jobs\SendTriggerEmail;
use App\Models\EmailTemplate;
use App\Models\EmailTrigger;
use App\Models\EmailTriggerLog;
use App\Models\TrackingEvent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->template = EmailTemplate::create([
        'name'    => 'Test',
        'subject' => 'Test',
        'body'    => '<p>Test</p>',
    ]);
});

it('dispatches a job for a matching page_visited trigger', function () {
    Queue::fake();

    $trigger = EmailTrigger::create([
        'name'              => 'Exterior visit',
        'is_active'         => true,
        'condition_type'    => 'page_visited',
        'condition_value'   => '/products/exterior',
        'delay_hours'       => 2,
        'email_template_id' => $this->template->id,
    ]);

    TrackingEvent::create([
        'session_id' => 'sess-001',
        'email'      => 'visitor@example.com',
        'page_url'   => '/products/exterior',
        'event_type' => 'page_view',
        'created_at' => now()->subHours(3),
    ]);

    $this->artisan('emails:evaluate');

    Queue::assertPushed(SendTriggerEmail::class, function ($job) use ($trigger) {
        return $job->trigger->id === $trigger->id
            && $job->email === 'visitor@example.com';
    });
});

it('does not dispatch if delay has not elapsed', function () {
    Queue::fake();

    $trigger = EmailTrigger::create([
        'name'              => 'Too recent',
        'is_active'         => true,
        'condition_type'    => 'page_visited',
        'condition_value'   => '/products/exterior',
        'delay_hours'       => 24,
        'email_template_id' => $this->template->id,
    ]);

    TrackingEvent::create([
        'session_id' => 'sess-002',
        'email'      => 'early@example.com',
        'page_url'   => '/products/exterior',
        'event_type' => 'page_view',
        'created_at' => now()->subHours(1),
    ]);

    $this->artisan('emails:evaluate');

    Queue::assertNotPushed(SendTriggerEmail::class);
});

it('does not dispatch if already logged for this trigger and email', function () {
    Queue::fake();

    $trigger = EmailTrigger::create([
        'name'              => 'Already sent',
        'is_active'         => true,
        'condition_type'    => 'page_visited',
        'condition_value'   => '/products/exterior',
        'delay_hours'       => 2,
        'email_template_id' => $this->template->id,
    ]);

    TrackingEvent::create([
        'session_id' => 'sess-003',
        'email'      => 'repeat@example.com',
        'page_url'   => '/products/exterior',
        'event_type' => 'page_view',
        'created_at' => now()->subHours(3),
    ]);

    EmailTriggerLog::create([
        'trigger_id' => $trigger->id,
        'email'      => 'repeat@example.com',
        'sent_at'    => now()->subHours(2),
    ]);

    $this->artisan('emails:evaluate');

    Queue::assertNotPushed(SendTriggerEmail::class);
});

it('skips inactive triggers', function () {
    Queue::fake();

    $trigger = EmailTrigger::create([
        'name'              => 'Inactive',
        'is_active'         => false,
        'condition_type'    => 'page_visited',
        'condition_value'   => '/products/exterior',
        'delay_hours'       => 0,
        'email_template_id' => $this->template->id,
    ]);

    TrackingEvent::create([
        'session_id' => 'sess-004',
        'email'      => 'skip@example.com',
        'page_url'   => '/products/exterior',
        'event_type' => 'page_view',
        'created_at' => now()->subHours(5),
    ]);

    $this->artisan('emails:evaluate');

    Queue::assertNotPushed(SendTriggerEmail::class);
});

it('dispatches a job for a form_submitted trigger', function () {
    Queue::fake();

    $trigger = EmailTrigger::create([
        'name'              => 'Form submitted',
        'is_active'         => true,
        'condition_type'    => 'form_submitted',
        'condition_value'   => '/contact',
        'delay_hours'       => 1,
        'email_template_id' => $this->template->id,
    ]);

    TrackingEvent::create([
        'session_id' => 'sess-005',
        'email'      => 'form@example.com',
        'page_url'   => '/contact',
        'event_type' => 'form_submitted',
        'created_at' => now()->subHours(2),
    ]);

    $this->artisan('emails:evaluate');

    Queue::assertPushed(SendTriggerEmail::class);
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
docker compose exec app php artisan test --filter=EvaluateEmailTriggersTest
```
Expected: FAIL — command `emails:evaluate` not found

- [ ] **Step 3: Create `app/Console/Commands/EvaluateEmailTriggers.php`**

```php
<?php

namespace App\Console\Commands;

use App\Jobs\SendTriggerEmail;
use App\Models\Customer;
use App\Models\EmailTrigger;
use App\Models\EmailTriggerLog;
use App\Models\TrackingEvent;
use Illuminate\Console\Command;

class EvaluateEmailTriggers extends Command
{
    protected $signature   = 'emails:evaluate';
    protected $description = 'Evaluate active email triggers against tracking events and dispatch send jobs.';

    public function handle(): void
    {
        $triggers = EmailTrigger::where('is_active', true)->with('template')->get();

        foreach ($triggers as $trigger) {
            $alreadySent = EmailTriggerLog::where('trigger_id', $trigger->id)
                ->pluck('email')
                ->all();

            $cutoff = now()->subHours($trigger->delay_hours);

            $events = $this->matchingEvents($trigger, $cutoff, $alreadySent);

            foreach ($events as $event) {
                $variables = $this->buildVariables($event->email);

                SendTriggerEmail::dispatch($trigger, $event->email, $variables);
            }
        }
    }

    private function matchingEvents(EmailTrigger $trigger, $cutoff, array $alreadySent)
    {
        $query = TrackingEvent::query()
            ->whereNotNull('email')
            ->whereNotIn('email', $alreadySent)
            ->where('page_url', $trigger->condition_value)
            ->where('created_at', '<=', $cutoff);

        if ($trigger->condition_type === 'form_submitted') {
            $query->where('event_type', 'form_submitted');
        } else {
            // page_visited and no_return_after_visit both require an event on that page
            $query->where('event_type', 'page_view');
        }

        $events = $query->get()->unique('email');

        if ($trigger->condition_type === 'no_return_after_visit') {
            // Filter: no newer tracking event exists for this email after the matched event
            $events = $events->filter(function ($event) {
                return ! TrackingEvent::where('email', $event->email)
                    ->where('created_at', '>', $event->created_at)
                    ->exists();
            });
        }

        return $events;
    }

    private function buildVariables(string $email): array
    {
        $customer = Customer::where('email', $email)->first();

        $variables = ['email' => $email, 'name' => $customer?->name ?? ''];

        if ($customer?->referral_code) {
            $variables['referral_code'] = $customer->referral_code;
            $variables['referral_link'] = config('app.frontend_url', 'https://exclusivedoors.ro')
                . '/?ref=' . $customer->referral_code;
        }

        return $variables;
    }
}
```

- [ ] **Step 4: Register the command in `routes/console.php`**

Read the existing `routes/console.php` and add the schedule. In Laravel 13 the scheduler is registered here or in `bootstrap/app.php`. Add to `routes/console.php`:

```php
use App\Console\Commands\EvaluateEmailTriggers;
use Illuminate\Support\Facades\Schedule;

Schedule::command(EvaluateEmailTriggers::class)->hourly();
```

The full `routes/console.php` should look like:

```php
<?php

use App\Console\Commands\EvaluateEmailTriggers;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command(EvaluateEmailTriggers::class)->hourly();
```

- [ ] **Step 5: Register the command class in `bootstrap/app.php`**

In Laravel 13, custom Artisan commands need to be discovered or explicitly registered. Check if the command is auto-discovered. Run:

```bash
docker compose exec app php artisan list | grep emails
```

If `emails:evaluate` does not appear, register the command in `bootstrap/app.php` by adding `->withCommands([App\Console\Commands\EvaluateEmailTriggers::class])` to the Application configure chain:

```php
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(...)
    ->withCommands([
        \App\Console\Commands\EvaluateEmailTriggers::class,
    ])
    ->withMiddleware(...)
    ->withExceptions(...)
    ->create();
```

- [ ] **Step 6: Run tests — expect pass**

```bash
docker compose exec app php artisan test --filter=EvaluateEmailTriggersTest
```
Expected: 5 tests, 5 passed

- [ ] **Step 7: Run full suite**

```bash
docker compose exec app php artisan test
```
Expected: 44 passed

- [ ] **Step 8: Verify schedule is registered**

```bash
docker compose exec app php artisan schedule:list
```
Expected: output showing `emails:evaluate` running hourly

- [ ] **Step 9: Commit**

```bash
git add app/Console/Commands/EvaluateEmailTriggers.php \
        bootstrap/app.php \
        routes/console.php \
        tests/Feature/Console/EvaluateEmailTriggersTest.php
git commit -m "feat: EvaluateEmailTriggers command with hourly schedule — dispatches SendTriggerEmail jobs"
```
