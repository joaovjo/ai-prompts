# Memory Bank Integration

Guide for integrating sequential thinking with the memory-bank skill when both are available.

## Integration Philosophy

Sequential thinking generates deep analytical insights. Memory bank preserves these insights for future use. Together, they create a learning system where:

- **Thinking informs memory** - Conclusions worth remembering get stored
- **Memory informs thinking** - Past decisions guide new analysis
- **Patterns emerge** - Repeated problems develop refined solutions

## Workflow Integration

### Before Starting Sequential Thinking

**Check memory bank for relevant context:**

```
**Thought 1/10** Consulting Memory Bank

Before diving in, checking memory bank for:
- [topic] - "architecture patterns"
- [topic] - "design decisions" 
- [topic] - "user preferences"

Memory bank findings:
✓ Found memory "project-architecture-201": Team prefers modular monolith
✓ Found memory "ui-patterns-105": Using shadcn/ui-inspired components
✓ Found memory "tech-choices-089": Standardized on Alpine.js for interactivity

This context shapes my thinking approach...
```

**Benefits:**
- Avoid re-analyzing solved problems
- Maintain consistency with past decisions
- Build on established patterns
- Respect user preferences

### During Sequential Thinking

**Reference memories when relevant:**

```
**Thought 5/12** Evaluating Options with Historical Context

Considering three approaches for [problem].

According to memory "auth-decision-147":
- Project previously chose Laravel Sanctum over Passport
- Reason: Simpler API token management
- Team familiar with Sanctum patterns

This precedent suggests: [how it applies to current decision]
```

**When to reference:**
- Comparing similar technical choices
- Evaluating consistency with established patterns
- Checking against known constraints or preferences
- Validating assumptions

### After Sequential Thinking Completes

**Evaluate if insights should be stored:**

```markdown
Post-thinking evaluation:
- Is this decision reusable? → YES: Store pattern
- Will this save time later? → YES: Store approach  
- Is this project-specific? → YES: Store context
- Could this help similar problems? → YES: Store insight

Decision: Update memory bank with key findings
```

## Memory Storage Patterns

### Pattern 1: Architectural Decisions

**When:** Major structural choices made through sequential thinking

**What to store:**
- Decision made
- Options considered
- Reasoning (brief)
- Trade-offs accepted
- Implementation notes

**Example:**

```markdown
After sequential thinking concludes modular monolith approach:

Memory Bank Entry:
- Subject: "Architecture Pattern"
- Key: "modular-monolith-decision-2026"
- Content:
  - Decision: Modular monolith using nWidart/laravel-modules
  - Why: Clear domain separation (Character, Combat, Inventory, Quest)
  - Alternatives considered: Microservices (too complex), flat structure (too coupled)
  - Trade-offs: Added abstraction for better maintainability
  - Modules defined: Character, Inventory, Combat, Quest, Social, Core
```

### Pattern 2: Design Patterns

**When:** UI/UX decisions or code patterns established

**What to store:**
- Pattern name
- When to use
- Implementation approach
- Examples

**Example:**

```markdown
After sequential thinking determines shadcn/ui-inspired approach:

Memory Bank Entry:
- Subject: "UI Component Pattern"
- Key: "ui-design-system-pattern"
- Content:
  - Pattern: shadcn/ui-inspired Blade components
  - Stack: Blade + Tailwind + Alpine.js
  - Location: resources/views/components/ui/
  - Naming: Follow shadcn/ui conventions (button.blade.php, card.blade.php)
  - Styling: Tailwind variants, dark mode support
  - When to use: All new UI components
```

### Pattern 3: Technology Evaluations

**When:** Native resources or libraries evaluated and chosen

**What to store:**
- Resource/library name
- Use case
- Why chosen
- Configuration notes

**Example:**

```markdown
After evaluating native Laravel resources:

Memory Bank Entry:
- Subject: "Native Resources Priority"
- Key: "laravel-native-resources-rpg"
- Content:
  - Priority 1: Eloquent ORM (game data relationships)
  - Priority 2: Broadcasting/Reverb (real-time multiplayer)
  - Priority 3: Queue system (async processing)
  - Priority 4: Cache (performance)
  - Priority 5: Rate limiting (game balance)
  - Context: RPG application requirements
```

### Pattern 4: Problem-Solution Mappings

**When:** Complex problem solved with specific approach

**What to store:**
- Problem description
- Solution approach
- Key insights
- Reusability notes

**Example:**

```markdown
After solving complex N+1 query issue through sequential thinking:

Memory Bank Entry:
- Subject: "Performance Pattern"
- Key: "eloquent-n+1-solution-characters"
- Content:
  - Problem: Loading characters with items causing N+1 queries
  - Solution: Eager load with constraints (with(['items' => fn($q) => $q->where('equipped', true)]))
  - Insight: Can combine eager loading with query constraints
  - Reuse: Apply to quests, guilds, any relationship queries
```

