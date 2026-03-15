# Contributing

We welcome contributions to Braum! This guide will help you get started.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

- A clear description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (Node.js version, package versions)

### Suggesting Features

We welcome feature suggestions! Please create an issue with:

- A clear description of the feature
- The motivation behind it
- Possible implementation approaches

### Pull Requests

1. Fork the repository
2. Create a new branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run the checks: `pnpm ci-check`
5. Commit your changes using conventional commits
6. Push to your fork: `git push origin feature/my-feature`
7. Create a pull request

## Commit Convention

We use conventional commits. The format is:

```
<type>(<scope>): <subject>
```

Types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, semicolons, etc)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI configuration changes
- `chore`: Other changes
- `revert`: Reverts a previous commit

Example:

```bash
pnpm commit
# or
git commit -m "feat(eslint): add new rule for react hooks"
```

## Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Run `pnpm format:fix` before committing
- Run `pnpm lint:fix` to fix linting issues

## Testing

Test your changes in the example projects:

```bash
cd examples/react
pnpm lint
```

## Documentation

Update the documentation when:

- Adding new features
- Changing existing behavior
- Adding new packages

## Release Process

1. Update version numbers
2. Update CHANGELOG.md
3. Create a new release
4. Publish to npm

## Questions?

Feel free to open an issue for any questions!
