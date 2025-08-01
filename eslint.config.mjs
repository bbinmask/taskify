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
    files: ["src/app/(platform)/(dashboard)/board/[boardId]/layout.tsx"],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "no-unused-vars": "off",
    },
  },
];

export default eslintConfig;
