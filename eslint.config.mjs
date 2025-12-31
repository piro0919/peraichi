import { fixupPluginRules } from "@eslint/compat";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";
import css from "eslint-plugin-css";
import cssModules from "eslint-plugin-css-modules";
import ext from "eslint-plugin-ext";
import filenamesPlugin from "eslint-plugin-filenames";
import noUnsanitized from "eslint-plugin-no-unsanitized";
import perfectionist from "eslint-plugin-perfectionist";
import promise from "eslint-plugin-promise";
import security from "eslint-plugin-security";
import unusedImports from "eslint-plugin-unused-imports";
import writeGoodComments from "eslint-plugin-write-good-comments";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "public/sw.js",
    "convex/_generated/**",
    "**/*.config.js",
    "**/*.config.mjs",
    ".prettierrc.js",
    "reset.d.ts",
  ]),
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    plugins: {
      css,
      "css-modules": cssModules,
      ext,
      filenames: fixupPluginRules(filenamesPlugin),
      "no-unsanitized": noUnsanitized,
      perfectionist,
      promise,
      security,
      "unused-imports": unusedImports,
      "write-good-comments": writeGoodComments,
    },
    rules: {
      ...promise.configs.recommended.rules,
      ...css.configs.recommended.rules,
      ...noUnsanitized.configs.recommended.rules,
      ...security.configs.recommended.rules,
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "error",
      "css-modules/no-undef-class": [2, { camelCase: true }],
      "css-modules/no-unused-class": [2, { camelCase: true }],
      "ext/lines-between-object-properties": ["error", "never"],
      "filenames/match-exported": ["error", ["camel", "kebab", "pascal"]],
      "filenames/match-regex": "error",
      "filenames/no-index": "off",
      "import/newline-after-import": ["error", { count: 1 }],
      "import/order": "off",
      "import/prefer-default-export": "error",
      "no-duplicate-imports": "error",
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "no-restricted-imports": [
        "error",
        {
          message: "Please import from `@/i18n/navigation` instead.",
          name: "next/link",
        },
        {
          importNames: [
            "redirect",
            "permanentRedirect",
            "useRouter",
            "usePathname",
          ],
          message: "Please import from `@/i18n/navigation` instead.",
          name: "next/navigation",
        },
      ],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          next: [
            "block",
            "block-like",
            "break",
            "class",
            "const",
            "do",
            "export",
            "function",
            "let",
            "return",
            "switch",
            "try",
            "while",
          ],
          prev: "*",
        },
        {
          blankLine: "always",
          next: "*",
          prev: [
            "block",
            "block-like",
            "break",
            "class",
            "const",
            "do",
            "export",
            "function",
            "let",
            "return",
            "switch",
            "try",
            "while",
          ],
        },
        {
          blankLine: "never",
          next: "import",
          prev: "*",
        },
        {
          blankLine: "never",
          next: ["case", "default"],
          prev: "case",
        },
        {
          blankLine: "never",
          next: "const",
          prev: "const",
        },
        {
          blankLine: "never",
          next: "let",
          prev: "let",
        },
      ],
      "perfectionist/sort-exports": [
        "error",
        {
          order: "asc",
          partitionByNewLine: true,
          type: "natural",
        },
      ],
      "perfectionist/sort-imports": [
        "error",
        {
          groups: [
            ["value-builtin", "value-external"],
            "value-internal",
            ["value-parent", "value-sibling"],
            "value-index",
            "type-import",
            "unknown",
          ],
          newlinesBetween: 0,
          order: "asc",
          type: "natural",
        },
      ],
      "perfectionist/sort-interfaces": [
        "error",
        {
          order: "asc",
          type: "natural",
        },
      ],
      "perfectionist/sort-jsx-props": [
        "error",
        {
          groups: ["multiline-prop", "shorthand-prop", "prop", "unknown"],
          order: "asc",
          type: "natural",
        },
      ],
      "perfectionist/sort-named-imports": [
        "error",
        {
          order: "asc",
          type: "natural",
        },
      ],
      "perfectionist/sort-object-types": [
        "error",
        {
          order: "asc",
          type: "natural",
        },
      ],
      "perfectionist/sort-objects": [
        "error",
        {
          order: "asc",
          type: "natural",
        },
      ],
      "perfectionist/sort-union-types": [
        "error",
        {
          order: "asc",
          type: "natural",
        },
      ],
      quotes: ["error", "double"],
      "react-hooks/exhaustive-deps": [
        "error",
        {
          enableDangerousAutofixThisMayCauseInfiniteLoops: true,
        },
      ],
      "react/jsx-boolean-value": ["error", "always"],
      "react/jsx-newline": [
        "error",
        {
          prevent: true,
        },
      ],
      semi: ["error", "always"],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          vars: "all",
          varsIgnorePattern: "^_",
        },
      ],
      "write-good-comments/write-good-comments": "error",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
          prefer: "type-imports",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/strict-boolean-expressions": "off",
    },
  },
]);

export default eslintConfig;
