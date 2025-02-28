import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

const config: Config = {
  title: "Dialect Developer Documentation",
  tagline:
    "Documentation and guides for building and integrating Dialect products.",
  favicon: "img/favicon.ico",
  url: "https://docs.dialect.to",
  baseUrl: "/",
  organizationName: "dialectlabs",
  projectName: "docs",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: false,
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "landing",
        path: "docs/landing",
        routeBasePath: "/",
        sidebarPath: "./sidebarsLanding.ts",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "blinks",
        path: "docs/blinks",
        routeBasePath: "blinks",
        sidebarPath: "./sidebarsBlinks.ts",
        docItemComponent: "@theme/ApiItem",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "alerts",
        path: "docs/alerts",
        routeBasePath: "alerts",
        sidebarPath: "./sidebarsAlerts.ts",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "api",
        path: "docs/api",
        routeBasePath: "api",
        sidebarPath: "./sidebarsApi.ts",
      },
    ],
    // [
    //   "docusaurus-plugin-openapi-docs",
    //   {
    //     id: "api", // plugin id
    //     docsPluginId: "classic", // configured for preset-classic
    //     config: {
    //       "blink-api": {
    //         specPath: "https://api.dial.to/openapi",
    //         outputDir: "docs/blinks/blinks-client/integrate/headless/api-docu",
    //         sidebarOptions: {
    //           groupPathsBy: "tag",
    //         },
    //       } satisfies OpenApiPlugin.Options,
    //     },
    //   },
    // ],
  ],
  themes: ["docusaurus-theme-openapi-docs"],

  themeConfig: {
    // Replace with your project's social card
    image: "img/dialect-social-card.png",
    metadata: [
      { name: "og:title", content: "Dialect Developer Documentation" },
      {
        name: "og:description",
        content:
          "Documentation and guides for building and integrating Dialect Blinks and Alerts.",
      },
      { name: "og:image", content: "/img/dialect-social-card.png" },
    ],
    navbar: {
      title: "Dialect",
      logo: {
        alt: "Dialect Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "doc",
          docId: "index",
          docsPluginId: "blinks",
          label: "Blinks",
        },
        {
          type: "doc",
          docId: "index",
          docsPluginId: "alerts",
          label: "Alerts",
        },
        {
          type: "doc",
          docId: "index",
          docsPluginId: "api",
          label: "API",
          position: "left",
        },
        {
          href: "https://github.com/dialectlabs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Blinks",
              to: "/blinks",
            },
            {
              label: "Alerts",
              to: "/alerts",
            },
            {
              label: "API",
              to: "/api",
            },
          ],
        },

        {
          title: "Blinks SDK",
          items: [
            {
              label: "React",
              href: "https://www.npmjs.com/package/@dialectlabs/blinks",
            },
            {
              label: "React-Native",
              href: "https://www.npmjs.com/package/@dialectlabs/blinks-react-native",
            },
          ],
        },
        {
          title: "Alerts SDK",
          items: [
            {
              label: "React",
              href: "https://github.com/dialectlabs/sdk",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Discord",
              href: "https://discord.com/invite/saydialect",
            },
            {
              label: "GitHub",
              href: "https://github.com/dialectlabs",
            },
            {
              label: "Blog",
              to: "https://medium.com/@dialectlabs",
            },
            {
              label: "X",
              href: "https://x.com/saydialect",
            },
          ],
        },
      ],
      copyright: `©${new Date().getFullYear()} Dialect Labs - All rights reserved`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
