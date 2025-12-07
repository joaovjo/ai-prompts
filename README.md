# AI Prompts

A kit of instructions, prompts, and custom agents for GitHub Copilot and VS Code.

## What Is This

Centralized repository containing:

- **Agents** (`.github/agents/`) – Specialized assistants with structured workflows
  - **Planning Agent** – Creates actionable plans with memory-bank persistence
  - **Learning Coach** – Interactive coding tutor with challenges and feedback
- **Prompts** (`.github/prompts/`) – Reusable commands

  - `analyze`, `apply-pattern`, `document`, `refactor`, `review`, `test`

- **Instructions** (`.github/instructions/`) – Best practices guides

  - Code quality, design patterns, documentation, error handling, security, git workflow, refactoring

- **Copilot Instructions** – Global configuration for VS Code

## How to Use

1. Clone this repository or reference it in your workspace
2. Open in VS Code (instructions in `.github/copilot-instructions.md` are applied automatically)
3. Invoke agents: "Help me with Planning Agent" or use prompts directly

## Structure

```
.github/
├── agents/          # Custom agents
├── prompts/         # Reusable prompts
├── instructions/    # Guides and best practices
└── copilot-instructions.md  # Global configuration
```

## Contributing

### Guidelines

- **Maintain YAML frontmatter** – Preserve `---` markers and required fields (description, tools, name, etc.)
- **Follow naming conventions** – Use `kebab-case` for filenames (e.g., `my-agent.agent.md`, `my-prompt.prompt.md`)
- **Document clearly** – Include purpose, usage examples, and boundaries for new agents/prompts
- **Reference existing patterns** – Link to relevant instructions or similar agents
- **Add new instructions** – Document patterns in `.github/instructions/` if they're broadly applicable

### How to Contribute

1. Fork or clone this repository
2. Create a feature branch: `git checkout -b feature/my-new-agent`
3. Add your agent/prompt/instruction following the existing structure
4. Test locally by referencing the files in VS Code
5. Commit with clear messages: `git commit -m "Add: new analysis agent for performance"`
6. Push and open a pull request

### What to Contribute

- New agents solving common problems (planning, research, refactoring, etc.)
- Prompts for specific workflows or domains
- Enhanced instructions based on team best practices
- Bug fixes or improvements to existing agents/prompts

## License

MIT
