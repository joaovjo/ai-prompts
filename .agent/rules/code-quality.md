---
trigger: model_decision
description: Universal code quality and best practices standards
---

# Code Quality Standards

These standards apply to all codebases regardless of programming language or framework.

## Naming Conventions

- Use meaningful, descriptive names that reveal intent
- Avoid abbreviations unless widely recognized
- Use consistent naming patterns throughout the project
- Names should be pronounceable and searchable
- Avoid generic names like `data`, `info`, `temp`, `manager`

## Function/Method Design

- Each function should do one thing and do it well
- Keep functions short (typically under 20-30 lines)
- Minimize function parameters (ideally 3 or fewer)
- Avoid side effects unless clearly documented
- Return early to reduce nesting
- Use pure functions when possible

## Error Handling

- Fail fast and provide clear error messages
- Don't swallow exceptions silently
- Use specific error types/classes
- Log errors with sufficient context for debugging
- Handle expected errors, let unexpected ones bubble up
- Provide recovery mechanisms when appropriate

## Code Organization

- Group related functionality together
- Keep file sizes reasonable (under 300-400 lines)
- Use folders/modules to organize by feature or domain
- Avoid circular dependencies
- Keep coupling low and cohesion high
- Follow the principle of least knowledge

## Testing

- Write tests for critical business logic
- Test edge cases and error conditions
- Keep tests independent and isolated
- Use descriptive test names that explain what is being tested
- Arrange-Act-Assert pattern for test structure
- Maintain test code quality as rigorously as production code

## Comments and Documentation

- Write self-documenting code first
- Use comments to explain WHY, not WHAT
- Document non-obvious behavior or algorithms
- Keep comments up to date with code changes
- Use TODO/FIXME comments sparingly and track them
- Avoid commented-out code (use version control instead)