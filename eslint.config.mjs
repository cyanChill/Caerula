import nextJSConfig from "@next/eslint-plugin-next";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tseslintConfig from "typescript-eslint";

export default tseslintConfig.config([
  tseslintConfig.configs.recommended,
  nextJSConfig.flatConfig.recommended,
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
    ignores: [
      "src/data",
    ],
  },
]);
