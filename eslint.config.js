// ── External Dependencies & Registrations
import { dpuseESLintConfig } from '@dpuse/eslint-config-dpuse';

// ── ESLint Configuration ─────────────────────────────────────────────────────────────────────────────────────────────

/**
@type {import('eslint').Linter.Config[]}
*/
const config = dpuseESLintConfig({
    files: ['eslint.config.js', 'scripts/**/*.ts', 'site/scripts/**/*.ts'], // No 'src' or 'tests' folders; the code is all scripts.
    ignores: ['site/.vitepress/cache/**', 'site/.vitepress/dist/**'],
    rules: {
        'unicorn/filename-case': ['error', { cases: { camelCase: true, pascalCase: true }, ignore: ['cloudflareAISearchKVIngest.ts', 'testKV.ts'] }],
        'unicorn/no-process-exit': 'off' // The scripts are only ever run from the command line, where the exit code reports failure.
    }
});

export default config;
