# Sequential Thinking Examples

Complete examples demonstrating the sequential thinking process for various problem types.

## Example 1: Design System Selection (shadcn/ui)

**User Request**: "Preciso de um design moderno seguindo a estrutura do shadcn/ui"

```
🧠 **Sequential Thinking Process**

**Thought 1/8** Understanding shadcn/ui Philosophy

The request mentions shadcn/ui specifically, which is not a traditional component library but rather a collection of re-usable components that you copy into your project. Key characteristics:
- Not an npm dependency (copy/paste approach)
- Built with Radix UI primitives
- Styled with Tailwind CSS
- Full customization control
- TypeScript-first

Question: Is the user asking to literally use shadcn/ui, or use something "like" shadcn/ui in structure?

**Thought 2/8** Defining "Modern Design" Requirements

"Modern design" likely encompasses:
- Clean, minimal aesthetics
- Accessible (ARIA compliant)
- Dark mode support
- Responsive
- Consistent design tokens
- Smooth animations/transitions

Since this is a Laravel project, I need to consider how shadcn/ui's React-based approach translates.

**Thought 3/8** Technology Stack Analysis

Current project context:
- Laravel backend (PHP)
- Blade templates OR potentially Inertia/Livewire frontend
- Tailwind CSS already configured (seen in workspace)

Implication: Can't use shadcn/ui directly (it's React-based), but can adopt its philosophy:
1. Component-based thinking
2. Tailwind utility classes
3. Accessibility-first
4. Customizable primitives

**Thought 4/8** [BRANCH A] Pure Blade + Tailwind Approach

Option 1: Build Blade components mimicking shadcn/ui structure
- Create reusable Blade components
- Use Tailwind classes following shadcn/ui patterns
- Implement Alpine.js for interactivity
- Store components in `resources/views/components/`

Pros: Simple, Laravel-native, no build complexity
Cons: Less rich interactivity, more manual work

**Thought 5/8** [BRANCH B] Inertia + Vue/React Approach

Option 2: Use Inertia.js with Vue or React
- Can actually use shadcn/ui if React chosen
- Rich client-side interactivity
- Component ecosystem available
- Modern SPA-like experience

Pros: Can leverage existing ecosystem, rich UX
Cons: Added complexity, heavier build process

**Thought 6/8** Evaluating Based on Project Context

Checking workspace structure:
- Has Vite config
- Has resources/js/ directory
- Standard Laravel 12 structure

This suggests frontend flexibility. Need to consider:
- What's the app complexity level?
- Team JavaScript skills?
- Performance requirements?

**Thought 7/8** Solution Hypothesis

Recommendation: **Hybrid approach**
1. Use Blade components for static/simple UI
2. Implement shadcn/ui design patterns in Tailwind classes
3. Add Alpine.js for light interactivity
4. Reserve Inertia for complex interactive features

This gives:
- shadcn/ui aesthetic and structure
- Laravel-native simplicity
- Scalability path to richer interactions

**Thought 8/8** Implementation Plan Verification

Does this solve the original request?
✓ Modern design: Yes (shadcn/ui patterns)
✓ shadcn/ui structure: Yes (component-based, Tailwind)
✓ Laravel compatible: Yes (Blade + Alpine)
✓ Scalable: Yes (can add Inertia later)

✓ **Conclusion**: Implement shadcn/ui-inspired Blade components with Tailwind CSS and Alpine.js for interactivity. Create a component library in `resources/views/components/ui/` following shadcn/ui naming and styling patterns.
```

---

## Example 2: Monolithic Modular Architecture

**User Request**: "Preciso que minha aplicação seja feita como um monolito modular"

