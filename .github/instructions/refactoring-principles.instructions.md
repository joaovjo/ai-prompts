---
name: refactoring-principles
description: Refactoring principles and best practices
applyTo: "**"
---

# Refactoring Principles

Guidelines for improving code structure without changing external behavior.

## When to Refactor

### Opportunistic Refactoring

- When touching code for other reasons
- When adding features
- When fixing bugs
- During code reviews

### Planned Refactoring

- Technical debt reduction
- Performance improvements
- Preparing for new features
- Improving testability

## Code Smells

### Bloaters

- **Long Method**: Methods that have grown too large
- **Large Class**: Classes trying to do too much
- **Primitive Obsession**: Overusing primitive types instead of objects
- **Long Parameter List**: Methods with too many parameters
- **Data Clumps**: Groups of data that appear together repeatedly

### Object-Orientation Abusers

- **Switch Statements**: Can often be replaced with polymorphism
- **Temporary Field**: Fields only set in certain circumstances
- **Refused Bequest**: Subclass doesn't use inherited functionality
- **Alternative Classes with Different Interfaces**: Classes doing similar things with different methods

### Change Preventers

- **Divergent Change**: One class commonly changed in different ways
- **Shotgun Surgery**: Single change requires many small changes in different classes
- **Parallel Inheritance Hierarchies**: Creating subclass requires creating subclass elsewhere

### Dispensables

- **Comments**: Excessive comments compensating for unclear code
- **Duplicate Code**: Same code structure in multiple places
- **Lazy Class**: Class that doesn't do enough to justify existence
- **Dead Code**: Unused code
- **Speculative Generality**: Code designed for hypothetical future needs

### Couplers

- **Feature Envy**: Method uses another class more than its own
- **Inappropriate Intimacy**: Classes too dependent on each other's internals
- **Message Chains**: Long chains of method calls
- **Middle Man**: Class mostly delegates to other classes

## Refactoring Techniques

### Composing Methods

- **Extract Method**: Create method from code fragment
- **Inline Method**: Replace method call with method body
- **Extract Variable**: Replace expression with variable
- **Inline Variable**: Replace variable with expression
- **Replace Temp with Query**: Replace temporary variable with method call
- **Split Temporary Variable**: Use different variables for different purposes

### Moving Features

- **Move Method**: Move method to class where it's used more
- **Move Field**: Move field to class where it's used more
- **Extract Class**: Create new class for related functionality
- **Inline Class**: Merge class into another when it does too little

### Organizing Data

- **Encapsulate Field**: Make field private, provide accessors
- **Replace Magic Number with Constant**: Use named constant instead of literal
- **Replace Type Code with Class**: Use class instead of primitive type code
- **Replace Array with Object**: Use object when array elements mean different things

### Simplifying Conditionals

- **Decompose Conditional**: Extract complex conditions into methods
- **Consolidate Conditional Expression**: Combine conditions with same result
- **Replace Nested Conditional with Guard Clauses**: Use early returns
- **Replace Conditional with Polymorphism**: Use inheritance instead of switch/if

### Simplifying Method Calls

- **Rename Method**: Method name doesn't reveal purpose
- **Add Parameter**: Method needs more information
- **Remove Parameter**: Parameter no longer needed
- **Separate Query from Modifier**: Split method that returns value and changes state
- **Parameterize Method**: Combine similar methods into one with parameter
- **Replace Parameter with Method Call**: Call method instead of passing result
- **Introduce Parameter Object**: Replace parameters with object

### Dealing with Generalization

- **Pull Up Method**: Move identical methods to superclass
- **Pull Up Field**: Move identical fields to superclass
- **Push Down Method**: Move method to subclasses when only used there
- **Push Down Field**: Move field to subclasses when only used there
- **Extract Subclass**: Extract features used in special cases
- **Extract Superclass**: Extract common features to superclass
- **Extract Interface**: Extract interface when classes share responsibilities

## Refactoring Process

### 1. Understand the Code

- Read code thoroughly
- Run tests
- Discuss with team members
- Document current behavior

### 2. Identify Improvements

- Find code smells
- Locate duplication
- Identify complexity
- Note unclear naming

### 3. Plan Refactoring

- Prioritize changes
- Estimate effort
- Consider risks
- Plan small steps

### 4. Refactor Incrementally

- Make small changes
- Run tests after each change
- Commit frequently
- Verify behavior unchanged

### 5. Review and Validate

- Code review
- Performance testing
- Integration testing
- Documentation update

## Best Practices

### Test First

- Ensure comprehensive test coverage
- Run tests before refactoring
- Run tests after each change
- Add tests if coverage is insufficient

### Small Steps

- Make one change at a time
- Verify each change works
- Commit working changes
- Easy to revert if needed

### Maintain Behavior

- Don't change functionality
- Keep external interface same
- Preserve test results
- Document any exceptions

### Continuous Improvement

- Refactor regularly
- Don't wait for "refactoring time"
- Leave code better than you found it
- Build refactoring into workflow

## Red Flags

Stop refactoring if:

- Tests start failing unexpectedly
- Changes become too large
- Unclear what change will accomplish
- Breaking existing functionality
- Taking too long without progress

## Metrics

Track these to measure improvement:

- Code complexity (cyclomatic complexity)
- Code duplication percentage
- Test coverage
- Code review feedback
- Bug rates
- Development velocity
