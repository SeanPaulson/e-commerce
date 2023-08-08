import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = ({
  stories: ["../src/components/**/*.mdx", "../src/components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", 'storybook-addon-react-router-v6'
  // "@storybook/addon-styling",
  // {
  //   name: '@storybook/addon-styling',
  //   options: {
  //     sass: {
  //       implementation: require('sass'),
  //     }
  //   }
  // }
  ],

  core: {},
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  docs: {
    autodocs: "tag"
  }
} satisfies StorybookConfig);
export default config;