```
🧠 **Sequential Thinking Process**

**Thought 1/10** Understanding Monolithic Modular Pattern

"Monolito modular" refers to:
- Single deployable application (monolith)
- Internally organized into distinct, loosely-coupled modules
- Each module owns its domain/subdomain
- Clear boundaries between modules
- Potential to extract to microservices later

This is different from a traditional "big ball of mud" monolith.

**Thought 2/10** Laravel Context for Modular Architecture

Laravel provides several approaches:
1. Service-based architecture (app/Services/)
2. Domain-driven design packages
3. Laravel Modules package (nWidart/laravel-modules)
4. Manual module organization

Need to choose the right level of modularity for this project.

**Thought 3/10** Defining Module Boundaries

For a modular monolith, typical modules might be:
- User Management (auth, profiles, permissions)
- Core Business Domain (varies by app)
- Notifications
- Reporting
- API Layer

Each module should:
- Have its own controllers, models, views
- Communicate through well-defined interfaces
- Be independently testable
- Have clear dependencies

**Thought 4/10** Evaluating InterNACHI/modular Package

InterNACHI/modular provides:
- Lightweight module orchestration
- Service provider auto-discovery
- Module-specific routes, views, commands
- Minimal opinions, Laravel-native patterns
- Works seamlessly with Livewire v4

Pros: Lightweight, Laravel-first, minimal boilerplate, excellent Livewire integration
Cons: Less opinionated (need own conventions)

**Thought 5/10** [BRANCH A] Using InterNACHI/modular with Livewire v4

InterNACHI/modular structure (follows Laravel conventions):
```
app-modules/                           # All modules here (not in app/)
  characters/
    composer.json                      # Each module is a package
    src/
      Models/
        Character.php
      Livewire/
        CharacterList.php
        CharacterForm.php
      Http/
        Controllers/                   # For APIs only
      Providers/
        CharactersServiceProvider.php
    resources/
      components/                      # Blade components (auto-registered)
      lang/
      views/
    routes/
      web.php                         # Module routes auto-loaded
    database/
      migrations/
      factories/
      seeders/
    tests/
      Feature/
      Unit/
  inventory/                          # Similar structure
    src/Livewire/...
  combat/                             # Similar structure
    src/Livewire/...
