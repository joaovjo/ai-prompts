---
name: documentation
description: Documentation standards for all projects
applyTo: "**"
---

# Documentation Standards

Comprehensive documentation guidelines applicable to any project type.

## README Essentials

Every project should have a README that includes:

- **Project Title & Description**: Clear, concise overview
- **Prerequisites**: Required tools, versions, accounts
- **Installation**: Step-by-step setup instructions
- **Usage**: Basic examples and common use cases
- **Configuration**: Environment variables and settings
- **Contributing**: Guidelines for contributors
- **License**: Project license information
- **Contact/Support**: How to get help

## Code Documentation

### Public APIs

- Document all public interfaces, functions, and classes
- Include parameters, return values, and exceptions
- Provide usage examples
- Explain expected behavior and constraints
- Document breaking changes in version updates

### Inline Comments

- Explain complex algorithms or business logic
- Clarify non-obvious decisions or workarounds
- Reference external resources or specifications
- Mark technical debt with TODO/FIXME
- Avoid stating the obvious

### Architecture Documentation

- Document high-level system architecture
- Explain key design decisions and trade-offs
- Maintain diagrams for complex interactions
- Document data flows and integration points
- Keep architecture docs updated with major changes

## API Documentation

- Document all endpoints, methods, and parameters
- Provide request/response examples
- Include authentication requirements
- Specify error codes and messages
- Document rate limits and quotas
- Version API documentation alongside code

## Change Documentation

### Changelog

- Maintain a changelog for user-facing changes
- Group changes by type (Added, Changed, Deprecated, Removed, Fixed, Security)
- Include version numbers and release dates
- Link to relevant issues or pull requests
- Follow Keep a Changelog format

### Migration Guides

- Provide guides for breaking changes
- Include before/after code examples
- Explain the reasoning behind changes
- Offer migration tools when possible
- Highlight deprecated features

## Runbooks & Operational Docs

- Document deployment procedures
- Include troubleshooting guides
- Maintain incident response procedures
- Document backup and recovery processes
- Keep monitoring and alerting documentation
- Document common maintenance tasks