## Integration Triggers

### Check Memory Bank When:

1. **Problem seems familiar** - "Have we solved this before?"
2. **Evaluating options** - "What did we choose last time?"
3. **Establishing patterns** - "Is there a standard approach?"
4. **Validating assumptions** - "What are the known constraints?"

### Update Memory Bank When:

1. **Novel solution found** - First time solving this type of problem
2. **Pattern established** - Approach worth repeating
3. **Decision made** - Architectural or design choice finalized
4. **Insight crystalized** - Learned something valuable
5. **Preference expressed** - User indicates preference

## Memory Bank Access Patterns

### Quick Reference Lookup

For simple factual checks:

```
**Thought 3/10** Quick Memory Check

Checking memory for "database choice"...
→ PostgreSQL, chosen for JSON support and full-text search
Proceeding with PostgreSQL assumption.
```

### Deep Context Retrieval

For comprehensive background:

```
**Thought 2/15** Loading Project Context from Memory

Reading memories related to:
- Architecture decisions
- Technology stack
- User preferences
- Established patterns

[Load and summarize relevant memories]

This historical context informs: [implications for current problem]
```

### Pattern Discovery

For finding reusable solutions:

```
**Thought 6/12** Searching for Similar Solutions

Query memory bank for:
- "real-time notifications"
- "websocket implementation"
- "broadcasting patterns"

Found related solution in memory "realtime-setup-051":
[Use that pattern as starting point]
```

## Best Practices

### Do:

✓ **Check memory early** - Incorporate context from Thought 1-2
✓ **Reference specifically** - Cite memory IDs/keys when using them
✓ **Store selectively** - Only valuable, reusable insights
✓ **Update existing** - Refine memories rather than duplicate
✓ **Link related memories** - Cross-reference connected decisions

### Don't:

✗ **Store everything** - Not every thought deserves permanence
✗ **Ignore memory** - Don't re-solve known problems
✗ **Overwrite blindly** - Consider if old memory still valid
✗ **Create orphan memories** - Ensure discoverability
✗ **Skip context** - Explain why decision made, not just what

## Example: Full Integration Workflow

```
**User Request:** "Should I use Livewire or Inertia for the admin panel?"

**Thought 1/8** Checking Memory Bank for Context

Searching memories for:
- "livewire" 
- "inertia"
- "frontend framework"
- "admin panel"

Found memory "frontend-stack-decision-2025":
- Main app uses Blade + Alpine (established)
- Team comfortable with PHP
- No strong JavaScript framework expertise
- Previous consideration favored Livewire for simplicity

This context influences evaluation...

**Thought 2/8** Current Requirements Analysis
[Analysis of admin panel needs]

**Thought 3/8** Livewire Evaluation  
[Pros/cons considering team context from memory]

**Thought 4/8** Inertia Evaluation
[Pros/cons considering existing stack from memory]

**Thought 5/8** Consistency with Existing Stack

Memory indicates main app is Blade + Alpine.
Admin panel consistency consideration:
- Same stack = easier maintenance
- Different stack = richer admin UX

Weighing trade-offs...

**Thought 6/8** Solution Hypothesis

Given team PHP comfort (from memory) and existing Blade stack,
recommend: Livewire for admin panel

Reasoning aligns with memory "frontend-stack-decision-2025"

**Thought 7/8** Validation
[Verify solution meets requirements]

**Thought 8/8** Final Recommendation

✓ Conclusion: Use Livewire for admin panel

[After thinking completes]

Updating Memory Bank:
- Memory "admin-panel-framework" created
- Cross-referenced with "frontend-stack-decision-2025"
- Documented: Livewire chosen for consistency, team fit
- Future reference: Admin tooling decisions
```

## Memory Bank Structure Recommendations

For optimal integration with sequential thinking:

```
memory-bank/
├── architecture/
│   ├── patterns.md (structural decisions)
│   └── modules.md (modular organization)
├── design/
│   ├── ui-patterns.md (component patterns)
│   └── ux-decisions.md (experience choices)
├── technology/
│   ├── stack.md (framework, library choices)
│   └── native-resources.md (Laravel features in use)
├── solutions/
│   ├── performance.md (optimization patterns)
│   └── security.md (security approaches)
└── preferences/
    ├── coding-style.md (team preferences)
    └── conventions.md (project standards)
```

## Conclusion

The sequential thinking + memory bank combination creates a **learning system**:

1. **Think deeply** with sequential thinking
2. **Remember insights** in memory bank
3. **Apply learnings** to future problems
4. **Refine over time** as patterns emerge

This compounds the value of both skills, making each problem-solving session contribute to future efficiency.
