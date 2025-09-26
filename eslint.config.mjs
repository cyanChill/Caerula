import nextJSConfig from "@next/eslint-plugin-next";
import { defineConfig } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tseslintConfig from "typescript-eslint";

export default defineConfig([
  tseslintConfig.configs.recommended,
  // @ts-expect-error - Should be resolved in Next.js v16.
  nextJSConfig.flatConfig.recommended,
  // @ts-expect-error - Should be resolved in Next.js v16.
  nextJSConfig.flatConfig.coreWebVitals,
  eslintPluginPrettierRecommended,
  /* TypeScript Eslint Config */
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  /* Other Rule Overrides */
  {
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },
  /* Ignored directories & files */
  {
    ignores: ["src/data", "next-env.d.ts"],
  },
]);
