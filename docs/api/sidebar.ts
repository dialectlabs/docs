import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "blinks/blinks-client/integrate/headless/api-docu/dialect-api",
    },
    {
      type: "category",
      label: "Blink Preview",
      items: [
        {
          type: "doc",
          id: "blinks/blinks-client/integrate/headless/api-docu/get-v-1-blink-preview",
          label: "getV1Blink-preview",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Blink",
      items: [
        {
          type: "doc",
          id: "blinks/blinks-client/integrate/headless/api-docu/get-v-1-blink",
          label: "getV1Blink",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "blinks/blinks-client/integrate/headless/api-docu/post-v-1-blink",
          label: "postV1Blink",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "blinks/blinks-client/integrate/headless/api-docu/post-v-1-blink-chain",
          label: "postV1BlinkChain",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Blink Data Table",
      items: [
        {
          type: "doc",
          id: "blinks/blinks-client/integrate/headless/api-docu/get-v-1-blink-data-table",
          label: "getV1Blink-data-table",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Blink Lists",
      items: [
        {
          type: "doc",
          id: "blinks/blinks-client/integrate/headless/api-docu/get-v-1-blink-lists-by-id",
          label: "getV1Blink-listsById",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
