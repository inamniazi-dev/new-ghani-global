import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { fontFamily: { display: ["Cormorant Garamond", "serif"], body: ["DM Sans", "sans-serif"] } } },
  plugins: [],
};
export default config;
