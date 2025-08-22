import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // Allow pragmatic use of any in API route handlers & quick prototyping
      '@typescript-eslint/no-explicit-any': 'off',
      // Don't fail build for temporary unused vars; warn instead and ignore leading underscore
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^PHI$' }],
      // Allow quotes/apostrophes inside JSX text without escaping
      'react/no-unescaped-entities': 'off',
    }
  },
];

export default eslintConfig;
