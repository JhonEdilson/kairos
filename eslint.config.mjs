import nextConfig from "eslint-config-next/core-web-vitals";

export default [
  ...nextConfig,
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "error",
    },
  },
  { ignores: [".next/**", "node_modules/**", "out/**", "kairos-kb/**"] },
];
