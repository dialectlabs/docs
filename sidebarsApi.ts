

// sidebarsApi.ts
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'index',
    {
      type: 'link',
      href: 'https://sbl.dial.to',
      label: 'Standard Blinks Library',
    }
    //   {
    //     type: 'html',
    //     value: 'BLINKS API',
    //     className: 'sidebar-title',
    //   },
    //   'blinks/dialect-api',
    //   {
    //     type: 'category',
    //     label: 'Blink Preview',
    //     collapsed: false,
    //     items: [
    //       {
    //         type: 'doc',
    //         id: 'blinks/get-v-1-blink-preview',
    //         label: 'Preview',
    //         className: 'api-method get',
    //       },
    //     ],
    //   },
    //   {
    //     type: 'category',
    //     label: 'Blink',
    //     collapsed: false,
    //     items: [
    //       {
    //         type: 'doc',
    //         id: 'blinks/get-v-1-blink',
    //         label: 'Blink',
    //         className: 'api-method get',
    //       },
    //       {
    //         type: 'doc',
    //         id: 'blinks/post-v-1-blink',
    //         label: 'Blink',
    //         className: 'api-method post',
    //       },
    //       {
    //         type: 'doc',
    //         id: 'blinks/post-v-1-blink-chain',
    //         label: 'Chain',
    //         className: 'api-method post',
    //       },
    //     ],
    //   },
    //   {
    //     type: 'category',
    //     label: 'Blink Data Table',
    //     collapsed: false,
    //     items: [
    //       {
    //         type: 'doc',
    //         id: 'blinks/get-v-1-blink-data-table',
    //         label: 'Data Table',
    //         className: 'api-method get',
    //       },
    //     ],
    //   },
    //   {
    //     type: 'category',
    //     label: 'Blink Lists',
    //     collapsed: false,
    //     items: [
    //       {
    //         type: 'doc',
    //         id: 'blinks/get-v-1-blink-lists-by-id',
    //         label: 'Lists',
    //         className: 'api-method get',
    //       },
    //     ],
    //   },
    //   {
    //     type: 'html',
    //     value: 'ALERTS API',
    //     className: 'sidebar-title',
    //   },
    //   'alerts/dialect-alerts-api',
    //   {
    //     type: 'category',
    //     label: 'Application',
    //     collapsed: false,
    //     items: [
    //       {
    //         type: 'doc',
    //         id: 'alerts/post-v-2-by-app-id-send',
    //         label: 'Send Alert',
    //         className: 'api-method post',
    //       },
    //       {
    //         type: 'doc',
    //         id: 'alerts/post-v-2-by-app-id-send-batch',
    //         label: 'Send Batch',
    //         className: 'api-method post',
    //       },
    //       {
    //         type: 'doc',
    //         id: 'alerts/get-v-2-by-app-id-subscribers',
    //         label: 'Subscribers',
    //         className: 'api-method get',
    //       },
    //     ],
    //   },
    //   {
    //     type: 'category',
    //     label: 'Subscriber',
    //     collapsed: false,
    //     items: [
    //       {
    //         type: 'doc',
    //         id: 'alerts/get-v-2-auth',
    //         label: 'Auth',
    //         className: 'api-method get',
    //       },
    //       {
    //         type: 'doc',
    //         id: 'alerts/post-v-2-auth-solana-prepare',
    //         label: 'Auth Prepare',
    //         className: 'api-method post',
    //       },
    //       {
    //         type: 'doc',
    //         id: 'alerts/post-v-2-auth-solana-verify',
    //         label: 'Auth Verify',
    //         className: 'api-method post',
    //       },
    //       {
    //         type: 'doc',
    //         id: 'alerts/post-v-2-auth-solana-tx-prepare',
    //         label: 'TX Prepare',
    //         className: 'api-method post',
    //       },
    //       {
    //         type: 'doc',
    //         id: 'alerts/post-v-2-auth-solana-tx-verify',
    //         label: 'TX Verify',
    //         className: 'api-method post',
    //       },
    //       {
    //         type: 'doc',
    //         id: 'alerts/get-v-2-history',
    //         label: 'History',
    //         className: 'api-method get',
    //       },
    //       {
    //         type: 'doc',
    //         id: 'alerts/get-v-2-history-summary',
    //         label: 'History Summary',
    //         className: 'api-method get',
    //       },
    //       {
    //         type: 'doc',
    //         id: 'alerts/post-v-2-history-read',
    //         label: 'History Read',
    //         className: 'api-method post',
    //       },
    //       {
    //         type: 'doc',
    //         id: 'alerts/post-v-2-subscribe',
    //         label: 'Subscribe',
    //         className: 'api-method post',
    //       },
    //       {
    //         type: 'doc',
    //         id: 'alerts/post-v-2-push-subscribe',
    //         label: 'Push Subscribe',
    //         className: 'api-method post',
    //       },
    //       {
    //         type: 'doc',
    //         id: 'alerts/post-v-2-push-unsubscribe',
    //         label: 'Push Unsubscribe',
    //         className: 'api-method post',
    //       },
    //     ],
    //   },
  ],
};

export default sidebars;
