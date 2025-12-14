import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "Read Right",
    description: "Helps English learners gauge the difficulty of web pages.",
    version: "0.0.1",

    // We need these 3 permissions for the core feature
    permissions: [
      "sidePanel",      // To show the UI
      "activeTab",      // To read the current page
      "scripting"       // To execute the reading script
    ],

    side_panel: {
      default_path: "popup.html"
    },
  },

  // No "binaries" or "chromiumArgs" needed - just use default Chrome
  modules: ['@wxt-dev/module-react'],
});