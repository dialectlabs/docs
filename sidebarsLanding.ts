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
      value: "BLINKS",
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
      href: "https://api.dial.to/docs",
      label: "Blinks API",
    },
    {
      type: "html",
      value: "ALERTS",
      className: "sidebar-title",
    },
    {
      type: "link",
      href: "/alerts/alerts-quick-start",
      label: "Quick Start",
    },
    {
      type: "link",
      href: "alerts/alerts-and-monitoring/registering-your-dapp",
      label: "Register your Dapp",
    },
    {
      type: "link",
      href: "/alerts/alerts-and-monitoring/sdk/typescript/sending-dapp-to-user-messages",
      label: "Send Alerts",
    },
    {
      type: "link",
      href: "/alerts/alerts-and-monitoring/sdk/typescript/installation",
      label: "TypeScript SDK",
    },
    {
      type: "link",
      href: "https://alerts-api.dial.to/docs",
      label: "Alerts API",
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
