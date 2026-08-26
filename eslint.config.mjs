import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Пропуски eslint-config-next задаются заново: список ниже ПЕРЕКРЫВАЕТ
  // его собственный, а не дополняет, поэтому умолчания приходится
  // повторять целиком. Уберёшь строку — линтер полезет в сборку.
  globalIgnores([
    // Умолчания eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
