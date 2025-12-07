---
name: test
description: Generate comprehensive tests for code modules and functions
agent: agent
---

# Test

Generate comprehensive tests for code modules and functions.

## What This Does

- Creates test cases for existing code
- Identifies edge cases and boundary conditions
- Ensures proper error handling coverage
- Generates test data and fixtures
- Provides test structure following best practices

## Test Types

### Unit Tests

- Test individual functions/methods in isolation
- Mock external dependencies
- Focus on single responsibility
- Fast execution

### Integration Tests

- Test interaction between components
- Verify data flow across boundaries
- Test real dependencies when appropriate
- Validate integration points

### Edge Case Tests

- Boundary value testing
- Null/undefined/empty inputs
- Maximum/minimum values
- Invalid input handling
- Concurrent access scenarios

### Error Handling Tests

- Expected exceptions
- Error recovery mechanisms
- Validation failures
- Resource unavailability
- Timeout scenarios

## Test Structure

Tests should follow the **Arrange-Act-Assert** pattern:

1. **Arrange**: Set up test data and preconditions
2. **Act**: Execute the code being tested
3. **Assert**: Verify the expected outcome

## Test Characteristics

- **Independent**: Tests don't depend on each other
- **Repeatable**: Same results every time
- **Fast**: Quick execution for rapid feedback
- **Isolated**: Don't affect external systems
- **Descriptive**: Clear test names explaining what is tested

## Expected Output

The AI will provide:

- Complete test suite with multiple test cases
- Test setup and teardown code
- Mock objects and test data
- Edge cases and boundary conditions
- Coverage of happy path and error scenarios
- Clear, descriptive test names