```

Key differences from standard Laravel:
- Modules in `app-modules/` (separate directory, not nested in app/)
- Each module has own `composer.json` (treated as separate package)
- Livewire: Create with `php artisan make:livewire Counter --module=characters`
- Blade components: Auto-discovered, use `<x-characters::component />`
- Routes, commands, migrations: Auto-discovered per module convention
- Namespace configurable (default `Modules\`, recommend custom like `YourOrg\`)

**Thought 6/10** Configuring Tailwind v4 for Modules

Tailwind v4 CSS-first approach:
- Single CSS import in app.css: `@import "tailwindcss"`
- @theme directive for customization (no separate config file)
- Works perfectly with Livewire v4 components across modules
- Dark mode via `dark:` utilities
- Assets compiled via Vite (unified for all modules)

Module styling approach:
- Shared Tailwind config in main app
- Each module's Livewire components automatically styled
- No per-module CSS compilation needed

**Thought 7/10** Considering Stack Compatibility

InterNACHI/modular + Livewire v4 + Tailwind v4:
✓ Lightweight (follows Laravel conventions, not opinionated)
✓ Livewire components per module work seamlessly
✓ Tailwind v4 CSS-first unified styling
✓ Each module independently testable
✓ Auto-discovery handles routes, commands, migrations
✓ Blade components auto-registered with namespace
✓ Clear separation with minimal overhead

For a Laravel RPG project:
- Domains are distinct (Character, Combat, Inventory, Quest, Social)
- Each domain benefits from Livewire reactivity
- Tailwind v4 styling applies consistently across modules

**Thought 8/10** Module Communication Pattern

With InterNACHI/modular, modules communicate via:
- Service contracts/interfaces
- Event broadcasting
- Direct service injection (when appropriate)
- Database relationships (loose coupling)

Example: Combat module fires event when damage dealt → Character module updates health

**Thought 9/10** Solution Hypothesis

Recommendation: **Use InterNACHI/modular + Livewire v4 + Tailwind v4**

Rationale:
1. Lightweight - follows Laravel conventions, minimal opinions (vs nWidart which is heavier)
2. Follows existing Laravel package system and auto-discovery
3. Livewire v4 provides rich interactivity per module with `make:livewire --module=`
4. Tailwind v4 CSS-first approach modern, unified across all modules
5. Natural game domain separation (Character, Combat, Inventory, Quest, Social, Core)
6. Each module independently testable with own routes, migrations, tests
7. Easy to extract modules to separate packages later if needed
8. Team already familiar with Laravel conventions (no new abstractions)

Setup flow:
```bash
composer require internachi/modular
php artisan vendor:publish --tag=modular-config  # Optional: customize namespace
php artisan make:module characters
php artisan make:module inventory
php artisan make:module combat
# Each module gets added to composer.json as path repository
composer update modules/characters modules/inventory modules/combat
```

Module structure per domain:
- Character (character management, stats, progression)
- Inventory (items, equipment, management)
- Combat (battle mechanics, actions, results)
- Quest (quest tracking, progression, rewards)
- Social (guilds, friends, chat)
- Core (shared utilities, base models, events)

**Thought 10/10** Verification & Next Steps

Does this achieve "monolito modular"?
✓ Single deployment: Yes (one Laravel app with all modules)
✓ Modular internally: Yes (distinct app-modules/ with boundaries)
✓ Modern stack: Yes (Livewire v4, Tailwind v4, InterNACHI/modular)
✓ Rich interactivity: Yes (Livewire v4 reactive components)
✓ Lightweight: Yes (follows Laravel conventions, not heavy framework)
✓ Scalable: Yes (can extract modules to packages)

Next steps:
1. Install: `composer require internachi/modular`
2. Publish config: `php artisan vendor:publish --tag=modular-config` (customize namespace)
3. Create modules: `php artisan make:module {name}` for each domain
4. Generate components: `php artisan make:livewire ComponentName --module=modulename`
5. Each module gets auto-registered in composer.json as path repository
6. Run: `composer update modules/*`
7. Sync PhpStorm: `php artisan modules:sync` (optional)

✓ **Conclusion**: Implement modular monolith using InterNACHI/modular (lightweight, follows Laravel conventions) with Livewire v4 components for interactivity in `app-modules/{module}/src/Livewire/` and Tailwind v4 for unified styling. Organize by game domains (Character, Inventory, Combat, Quest, Social, Core). Each module self-contained with auto-discovered routes, migrations, commands, factories, and Blade components. Modules communicate via service contracts, events, and database relationships (loose coupling via Event::dispatch).

Advantages over alternatives:
- vs nWidart/laravel-modules: Lighter, follows Laravel conventions more closely
- vs flat structure: Better code organization, clear domain separation
- vs microservices: Single deployment, no network overhead, simpler debugging
```

---

## Example 3: Native Resource Evaluation

**User Request**: "Quais recursos nativos são mais úteis para esse projeto?"

```
🧠 **Sequential Thinking Process**

**Thought 1/12** Understanding "Native Resources"

In Laravel context, "native resources" likely means:
- Built-in Laravel features (vs third-party packages)
- PHP native functions/extensions
- Database native features (vs ORM workarounds)

Need to identify most valuable native capabilities for this project.

**Thought 2/12** Project Context Analysis

Looking at workspace:
- Laravel 12 application
- Standard setup with Vite, Tailwind
- Tests with Pest
- Appears to be an RPG game (laravel-rpg folder name)

Implications: Need resources for game mechanics, user management, real-time features, data persistence.

**Thought 3/12** Laravel 12 Native Features Inventory

Laravel 12 key native features:
- Eloquent ORM with advanced relationships
- Queue system (jobs, notifications)
- Event/Listener architecture
- Broadcasting (WebSockets via Reverb)
- Cache system (multiple drivers)
- Task scheduling (Cron-like)
- File storage abstraction
- Validation system
- Rate limiting
- API resources

**Thought 4/12** RPG-Specific Requirements

For an RPG game, critical needs:
1. **Real-time updates**: Combat, chat, notifications
2. **Complex relationships**: Characters, items, guilds, quests
3. **State management**: Character stats, inventory, progress
4. **Scheduled tasks**: Daily rewards, event timers
5. **Performance**: Caching, efficient queries
6. **Security**: Rate limiting, validation

**Thought 5/12** Evaluating Real-Time Capabilities

Laravel Broadcasting + Reverb (Laravel 12):
- Native WebSocket server (no Pusher/Ably needed)
- Event broadcasting out of box
- Private/presence channels
- Echo.js client integration

For RPG:
✓ Combat events (damage, actions)
✓ Chat messages
✓ Party/guild updates
✓ Notification feed

**Priority: VERY HIGH** - Core to multiplayer RPG experience.

**Thought 6/12** Evaluating Eloquent Relationships

Eloquent relationship capabilities:
- HasMany, BelongsTo, ManyToMany
- Polymorphic relationships
- HasManyThrough
- Eager loading, lazy loading
- Relationship querying

For RPG:
- Character belongsTo User
- Character hasMany Items (inventory)
- Character belongsToMany Quests (progress)
- Quest morphMany Rewards (polymorphic)

**Priority: VERY HIGH** - Data structure foundation.

**Thought 7/12** Evaluating Queue System

Laravel Queues:
- Database, Redis, SQS drivers
- Job batching
- Job chaining
- Failure handling
- Horizon for monitoring

For RPG:
- Experience calculations (after combat)
- Quest completion processing
- Bulk notifications (guild broadcasts)
- Report generation

**Priority: HIGH** - Improves UX by offloading heavy processing.

**Thought 8/12** Evaluating Cache System

Laravel Cache:
- Multiple backends (Redis, Memcached, Database)
- Cache tags
- Lock mechanism
- Remember pattern

For RPG:
- Character stats (frequently read)
- Leaderboards
- Item definitions
- Quest data

**Priority: HIGH** - Critical for performance at scale.

**Thought 9/12** Evaluating Task Scheduler

Laravel Scheduler:
- Cron-free task scheduling
- Frequency options
- Timezone aware
- Command scheduling

For RPG:
- Daily login rewards
- Event start/end times
- Leaderboard calculations
- Database cleanup

**Priority: MEDIUM** - Useful but not immediate.

**Thought 10/12** Evaluating Rate Limiting

Laravel Rate Limiting:
- Route-based limiting
- Per-user limiting
- Custom limit resolution
- Middleware integration

For RPG:
- API abuse prevention
- Action cooldowns (combat)
- Chat spam prevention
- Request throttling

**Priority: MEDIUM-HIGH** - Important for game balance and security.

**Thought 11/12** Synthesis - Top Native Resources

Ranking by immediate value:

1. **Eloquent Relationships** - Foundation of game data
2. **Broadcasting/Reverb** - Real-time multiplayer features
3. **Queue System** - Performance and user experience
4. **Cache System** - Scalability and speed
5. **Rate Limiting** - Game balance and security
6. **Task Scheduler** - Automated game events
7. **Validation** - Data integrity
8. **Events/Listeners** - Decoupled game mechanics

**Thought 12/12** Implementation Priority Roadmap

Immediate (MVP):
- Eloquent models and relationships
- Basic validation
- Event/listener setup for game mechanics

Phase 2:
- Queue system for heavy processing
- Cache layer for frequently accessed data
- Rate limiting for actions

Phase 3:
- Broadcasting for real-time features
- Task scheduler for daily events
- Advanced cache strategies

✓ **Conclusion**: Most useful native Laravel resources for RPG project:
1. **Eloquent ORM** - Complex game relationships (characters, items, quests)
2. **Broadcasting + Reverb** - Real-time combat, chat, notifications
3. **Queue System** - Asynchronous processing (XP calculation, rewards)
4. **Cache** - Performance (character stats, leaderboards)
5. **Rate Limiting** - Game balance (action cooldowns, API throttling)
6. **Task Scheduler** - Automated events (daily rewards, timed events)

Implement in phases: Start with Eloquent foundation, add queues/cache for performance, integrate broadcasting for multiplayer features.
```

---

## Pattern Analysis

### Common Elements in Effective Sequential Thinking

1. **Context gathering** (Thoughts 1-2)
2. **Domain analysis** (Thoughts 3-5)
3. **Option exploration** (Branching when applicable)
4. **Synthesis** (Near-final thoughts)
5. **Verification** (Final thought)
6. **Actionable conclusion**

### Revision Triggers

- New information contradicts earlier assumptions
- Deeper analysis reveals original approach flawed
- Better alternative discovered mid-process
- Missing critical consideration initially

### Branching Triggers

- Multiple valid approaches
- Trade-offs requiring comparison
- Uncertainty about best path
- Need to explore alternatives before deciding

### Adaptation Signals

- Problem more complex than estimated → Expand thoughts
- Problem simpler than estimated → Consolidate
- New angle discovered → Branch
- Previous thought wrong → Revise

---

## Example 4: Strict TDD (Test-Driven Development)

**User Request**: "Use strict TDD for this new inventory module"

```
🧠 **Sequential Thinking Process**

**Thought 1/9** Understanding Strict TDD

Strict TDD means:
- Rigorous Red → Green → Refactor cycle
- Write test BEFORE code
- No line of code without corresponding test
- Tests guide design
- Continuous refactoring based on tests

Different from "loose TDD" where tests come after.

**Thought 2/9** Context of Inventory Module

RPG Inventory needs:
- Add/remove items
- Equip/unequip
- Stack identical items
- Weight limits
- Class/level restrictions
- Database persistence

Question: Each of these features will have its own tests before implementation.

**Thought 3/9** Red-Green-Refactor Cycle

1. **RED**: Write failing test (functionality doesn't exist yet)
2. **GREEN**: Write minimum code to pass test
3. **REFACTOR**: Improve code while keeping tests passing

This cycle maintains:
- Clean design (tests guide simplicity)
- Confidence (code covered)
- Living documentation (tests are examples)

**Thought 4/9** Test Structure for Inventory

Tests/Feature/Modules/Inventory/::
```
AddItemToInventoryTest.php
RemoveItemFromInventoryTest.php
EquipItemTest.php
UnequipItemTest.php
StackingMechanicsTest.php
WeightLimitTest.php
ClassRestrictionTest.php
InventoryPersistenceTest.php
```

Each test starts RED (fails), then goes GREEN.

**Thought 5/9** Practical Example: AddItemToInventoryTest

```php
// STEP 1: RED - Failing test
it('should add item to inventory', function () {
    $character = Character::factory()->create();
    $item = Item::factory()->create();

    $character->inventory()->add($item);

    expect($character->inventory()->contains($item))->toBeTrue();
});

// STEP 2: GREEN - Minimum code to pass
// app/Modules/Inventory/Models/Inventory.php
public function add(Item $item): void {
    $this->items()->attach($item);
}

// STEP 3: REFACTOR - Improve while keeping test green
// Consider: transaction? event? logging?
// Tests guide design decisions
```

**Thought 6/9** Design Benefits

Strict TDD forces:
- **Simple interfaces**: Test writes interface, code follows
- **Clear responsibilities**: Test shows one thing at a time
- **Decoupling**: Tests use injection, not new
- **Living documentation**: Tests are usage examples

Example: StackingMechanicsTest forces clean design:
```php
it('should stack identical items', function () {
    $potion = Item::factory()->stackable()->create();
    $character->inventory()->add($potion);
    $character->inventory()->add($potion);

    expect($character->inventory()->items())->toHaveCount(1); // 1 line item
    expect($character->inventory()->items()->first()->quantity)->toBe(2);
});
```

This test forces: quantity on InventoryItem, clear stacking logic.

**Thought 7/9** Implementation Flow

1. **Week 1**: Write all RED tests for basic inventory
2. **Week 2**: Implement (GREEN) - minimum code passes tests
3. **Week 3**: Refactor - improve quality, tests guide

Metric: If test passes without refactor, code is already simple enough.

**Thought 8/9** Integration with Livewire v4

Livewire components also testable with TDD:
```php
it('should show add button only if inventory not full', function () {
    $component = Livewire::test(InventoryComponent::class, ['character' => $character]);
    
    $component->assertSee('Add Item');
    
    // Fill inventory
    $character->inventory()->fill();
    
    $component->assertDontSee('Add Item');
});
```

Livewire v4 supports well-structured tests with Pest v4.

**Thought 9/9** Conclusion & Next Actions

✓ Conclusion: Implement Inventory module with strict TDD:
1. Write all tests first (RED state)
2. Implement minimum code to pass (GREEN)
3. Refactor while keeping tests green (REFACTOR)
4. Tests guide interface and responsibility design
5. Result: reliable, well-documented, simple code

Commands:
```bash
# Run tests in watch mode
php artisan test --filter=Inventory --watch

# Coverage report
php artisan test --coverage Modules/Inventory
```

Goal: 100% coverage on Inventory module via TDD
```

---

## Example 5: Strict/Explicit Typing

**User Request**: "Implement with strict and explicit typing throughout the module"

```
🧠 **Sequential Thinking Process**

**Thought 1/11** Understanding Strict Typing in PHP

Strict typing means:
- `declare(strict_types=1);` at top of file
- Explicit types on ALL parameters
- Return types on ALL methods
- Never `mixed` without strong reason
- Type hints for complex variables
- Union types when appropriate

Benefits:
- Errors at development time
- Better IDE autocomplete
- Inline code documentation
- Safe refactoring

**Thought 2/11** PHP 8.4 Type System

PHP 8.4 offers:
- Named arguments
- Union types: `int|string`
- Intersection types: `Countable&ArrayAccess`
- Mixed type
- Null safe operator: `$obj?->method()`
- Property type promotion

**Thought 3/11** Laravel 12 Project Context

Project uses PHP 8.4.16 (workspace info).
Can leverage all modern types.

**Thought 4/11** Strict Typing Strategy

Apply in layers:
1. **Models** (Eloquent)
   - Properties with types
   - Casts declared with types
   - Typed relationship returns

2. **Services/Actions**
   - Typed parameters
   - Explicit returns
   - No unjustified mixed

3. **Controllers/Livewire**
   - Typed dependency injection
   - Method returns

4. **Requests/DTOs**
   - Typed properties
   - Data transformation with types

**Thought 5/11** Example: Model with Strict Typing

```php
<?php declare(strict_types=1);

namespace App\Modules\Inventory\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Character;

class InventorySlot extends Model
{
    protected $fillable = ['character_id', 'item_id', 'quantity'];

    protected function casts(): array
    {
        return [
            'quantity' => 'int',
            'equipped' => 'bool',
            'created_at' => 'datetime',
        ];
    }

    public function character(): BelongsTo
    {
        return $this->belongsTo(Character::class);
    }

    public function getSlotNumber(): int
    {
        return $this->id;
    }

    public function canStack(InventorySlot $other): bool
    {
        return $this->item_id === $other->item_id
            && $this->item->stackable;
    }
}
```

**Thought 6/11** Example: Service with Strict Typing

```php
<?php declare(strict_types=1);

namespace App\Modules\Inventory\Services;

use App\Modules\Inventory\Models\InventorySlot;
use App\Models\Item;
use App\Models\Character;

class InventoryService
{
    public function __construct(
        private InventoryRepository $repository,
    ) {}

    public function addItem(
        Character $character,
        Item $item,
        int $quantity = 1,
    ): InventorySlot|string {
        if ($quantity <= 0) {
            return 'Quantidade deve ser maior que zero';
        }

        $slot = $this->repository->findOrCreateSlot(
            character: $character,
            item: $item,
        );

        $slot->quantity += $quantity;
        $slot->save();

        return $slot;
    }

    public function removeItem(
        Character $character,
        Item $item,
        int $quantity = 1,
    ): bool {
        $slot = $this->repository->findSlot(
            character: $character,
            item: $item,
        );

        if (!$slot) {
            return false;
        }

        $slot->quantity -= $quantity;

        if ($slot->quantity <= 0) {
            $slot->delete();
        } else {
            $slot->save();
        }

        return true;
    }
}
```

Note: Retorno union `InventorySlot|string` indica sucesso ou mensagem de erro.

**Thought 7/11** Example: DTO with Strict Typing

```php
<?php declare(strict_types=1);

namespace App\Modules\Inventory\DTOs;

class InventoryItemDTO
{
    public function __construct(
        public readonly int $itemId,
        public readonly string $itemName,
        public readonly int $quantity,
        public readonly float $weight,
        public readonly bool $equipped,
    ) {}

    public static function fromEloquent(
        InventorySlot $slot,
    ): self {
        return new self(
            itemId: $slot->item_id,
            itemName: $slot->item->name,
            quantity: $slot->quantity,
            weight: $slot->item->weight * $slot->quantity,
            equipped: $slot->equipped,
        );
    }

    public function totalWeight(): float
    {
        return $this->weight;
    }
}
```

**Thought 8/11** Typing in Livewire v4 Components

```php
<?php declare(strict_types=1);

namespace App\Modules\Inventory\Livewire;

use Livewire\Component;
use Livewire\Attributes\Computed;
use App\Models\Character;
use App\Modules\Inventory\Services\InventoryService;

class InventoryComponent extends Component
{
    public function __construct(
        public Character $character,
        private InventoryService $inventoryService,
    ) {}

    #[Computed]
    public function inventoryItems(): array
    {
        return $this->character
            ->inventory()
            ->items()
            ->map(fn($slot) => InventoryItemDTO::fromEloquent($slot))
            ->toArray();
    }

    public function addItem(int $itemId): void
    {
        $item = Item::findOrFail($itemId);
        $this->inventoryService->addItem(
            character: $this->character,
            item: $item,
        );
    }

    public function render(): string
    {
        return view('inventory.inventory');
    }
}
```

**Thought 9/11** Type Hints for Collections

```php
<?php declare(strict_types=1);

use Illuminate\Support\Collection;

public function getEquippedItems(Character $character): Collection
{
    return $character->inventory()
        ->items()
        ->filter(fn($slot) => $slot->equipped);
}

/** @return Collection<int, InventorySlot> */
public function allSlots(): Collection
{
    return $this->repository->all();
}
```

**Thought 10/11** Benefits for Project

With strict typing:
✓ IDE detects errors before runtime
✓ Safe refactoring (types guarantee)
✓ Clear inline documentation
✓ Fewer production bugs
✓ More readable code
✓ Better autocomplete support
✓ Easier onboarding for new developers

Example: If changing `addItem` return to not return `InventorySlot|string`,
all uses are highlighted in red.

**Thought 11/11** Conclusion & Implementation

✓ Conclusion: Implement strict and explicit typing:

1. **All files**: `declare(strict_types=1);` at top
2. **Models**: Types on properties, relationships, methods
3. **Services**: Types on all parameters and returns
4. **DTOs**: Typed readonly properties, typed constructors
5. **Livewire v4**: Typed injection, typed #[Computed] returns
6. **Collections**: Generic-like doc comments for PHPStan

Commands to verify:
```bash
# PHPStan for static analysis
vendor/bin/phpstan analyse app/Modules/Inventory --level=9

# Psalm as alternative
vendor/bin/psalm --show-info=pharisee
```

Result: Typed, safe, and self-explanatory code - better maintainability.
```
