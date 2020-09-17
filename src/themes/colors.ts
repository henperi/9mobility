import theme from 'styled-theming';
// import { css } from 'styled-components';

export const Colors = {
  white: '#ffffff',
  black: '#022235',
  blackGrey: '#627382',
  darkGreen: '#006848',
  lightGreen: '#00987B',
  yellowGreen: '#B4C404',
  lightBlue: '#00839B',
  orange: '#D87900',
  grey: '#DEDEDE',
  error: '#ff3e3ea6',
};

export const backgroundColor = theme.variants('mode', 'variant', {
  default: { light: Colors.white },
  primary: { light: Colors.darkGreen },
  secondary: { light: Colors.yellowGreen },
  tertiary: { light: Colors.lightGreen },
  neutral: { light: Colors.grey },
  blackGrey: { light: Colors.blackGrey },
  lightBlue: { light: Colors.lightBlue },
  orange: { light: Colors.orange },
});

export const fontColor = theme.variants('mode', 'variant', {
  default: { light: Colors.blackGrey },
  darker: { light: Colors.black },
  lighter: { light: Colors.blackGrey },
  white: { light: Colors.white },
});

// export const cardStyles = theme('mode', {
//   light: css`
//     background: ${white};
//     color: ${black};
//   `,
//   dark: css`
//     background: ${black};
//     color: ${white};
//   `,
// });
