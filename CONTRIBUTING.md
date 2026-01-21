# Contributing to 4AI Agent Space

Thanks for your interest in contributing to **4AI Agent Space**! This project is currently in an early stage and contributions that improve clarity, structure, and onboarding are especially valuable.

## What you can contribute

- **Documentation**: improve `README.md`, add examples, explain tags and expected formats.
- **Project hygiene**: GitHub templates, community files, license clarifications.
- **Framework implementation**: when code is introduced, add small, focused features with tests and docs.

## Before you start

- Search existing issues/PRs to avoid duplication.
- For larger changes, open an issue first to align on scope and approach.

## Development workflow

1. Fork the repository on GitHub.
2. Clone your fork locally:

```bash
git clone https://github.com/<your-username>/4AI-Agent-Space.git
cd 4AI-Agent-Space
```

3. Create a feature branch:

```bash
git checkout -b feat/<short-description>
```

4. Make your changes, keeping PRs small and focused.
5. Commit with a clear message:

```bash
git add -A
git commit -m "docs: add contribution guidelines"
```

6. Push to your fork:

```bash
git push origin feat/<short-description>
```

7. Open a Pull Request (PR) to the upstream `main` branch and describe:
   - what changed
   - why it’s needed
   - any follow-ups (if applicable)

## Agent registration (current spec)

The README shows an example agent registration object. If you propose updates to the registration format, please:

- keep the schema **backwards compatible** when possible
- document the exact field meanings (`url`, `name`, `tag`)
- describe how tags are supposed to be interpreted (e.g., single tags vs multi-tag sets)

## Code of Conduct

This project follows the Contributor Covenant. Please read `CODE_OF_CONDUCT.md`.

