// sidebarsBlinks.ts
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: "doc",
      id: "index",
      label: "Welcome",
    },
    {
      type: "html",
      value: "QUICK START",
      className: "sidebar-title",
    },
    {
      type: "link",
      href: "/blinks/blinks-client/integrate",
      label: "Integrate Blinks",
    },
    {
      type: "link",
      href: "/blinks/blinks-provider/build-your-first-blink",
      label: "Build your first Blink",
    },
    {
      type: "link",
      href: "/blinks/blinks-provider/blink-registry",
      label: "Register Blinks",
    },
    {
      type: "link",
      href: "/blinks/blinks-scaffolds/",
      label: "Blinks Scaffolds",
    },
    {
      type: "link",
      href: "/alerts/alerts-quick-start",
      label: "Send Alerts",
    },
    {
      type: "link",
      href: "/api",
      label: "API Playground",
    },
    {
      type: "html",
      value: "SDK",
      className: "sidebar-title",
    },
    {
      type: "link",
      href: "https://github.com/dialectlabs/sdk",
      label: "Alert SDK",
    },
    {
      type: "link",
      href: "https://www.npmjs.com/package/@dialectlabs/blinks",
      label: "Blinks React SDK",
    },
    {
      type: "link",
      href: "https://www.npmjs.com/package/@dialectlabs/blinks-react-native",
      label: "Blinks React Native SDK",
    },

    {
      type: "html",
      value: "FOLLOW US",
      className: "sidebar-title",
    },
    {
      type: "link",
      href: "https://x.com/saydialect",
      label: "Twitter",
    },
    {
      type: "link",
      href: "https://discord.gg/saydialect",
      label: "Discord",
    },
    {
      type: "link",
      href: "https://github.com/dialectlabs",
      label: "GitHub",
    },
  ],
};

export default sidebars;
