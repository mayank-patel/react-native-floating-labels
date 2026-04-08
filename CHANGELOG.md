# [2.1.0](https://github.com/mayank-patel/react-native-floating-labels/compare/v2.0.0...v2.1.0) (2026-04-08)


### Bug Fixes

* **demo:** upgrade @vitejs/plugin-react to v6 for vite 8 compatibility ([b5b4e9d](https://github.com/mayank-patel/react-native-floating-labels/commit/b5b4e9dd989f56cdcf381a1b6774ca8aa7ba1dc7))


### Features

* add accessibility support (WCAG 2.1/2.2 AA, Section 508, VoiceOver, TalkBack) ([0e5c40c](https://github.com/mayank-patel/react-native-floating-labels/commit/0e5c40c224b4e1f003254c90aebe8d965516a101))

# [2.0.0](https://github.com/mayank-patel/react-native-floating-labels/compare/v1.0.0...v2.0.0) (2026-04-08)


* feat!: TypeScript rewrite with dual-format build, automated releases, lint, and demo ([36a1450](https://github.com/mayank-patel/react-native-floating-labels/commit/36a145035dd8322bd7986f15f09403c8c16c9dda)), closes [#pages](https://github.com/mayank-patel/react-native-floating-labels/issues/pages)


### Bug Fixes

* restore top-level types condition in exports map for moduleResolution compatibility ([1dec1c3](https://github.com/mayank-patel/react-native-floating-labels/commit/1dec1c3f5c3f3a392beccc355e680c39ab2eabe1))


### Features

* add accessibility support (WCAG 2.1/2.2 AA, Section 508, VoiceOver, TalkBack) ([0e5c40c](https://github.com/mayank-patel/react-native-floating-labels/commit/0e5c40c224b4e1f003254c90aebe8d965516a101))


### BREAKING CHANGES

* package now ships compiled dist/ instead of raw source.
Consumers importing from the package root directly must update to use the
published dist/ output.

- Move source to src/index.tsx, tests to __tests__/
- Add tsup build (CJS + ESM + .d.ts), dual exports map in package.json
- Add semantic-release with beta prerelease channel support
- Add ESLint (typescript-eslint, react, react-hooks) + Prettier + Husky pre-commit
- Add CI, Release, and Deploy Demo GitHub Actions workflows

# [2.0.0](https://github.com/mayank-patel/react-native-floating-labels/compare/v1.0.0...v2.0.0) (2026-04-08)


* feat!: TypeScript rewrite with dual-format build, automated releases, lint, and demo ([36a1450](https://github.com/mayank-patel/react-native-floating-labels/commit/36a145035dd8322bd7986f15f09403c8c16c9dda)), closes [#pages](https://github.com/mayank-patel/react-native-floating-labels/issues/pages)


### Bug Fixes

* restore top-level types condition in exports map for moduleResolution compatibility ([1dec1c3](https://github.com/mayank-patel/react-native-floating-labels/commit/1dec1c3f5c3f3a392beccc355e680c39ab2eabe1))


### BREAKING CHANGES

* package now ships compiled dist/ instead of raw source.
Consumers importing from the package root directly must update to use the
published dist/ output.

- Move source to src/index.tsx, tests to __tests__/
- Add tsup build (CJS + ESM + .d.ts), dual exports map in package.json
- Add semantic-release with beta prerelease channel support
- Add ESLint (typescript-eslint, react, react-hooks) + Prettier + Husky pre-commit
- Add CI, Release, and Deploy Demo GitHub Actions workflows

# [2.0.0](https://github.com/mayank-patel/react-native-floating-labels/compare/v1.0.0...v2.0.0) (2026-04-08)


* feat!: TypeScript rewrite with dual-format build, automated releases, lint, and demo ([36a1450](https://github.com/mayank-patel/react-native-floating-labels/commit/36a145035dd8322bd7986f15f09403c8c16c9dda)), closes [#pages](https://github.com/mayank-patel/react-native-floating-labels/issues/pages)


### Bug Fixes

* restore top-level types condition in exports map for moduleResolution compatibility ([1dec1c3](https://github.com/mayank-patel/react-native-floating-labels/commit/1dec1c3f5c3f3a392beccc355e680c39ab2eabe1))


### BREAKING CHANGES

* package now ships compiled dist/ instead of raw source.
Consumers importing from the package root directly must update to use the
published dist/ output.

- Move source to src/index.tsx, tests to __tests__/
- Add tsup build (CJS + ESM + .d.ts), dual exports map in package.json
- Add semantic-release with beta prerelease channel support
- Add ESLint (typescript-eslint, react, react-hooks) + Prettier + Husky pre-commit
- Add CI, Release, and Deploy Demo GitHub Actions workflows
