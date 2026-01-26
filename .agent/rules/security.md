---
name: security
description: Security best practices for all projects
applyTo: "**"
---

# Security Guidelines

Universal security principles that should be applied to every project.

## Authentication & Authorization

- Always authenticate users before granting access
- Implement proper session management
- Use secure password hashing (never store plain text)
- Implement multi-factor authentication for sensitive operations
- Follow the principle of least privilege
- Expire sessions after inactivity
- Validate authentication tokens properly

## Input Validation & Sanitization

- Validate all input from untrusted sources
- Use allowlists rather than denylists when possible
- Sanitize input before processing
- Validate data types, formats, ranges, and lengths
- Escape output to prevent injection attacks
- Use parameterized queries for database operations
- Validate file uploads (type, size, content)

## Data Protection

- Encrypt sensitive data at rest and in transit
- Use environment variables for configuration secrets
- Never commit secrets to version control
- Use secure random number generators for tokens
- Implement proper key management
- Rotate credentials regularly
- Use HTTPS/TLS for all network communication

## Common Vulnerabilities

- Prevent SQL/NoSQL injection attacks
- Protect against Cross-Site Scripting (XSS)
- Prevent Cross-Site Request Forgery (CSRF)
- Avoid insecure deserialization
- Implement rate limiting to prevent abuse
- Protect against directory traversal attacks
- Validate and sanitize file paths

## Error Handling & Logging

- Don't expose sensitive information in error messages
- Log security-relevant events
- Avoid logging sensitive data (passwords, tokens, PII)
- Implement proper error handling without revealing internals
- Monitor for suspicious activities
- Set up alerts for security events

## Dependencies & Supply Chain

- Keep dependencies up to date
- Audit dependencies for known vulnerabilities
- Use dependency scanning tools
- Verify package integrity
- Minimize the number of dependencies
- Review third-party code before integration
- Use official package repositories
