## Repo overview
- Purpose: Playwright + TypeScript automation portfolio focused on Page Object Model (POM) tests for https://demo-bank.vercel.app/.
- Test sources: `tests/my_tests` (configured in Playwright). See [playwright.config.ts](playwright.config.ts#L1-L120).

## Key project structure
- Page objects: [pages/*.page.ts](pages/demobank_login.page.ts#L1-L40) (POM classes like `LoginPage`, `TransferPage`).
- Tests: [tests/my_tests](tests/my_tests/demobank/demobank_login.spec.ts#L1-L200) - tests instantiate page objects via relative imports (e.g. `../../../pages/...`).
- Test data: [testdata/transfer.data.ts](testdata/transfer.data.ts#L1-L20) used for data-driven scenarios.
- Playwright output: `playwright-report/`, `trace/`, `test-results/` are generated artifacts.

## How tests are run (commands)
- Install deps: `npm install` (no `scripts` in `package.json`, so use `npx`). See [package.json](package.json#L1-L40).
- Run all tests: `npx playwright test`
- Run single file: `npx playwright test tests/my_tests/demobank/demobank_login.spec.ts`
- Run headed or specific project: `npx playwright test --headed --project=chromium`
- Show HTML report: `npx playwright show-report` (reporter configured as `html` in [playwright.config.ts](playwright.config.ts#L1-L120)).

## Important configuration notes (what the agent must respect)
- `testDir` is `./tests/my_tests` (Playwright loads tests from there). See [playwright.config.ts](playwright.config.ts#L1-L120).
- `trace` is enabled (`'on'`) — CI/locally traces are collected on retries; avoid removing trace collection unless updating config intentionally.
- Projects: only `chromium` is active (other browser projects are commented out). Use `--project` to target non-default if you enable them.
- `retries` and `workers` are set explicitly (both currently `2` and `1` respectively); CI behavior controlled by `process.env.CI`.

## Coding conventions and patterns (specific to this repo)
- POM classes expose Locator properties and action methods (e.g. `LoginPage.login(username, password)` in [pages/demobank_login.page.ts](pages/demobank_login.page.ts#L1-L40)).
- Tests prefer `page.getByTestId`, `page.getByRole`, and `page.locator` for selectors — preserve these when adding selectors.
- Tests use direct `await page.goto('https://demo-bank.vercel.app/')` rather than `baseURL` (baseURL is commented out). Use full URL unless you update config.
- Test imports use relative paths from `tests/my_tests/*` to `pages/` (often `../../../pages/...`). When moving files, update imports accordingly.

## Typical changes an AI agent may be asked to make (how-to specifics)
- To add a new page object: create `pages/<name>.page.ts`, export a class with `constructor(page: Page)` and Locator properties; use `getByTestId` / `getByRole` for resilience.
- To add a test: place under `tests/my_tests`, follow existing `test.describe` and `test.beforeEach` patterns, import page objects with relative paths.
- To reuse test data: add to `testdata/` and import named exports (see [testdata/transfer.data.ts](testdata/transfer.data.ts#L1-L20)).

## Troubleshooting notes for agents
- There are no `npm` scripts defined — use `npx playwright` commands directly.
- Many files reference the public demo site; CI or offline runs require network access. For isolated unitization, mock network calls or host a local test server and update `playwright.config.ts` `webServer` / `baseURL`.
- If tests fail due to timing, prefer Playwright built-in expect/wait patterns (`toBeVisible`, `toHaveText`) rather than sleeps.

## Quick examples (copy-paste)
- Run a single test file: `npx playwright test tests/my_tests/demobank/demobank_transfer.spec.ts`
- Run in headed chromium: `npx playwright test --project=chromium --headed`

## Where to look for more context
- High-level goals and patterns: [README.md](README.md#L1-L40).
- Page object examples: [pages/demobank_transfer.page.ts](pages/demobank_transfer.page.ts#L1-L120).
- Representative tests: [tests/my_tests/demobank/demobank_transfer.spec.ts](tests/my_tests/demobank/demobank_transfer.spec.ts#L1-L200).

---
If any part of this file is unclear or you'd like me to include CI-specific notes or suggested `npm` scripts, tell me which workflow you want (local dev, CI on GitHub Actions, or both) and I will update this file.
