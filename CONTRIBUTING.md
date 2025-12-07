# Contributing to AI Prompts

Thank you for your interest in contributing to the AI Prompts repository! We welcome contributions from everyone. This document provides guidelines and instructions for contributing.

## Code of Conduct

All contributors are expected to uphold respectful and inclusive behavior. Please help us maintain a welcoming community.

## Getting Started

### Prerequisites

- Git
- GitHub account
- Familiarity with Markdown and YAML

### Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/ai-prompts.git
   cd ai-prompts
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/joaovjo/ai-prompts.git
   ```

## Development Workflow

### 1. Create a Feature Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/` for new agents, prompts, or instructions
- `fix/` for bug fixes
- `docs/` for documentation updates
- `refactor/` for refactoring existing code

### 2. Make Your Changes

Follow these guidelines:

- **For agents** (`.github/agents/`):
  - Maintain YAML frontmatter with required fields
  - Document purpose, workflow, and boundaries
  - Provide clear examples
  - Use kebab-case for filenames

- **For prompts** (`.github/prompts/`):
  - Include descriptive frontmatter
  - Focus on specific use cases
  - Keep documentation concise

- **For instructions** (`.github/instructions/`):
  - Document broadly applicable patterns
  - Reference existing best practices
  - Provide practical examples

### 3. Commit Your Changes

Write clear, descriptive commit messages:

```bash
git commit -m "Add: new research agent for documentation analysis"
git commit -m "Fix: correct typo in planning agent workflow"
git commit -m "Docs: enhance security guidelines with encryption examples"
```

### 4. Keep Your Branch Updated

Before submitting a pull request, sync with upstream:

```bash
git fetch upstream
git rebase upstream/dev
```

### 5. Push and Create a Pull Request

Push your changes:

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub targeting the `dev` branch.

## Pull Request Process

### PR Guidelines

- **Target branch**: Always submit PRs to `dev` branch
- **Title**: Use clear, descriptive titles following the format: `Add: description` or `Fix: description`
- **Description**: Include:
  - What changes are made
  - Why these changes are needed
  - Any relevant issues (use `Closes #123`)
  - Testing performed (if applicable)

### PR Template Example

```markdown
## Description
Brief description of your changes.

## Changes
- Change 1
- Change 2

## Closes
Closes #123

## Type of Change
- [ ] New agent
- [ ] New prompt
- [ ] New instruction
- [ ] Bug fix
- [ ] Documentation
- [ ] Other: ___

## Testing
Describe how you tested these changes.
```

### Review Process

1. At least one approval is required before merging
2. All conversations must be resolved
3. Branch must be up to date with `dev`
4. CI checks must pass (if applicable)

## What to Contribute

We welcome contributions in the following areas:

### New Agents

- Specialized assistants for specific workflows
- Agents that solve recurring problems
- Educational or research-focused assistants

### New Prompts

- Reusable prompts for specific domains
- Prompts that complement existing agents
- Prompts for common coding tasks

### Enhanced Instructions

- New best practices guides
- Refinements to existing guidelines
- Domain-specific standards

### Improvements

- Bug fixes and error corrections
- Documentation improvements
- Performance optimizations
- Better examples

## Review Checklist

Before submitting a PR, ensure:

- [ ] YAML frontmatter is properly formatted
- [ ] No syntax errors in Markdown or YAML
- [ ] Naming follows conventions (kebab-case for files)
- [ ] Documentation is clear and complete
- [ ] Examples are provided where appropriate
- [ ] No unnecessary files are included
- [ ] Commit messages are descriptive

## Questions or Need Help?

- Check existing issues for similar questions
- Review the [README.md](README.md) for an overview and repository patterns
## License

By contributing to this repository, you agree that your contributions will be licensed under the MIT License.
