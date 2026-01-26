---
name: apply-pattern
description: Suggest and apply appropriate design patterns to solve software design problems
agent: agent
---

# Apply Pattern

Suggest and apply appropriate design patterns to solve software design problems.

## What This Does

- Analyzes current code structure and design problems
- Suggests appropriate design patterns for the situation
- Explains why the pattern fits the problem
- Implements the pattern step-by-step
- Shows before/after comparisons
- Provides examples and best practices

## Pattern Application Process

1. **Understand the problem**: Analyze current code and pain points
2. **Identify candidates**: Suggest 2-3 patterns that could help
3. **Evaluate trade-offs**: Discuss pros/cons of each pattern
4. **Choose pattern**: Select most appropriate based on context
5. **Plan implementation**: Break down into steps
6. **Apply pattern**: Implement incrementally with tests
7. **Validate**: Ensure solution solves the original problem

## Pattern Categories

### Creational Patterns (Object Creation)

**Use when you need to:**

- Centralize object creation logic → Factory Method
- Create families of related objects → Abstract Factory
- Build complex objects step-by-step → Builder
- Clone existing objects → Prototype
- Ensure single instance → Singleton

### Structural Patterns (Object Composition)

**Use when you need to:**

- Make incompatible interfaces work together → Adapter
- Separate abstraction from implementation → Bridge
- Build tree structures → Composite
- Add responsibilities dynamically → Decorator
- Simplify complex subsystem → Facade
- Share state efficiently → Flyweight
- Control access to objects → Proxy

### Behavioral Patterns (Object Interaction)

**Use when you need to:**

- Pass request through handler chain → Chain of Responsibility
- Encapsulate requests as objects → Command
- Traverse collections uniformly → Iterator
- Centralize complex communications → Mediator
- Save/restore object state → Memento
- Notify multiple objects of changes → Observer
- Change behavior based on state → State
- Switch between algorithms → Strategy
- Define algorithm skeleton → Template Method
- Operate on object structures → Visitor

## Pattern Selection Questions

Ask these questions to choose the right pattern:

1. **Creation or structure or behavior?** Narrows to category
2. **What's the main problem?** Identifies specific pain point
3. **What are the requirements?** Ensures pattern fits needs
4. **What are the trade-offs?** Evaluates complexity vs benefit
5. **Is simpler solution possible?** Avoids over-engineering

## Best Practices

- **Start simple**: Only add patterns when needed
- **Understand first**: Know the problem before applying solution
- **Consider context**: Pattern suitability depends on situation
- **Refactor to patterns**: Let patterns emerge from refactoring
- **Communicate intent**: Use patterns to express design decisions
- **Test thoroughly**: Ensure pattern implementation is correct
- **Document decisions**: Explain why pattern was chosen
