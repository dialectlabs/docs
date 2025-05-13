// sidebarsBlinks.ts
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: "doc",
      id: "index",
      label: "Getting Started",
    },
    {
      type: "html",
      value: "DEX",
      className: "sidebar-title",
    },
    {
      type: "doc",
      id: "jupiter",
      label: "Jupiter",
    },
    {
      type: "doc",
      id: "orca",
      label: "Orca",
    },
    {
      type: "doc",
      id: "raydium",
      label: "Raydium",
    },
    {
      type: "html",
      value: "LENDING & YIELD",
      className: "sidebar-title",
    },
    {
      type: "doc",
      id: "lulo",
      label: "Lulo",
    },
    {
      type: "doc",
      id: "kamino",
      label: "Kamino",
    },
    {
      type: "doc",
      id: "marginfi",
      label: "Marginfi",
    },
    {
      type: "doc",
      id: "meteora",
      label: "Meteora",
    }, {
      type: "html",
      value: "PERPETUALS",
      className: "sidebar-title",
    },
    {
      type: "doc",
      id: "drift",
      label: "Drift",
    },
  ],
};

export default sidebars;
