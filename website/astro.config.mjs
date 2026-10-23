// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://getflyventory.com",
  integrations: [sitemap()],
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Montserrat",
      cssVariable: "--font-montserrat",
      weights: [400, 600, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
      display: "swap",
    },
    {
      provider: fontProviders.google(),
      name: "Antonio",
      cssVariable: "--font-antonio",
      weights: [500],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
      display: "swap",
    },
  ],
});
