---
name: git-workflow
description: Git workflow and version control best practices
applyTo: "**"
---

# Git Workflow Standards

Best practices for version control and Git workflows.

## Commit Guidelines

### Commit Messages

- Use clear, descriptive commit messages
- Start with a verb in imperative mood (Add, Fix, Update, Remove)
- First line: brief summary (50 chars or less)
- Blank line, then detailed explanation if needed
- Reference issue numbers when applicable

**Format**:

```
<type>: <subject>

<body>

<footer>
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Atomic Commits

- Each commit should represent a single logical change
- Don't mix unrelated changes in one commit
- Keep commits focused and reviewable
- Make it easy to revert if needed

## Branching Strategy

### Branch Naming

- Use descriptive branch names
- Include issue number if applicable
- Use hyphens to separate words
- Examples: `feature/user-authentication`, `fix/login-bug`, `hotfix/security-patch`

### Branch Types

- **main/master**: Production-ready code
- **develop**: Integration branch for features
- **feature/\***: New features
- **fix/\***: Bug fixes
- **hotfix/\***: Urgent production fixes
- **release/\***: Release preparation

### Branch Lifecycle

1. Create branch from appropriate base
2. Work on changes
3. Keep branch up to date with base
4. Create pull request for review
5. Merge after approval
6. Delete branch after merge

## Pull Request Process

### Creating PRs

- Provide clear title and description
- Explain what changes were made and why
- Reference related issues
- Include screenshots for UI changes
- Add test results if applicable
- Request specific reviewers

### Review Guidelines

- Review code promptly
- Provide constructive feedback
- Ask questions for clarity
- Suggest improvements
- Approve when satisfied

## Merge Strategies

### Merge Commit

- Preserves complete history
- Shows when features were merged
- Can clutter history with merge commits

### Squash and Merge

- Combines all commits into one
- Creates clean, linear history
- Loses individual commit history

### Rebase and Merge

- Creates linear history
- Preserves individual commits
- Requires clean commit history

## Best Practices

### Keep Main Branch Stable

- All commits to main should be deployable
- Use branch protection rules
- Require passing tests before merge
- Require code reviews

### Regular Synchronization

- Pull changes from base branch frequently
- Resolve conflicts early
- Keep feature branches short-lived
- Rebase or merge to stay current

### Clean History

- Use interactive rebase to clean up commits before PR
- Remove debug commits
- Combine related commits
- Improve commit messages

## Git Hygiene

### What to Commit

- Source code
- Configuration templates
- Documentation
- Build scripts
- Tests

### What NOT to Commit

- Compiled binaries
- Dependencies (use package managers)
- Secrets or credentials
- Large binary files
- Personal IDE settings
- Temporary files

### .gitignore

- Maintain comprehensive .gitignore
- Ignore build artifacts
- Ignore IDE-specific files
- Ignore OS-specific files
- Ignore environment files with secrets

## Tags and Releases

### Semantic Versioning

- Use semantic versioning (MAJOR.MINOR.PATCH)
- MAJOR: Breaking changes
- MINOR: New features (backwards compatible)
- PATCH: Bug fixes

### Release Process

1. Create release branch
2. Update version numbers
3. Update changelog
4. Test thoroughly
5. Create tag
6. Merge to main and develop
7. Deploy to production
8. Create GitHub release with notes
