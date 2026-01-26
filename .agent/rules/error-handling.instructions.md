---
name: error-handling
description: Error handling patterns and best practices
applyTo: "**"
---

# Error Handling Standards

Universal error handling principles applicable to any programming language or framework.

## General Principles

- **Fail Fast**: Detect errors as early as possible
- **Be Specific**: Use specific error types, not generic ones
- **Provide Context**: Include relevant information in error messages
- **Don't Swallow Errors**: Log or propagate, never silently ignore
- **Recover Gracefully**: Handle expected errors, let unexpected ones bubble up

## Error Types

### Expected Errors (Recoverable)

- User input validation errors
- Resource not found errors
- Permission denied errors
- Network timeouts
- Rate limit exceeded

**Action**: Handle these errors with appropriate user feedback and recovery mechanisms.

### Unexpected Errors (System Failures)

- Programming bugs
- System resource exhaustion
- Unhandled edge cases
- Infrastructure failures

**Action**: Log with full context, alert if critical, allow to bubble up or fail safely.

## Error Messages

### User-Facing Messages

- Clear and actionable
- Avoid technical jargon
- Suggest next steps
- Don't expose system internals
- Be empathetic

**Example**:

- ❌ "NullPointerException in UserService.java:42"
- ✅ "We couldn't find that user. Please check the username and try again."

### Developer Logs

- Include error type and code
- Add contextual information
- Include stack trace
- Log severity level
- Add correlation IDs for distributed systems

## Validation

### Input Validation

- Validate at system boundaries
- Check data types and formats
- Verify ranges and constraints
- Sanitize user input
- Fail with specific validation errors

### Business Rule Validation

- Verify business constraints
- Check permissions and authorization
- Validate state transitions
- Ensure data consistency

## Exception Hierarchy

### Organize Errors by Category

- ValidationError
- AuthenticationError
- AuthorizationError
- NotFoundError
- ConflictError
- RateLimitError
- TimeoutError
- SystemError

### Error Codes

- Use consistent error codes across the application
- Document all error codes
- Group codes by category (4xx for client errors, 5xx for server errors)
- Make codes searchable

## Logging Strategy

### What to Log

- Error type and message
- Stack trace for exceptions
- User/request context
- Timestamp and severity
- Correlation IDs
- Resource identifiers

### What NOT to Log

- Passwords or secrets
- Full credit card numbers
- Personal identifiable information (PII)
- Session tokens
- Internal system paths in production

### Log Levels

- **DEBUG**: Detailed diagnostic information
- **INFO**: General informational messages
- **WARN**: Warning messages for potentially harmful situations
- **ERROR**: Error events that might still allow the application to continue
- **FATAL/CRITICAL**: Severe errors that cause application termination

## Retry Logic

### When to Retry

- Network timeouts
- Temporary service unavailability
- Rate limit errors
- Database deadlocks

### Retry Strategy

- Use exponential backoff
- Set maximum retry attempts
- Add jitter to prevent thundering herd
- Log retry attempts
- Fail fast after max retries

### When NOT to Retry

- Validation errors
- Authentication failures
- Resource not found
- Permission denied
- Client errors (4xx)

## Circuit Breaker Pattern

- Prevent cascading failures
- Fail fast when service is down
- Allow time for recovery
- Monitor circuit state
- Provide fallback mechanisms

## Error Recovery

### Graceful Degradation

- Provide fallback functionality
- Cache previous successful responses
- Show user-friendly error pages
- Maintain partial functionality
- Queue requests for later processing

### Rollback Mechanisms

- Implement transaction rollback
- Maintain system consistency
- Clean up resources
- Restore previous state
- Document rollback procedures
