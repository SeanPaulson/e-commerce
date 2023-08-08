import type { Preview } from "@storybook/react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/scss/index.scss';
// import { withThemeByDataAttribute } from '@storybook/addon-styling';
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';

const preview: Preview = {
  parameters: {
    reactRouter: reactRouterParameters({}),
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [withRouter],
};

// export const decorators = [
//   withThemeByDataAttribute({
//     themes: {
//       light: 'light',
//       dark: 'dark',
//     },
//     defaultTheme: 'light',
//     attributeName: 'data-bs-theme',
//   })
// ]

export default preview;