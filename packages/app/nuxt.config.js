require("dotenv").config();

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",
  server: {
    port: 8080, // default: 3000
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Citizen App",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
      { hid: "og:title", name: "og:title", content: "Gov Dashboard" },
      { hid: "og:image", name: "og:image", content: "/" },
      {
        hid: "og:url",
        name: "og:url",
        content: "https://citizen-app.grey.software/",
      },
      { hid: "og:type", name: "og:type", content: "website" },
    ],
    link: [
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap",
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap",
      },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["@/assets/styles/main.css"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["@/plugins/persisted-state.client.js"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    [
      "@nuxtjs/vuetify",
      {
        customVariables: ["@/assets/styles/variables.scss"],
        treeShake: true,
        theme: {
          themes: {
            light: {
              primary: "#10B981",
              secondary: "#3B82F6",
              accent: "#82B1FF",
              error: "#F04747",
              info: "#2196F3",
              success: "#43b581",
              warning: "#FAA61A",
            },
          },
        },
      },
    ],
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",

    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
    "@nuxtjs/dotenv",
    "@nuxtjs/svg",
    [
      "nuxt-parse",
      {
        appId: process.env.PARSE_APP_ID,
        javascriptKey: process.env.PARSE_APP_MASTER_KEY,
        serverUrl: process.env.PARSE_SERVER_URL,
      },
    ],
  ],
  tailwindcss: {
    cssPath: "@/assets/styles/tailwind.css",
    configPath: "tailwind.config.js",
    exposeConfig: true,
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
};
