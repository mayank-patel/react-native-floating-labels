# Contributing

## Conventional Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/) to automate versioning and changelog generation via `semantic-release`.

Every commit message must follow this format:

```
<type>(<optional scope>): <description>
```

### Commit types and their effect on versioning

| Type       | Description                    | Release            |
| ---------- | ------------------------------ | ------------------ |
| `feat`     | A new feature                  | Minor version bump |
| `fix`      | A bug fix                      | Patch version bump |
| `perf`     | A performance improvement      | Patch version bump |
| `chore`    | Maintenance / tooling          | No release         |
| `docs`     | Documentation only             | No release         |
| `refactor` | Code change, no feature or fix | No release         |
| `style`    | Formatting, whitespace         | No release         |
| `test`     | Adding or updating tests       | No release         |
| `ci`       | CI/CD changes                  | No release         |
| `build`    | Build system changes           | No release         |

### Breaking changes

A breaking change triggers a **major version bump** regardless of the commit type. Indicate it in one of two ways:

**Option 1 — `!` suffix on the type:**

```
feat!: remove deprecated myRef prop
```

**Option 2 — `BREAKING CHANGE` footer:**

```
feat: remove deprecated myRef prop

BREAKING CHANGE: The `myRef` prop has been removed. Use the standard `ref` prop instead.
```

### More examples

```
feat: add support for placeholder color prop
fix: label stays in dirty position after clear()
chore: upgrade tsup to v9
docs: update README installation steps
```

## Development workflow

```bash
# Install dependencies
npm install

# Run tests
npm test

# Type-check
npm run type-check

# Build the library
npm run build

# Start the demo dev server (http://localhost:5173)
npm run demo
```

## Submitting changes

1. Fork the repository and create a branch from `master`.
2. Make your changes, following the Conventional Commits format for every commit.
3. Ensure `npm test`, `npm run type-check`, and `npm run build` all pass locally.
4. Open a pull request against `master`. The CI workflow will run automatically.

## Setting up NPM_TOKEN for automated publishing

Automated npm publishing is handled by `semantic-release` via the `release.yml` workflow. It requires a `NPM_TOKEN` secret in the GitHub repository settings.

**Steps to configure:**

1. Log in to [npmjs.com](https://www.npmjs.com) and go to **Access Tokens** in your account settings.
2. Click **Generate New Token** and choose **Granular Access Token** (or Classic → **Automation** type).
3. Grant the token **read and write** access to the `react-native-floating-labels` package.
4. Copy the generated token.
5. In the GitHub repository, go to **Settings → Secrets and variables → Actions**.
6. Click **New repository secret**, name it `NPM_TOKEN`, and paste the token value.

The `GITHUB_TOKEN` secret is automatically provided by GitHub Actions and requires no manual setup.

## Releasing

Releases are fully automated. When a PR is merged to `master`:

1. The `CI` workflow runs tests, type-check, and build.
2. On success, the `Release` workflow runs `semantic-release`.
3. `semantic-release` analyzes commits since the last release, determines the next version, publishes to npm, creates a GitHub release, and commits an updated `CHANGELOG.md` back to `master`.

You do **not** need to manually bump versions or tag releases.
